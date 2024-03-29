import {useAuthStore} from "@/stores/auth";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    patch: request('PATCH'),
    delete: request('DELETE')
};

function request(method: any) {
    return (url: string, body: any) => {
        const requestOptions = {
            method,
            headers: authHeader(url),
        };
        // @ts-ignore
        requestOptions.headers['Accept'] = 'application/json';
        if (body) {
            // @ts-ignore
            requestOptions.headers[`Content-Type`] = 'application/json';
            // @ts-ignore
            requestOptions.body = JSON.stringify(body);
        }
        // @ts-ignore
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { accessToken } = useAuthStore();
    const isLoggedIn = !!accessToken;
    const isApiUrl = url.startsWith(import.meta.env.VITE_BASE_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${accessToken}` };
    } else {
        return {};
    }
}

// async function handleResponse(response: {headers: object, json: any, ok: boolean, status: number, data: any, body:any}) {
async function handleResponse(response: any) {
    // @ts-ignore
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : response.text();

    // check for error response
    if (!response.ok) {
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }

    return data;
}
