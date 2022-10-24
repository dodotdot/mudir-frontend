<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { parse, isDate } from "date-fns";

import { useUsersStore, useAlertStore } from '@/store';
import { router } from '@/router';

const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let status = 'new';
let user = null;
if (id) {
    // edit mode
    status = 'edit';
    ({ user } = storeToRefs(usersStore));
    usersStore.getById(id);
}

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
  ? originalValue  // this make sure that a value is provided
  : parse(originalValue, "dd-MM-yyyy", new Date());

  return parsedDate;
}

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Nama harus diisi'),
    username: Yup.string()
        .required('Email/username harus diisi'),
    birthPlace: Yup.string()
        .required('Tempat Lahir harus diisi'),
    userBirthDate: Yup.date()
        .transform(parseDateString)
        .max(new Date(), "Cannot use future date")
        .required("Required"),
    userPhone: Yup.string()
        .required('Telephone Santri harus diisi'),
    guardian: Yup.string()
        .required('Nama Wali harus diisi'),
    guardianPhone: Yup.string()
        .required('Kontak Wali harus diisi'),
    address: Yup.string()
        .required('Alamat asal harus diisi'),
    city: Yup.string()
        .required('Kota asal harus diisi')
});

async function onSubmit(values) {
    try {
        let message;
        if (user) {
            await usersStore.update(id, values)
            message = 'User updated';
            await router.push('/detail-student/'+id);
        } else {
            await usersStore.setUser(values);
            message = 'User added';
            await router.push('/list-student');
        }
        
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <template v-if="!(user?.loading || user?.error)">
      <Form @submit="onSubmit" :validation-schema="schema" :initial-values=" status === 'new' ? user : user.data " v-slot="{ errors, isSubmitting }">
        <div class="w-full text-sm mb-5">
        
          <div class="relative mb-6">
              <Field name="name" type="text" id="name" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="name" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Nama Santri</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.name }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="username" type="text" id="username" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="username" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Email/Username Santri</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.username }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="birthPlace" type="text" id="birthPlace" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="birthPlace" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Tempat Lahir Santri</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.birthPlace }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="userBirthDate" type="text" id="userBirthDate" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <div class="flex absolute inset-y-0 right-0 items-center pr-4 pb-4 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              </div>
              <label for="userBirthDate" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Tanggal Lahir Santri (ex: 31-12-2000)</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.userBirthDate }}</label>
          </div>


          <div class="relative mb-6">
              <Field name="userPhone" type="text" id="userPhone" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="userPhone" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Telepon Santri</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.userPhone }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="guardian" type="text" id="guardian" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="guardian" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Nama Wali</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.guardian }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="guardianPhone" type="text" id="guardianPhone" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="guardianPhone" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Kontak Wali</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.guardianPhone }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="address" type="text" id="address" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" "/>
              <label for="address" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Alamat (asal)</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.address }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="city" type="text" id="city" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" "/>
              <label for="city" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Kota (asal)</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.city }}</label>
          </div>
          <Field name="role" type="hidden" value="STUDENT"></Field>
        </div>
        <button class="w-full p-2 rounded-full bg-gray-300 text-black">Submit </button>
      </Form>
    </template>
    <template v-if="user?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="user?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading user: {{user.error}}</div>
        </div>
    </template>  
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>
