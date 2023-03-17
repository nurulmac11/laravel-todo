import {defineStore} from 'pinia';
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {useAlertStore} from "@/stores/alert";


const baseUrl = `${import.meta.env.VITE_BASE_URL}/stats`;

export const useStatStore = defineStore({
    id: 'stat',
    state: () => {
        return {
            todoCount: 0,
            topTen: {}
        }
    },
    getters: {
    },
    actions: {
        async init() {
          this.getTopTen();
          this.getTodoCount();
        },
        async getTopTen() {
            try {
                this.topTen = await fetchWrapper.get(`${baseUrl}/top-ten`, '');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async getTodoCount() {
            try {
                this.todoCount = await fetchWrapper.get(`${baseUrl}/todo`, '');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },



    }
});
