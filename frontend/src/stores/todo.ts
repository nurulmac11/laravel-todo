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
        async removeTodo(id: number) {
        },
        async completeTodo(id: number) {
        },
        async addTodo(todo: string) {
            try {
                this.todos = await fetchWrapper.post(`${baseUrl}`, {
                    name: todo,
                    todo_group_id: 1
                });
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
    }
});
