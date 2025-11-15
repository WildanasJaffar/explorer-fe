<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="md:flex h-screen select-none relative">
    <Sidebar />

    <div class="flex-1 overflow-auto flex flex-col">
      <Navbar />
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>