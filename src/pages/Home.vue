<script setup>
import { ref } from 'vue';
import { useAuthStore, useHomeStore } from '@/store';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const homeStore = useHomeStore();
const userdata = JSON.parse(localStorage.getItem('usersession'))

const { users, subjects, user } = storeToRefs(homeStore);
homeStore.getUserById(userdata.userid);
homeStore.getCountUsers()
homeStore.getCountSubjects()

const listMenu = ref([
    {
      title: 'Kitab Muqorror KBM Semester Ganjil',
      link: '/list-lesson'
    },
    {
      title: 'Kitab Muqorror Kajian',
      link: '/list-study'
    },
    {
      title: 'Halaqoh Tahfidz',
      link: '/list-recitation'
    }
  ])

</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <div class="flex mx-auto mb-5">
      <div class="w-full">
        <p class="text-md">Assalamu’alaikum</p>
        <h1 class="text-4xl mb-10">{{  user && user.data && user.data.name || "user" }}</h1>
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
        <router-link to="/list-teacher" v-if=" user && user.data && user.data.role == 'ADMIN'" class="block rounded-md text-center bg-white w-2/5 p-2 mx-2"> 
          Ustadz
          <br>
          <strong class="text-2xl">{{  users && users.data && users.data.filter(a => a.role == 'TEACHER')[0].total }}</strong>
        </router-link>
    </div>
     <div class="flex text-black mx-auto" v-if=" user && user.data && user.data.role == 'ADMIN'">
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
    <div v-for="(list, idx) in listMenu" :key="idx"  class="green-block w-full p-2 my-4">
        <router-link :to="list.link" class="flex w-full text-sm p-2">
          <div class="w-3/4 text-left uppercase">{{ list.title }}</div>
        </router-link>       
    </div>
    <div class="green-block w-full p-2 my-4">
      <table class="w-full text-left border-collapse">
        <tbody>
          <tr class="border-b border-white p-4">
            <td class="p-4">Sabaq</td>
            <td class="p-4">05:15 - 06:10</td>
          </tr>
          <tr class="border-b border-white p-4">
            <td class="p-4">Manzil</td>
            <td class="p-4">07:30 - 08:20</td>
          </tr>
          <tr class="border-b border-white p-4">
            <td class="p-4">Sabaqi</td>
            <td class="p-4">12:25 - 12:55</td>
          </tr>
          <tr class="border-b border-white p-4">
            <td class="p-4">Muqoror</td>
            <td class="p-4">Ba’da Maghrib</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
