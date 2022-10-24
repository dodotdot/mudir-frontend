<script setup>
import { storeToRefs } from 'pinia';
import { useUsersStore, useSubjectsStore } from '@/store';
import { router } from '@/router';

const userdata = JSON.parse(localStorage.getItem('usersession'))
const subjectsStore = useSubjectsStore();
const usersStore = useUsersStore();
const { subjects } = storeToRefs(subjectsStore);
const { user } = storeToRefs(usersStore)

usersStore.getById(userdata.userid);
subjectsStore.getSubjectStudy();


const onClick = (param, id) => {
  if(param == 'edit') {
    router.push(`/edit-study/${id}`)
  }
  if(param == 'remove') {
    if (confirm('Informasi Kajian tidak akan dapat dicari jika statusnya non-aktif. Anda ingin menon-aktifkan kajian?')) {
      // delete it!
      subjectsStore.delete(id)
      window.location.href = '/list-study';
    }
  }
}
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <div class="flex w-full text-sm mb-5">
      <div class=" w-3/4 text-left">Kajian: {{ subjects.data && subjects.data.length }}</div>
      <router-link v-if=" user && user.data && user.data.role == 'ADMIN'" to="/add-study" class="w-1/4 font-bold text-right">+ Tambah</router-link>

    </div>
    <div v-for="subj in subjects.data" :key="subj.id"  class="green-block w-full p-2 my-4">
        <router-link :to="`/detail-study/${subj.id}`">
          <div class="flex w-full text-sm p-2">
            <div class="w-3/4 text-left uppercase">{{ subj.name }}</div>
            <div class="w-1/4  text-right text-xs">{{ subj.duration }} Jam</div>
          </div>
          <p class="text-xs p-2">{{ subj.book }} karya {{ subj.author }}</p>
        </router-link>
        <div v-if=" user && user.data && user.data.role == 'ADMIN'" class="w-full flex text-right p-2 font-bold text-xs"> 
          <div class="w-3/4"  @click="onClick('edit',subj.id)"> ubah</div>
          <div class="w-1/4 float-right " @click="onClick('remove',subj.id)">hapus</div>
        </div>
    </div>

  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>