<script setup>
import { ref } from 'vue'
import ButtonRepo from '@/components/ButtonRepo.vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <div class="flex w-full text-sm mb-5">
      <div class=" w-3/4 text-left">Kajian: 4</div>
      <router-link to="/add-study" class="w-1/4 font-bold text-right">+ Tambah</router-link>

    </div>
    <div class="green-block w-full p-2 my-4">
        <div class="flex w-full text-sm p-2">
          <div class="w-3/4 text-left uppercase">Aqidah</div>
          <div class="w-1/4  text-right text-xs">4 Jam</div>
        </div>
        <p class="text-xs p-2">Utsul Tsalasah karya Syeikh Muhammad bin Abdul Wahhab (Terjemahan)</p>
    </div>
     <div class="green-block w-full p-2 my-4">
        <div class="flex w-full text-sm p-2">
          <div class="w-3/4 text-left uppercase">Adab & Akhlak</div>
          <div class="w-1/4  text-right text-xs">2 Jam</div>
        </div>
        <p class="text-xs p-2">Minhajul Muslim karya syeikh (Abu Bakr Jabir al-jazairy (Terjemahan)</p>
    </div>
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>