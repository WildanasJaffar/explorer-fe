export const useResizer = (widthRef, minWidth = 100, maxWidth = 1000) => {

  const startResizing = (e) => {
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stopResizing)
  }

  const resize = (e) => {
    widthRef.value = Math.min(Math.max(e.clientX, minWidth), maxWidth)
  }

  const stopResizing = () => {
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResizing)
  }

  return {
    startResizing,
    resize,
    stopResizing,
  }
}
