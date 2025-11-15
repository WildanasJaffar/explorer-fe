<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="md:flex h-screen overflow-hidden select-none relative">
    <Sidebar />

    <main class="flex-1 md:overflow-y-auto flex flex-col">
      <Navbar />
      <router-view />
    </main>
  </div>
</template>