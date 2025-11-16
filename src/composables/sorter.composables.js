import { ref, computed } from 'vue'

export function useSorter(items, default_key = '') {
    const sort_key = ref('')
    const sort_direction = ref('') // '', 'asc', 'desc'

    const setSort = (key) => {
        // different column → asc
        if (sort_key.value !== key) {
            sort_key.value = key
            sort_direction.value = 'asc'
            return
        }

        // same column and asc → desc
        if (sort_direction.value === 'asc') {
            sort_direction.value = 'desc'
            return
        }

        // same column and desc → reset (no sort)
        if (sort_direction.value === 'desc') {
            sort_key.value = ''
            sort_direction.value = ''
            return
        }

        // no-sort position → asc
        sort_key.value = key
        sort_direction.value = 'asc'
    }

    const sorted_items = computed(() => {
        if (!sort_key.value || !sort_direction.value) {
            return items.value
        }

        return [...items.value].sort((a, b) => {
            const x = a[sort_key.value]
            const y = b[sort_key.value]

            if (x == null) return 1
            if (y == null) return -1

            if (typeof x === 'string') {
                return sort_direction.value === 'asc'
                    ? x.localeCompare(y)
                    : y.localeCompare(x)
            }

            return sort_direction.value === 'asc'
                ? x - y
                : y - x
        })
    })

    return {
        sort_key,
        sort_direction,
        sorted_items,
        setSort,
    }
}
