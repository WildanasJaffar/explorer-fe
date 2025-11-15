import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', ({breakpoint = 768, initialWidth = 300, minWidth = 200, maxWidth = 600}) => {
  // state
  const sidebar_width = ref(initialWidth)
  const is_resizing = ref(false)

  const is_mobile = ref(false)
  const is_mobile_expanded = ref(false)

  // actions
  const startResizing = (e) => {
    is_resizing.value = true
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stopResizing)
  }

  const resize = (e) => {
    if (!is_resizing.value) return
    sidebar_width.value = Math.min(Math.max(e.clientX, minWidth), maxWidth)
  }

  const stopResizing = () => {
    is_resizing.value = false
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResizing)
  }

  const handleResize = () => {
    is_mobile.value = window.innerWidth < breakpoint
    is_mobile_expanded.value = false
  }

  return {
    // state
    sidebar_width,
    is_resizing,
    is_mobile,
    is_mobile_expanded,

    // actions
    startResizing,
    resize,
    stopResizing,
    handleResize
  }
})