<script setup>
import { useAuthStore, useHomeStore } from '@/store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const homeStore = useHomeStore();
const userdata = JSON.parse(localStorage.getItem('usersession'))

const { users, subjects, user } = storeToRefs(homeStore);
homeStore.getUserById(userdata.userid);
homeStore.getCountUsers()
homeStore.getCountSubjects()

</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <div class="flex mx-auto mb-5">
      <div class="w-full">
        <p class="text-md">Assalamu’alaikum</p>
        <h1 class="text-4xl mb-10">{{  user && user.data && users.data.name && "admin" }}</h1>
      </div>
      <div class="w-full text-right">
        <a @click="authStore.logout()" class="cursor-pointer text-right">logout</a>
      </div>
    </div>
    <div class="flex text-black mx-auto mb-5">
        <router-link to="/list-student" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Santri
          <br>
          <strong class="text-2xl">{{  users && users.data && users.data.filter(a => a.role == 'STUDENT')[0].total }}</strong>
        </router-link>
        <router-link to="/list-teacher" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Ustadz
          <br>
          <strong class="text-2xl">{{  users && users.data && users.data.filter(a => a.role == 'TEACHER')[0].total }}</strong>
        </router-link>
    </div>
     <div class="flex text-black mx-auto">
        <router-link to="/list-lesson" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Pelajaran
          <br>
          <strong class="text-2xl">{{  subjects && subjects.data && subjects.data.filter(a => a.type == 'PELAJARAN')[0].total }}</strong>
         </router-link>
        <router-link to="/list-study" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Kajian
          <br>
          <strong class="text-2xl">{{  subjects && subjects.data && subjects.data.filter(a => a.type == 'KAJIAN')[0].total }}</strong>
        </router-link>
    </div>
  </div>
</template>
