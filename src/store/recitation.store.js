import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/store';

const baseUrl = `/api/quran-progress`;

export const useRecitationStore = defineStore({
    id: 'recitation',
    state: () => ({
        recitation: {},
        recite: {},
        recitereport: {}
    }),
    actions: {
        async setRecitation(subject) {
            await fetchWrapper.put(`${baseUrl}`, subject);
        },
        async getRecitationProgress(id) {
            this.recitation= { loading: true };
            try {
                this.recitation= await fetchWrapper.get(`${baseUrl}/user/progress`);
            } catch (error) {
                this.recitation = { error };
            }
        },
        async getRecitationById(id) {
            this.recite= { loading: true };
            try {
                this.recite= await fetchWrapper.get(`${baseUrl}/user/${id}/progress`);
            } catch (error) {
                this.recite = { error };
            }
        },
        // /api/quran-progress/user/:userId/report
        async getRecitationReportById(userid) {
            this.recitereport= { loading: true };
            try {
                this.recitereport = await fetchWrapper.get(`${baseUrl}/user/${userid}/report`);
                this.recitereport = this.recitereport.data
                this.recitereport = this.recitereport.filter(x => x.surat !== undefined)
            } catch (error) {
                this.recitereport = { error };
            }
        },
        // /api/quran-progress/user/:userId/progress/report
        async getRecitationProgressByUserId(userid) {
            this.recite= { loading: true };
            try {
                this.recite= await fetchWrapper.get(`${baseUrl}/user/${userid}/progress/report`);
            } catch (error) {
                this.recite = { error };
            }
        },
        // /api/quran-progress/user/name/:nama/progress
        async getRecitationProgressByUserName(name) {
            this.recitation= { loading: true };
            try {
                this.recitation= await fetchWrapper.get(`${baseUrl}/user/name/${name}/progress`);
            } catch (error) {
                this.recitation = { error };
            }
        },
        // /api/quran-progress/user/:userId/method/count/report
        async getCountRecitationProgressMethodByUserId(userid) {
            this.recitation= { loading: true };
            try {
                this.recitation= await fetchWrapper.get(`${baseUrl}/user/${userid}/method/count/report`);
            } catch (error) {
                this.recitation = { error };
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
        async getRecitationByUseridMethod(id, method) {
            this.recite= { loading: true };
            try {
                this.recite= await fetchWrapper.get(`${baseUrl}/user/${id}/method/${method}`);
            } catch (error) {
                this.recite = { error };
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