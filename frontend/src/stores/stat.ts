import {defineStore} from 'pinia';
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {useAlertStore} from "@/stores/alert";


const baseUrl = `${import.meta.env.VITE_BASE_URL}/stats`;

export const useStatStore = defineStore({
    id: 'stat',
    state: () => {
        return {
            todoCount: 0,
            groupCounts: {},
            topTen: {},
            top5Group: {},
        }
    },
    getters: {
        // @ts-ignore
        groupLT5 () {
            // @ts-ignore
            return this.groupCounts.filter((user) => user.total < 5)
        },
        // @ts-ignore
        group515 () {
            // @ts-ignore
            return this.groupCounts.filter((user) => user.total > 5 && user.total < 15)
        },
        // @ts-ignore
        groupGT15 () {
            // @ts-ignore
            return this.groupCounts.filter((user) => user.total > 15)
        },
    },
    actions: {
        async init() {
          this.getTopTen();
          this.getTodoCount();
          this.getGroupCounts();
          this.getTop5Group();
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
        async getGroupCounts() {
            try {
                this.groupCounts = await fetchWrapper.get(`${baseUrl}/group-counts`, '');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async getTop5Group() {
            try {
                this.top5Group= await fetchWrapper.get(`${baseUrl}/top5-groups`, '');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },



    }
});
