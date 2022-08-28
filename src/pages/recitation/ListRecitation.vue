<script setup>
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useRecitationStore } from '@/store';

const tab = ref('SABAQ');
const currentTab = async (tabNumber) => {
    return tab.value = tabNumber
}

const recitationStore = useRecitationStore();
const {recitation} = storeToRefs(recitationStore)

watch(tab, (currentValue, oldValue) => {
  recitationStore.getRecitationByMethods(currentValue)
});

recitationStore.getRecitationByMethods(tab.value)

defineExpose({
  tab,
  currentTab
})
</script>

<template>

  <div class="w-auto mx-auto text-center text-white text-xl p-4">
    <ul class="flex flex-wrap-reverse -mb-px">
        <li>
            <div @click="currentTab('SABAQ')" :class="{'active border-gray-500 font-bold':tab ==='SABAQ'}" class="inline-block p-4 rounded-t-lg border-b-2">Sabaq</div>
        </li>
        <li>
            <div @click="currentTab('MANZIL')" :class="{'active border-gray-500 font-bold':tab ==='MANZIL'}" class="inline-block p-4 rounded-t-lg border-b-2">Manzil</div>
        </li>
        <li>
            <div @click="currentTab('SABAQI')" :class="{'active border-gray-500 font-bold':tab ==='SABAQI'}" class="inline-block p-4 rounded-t-lg border-b-2">Sabaqi</div>
        </li>
    </ul>
  </div>
  <div class="p-4 w-full text-white">
    <div  v-if="tab === 'SABAQ'">
      <div>Bada Subuh, 05:15 - 06:10</div>
      <p>Setiap Santri Akan menyetorkan Hafalan Baru Kepada Musyrif Halaqoh Masing-Masing.</p>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-white text-sm text-left dark:text-gray-400">
          <tbody v-if="recitation.data && recitation.data.length">
              <tr v-for="recite in recitation.data" :key="recite.id" class="bg-transparent border-b  dark:border-gray-100">
                  <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                    <router-link :to="`/add-recitation/${recite.userId}/SABAQ`">   {{ recite.name }}</router-link>
                  </th>
                  <td class="px-6 py-4 text-right">
                      <button v-if="!recite.surat" class="block w-full p-2 rounded-md bg-gray-300 text-black">Progress</button>
                      <button v-if="recite.surat" class="block w-full p-2 rounded-md bg-black text-white">Updated</button>
                  </td>
              </tr>
          
          </tbody>
      </table>
    </div>
    </div>
    <div  v-if="tab === 'MANZIL'">
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
          <tbody v-if="recitation.data && recitation.data.length">
              <tr v-for="recite in recitation.data" :key="recite.id" class="bg-transparent border-b  dark:border-gray-100">
                  <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                    <router-link :to="`/add-recitation/${recite.userId}/MANZIL`">   {{ recite.name }}</router-link>
                  </th>
                  <td class="px-6 py-4 text-right">
                    <button v-if="!recite.surat" class="block w-full p-2 rounded-md bg-gray-300 text-black">Progress</button>
                    <button v-if="recite.surat" class="block w-full p-2 rounded-md bg-black text-white">Updated</button>
                  </td>
              </tr>
          
          </tbody>
      </table>
    </div>
    </div>
    <div  v-if="tab === 'SABAQI'">
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
          <tbody v-if="recitation.data && recitation.data.length">
              <tr v-for="recite in recitation.data" :key="recite.id" class="bg-transparent border-b  dark:border-gray-100">
                  <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                    <router-link :to="`/add-recitation/${recite.userId}/SABAQI`">   {{ recite.name }}</router-link>
                  </th>
                  <td class="px-6 py-4 text-right">
                    <button v-if="!recite.surat" class="block w-full p-2 rounded-md bg-gray-300 text-black">Progress</button>
                    <button v-if="recite.surat" class="block w-full p-2 rounded-md bg-black text-white">Updated</button>
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