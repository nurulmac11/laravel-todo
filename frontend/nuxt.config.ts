// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=500, initial-scale=1',
            title: 'Nuxtjs todo',
            meta: [
                { name: 'todo app', content: 'My amazing site.' }
            ],
        }
    }
})
