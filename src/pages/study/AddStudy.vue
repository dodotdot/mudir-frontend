<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useSubjectsStore, useAlertStore } from '@/store';
import { router } from '@/router';

const subjectsStore = useSubjectsStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let status = 'new';
let subject = null;
if (id) {
    // edit mode
    status = 'edit';
    ({ subject } = storeToRefs(subjectsStore));
    subjectsStore.getById(id);
}

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Judul kajian harus diisi'),
    book: Yup.string()
        .required('Judul kitab harus diisi'),
    author: Yup.string()
        .required('Pengarang kitab harus diisi'),
    duration: Yup.number()
        .required('Durasi harus diisi'),
});

async function onSubmit(values) {
    try {
        let message;
        if (subject) {
            await subjectsStore.update(id, values)
            message = 'Kajian updated';
        } else {
            await subjectsStore.setSubject(values);
            message = 'Kajian added';
        }
        await router.push('/list-study');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <template v-if="!(subject?.loading || subject?.error)">
      <Form @submit="onSubmit" :validation-schema="schema" :initial-values=" status === 'new' ? subject : subject.data " v-slot="{ errors, values }">
        <div class="w-full text-sm mb-5">
        
          <div class="relative mb-6">
              <Field name="name" type="text" id="name" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="name" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Judul Kajian</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.name }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="book" type="text" id="book" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="book" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Judul Kitab</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.book }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="author" type="text" id="author"  class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="pengarang-kitab" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Pengarang Kitab</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.author }}</label>
          </div>

          <div class="relative mb-6">
              <Field name="duration" type="number" @update:modelValue="values.duration = Number(values.duration)" id="duration"  class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder=" " />
              <label for="duration" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Durasi (jam)</label>
              <label class=" text-red-500 text-sm p-2">{{ errors.duration }}</label>
          </div>
          <Field name="type" type="hidden" value="KAJIAN"></Field>
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