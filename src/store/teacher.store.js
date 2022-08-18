import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/store';

const baseUrl = `/api/users`;

export const useTeachersStore = defineStore({
    id: 'teacher',
    state: () => ({
        teachers: {},
        teacher: {}
    }),
    actions: {
        async setTeacher(teacher) {
            await fetchWrapper.post(`${baseUrl}`, teacher);
        },
        async getAll() {
            this.teachers = { loading: true };
            try {
                this.teachers = await fetchWrapper.get(`${baseUrl}/role/TEACHER`);    
            } catch (error) {
                this.teachers = { error };
            }
        },
        async getById(id) {
            this.teacher = { loading: true };
            try {
                this.teacher = await fetchWrapper.get(`${baseUrl}/${id}`);
            } catch (error) {
                this.teacher = { error };
            }
        },
        async update(id, params) {
            await fetchWrapper.put(`${baseUrl}`, params);

            // update stored user if the logged in user updated their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                // update local storage
                const user = { ...authStore.user, ...params };
                localStorage.setItem('user', JSON.stringify(user));

                // update auth user in pinia state
                authStore.user = user;
            }
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.teachers.find(x => x.id === id).isDeleting = true;

            await fetchWrapper.delete(`${baseUrl}/${id}`);

            // remove user from list after deleted
            this.teachers = this.teachers.filter(x => x.id !== id);

            // auto logout if the logged in user deleted their own record
            const authStore = useAuthStore();
            if (id === authStore.user.id) {
                authStore.logout();
            }
        }
    }
});