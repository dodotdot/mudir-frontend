<script setup>
import ButtonRepo from '@/components/ButtonRepo.vue'
import { ref, onMounted } from 'vue'




</script>

<template>
  <div class="login relative">
    <div
      class=" mx-auto max-w-sm min-h-screen px-4 py-12 sm:px-6 items-center justify-between"
    >
      <div class="bg-black w-auto absolute bottom-8 p-4 opacity-75 rounded-lg text-center">
        <h2
        class="leading-9 tracking-tight text-white text-lg"
        >
          Assalamu’alaikum
          <br />
          <span class="text-sm p-2">Ahlan, selamat datang kembali. Silakan masuk.</span>
        </h2>
        <div class="mt-12 lg:mt-0">
          <form>
            <div class="mb-6">
              <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required>
            </div>
            <div class="mb-6">
              <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required>
            </div>
            <button @click="$router.push('/home')" type="button" class="block w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Masuk</button>
          </form>
         
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.login {
  background: url('../assets/images/bg-login.png') no-repeat center;
}
</style>