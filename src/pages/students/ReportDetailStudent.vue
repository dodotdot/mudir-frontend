<script setup>
import { useRecitationStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const recitationStore = useRecitationStore();
const route = useRoute();
const userid = route.params.id;

const {userRecitate, recite, recitation, recitereport} = storeToRefs(recitationStore);

recitationStore.getDetailUserById(userid);
recitationStore.getRecitationProgressByUserId(userid)
recitationStore.getCountRecitationProgressMethodByUserId(userid)
recitationStore.getRecitationReportById(userid)

</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <h1 class="text-4xl mb-2">{{ userRecitate.data && userRecitate.data.name }}</h1>
    <div class="flex w-full">
      <div class="text-xs w-1/2">Terdaftar sejak {{ $dayjs(userRecitate.data && userRecitate.data.createdDate).format('DD MMMM YYYY') }}</div>
    </div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Nama Wali</div>
          <div class="w-1/2 font-bold">{{ userRecitate.data && userRecitate.data.guardian }}</div>
        </div>
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Asal</div>
          <div class="w-1/2 font-bold">{{ userRecitate.data && userRecitate.data.city }}</div>
        </div>
         <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Kontak Wali</div>
          <div class="w-1/2 font-bold">{{ userRecitate.data && userRecitate.data.guardianPhone }}</div>
        </div>
    </div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3 border-r-2 border-gray-600">Jumlah Surat: <br><div class="text-xl font-bold">{{ recite && recite.data && recite.data.totalSurat }}</div></div>
          <div class="w-1/2 pl-4">Saat ini:<br><div class="text-xl font-bold">{{ recite && recite.data && recite.data.surat }}: {{ recite && recite.data && recite.data.ayat }}</div></div>
        </div>
    </div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3 text-center mx-auto border-r-2 border-gray-600">Sabaq: <br><div class="text-xl font-bold">{{ recitation && recitation.data && recitation.data[0].total }}</div></div>
          <div class="w-1/3 text-center mx-auto border-r-2 border-gray-600">Manzil: <br><div class="text-xl font-bold">{{ recitation && recitation.data && recitation.data[2].total }}</div></div>
          <div class="w-1/3 text-center">Sabaqi: <br><div class="text-xl font-bold">{{ recitation && recitation.data && recitation.data[1].total }}</div></div>
        </div>
    </div>
    <h1 class="text-lg">Riwayat</h1>
    <div class="green-block w-full rounded-md p-2 my-4">
       <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-white text-sm text-left dark:text-gray-400">
            <tbody>
                <tr v-for="(report, idx) in recitereport" :key="idx" class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                        {{ report.surat }}
                    </th>
                    <td class="px-6 py-4 text-right">
                        {{ $dayjs(report.createdDate).format('HH:mm - DD MMM YY') }}
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