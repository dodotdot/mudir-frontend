<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'

let counter = ref(0)

setInterval(() => {
  counter.value++
}, 1000)
</script>

<template>
  <div>
    <main>
      <Header v-if="this.$route.path !== '/'"></Header>
      <router-view />
    </main>
  </div>
</template>
