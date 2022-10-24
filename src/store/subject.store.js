import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/store';

const baseUrl = `/api/subjects`;
const baseUrlProgress = `/api/subject-progress`;

export const useSubjectsStore = defineStore({
    id: 'subjects',
    state: () => ({
        subjects: {},
        subject: {}
    }),
    actions: {
        async setSubject(subject) {
            await fetchWrapper.post(`${baseUrl}`, subject);
        },
        async setSubjectProgress(progress) {
            await fetchWrapper.put(`${baseUrlProgress}`,progress)
        },
        async getSubjectStudy() {
            this.subjects = { loading: true };
            try {
                this.subjects = await fetchWrapper.get(`${baseUrl}/type/KAJIAN`);    
            } catch (error) {
                this.subjects = { error };
            }
        },
        async getSubjectLesson() {
            this.subjects = { loading: true };
            try {
                this.subjects = await fetchWrapper.get(`${baseUrl}/type/PELAJARAN`);    
            } catch (error) {
                this.subjects = { error };
            }
        },
        async getSubjectProgressById(id) {
            this.subjects= { loading: true };
            try {
                this.subjects= await fetchWrapper.get(`${baseUrlProgress}/subject/${id}`);
            } catch (error) {
                this.subjects = { error };
            }
        },
        async getById(id) {
            this.subject= { loading: true };
            try {
                this.subject= await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.subject = { error };
            }
        },
        async getByName(name) {
            this.subject= { loading: true };
            try {
                this.subject= await fetchWrapper.get(`${baseUrl}/name/${name}`);
            } catch (error) {
                this.subject = { error };
            }
        },
        async getCountSubject(id) {
            this.subject= { loading: true };
            try {
                this.subject= await fetchWrapper.get(`${baseUrl}/count`);
            } catch (error) {
                this.subject = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}`, params);

            // update stored subj if the logged in subj updated their own record
            // const authStore = useAuthStore();
            // if (id === authStore.user.id) {
            //     // update local storage
            //     const subj = { ...authStore.user, ...params };
            //     localStorage.setItem('usersession', JSON.stringify(subject));

            //     // update auth subj in pinia state
            //     authStore.subject = subject;
            // }
        },
        async delete(id) {
            // add isDeleting prop to subj being deleted
            // this.subjects.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove subj from list after deleted
            this.subjects = this.subjects.filter(x => x.id !== id);

        }
    }
});