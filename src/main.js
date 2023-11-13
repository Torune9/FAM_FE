import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './service'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import Notifications from '@kyvg/vue3-notification'
import Countdown from 'vue3-flip-countdown'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(Notifications)
app.use(Countdown)

app.mount('#app')
