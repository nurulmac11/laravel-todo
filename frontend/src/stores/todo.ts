import {defineStore} from 'pinia';
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {useAlertStore} from "@/stores/alert";


const baseUrl = `${import.meta.env.VITE_BASE_URL}/todos`;

export const useTodoStore = defineStore({
    id: 'todo',
    state: () => {
        return {
            todos : [],
            priorities: {},
            defaultPriority: 1,
            filters: {
                completed: true,
                priority: 0,
                group: null
            }
        }
    },
    getters: {
        filteredTodos: (state) => {
            const filters = state.filters;
            let f1 = state.todos;
            if (!filters) {
                return f1;
            }
            if (filters.completed) {
                // @ts-ignore
                f1 = f1.filter((todo) => !todo.completed)
            }
            if (filters.priority > 0) {
                // @ts-ignore
                f1 = f1.filter((todo) => todo.priority == filters.priority)
            }
            if (filters.group > 0) {
                // @ts-ignore
                f1 = f1.filter((todo) => todo.todo_group_id == filters.group)
            }
            return f1;
        },
        activeTodos: (state) =>
        {
            // @ts-ignore
            return state.todos.filter((todo) => !todo.completed)
        }
    },
    actions: {
        addFilter(filter: string, val: any) {
            // @ts-ignore
            this.filters[filter] = val;
        },
        async getTodos() {
            try {
                this.todos = await fetchWrapper.get(`${baseUrl}`, '');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async getPriorities() {
            try {
                const p = await fetchWrapper.get(`${baseUrl}/priorities`, '');
                this.priorities = JSON.parse(p);
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
        async addTodo(todo: string, todoGroupId: number, priority: number, date: any) {
            try {
                await fetchWrapper.post(`${baseUrl}`, {
                    name: todo,
                    todo_group_id: todoGroupId,
                    priority: priority,
                    due_date: date
                }).then((r) => {
                    this.getTodos();
                });
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },

        async updateTodo(todoId: number, todo: string, todoGroupId: number, priority: number, date: any) {
            try {
                await fetchWrapper.put(`${baseUrl}/${todoId}`, {
                    id: todoId,
                    name: todo,
                    todo_group_id: todoGroupId,
                    priority: priority,
                    due_date: date
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
