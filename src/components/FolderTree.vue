<script setup>
import { ChevronRight } from 'lucide-vue-next'
import { reactive, ref, watch } from 'vue'

const props = defineProps({
  folders: Array,
  selectedId: Number,
  onSelect: Function,
  fetchFolders: Function,
  isRoot: {
    type: Boolean,
    default: true
  }
});

const folder_children = reactive({});

const expanded = ref([])
const toggle = async (id) => {
  if (expanded.value.includes(id)) {
    expanded.value = expanded.value.filter(i => i !== id)
    return
  }

  expanded.value.push(id)
  folder_children[id] = await props.fetchFolders(id)
}

watch(() => props.folders, () => {
  toggle(-1)
})

</script>

<template>
  <ul class="pl-2 select-none">
    <li v-for="folder in folders" :key="folder.id">
      <div
        class="cursor-pointer flex items-center gap-2 transition-all p-1"
        :class="folder.id === selectedId ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'hover:bg-gray-200'"
        @click="onSelect(folder)"
        @dblclick="toggle(folder.id)"
      >
        <ChevronRight @click.stop="toggle(folder.id)" class="size-4 transition-all" :class="{'rotate-90': expanded.includes(folder.id)}" />
        <!-- <div v-else class="size-4"></div> -->
        {{ folder.id == -1 ? '🏠' : '📁' }}
        {{ folder.name }}
      </div>

      <FolderTree
        v-if="folder_children[folder.id] && expanded.includes(folder.id)"
        :folders="folder_children[folder.id]"
        :selectedId="selectedId"
        :onSelect="onSelect"
        :fetchFolders="fetchFolders"
      />
    </li>
  </ul>
</template>
