<script setup>
import {onMounted, onUnmounted, watch } from 'vue'

import FolderTree from './FolderTree.vue'
import { useSidebarStore } from '@/stores/sidebar.stores'
import { useFolderStore } from '@/stores/folder.stores'

const folder_store = useFolderStore()
const sidebar_store = useSidebarStore()

watch(() => sidebar_store.is_mobile_expanded, (v) => {
    const body = document.body
    if (v) {
        body.classList.add('overflow-hidden')
    } else {
        body.classList.remove('overflow-hidden')
    }
})

onMounted(() => {
    sidebar_store.handleResize()
    window.addEventListener('resize', sidebar_store.handleResize)
    folder_store.loadRoot()
})

onUnmounted(() => window.removeEventListener('resize', sidebar_store.handleResize))
</script>
<template>
    <aside
      class="border-r border-gray-300 overflow-y-auto p-2 bg-white"
      :class="{
        'absolute h-screen transition-all duration-300': sidebar_store.is_mobile,
        '-ml-[100%]': sidebar_store.is_mobile && !sidebar_store.is_mobile_expanded,
        'z-10': sidebar_store.is_mobile && sidebar_store.is_mobile_expanded
      }"
      :style="{ width: sidebar_store.is_mobile ? '80%' : sidebar_store.sidebar_width + 'px' }"
    >
      <FolderTree
        :folders="folder_store.root"
        :selectedId="folder_store.selected?.id"
        :onSelect="folder_store.openFolder"
        :fetchFolders="folder_store.expandFolder"
      />
    </aside>

    <!-- Drag handle only on non-mobile -->
    <div
      v-if="!sidebar_store.is_mobile"
      class="w-px bg-gray-300 hover:bg-gray-500 cursor-col-resize"
      @mousedown="sidebar_store.startResizing"
    ></div>

    <!-- Overlay for mobile when sidebar expanded -->
    <div v-else-if="sidebar_store.is_mobile_expanded" class="absolute inset-0 z-1 bg-black/50" @click="sidebar_store.is_mobile_expanded = false"></div>
</template>