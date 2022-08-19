import { defineStore } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `/api`;

export const useHomeStore = defineStore({
    id: 'homes',
    state: () => ({
        homes: {},
        home: {}
    }),
    actions: {
        async getCountUsers() {
            this.homes = { loading: true };
            try {
                this.homes = await fetchWrapper.get(`${baseUrl}/users/count`);    
            } catch (error) {
                this.homes = { error };
            }
        },
        async getUserById(id) {
            this.home = { loading: true };
            try {
                this.home = await fetchWrapper.get(`${baseUrl}/users/${id}`);
            } catch (error) {
                this.home = { error };
            }
        }
    }
});