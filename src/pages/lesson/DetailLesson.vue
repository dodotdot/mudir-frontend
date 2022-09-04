<script setup>
import { ref } from 'vue'
import { useSubjectsStore } from '@/store';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const firstLoad = ref(true)
const subjectStore = useSubjectsStore();
const route = useRoute();
const id = route.params.id;

const { subject, subjects } = storeToRefs(subjectStore);
subjectStore.getById(id);
subjectStore.getSubjectProgressById(id);

async function onSubmit(params) {
    try {
        await subjectStore.setSubjectProgress(params)
    } catch (error) {
        // alertStore.error(error);
    }

};

</script>

<template>
  <div class="p-4 text-white h-1/2 max-w-7xl mx-auto">
    <h1 class="text-xl mb-2">{{ subject.data && subject.data.name }}</h1>
    <div class="w-full text-sm">
      <div class="">Hari ini: {{ $dayjs(new Date()).format('DD MMMM YYYY HH:mm:ss') }}</div>
      <div class="my-2">{{ subject.data && subject.data.book }}</div>
      <div class="">{{ subject.data && subject.data.duration }} jam/pekan</div>
    </div>
    
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full mt-4 text-white text-sm text-left dark:text-gray-400 border-t  dark:border-gray-100">
            <tbody v-if="subjects.data && subjects.data.length">
                <tr v-for="subj in subjects.data" :key="subj.id" class="bg-transparent border-b  dark:border-gray-100">
                    <th scope="row" class="px-6 py-4 font-medium dark:text-white whitespace-nowrap">
                      <div> {{ subj.name }}</div>
                    </th>
                    <td class="px-6 py-4 text-right">
                        <!-- <button  class="block w-full p-2 rounded-md bg-black text-white">sudah</button> -->
                        <SwitchGroup>
                            <div class="flex items-center">
                            <SwitchLabel class="mr-4">{{ subj.presence ? 'Sudah': 'Belum' }}</SwitchLabel>
                            <Switch
                                v-model="subj.presence"
                                :class='subj.presence ? "bg-blue-600" : "bg-gray-200"'
                                :checked="onSubmit({
                                            id: subj.id,
                                            userId: subj.userId,
                                            subjectId: subj.subjectId,
                                            presence: subj.presence
                                        })"
                                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span
                                :class='subj.presence ? "translate-x-6" : "translate-x-1"'
                                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                                />
                            </Switch>
                            </div>
                        </SwitchGroup>

                    </td>
                </tr>
            
            </tbody>
        </table>
      </div>
  </div>
</template>

<style>
.green-block {
  background: #10705B;
}
</style>