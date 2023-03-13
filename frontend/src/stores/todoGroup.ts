import {defineStore} from 'pinia';
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {useAlertStore} from "@/stores/alert";


const baseUrl = `${import.meta.env.VITE_BASE_URL}/todo-groups`;

export const useTodoGroupStore = defineStore({
    id: 'todo-groups',
    state: () => {
        return {
            todoGroups : [],
            firstTodoId: null,
        }
    },
    actions: {
        async getTodoGroups() {
            try {
                let groups = await fetchWrapper.get(`${baseUrl}`, '');
                this.todoGroups = groups;
                if (groups.length) {
                    this.firstTodoId = groups[0].id;
                }
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async removeTodoGroup(id: number) {
            try {
                await fetchWrapper.delete(`${baseUrl}/${id}`, {
                }).then(() =>{
                    this.getTodoGroups();
                });
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async addTodoGroup(todoGroup: string) {
            try {
                await fetchWrapper.post(`${baseUrl}`, {
                    name: todoGroup,
                }).then((r) => {
                    this.getTodoGroups();
                });
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
    }
});
