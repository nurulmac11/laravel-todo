import {defineStore} from 'pinia';
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {useAlertStore} from "@/stores/alert";


const baseUrl = `${import.meta.env.VITE_BASE_URL}/todos`;

export const useTodoStore = defineStore({
    id: 'todo',
    state: () => {
        return {
            todos : []
        }
    },
    actions: {
        async getTodos() {
            try {
                this.todos = await fetchWrapper.get(`${baseUrl}`, '');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
    }
});
