<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import surah from '@/assets/data/surah.json'
import { useUsersStore, useRecitationStore, useAlertStore } from '@/store';
import { router } from '@/router';

const usersStore = useUsersStore();
const recitationStore = useRecitationStore();
const alertStore = useAlertStore();
const route = useRoute();
const userid = route.params.id;
const recitationType = route.params.type;

let user = null;
let recitation = null;
// get user data
if (userid) {
    ({ user } = storeToRefs(usersStore));
    ({ recitation } = storeToRefs(recitationStore));
    usersStore.getById(userid);
    recitationStore.getRecitationById(userid);
}

const schema = Yup.object().shape({
    juz: Yup.number()
        .required('Juz harus diisi'),
    ayat: Yup.number()
        .required('Ayat Santri harus diisi'),
});

async function onSubmit(values) {
    try {
        let message;
        await recitationStore.setRecitation(values);
        message = 'Progress';
        await router.push('/list-recitation');
        
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}

defineExpose({
  userid,
  recitationType
})
</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <div class="text-2xl">{{ user && user.data && user.data.name }}</div>
    <div class="">hafalan terakhir: </div>
    <template v-if="!(user?.loading || user?.error)">
      <Form @submit="onSubmit" :validation-schema="schema" :initial-values="recitation" v-slot="{ errors, values }">
        <div class="w-full text-sm mb-5 mt-5">
            <div class="relative mb-2">
                <div class="p-2 text-md">Juz</div>
                <Field name="juz" as="select" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer">
                    <option value="" disabled>Pilih juz</option>
                    <option v-for="(juz, idx) in 30" :key="idx" :value="juz" :selected="value && value.includes(juz)">{{ juz }}</option>
                </Field>
                <label class=" text-red-500 text-sm p-2">{{ errors.juz }}</label>
            </div>

            <div class="relative mb-2">
                <div class="p-2 text-md">Surat</div>
                <Field name="surat" as="select" class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer">
                    <option value="" disabled>Pilih Surat</option>
                    <option v-for="(surat, idx) in surah" :key="idx" :value="surat.name" :selected="value && value.includes(surat.name)">{{ surat.name }}</option>
                </Field>
                <label class=" text-red-500 text-sm p-2">{{ errors.surat }}</label>
            </div>

            <div class="relative mb-6">
                <Field name="ayat" type="number" @update:modelValue="values.ayat = Number(values.ayat)" id="ayat"  class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-200 dark:focus:border-white focus:outline-none focus:ring-0 focus:border-gray-300 peer" placeholder="ayat" />
                <label for="ayat" class="absolute text-sm text-gray-200 dark:text-gray-400 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-transparent dark:bg-gray-20 px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-0 left-1">Ayat</label>
                <label class=" text-red-500 text-sm p-2">{{ errors.ayat }}</label>
            </div>
            <Field name="userid" class="hidden" type="number" :value="Number(userid)" @update:modelValue="values.userid = Number(values.userid)" id="userid"/>
            <Field name="method" type="hidden" :value="recitationType" />
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
