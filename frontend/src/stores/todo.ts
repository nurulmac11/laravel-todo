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
            try {
                await fetchWrapper.delete(`${baseUrl}/${id}`, {
                }).then(() =>{
                    this.getTodos();
                });
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async completeTodo(id: number) {
            try {
                await fetchWrapper.patch(`${baseUrl}/${id}`, {
                    completed: true
                }).then(() => {
                    this.getTodos();
                });
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async incompleteTodo(id: number) {
            try {
                await fetchWrapper.patch(`${baseUrl}/${id}`, {
                    completed: false
                }).then(() =>{
                    this.getTodos();
                });
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async addTodo(todo: string) {
            try {
                await fetchWrapper.post(`${baseUrl}`, {
                    name: todo,
                    todo_group_id: 1
                }).then((r) => {
                    this.getTodos();
                });
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
    }
});
