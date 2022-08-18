<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useTeachersStore, useAlertStore } from '@/store';
import { router } from '@/router';

const teachersStore = useTeachersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let status = 'new';
let teacher = null;
if (id) {
    // edit mode
    status = 'edit';
    ({ teacher } = storeToRefs(teachersStore));
    teachersStore.getById(id);
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
    lastEducation: Yup.string()
        .required('Pendidikan terakhir harus diisi'),
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
                <Field name="lastEducation" type="text" id="lastEducation" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
                <label for="nomor" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Pendidikan terakhir</label>
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