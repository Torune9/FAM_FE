import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './store'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const app = createApp(App)

app.use(pinia)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable);

app.mount('#app')
