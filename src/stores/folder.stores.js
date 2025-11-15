import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FolderApi } from '../api/folder.api'

export const useFolderStore = defineStore('folder', () => {
  // state
  const root = ref([])
  const selected = ref(null)

  const subfolders = ref([])
  const files = ref([])

  const prev_subfolders = ref([])
  const prev_files = ref([])

  const path = ref([])

  const api = new FolderApi()

  // actions
  const loadRoot = async () => {
    const home = { id: -1, name: 'Home', parentId: null, children: [] }
    root.value = [home]
    await openFolder(home)
  }

  const openFolder = async (folder) => {
    selected.value = folder

    subfolders.value = await api.get(folder.id)
    files.value = await api.files(folder.id)

    prev_subfolders.value = subfolders.value
    prev_files.value = files.value

    path.value = await api.path(folder.id)
  }

  const expandFolder = (id) => {
    return api.get(id)
  }

  const goToFolder = async (index) => {
    const folder = path.value[index]
    path.value = path.value.slice(0, index + 1)
    await openFolder(folder)
  }

  const search = async (keyword) => {
    if (keyword) {
      const { folders, files: fileList } = await api.search(keyword)

      subfolders.value = folders
      files.value = fileList
    } else {
      subfolders.value = prev_subfolders.value
      files.value = prev_files.value
    }
  }

  const goHome = async () => {
    selected.value = null
    subfolders.value = []
    files.value = []
    path.value = []

    subfolders.value = await api.get(-1)
    files.value = await api.files(-1)
  }

  return {
    // state
    root,
    selected,
    subfolders,
    files,
    prev_subfolders,
    prev_files,
    path,

    // actions
    loadRoot,
    openFolder,
    expandFolder,
    goToFolder,
    search,
    goHome
  }
})