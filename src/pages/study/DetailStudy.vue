<script setup>
import { useTeachersStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const teachersStore = useTeachersStore();
const route = useRoute();
const id = route.params.id;

const { teacher } = storeToRefs(teachersStore);
teachersStore.getById(id);
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <h1 class="text-4xl mb-2">{{ teacher.data && teacher.data.name }}</h1>
    <div class="flex w-full">
      <div class="text-xs w-1/2">Terdaftar sejak {{ $dayjs(teacher.data && teacher.data.createdDate).format('DD MMMM YYYY') }}</div>
      <router-link :to="`/edit-teacher/${id}`" class="font-bold text-right w-1/2"> Ubah</router-link>
    </div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Pendidikan</div>
          <div class="w-1/2 font-bold">{{ teacher.data && teacher.data.lastEducation }}</div>
        </div>
         <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Kontak</div>
          <div class="w-1/2 font-bold">{{ teacher.data && teacher.data.userPhone }}</div>
        </div>
    </div>
    <h1 class="text-lg">Jadwal</h1>
    <div class="green-block w-full rounded-md p-2 my-4">
       <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-white text-sm text-left dark:text-gray-400">
            <tbody>
                <tr class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                        Sabaq
                    </th>
                    <td class="px-6 py-4 text-right">
                        10:08:36 - 24 Des. 20
                    </td>
                </tr>
                <tr class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                       Manzil
                    </th>
                    <td class="px-6 py-4 text-right">
                        10:08:36 - 24 Des. 20
                    </td>
                </tr>
                <tr class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                        Sabaqi
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