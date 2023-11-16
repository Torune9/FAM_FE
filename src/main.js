import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './service'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import Notifications from '@kyvg/vue3-notification'
import Countdown from 'vue3-flip-countdown'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'

const app = createApp(App)
library.add(faEye,faEyeSlash,faSquareCheck)

app.use(pinia)
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(Notifications)
app.use(Countdown)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
