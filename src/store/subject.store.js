import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/store';

const baseUrl = `/api/subjects`;

export const useSubjectsStore = defineStore({
    id: 'subjects',
    state: () => ({
        subjects: {},
        subj: {}
    }),
    actions: {
        async setSubject(subj) {
            await fetchWrapper.post(`${baseUrl}`, subj);
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
        async getById(id) {
            this.subj= { loading: true };
            try {
                this.subj= await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.subj = { error };
            }
        },
        async getByName(id) {
            this.subj= { loading: true };
            try {
                this.subj= await fetchWrapper.get(`${baseUrl}/name/${id}`);
            } catch (error) {
                this.subj = { error };
            }
        },
        async getCountSubject(id) {
            this.subj= { loading: true };
            try {
                this.subj= await fetchWrapper.get(`${baseUrl}/count`);
            } catch (error) {
                this.subj = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}/${id}`, params);

            // update stored subj if the logged in subj updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const subj = { ...authStore.user, ...params };
                localStorage.setItem('usersession', JSON.stringify(subject));

                // update auth subj in pinia state
                authStore.subj = subject;
            }
        },
        async delete(id) {
            // add isDeleting prop to subj being deleted
            this.subjects.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove subj from list after deleted
            this.subjects = this.subjects.filter(x => x.id !== id);

            // auto logout if the logged in subj deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});