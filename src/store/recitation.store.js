import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/store';

const baseUrl = `/api/quran-progress`;

export const useRecitationStore = defineStore({
    id: 'recitation',
    state: () => ({
        recitation: {},
        recite: {}
    }),
    actions: {
        async setRecitation(subject) {
            await fetchWrapper.post(`${baseUrl}`, subject);
        },
        async getRecitationById(id) {
            this.recite= { loading: true };
            try {
                this.recite= await fetchWrapper.get(`${baseUrl}/user/${id}/progress`);
            } catch (error) {
                this.recite = { error };
            }
        },
        async getRecitationByUseridMethod(id, method) {
            this.recite= { loading: true };
            try {
                this.recite= await fetchWrapper.get(`${baseUrl}/user/${id}/method/${method}`);
            } catch (error) {
                this.recite = { error };
            }
        },
        async getRecitationByMethods(method) {
            this.recitation= { loading: true };
            try {
                this.recitation= await fetchWrapper.get(`${baseUrl}/method/${method}`);
            } catch (error) {
                this.recitation = { error };
            }
        },
        async getCountProgress(id) {
            this.subject= { loading: true };
            try {
                this.subject= await fetchWrapper.get(`${baseUrl}/user/${id}/method/count`);
            } catch (error) {
                this.subject = { error };
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
                authStore.subject = subject;
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