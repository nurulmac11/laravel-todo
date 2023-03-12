import {defineStore} from 'pinia';
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import router from "@/router";
import {useAlertStore} from "@/stores/alert";


const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            alert: {},
            user: JSON.parse(localStorage.getItem('user') || "{}"),
            returnUrl: "",
            accessToken: localStorage.getItem('access_token') || "",
        }
    },
    actions: {
        async login(username: string, password: string) {
            try {
                const jwt = await fetchWrapper.post(`${baseUrl}/login`, {email: username, password: password});

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('access_token', jwt.access_token);
                this.accessToken = jwt.access_token;

                const user = await fetchWrapper.get(`${baseUrl}/me`, '');
                localStorage.setItem('user', JSON.stringify(user));
                this.user = user;

                // redirect to previous url or default to home page
                await router.push(this.returnUrl || '/');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async register(name: string, username: string, password: string) {
            try {
                const response = await fetchWrapper.post(`${baseUrl}/register`, {
                    name: name,
                    email: username,
                    password: password
                });
                if (response.status > 300) {
                    throw new Error(response);
                }
                const alertStore = useAlertStore();
                alertStore.success("Successfully registered! You can now login.");
                // redirect to previous url or default to home page
                await router.push(this.returnUrl || '/');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        logout() {
            this.user = {};
            this.accessToken = "";
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            router.push('/login');
        }
    }
});
