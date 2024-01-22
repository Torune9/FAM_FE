import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './service/mainService/pinia'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import Notifications from '@kyvg/vue3-notification'
import Countdown from 'vue3-flip-countdown'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import library from './service/commonService/fontAwesome'

const app = createApp(App)

app.use(pinia)
app.use(library)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(Notifications)
app.use(Countdown)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
