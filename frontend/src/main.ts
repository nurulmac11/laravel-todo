import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/js/bootstrap.js"
import Alert from './components/Alert.vue';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

// font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faTrash, faPencil, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
// add icons to the library
library.add(faUserSecret, faTrash, faPencil, faFloppyDisk);

const app = createApp(App)

app.component('Alert', Alert)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker);

app.use(createPinia())
app.use(router)

app.mount('#app')

