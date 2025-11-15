<script setup>
import { computed, ref } from 'vue'
import { useFolderStore } from '@/stores/folder.stores'
import { useSidebarStore } from '@/stores/sidebar.stores'

const folder_store = useFolderStore()
const sidebar_store = useSidebarStore()

const emit = defineEmits(['open-folder'])
const selected = ref('')

const subfolderview_datas = computed(() => {
  const datas = []
  if (folder_store.subfolders.length > 0) datas.push({ datas: folder_store.subfolders, type: 'folder' })
  if (folder_store.files.length > 0) datas.push({ datas: folder_store.files, type: 'file' })
  return datas
})

const toString = (e) => JSON.stringify(e)
const selectFolder = (e) => {
    selected.value = toString(e)
    if (sidebar_store.is_mobile) {
        setTimeout(() => {
            openFolder(e)
        }, 100)
    }
}
const openFolder = (e) => folder_store.openFolder(e)
const clearSelection = () => selected.value = ''
</script>

<template>
  <div class="p-3 select-none" @click.self="clearSelection">
    <div v-if="!subfolderview_datas.length" class="text-gray-500">This folder is empty</div>

    <ul v-for="item in subfolderview_datas">
      <li
        v-for="data in item.datas"
        :key="data.id"
        @click="selectFolder(data)"
        @dblclick="item.type == 'folder' ? openFolder(data) : null"
        class="px-2 py-1 rounded cursor-pointer transition-colors select-none"
        :class="selected === toString(data) ? 'bg-blue-50 hover:bg-blue-100 text-blue-600' : 'hover:bg-gray-200'"
      >
        {{ item.type == 'folder' ? '📁' : '📄' }} {{ data.name }}
      </li>
    </ul>
  </div>
</template>
