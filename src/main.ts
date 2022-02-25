import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import '@/router/permission'
import store from './store'

import { globalRegister } from '@/global'

import '@/assets/css/index.scss'
import 'element-plus/dist/index.css'

import SvgIcon from '@/assets/icons/index.js'

const app = createApp(App)
SvgIcon(app)
app.use(globalRegister)
app.use(store).use(router).mount('#app')
