import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useResizer } from '@/composables/resizer.composables'

export const useSidebarStore = defineStore('sidebar', ({ breakpoint = 768, initialWidth = 300, minWidth = 200, maxWidth = 600 }) => {
    // state
    const sidebar_width = ref(initialWidth)
    const is_mobile = ref(false)
    const is_mobile_expanded = ref(false)

    // composable resizer
    const {
        startResizing,
        resize,
        stopResizing
    } = useResizer(sidebar_width, minWidth, maxWidth)

    // mobile handler
    const handleResize = () => {
        is_mobile.value = window.innerWidth < breakpoint
        is_mobile_expanded.value = false
    }

    return {
        // state
        sidebar_width,
        is_mobile,
        is_mobile_expanded,

        // actions
        startResizing,
        resize,
        stopResizing,
        handleResize,
    }
})
