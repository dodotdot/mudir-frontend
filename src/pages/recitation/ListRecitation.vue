<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/store';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();

const tab = ref(1);
const currentTab = (tabNumber) => (tab.value = tabNumber);
defineExpose({
  tab,
  currentTab
})
</script>

<template>

  <div class="w-auto mx-auto text-center text-white text-xl p-4">
    <ul class="flex flex-wrap-reverse -mb-px">
        <li>
            <div @click="currentTab(1)" :class="{'active border-gray-500 font-bold':tab ===1}" class="inline-block p-4 rounded-t-lg border-b-2">Sabaq</div>
        </li>
        <li>
            <div @click="currentTab(2)" :class="{'active border-gray-500 font-bold':tab ===2}" class="inline-block p-4 rounded-t-lg border-b-2">Manzil</div>
        </li>
        <li>
            <div @click="currentTab(3)" :class="{'active border-gray-500 font-bold':tab ===3}" class="inline-block p-4 rounded-t-lg border-b-2">Sabaqi</div>
        </li>
    </ul>
  </div>
  <div class="p-4 w-full text-white">
    <div  v-if="tab === 1">
      <div>Bada Subuh, 05:15 - 06:10</div>
      <p>Setiap Santri Akan menyetorkan Hafalan Baru Kepada Musyrif Halaqoh Masing-Masing.</p>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-white text-sm text-left dark:text-gray-400">
          <tbody v-if="users.data && users.data.length">
              <tr v-for="user in users.data" :key="user.id" class="bg-transparent border-b  dark:border-gray-100">
                  <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                    <router-link :to="`/add-recitation/${user.id}/SABAQ`">   {{ user.name }}</router-link>
                  </th>
                  <td class="px-6 py-4 text-right">
                      <button class="block w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Progress</button>
                  </td>
              </tr>
          
          </tbody>
      </table>
    </div>
    </div>
    <div  v-if="tab === 2">
      <div>Dhuha, 07:30 - 08:20</div>
      <p>Setiap Santri Akan Murojaah kepada pasangan masing-masing yang sudah ditentukan.</p>
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
          <tbody v-if="users.data && users.data.length">
              <tr v-for="user in users.data" :key="user.id" class="bg-transparent border-b  dark:border-gray-100">
                  <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                    <router-link :to="`/add-recitation/${user.id}/MANZIL`">   {{ user.name }}</router-link>
                  </th>
                  <td class="px-6 py-4 text-right">
                    <button class="block w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Progress</button>
                  </td>
              </tr>
          
          </tbody>
      </table>
    </div>
    </div>
    <div  v-if="tab === 3">
      <div>Bada Dzuhur, 12:25 - 12:55</div>
      <p>Setiap Santri Akan Murojaah Hafalan Baru Kepada Musyrif Halaqoh Masing-Masing.</p>
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
          <tbody v-if="users.data && users.data.length">
              <tr v-for="user in users.data" :key="user.id" class="bg-transparent border-b  dark:border-gray-100">
                  <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                    <router-link :to="`/add-recitation/${user.id}/SABAQI`">   {{ user.name }}</router-link>
                  </th>
                  <td class="px-6 py-4 text-right">
                      <button class="block w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Progress</button>
                  </td>
              </tr>
          
          </tbody>
      </table>
    </div>
    </div>
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>