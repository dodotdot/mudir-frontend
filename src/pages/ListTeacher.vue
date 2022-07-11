<script setup>
import { ref } from 'vue'
import ButtonRepo from '@/components/ButtonRepo.vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)
</script>

<template>
  <div class="p-4 text-white h-1/2">
    <div class="flex w-full text-sm mb-5">
      <div class=" w-3/4 text-left">Total Ustadz: <strong>25 Ustads</strong></div>
      <router-link to="/add-teacher" class="w-1/4 font-bold text-right">+ Tambah</router-link>
    </div>
    <div>
       <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div class="relative">
            <input type="search" id="default-search" class="block p-4 pl-4 w-full text-sm text-gray-200 bg-transparent rounded-full border border-gray-300 focus:ring-white focus:border-white dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white dark:focus:ring-white dark:focus:border-white placeholder:text-white" placeholder="Nama Ustadz">
            <div class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-200 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <!-- <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
        </div>
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