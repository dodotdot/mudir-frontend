<script setup>
    import { HomeIcon, ArrowLeftIcon } from '@heroicons/vue/solid'

</script>
<template>
    <header class="shadow" v-if="true" >
      <nav class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex pt-2">
         <div class="w-8 pt-4">
            <a @click="$router.go(-1)"><ArrowLeftIcon class="text-white"></ArrowLeftIcon></a>
         </div>
         <div class="w-full">
            <!-- <img class="w-24 mx-auto" src="@/assets/images/logo.png"> -->
           <div class=" pt-4 text-center text-white"> {{ $route.meta.title }} </div>
         </div>
         <div class="w-8 pt-4">
            <router-link to="/home"><HomeIcon class="text-white"></HomeIcon> </router-link>     
         </div>
      </nav>
    </header>
</template>