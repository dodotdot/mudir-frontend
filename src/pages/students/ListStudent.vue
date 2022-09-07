<script setup>
import {ref, watch} from 'vue';
import { storeToRefs } from 'pinia';
import { useRecitationStore, useUsersStore } from '@/store';

const usersStore = useUsersStore();
const recitationsStore = useRecitationStore();
const { recitation } = storeToRefs(recitationsStore);
const { users } = storeToRefs(usersStore);

let searchTerm = ref('')

recitationsStore.getRecitationProgress();

watch(searchTerm, (current, old) => {
    if(current !== '') {
        recitationsStore.getRecitationProgressByUserName(current)
    } else {
        recitationsStore.getRecitationProgress();
    }
})

</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <div class="flex w-full text-sm mb-5">
      <div class=" w-3/4 text-left">Total Santri: <strong>{{ recitation.data && recitation.data.length }} santri </strong></div>
      <router-link v-if=" users && users.data && users.data.role == 'ADMIN'" to="/add-student" class="w-1/4 font-bold text-right">+ Tambah</router-link>
    </div>
    <div class="searchbox mb-10">
       <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
        <div class="relative">
            <input type="search" v-model="searchTerm" id="default-search" class="block p-4 pl-4 w-full text-sm text-gray-200 bg-transparent rounded-full border border-gray-300 focus:ring-white focus:border-white dark:bg-gray-200 dark:border-gray-200 dark:placeholder-gray-200 dark:text-white dark:focus:ring-white dark:focus:border-white placeholder:text-white" placeholder="Nama Santri">
            <div class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-200 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <!-- <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> -->
        </div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-white text-sm text-left dark:text-gray-400">
            <thead class="text-xs uppercase dark:bg-gray-400 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Nama
                    </th>
                    <th scope="col" class="px-6 py-3 text-right">
                        Hafalan
                    </th>
                </tr>
            </thead>
            <tbody v-if="recitation.data && recitation.data.length">
                <tr v-for="recit in recitation.data" :key="recit.id" class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                     <router-link :to="`/detail-student/${recit.userId}`">   {{ recit.name }}</router-link>
                    </th>
                    <td class="px-6 py-4 text-right">
                        {{ recit.total }}
                    </td>
                </tr>
           
            </tbody>
        </table>
    </div>
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>