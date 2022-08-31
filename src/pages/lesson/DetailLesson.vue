<script setup>
import { useSubjectsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const subjectStore = useSubjectsStore();
const route = useRoute();
const id = route.params.id;

const { subject } = storeToRefs(subjectStore);
subjectStore.getById(id);
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <h1 class="text-xl mb-2">{{ subject.data && subject.data.name }}</h1>
    <div class="w-full text-sm">
      <div class="">Hari ini: {{ $dayjs(new Date()).format('DD MMMM YYYY HH:mm:ss') }}</div>
      <div class="my-2">{{ subject.data && subject.data.book }}</div>
      <div class="">{{ subject.data && subject.data.duration }} jam/pekan</div>
    </div>
    
    <h1 class="mt-4 text-lg">Jadwal</h1>
    
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>