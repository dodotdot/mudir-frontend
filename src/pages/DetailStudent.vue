<script setup>
import { ref } from 'vue'
import ButtonRepo from '@/components/ButtonRepo.vue'
import { Switch } from '@headlessui/vue'

const enabled = ref(false)
</script>

<template>
  <div class="p-4 text-white h-1/2">
    <h1 class="text-4xl mb-2">Fulan bin fulan</h1>
    <div class="text-xs">Terdaftar sejak 20 Desember 2021</div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Nama Wali</div>
          <div class="w-1/2 font-bold">Rustam</div>
        </div>
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Asal</div>
          <div class="w-1/2 font-bold">Tangerang</div>
        </div>
         <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Kontak Wali</div>
          <div class="w-1/2 font-bold">0811111111</div>
        </div>
    </div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3 border-r-2 border-gray-600">Jumlah Surat: <br><div class="text-xl font-bold">12</div></div>
          <div class="w-1/2 pl-4">Saat ini:<br><div class="text-xl font-bold">Al Kafirun: 5</div></div>
        </div>
    </div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3 text-center mx-auto border-r-2 border-gray-600">Sabaq: <br><div class="text-xl font-bold">12</div></div>
          <div class="w-1/3 text-center mx-auto border-r-2 border-gray-600">Manzil: <br><div class="text-xl font-bold">12</div></div>
          <div class="w-1/3 text-center">Sabaqi: <br><div class="text-xl font-bold">12</div></div>
        </div>
    </div>
    <h1 class="text-lg">Riwayat</h1>
    <div class="green-block w-full rounded-md p-2 my-4">
       <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-white text-sm text-left dark:text-gray-400">
            <tbody>
                <tr class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                        Al Kafirun
                    </th>
                    <td class="px-6 py-4 text-right">
                        10:08:36 - 24 Des. 20
                    </td>
                </tr>
                <tr class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                        Al Kafirun
                    </th>
                    <td class="px-6 py-4 text-right">
                        10:08:36 - 24 Des. 20
                    </td>
                </tr>
                <tr class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                        Al Kafirun
                    </th>
                    <td class="px-6 py-4 text-right">
                        10:08:36 - 24 Des. 20
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