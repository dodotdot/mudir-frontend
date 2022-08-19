<script setup>
import { storeToRefs } from 'pinia';
import { useSubjectsStore } from '@/store';

const subjectsStore = useSubjectsStore();
const { subjects } = storeToRefs(subjectsStore);

subjectsStore.getSubjectLesson();
</script>


<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <div class="flex w-full text-sm mb-5">
      <div class=" w-3/4 text-left">Mata Pelajaran ({{ subjects.data && subjects.data.length }})</div>
      <router-link to="/add-lesson" class="w-1/4 font-bold text-right">+ Tambah</router-link>

    </div>
     <div v-for="subj in subjects.data" :key="subj.id"  class="green-block w-full p-2 my-4">
        <div class="flex w-full text-sm p-2">
          <div class="w-3/4 text-left uppercase">{{ subj.name }}</div>
          <div class="w-1/4  text-right text-xs">{{ subj.duration }} Jam</div>
        </div>
        <p class="text-xs p-2">{{ subj.book }} karya {{ subj.author }}</p>
    </div>
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>