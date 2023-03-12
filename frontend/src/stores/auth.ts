import { defineStore } from 'pinia';
import {fetchWrapper} from "@/helpers/fetch-wrapper";
import router from "@/router";
import {useAlertStore} from "@/stores/alert";


const baseUrl = `${import.meta.env.VITE_BASE_URL}/auth`;
console.log(baseUrl);
export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        alert: {},
        // user: JSON.parse(localStorage.getItem('user')),
        user: {},
        returnUrl: "",
        accessToken: ""
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const jwt = await fetchWrapper.post(`${baseUrl}/login`, { email: username, password: password });

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('access_token', jwt.access_token);
                this.accessToken = jwt.accessToken;

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error: any) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        logout() {
            this.user = {};
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
});
