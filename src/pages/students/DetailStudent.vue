<script setup>
import {ref} from 'vue';
import { ChatIcon, ClipboardIcon } from '@heroicons/vue/solid'
import { useUsersStore, useRecitationStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { router } from '../../router';

const name = ref(null)
// const totalSurat = ref(recite && recite.data && recite.data.totalSurat)
// const surat = ref(recite && recite.data && recite.data.surat)
const usersStore = useUsersStore();
const recitationStore = useRecitationStore();
const route = useRoute();
const userid = route.params.id;
const currentUserData = JSON.parse(localStorage.getItem('usersession'))

const {recite, recitation, recitereport} = storeToRefs(recitationStore);
const { user, currentUser } = storeToRefs(usersStore);

usersStore.getCurrentUserById(currentUserData.userid);
usersStore.getById(userid);

recitationStore.getRecitationProgressByUserId(userid)
recitationStore.getCountRecitationProgressMethodByUserId(userid)
recitationStore.getRecitationReportById(userid)

const onClick = (param) => {
    if(param.src === 'wa') {
      const phone = '085692509990';
      const words = `https://api.whatsapp.com/send/?phone=${phone}?text=Bismillah.%20Alhamdulillah%20${param.name}%20sudah%20menghafal%20${param.total}%20surat.%20Saat%20ini%20sedang%20menghafal%20surat%20${param.surat}%20Selengkapnya%20klik%20di%20sini.%20http://ppatunasmulia.com/report-student/${userid}%0A`
      window.open(words, "_blank" );
    } 
    
    if(param.src === 'report') {
      window.open(`/report-student/${userid}`, "_blank" );
    }

    if(param.src === 'delete') {
      if (confirm('Informasi santri tidak akan dapat dicari jika statusnya non-aktif. Anda ingin menon-aktifkan santri?')) {
        // delete it!
        usersStore.delete(userid)
        window.location.href = '/list-student';
      } 
    }
}

</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <h1 class="text-4xl mb-2">{{ user.data && user.data.name }}</h1>
    <div class="flex w-full">
      <div class="text-xs w-1/2">Terdaftar sejak {{ $dayjs(user.data && user.data.createdDate).format('DD MMMM YYYY') }}</div>
      <router-link v-if=" currentUser && currentUser.data && currentUser.data.role == 'ADMIN'" :to="`/edit-student/${userid}`" class="font-bold text-right w-1/2"> Ubah</router-link>
    </div>
    <div class="green-block w-full rounded-md p-2 my-4">
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Nama Wali</div>
          <div class="w-1/2 font-bold">{{ user.data && user.data.guardian }}</div>
        </div>
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Email/Username</div>
          <div class="w-1/2 font-bold">{{ user.data && user.data.username }}</div>
        </div>
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Tempat, Tgl Lahir</div>
          <div class="w-1/2 font-bold">{{  `${user.data && user.data.birthPlace || ''}, ${user.data && user.data.userBirthDate || ''} ` }} </div>
        </div>
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Telepon</div>
          <div class="w-1/2 font-bold">{{ user.data && user.data.userPhone }} </div>
        </div>
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Alamat</div>
          <div class="w-1/2 font-bold">{{ user.data && user.data.address || '-' }}</div>
        </div>
        <div class="flex text-sm p-2 text-left">
          <div class="w-1/3">Asal kota</div>
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
    <div v-if="recitereport" class="green-block w-full rounded-md p-2 my-4">
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
    <button v-if="false" @click="onClick({
      src: 'wa',
      name: user && user.data && user.data.name || null,
      total: recite.data.totalSurat || null,
      surat: recite.data.surat || null,
    })" class="w-full p-2 rounded-full bg-gray-300 text-black mb-2">
    <ChatIcon class=" text-black w-5 inline-block mr-2"></ChatIcon>Share to whatsapp</button>

    <button @click="onClick({src:'report'})" class="w-full p-2 rounded-full bg-gray-300 text-black">
    <ClipboardIcon class=" text-black w-5 inline-block mr-2"></ClipboardIcon>Link report</button>
    <div class="text-center mt-4 p-4" @click="onClick({src:'delete'})">[ Non-aktifkan ]</div>
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>