import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/store';

const baseUrl = `/api/subjects`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        subjects: {},
        subj: {}
    }),
    actions: {
        async setSubject(subj) {
            await fetchWrapper.post(`${baseUrl}`, subj);
        },
        async getAll() {
            this.users = { loading: true };
            try {
                this.users = await fetchWrapper.get(`${baseUrl}`);    
            } catch (error) {
                this.users = { error };
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
        async getByType(id) {
            this.subj= { loading: true };
            try {
                this.subj= await fetchWrapper.get(`${baseUrl}/type/${id}`);
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
                localStorage.setItem('user', JSON.stringify(user));

                // update auth subj in pinia state
                authStore.subj = user;
            }
        },
        async delete(id) {
            // add isDeleting prop to subj being deleted
            this.users.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove subj from list after deleted
            this.users = this.users.filter(x => x.id !== id);

            // auto logout if the logged in subj deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});