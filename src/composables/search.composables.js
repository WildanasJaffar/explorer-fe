import { ref, watch, onUnmounted } from 'vue'

export const useSearch = (action, delay = 500) => {
  const query = ref('')
  let timer = null

  watch(query, (val) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => action(val), delay)
  })

  onUnmounted(() => {
    if (timer) clearTimeout(timer)
  })

  return { query }
}
