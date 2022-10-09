<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/store/auth.store';

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const { username, password } = values;
    await authStore.login(username, password);
}
</script>

<template>
  <div class="login relative">
   
    <div
      class=" mx-auto max-w-sm min-h-screen px-4 py-12 sm:px-6 items-center justify-between"
    >
    <div class="w-full">
          <img class="w-24 mx-auto" src="@/assets/images/logo-black.png">
    </div>
      <div class="bg-black w-auto absolute bottom-8 p-4 opacity-75 rounded-lg text-center">
        <h2
        class="leading-9 tracking-tight text-white text-lg"
        >
          Assalamu’alaikum
          <br />
          <span class="text-sm p-2">Ahlan, selamat datang kembali. Silakan masuk.</span>
        </h2>
        <div class="mt-12 lg:mt-0">
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="mb-6">
              <Field type="email" name="username" :class="{ 'is-invalid': errors.username }"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required/>
              <div class=" text-red-500 text-sm p-2">{{ errors.username }}</div>
            </div>
            <div class="mb-6">
              <Field type="password" name="password"  :class="{ 'is-invalid': errors.password }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required/>
              <div class=" text-red-500 text-sm p-2">{{ errors.password }}</div>
            </div>
            <button type="submit" class="block w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" :disabled="isSubmitting">Masuk</button>
          </Form>
         
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