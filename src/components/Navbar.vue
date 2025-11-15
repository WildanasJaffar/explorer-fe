<script setup>
import { computed } from 'vue'
import { ChevronRight, Search, TextAlignStart } from 'lucide-vue-next'

import { useSidebarStore } from '@/stores/sidebar.stores'
import { useSearch } from '@/composables/search.composables'
import { useFolderStore } from '@/stores/folder.stores'

const sidebar_store = useSidebarStore()
const folder_store = useFolderStore()

const { query: search } = useSearch((val) => folder_store.search(val), 500)
const path = computed(() => folder_store.path || [])
</script>
<template>
    <nav class="bg-white sticky top-0 left-0 w-full flex md:flex-row flex-col md:items-center md:justify-between border-b border-gray-300">
        <div class="p-2 text-sm text-gray-700 flex items-center overflow-auto">
          <button class="md:hidden block mx-1" type="button" @click="sidebar_store.is_mobile_expanded = true">
            <TextAlignStart class="size-4" />
          </button>

          <span class="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" @click="folder_store.goHome">Home</span>

          <div class="flex items-center gap-1" v-for="(path, index) in path" :key="path.id">
            <ChevronRight class="size-3" />
            <span
              class="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded whitespace-nowrap"
              @click="folder_store.goToFolder(index)"
              :class="{ 'font-semibold text-blue-600': index === path.length - 1 }"
            >
              {{ path.name }}
            </span>
          </div>
        </div>

        <label class="md:w-48 relative px-2">
          <input v-model="search" class="border border-gray-100 focus:outline-0 focus:ring-0 focus:border-gray-300 rounded w-full py-1 pl-8 pr-2" placeholder="Search..." />
          <Search class="absolute top-2 left-4 size-4" />
        </label>
    </nav>
</template>