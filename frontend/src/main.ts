import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/js/bootstrap.js"
import Alert from './components/Alert.vue';

const app = createApp(App)

app.component('Alert', Alert)

app.use(createPinia())
app.use(router)

app.mount('#app')

