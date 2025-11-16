<script setup>
import { computed, ref } from 'vue'
import { useFolderStore } from '@/stores/folder.stores'
import { useSidebarStore } from '@/stores/sidebar.stores'
import { ArrowDown, ArrowDownUp, ArrowUp } from 'lucide-vue-next'
import { useSorter } from '@/composables/sorter.composables'

const folder_store = useFolderStore()
const sidebar_store = useSidebarStore()

const emit = defineEmits(['open-folder'])

const raw_datas = computed(() => {
  return [
    ...folder_store.subfolders.map(f => ({ ...f, __type: 'folder' })),
    ...folder_store.files.map(f => ({ ...f, __type: 'file' })),
  ]
})

const { sort_key, sort_direction, sorted_items, setSort } = useSorter(raw_datas)

const columns = ref([
  { key: 'name', label: 'Name', show_in_mobile: true },
  { key: 'mimeType', label: 'Type', show_in_mobile: false },
  { key: 'size', label: 'Size', show_in_mobile: false },
])

const datas = computed(() => {
  const sorted = sorted_items.value

  const folders = sorted.filter(i => i.__type === 'folder')
  const files = sorted.filter(i => i.__type === 'file')

  const temp = []
  if (folders.length) temp.push({ datas: folders, type: 'folder' })
  if (files.length) temp.push({ datas: files, type: 'file' })

  return temp
})

const toString = (e) => JSON.stringify(e)

const selected = ref('')
const selectFolder = (e, type) => {
    selected.value = toString(e)
    if (sidebar_store.is_mobile && type == 'folder') {
        setTimeout(() => openFolder(e), 100)
    }
}
const openFolder = (e) => folder_store.openFolder(e)
const clearSelection = () => selected.value = ''
</script>

<template>
  <div class="select-none" @click.self="clearSelection">
    <div v-if="!datas.length" class="text-gray-500">This folder is empty</div>
    <table class="custom-table" v-else>
      <thead>
        <tr>
          <template v-for="h in columns">
            <th v-if="h.show_in_mobile || (!sidebar_store.is_mobile)" @click="setSort(h.key)">
              <div class="w-full flex items-center gap-2 md:justify-between group hover:cursor-pointer">
                <span>{{ h.label }}</span>
                <template v-if="sort_key == h.key">
                  <ArrowUp class="size-4" v-if="sort_direction == 'asc'" />
                  <ArrowDown class="size-4" v-else />
                </template>
                <ArrowDownUp v-else class="size-4 text-gray-300 group-hover:text-zinc-900" />
              </div>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in datas">
          <tr v-for="data in item.datas" :key="data"
            @click="selectFolder(data, item.type)"
            @dblclick="item.type == 'folder' ? openFolder(data) : null"
            :class="selected === toString(data) ? 'selected' : ''"
          >
            <td class="truncate">
              {{ item.type == 'folder' ? '📁' : '📄' }}
              {{ data.name }}
            </td>
            <td v-if="!sidebar_store.is_mobile">
              {{ item.type == 'folder' ? '' : data.mimeType }}
            </td>
            <td v-if="!sidebar_store.is_mobile">
              {{ item.type == 'folder' ? '' : data.size }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>