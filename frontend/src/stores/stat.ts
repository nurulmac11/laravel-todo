import {defineStore} from 'pinia';
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {useAlertStore} from "@/stores/alert";


const baseUrl = `${import.meta.env.VITE_BASE_URL}/stats`;

export const useStatStore = defineStore({
    id: 'stat',
    state: () => {
        return {
            todos : [],
            priorities: {},
            defaultPriority: 1,
            todoCount: 0
        }
    },
    getters: {
        activeTodos: (state) =>
        {
            // @ts-ignore
            return state.todos.filter((todo) => !todo.completed)
        }
    },
    actions: {
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
