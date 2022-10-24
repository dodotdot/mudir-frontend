<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import {ref} from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { parse, isDate } from "date-fns";

import { useTeachersStore, useAlertStore } from '@/store';
import { router } from '@/router';

const teachersStore = useTeachersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;
const listEdu = ref(['SMA','S1', 'S2', 'S3', 'Lainnya'])

let status = 'new';
let teacher = null;
if (id) {
    // edit mode
    status = 'edit';
    ({ teacher } = storeToRefs(teachersStore));
    teachersStore.getById(id);
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
    password: Yup.string()
        .transform(x => x === '' ? undefined : x)
        // password optional in edit mode
        .concat(teacher ? null : Yup.string().required('Password harus diisi'))
        .min(6, 'Password minimal 6 karakter'),
    birthPlace: Yup.string()
        .required('Tempat Lahir harus diisi'),
    userBirthDate: Yup.date()
        .transform(parseDateString)
        .max(new Date(), "Cannot use future date")
        .required("Required"),
    address: Yup.string()
        .required('Alamat harus diisi'),
    city: Yup.string()
        .required('Kota asal harus diisi'),
    education: Yup.string()
        .required('Pendidikan terakhir harus diisi'),    
    lastEducation: Yup.string()
        .required('Keterangan pendidikan harus diisi'),
    userPhone: Yup.string()
        .required('Telephone harus diisi'),
});

async function onSubmit(values) {
  console.log(values)
    try {
        let message;
        if (teacher) {
            await teachersStore.update(id, values)
            message = 'Teacher updated';
            await router.push('/detail-teacher/'+id);
        } else {
            await teachersStore.setTeacher(values);
            message = 'Teacher added';
            await router.push('/list-teacher');
        }
        
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
  <template v-if="!(teacher?.loading || teacher?.error)">
    <Form @submit="onSubmit" :validation-schema="schema" :initial-values=" status === 'new' ? teacher : teacher.data " v-slot="{ errors, isSubmitting }">
      <div class="w-full text-sm mb-5">
            <div class="relative mb-6">
                <Field name="name" type="text" id="name" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label for="name" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Nama Ustadz</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.name }}</label>
            </div>

            <div class="relative mb-6">
                <Field name="username" type="text" id="username" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label for="username" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Email/Username Ustadz</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.username }}</label>
            </div>

            <div class="relative mb-6">
                <Field name="password" type="password" id="password" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label for="password" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Password</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.username }}</label>
            </div>
            <div class="relative mb-6">
                <Field name="birthPlace" type="text" id="birthPlace" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label for="birthPlace" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Tempat Lahir Ustadz</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.birthPlace }}</label>
            </div>

            <div class="relative mb-6">
                <Field name="userBirthDate" type="text" id="userBirthDate" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <div class="flex absolute inset-y-0 right-0 items-center pr-4 pb-4 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                </div>
                <label for="userBirthDate" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Tanggal Lahir Ustadz (ex: 31-12-2000)</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.userBirthDate }}</label>
            </div>

            <div class="relative mb-6">
                <Field name="address" type="text" id="address" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label for="address" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Alamat</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.address }}</label>
            </div>
            <div class="relative mb-6">
              <Field name="city" type="text" id="city" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" "/>
              <label for="city" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Kota (asal)</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.city }}</label>
          </div>
            <div class="relative mb-6">
                <Field name="education" as="select" id="education" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer">
                    <option v-for="(edu, idx) in listEdu" :key="idx" :value="edu"> {{ edu }}</option>
                </Field>
                <div class="flex absolute inset-y-0 right-0 items-center pr-4 pb-4 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <label for="education" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Pendidikan terakhir</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.education }}</label>
            </div>
            <div class="relative mb-6">
                <Field name="lastEducation" type="text" id="lastEducation" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label for="lastEducation" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Pendidikan terakhir</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.lastEducation }}</label>
            </div>
            <div class="relative mb-6">
                <Field name="userPhone" type="text" id="userPhone" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label for="userPhone" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Nomor kontak</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.userPhone }}</label>
            </div>
            <Field name="role" type="hidden" value="TEACHER"></Field>
      </div>
      <button class="w-full p-2 rounded-full bg-gray-300 text-black">Submit </button>
    </Form>
  </template>  
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>