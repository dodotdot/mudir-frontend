<script setup>
import { ref } from 'vue'
import ButtonRepo from '@/components/ButtonRepo.vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <p class="text-md">Assalamu’alaikum</p>
    <h1 class="text-4xl mb-10">Umar bakri</h1>
    <div class="flex text-black mx-auto mb-5">
        <router-link to="/list-student" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Santri
          <br>
          <strong class="text-2xl">12</strong>
        </router-link>
        <router-link to="/list-teacher" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Ustadz
          <br>
          <strong class="text-2xl">12</strong>
        </router-link>
    </div>
     <div class="flex text-black mx-auto">
        <router-link to="/list-lesson" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Pelajaran
          <br>
          <strong class="text-2xl">12</strong>
         </router-link>
        <router-link to="/list-study" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Kajian
          <br>
          <strong class="text-2xl">12</strong>
        </router-link>
    </div>
  </div>
</template>
