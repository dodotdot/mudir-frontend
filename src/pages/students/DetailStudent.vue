<script setup>
import {ref} from 'vue';
import { ChatIcon, ClipboardIcon } from '@heroicons/vue/solid'
import { useUsersStore, useRecitationStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const name = ref(null)
// const totalSurat = ref(recite && recite.data && recite.data.totalSurat)
// const surat = ref(recite && recite.data && recite.data.surat)
const usersStore = useUsersStore();
const recitationStore = useRecitationStore();
const route = useRoute();
const userid = route.params.id;

const {recite, recitation, recitereport} = storeToRefs(recitationStore);
const { user } = storeToRefs(usersStore);

usersStore.getById(userid);

recitationStore.getRecitationProgressByUserId(userid)
recitationStore.getCountRecitationProgressMethodByUserId(userid)
recitationStore.getRecitationReportById(userid)

const onClick = (param) => {
    if(param.src === 'wa') {
      const words = `https://wa.me/0811111111?text=Bismillah.%20Alhamdulillah%20${param.name}%20sudah%20menghafal%20${param.total}%20surat.%20Saat%20ini%20sedang%20menghafal%20surat%20${param.surat}%20Selengkapnya%20klik%20di%20sini.%20http://ppatunasmulia.com/report-student/${userid}%0A`
      window.open(words, "_blank" );
    } else {
      navigator.clipboard.writeText(`http://ppatunasmulia.com/report-student/${userid}`)
    }
}

</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <h1 class="text-4xl mb-2">{{ user.data && user.data.name }}</h1>
    <div class="flex w-full">
      <div class="text-xs w-1/2">Terdaftar sejak {{ $dayjs(user.data && user.data.createdDate).format('DD MMMM YYYY') }}</div>
      <router-link v-if=" user && user.data && user.data.role == 'ADMIN'" :to="`/edit-student/${userid}`" class="font-bold text-right w-1/2"> Ubah</router-link>
    </div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Nama Wali</div>
          <div class="w-1/2 font-bold">{{ user.data && user.data.guardian }}</div>
        </div>
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Asal</div>
          <div class="w-1/2 font-bold">{{ user.data && user.data.city }}</div>
        </div>
         <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Kontak Wali</div>
          <div class="w-1/2 font-bold">{{ user.data && user.data.guardianPhone }}</div>
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
    <button v-if="user.data && user.data.name" @click="onClick({
      src: 'wa',
      name: user && user.data && user.data.name || null,
      total: recite.data.totalSurat || null,
      surat: recite.data.surat || null,
    })" class="w-full p-2 rounded-full bg-gray-300 text-black mb-2">
    <ChatIcon class=" text-black w-5 inline-block mr-2"></ChatIcon>Share to whatsapp</button>

    <button @click="onClick({src:'report'})" class="w-full p-2 rounded-full bg-gray-300 text-black">
    <ClipboardIcon class=" text-black w-5 inline-block mr-2"></ClipboardIcon>Copy link report</button>
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>