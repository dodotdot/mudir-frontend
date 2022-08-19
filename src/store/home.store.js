import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `/api`;

export const useHomeStore = defineStore({
    id: 'homes',
    state: () => ({
        users: {},
        subjects: {},
        user: {}
    }),
    actions: {
        async getCountUsers() {
            this.users = { loading: true };
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/count`);    
            } catch (error) {
                this.users = { error };
            }
        },
        async getCountSubjects() {
            this.subjects = { loading: true };
            try {
                this.subjects = await fetchWrapper.get(`${baseUrl}/subjects/count`);    
            } catch (error) {
                this.subjects = { error };
            }
        },
        async getUserById(id) {
            this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/users/${id}`);
            } catch (error) {
                this.user = { error };
            }
        }
    }
});