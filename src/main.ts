import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import '@/router/permission'
import store from './store'
import { setupStore } from './store'

import { globalRegister } from '@/global'

import 'animate.css'
import 'normalize.css'
import '@/assets/css/index.scss'
import 'element-plus/dist/index.css'

// import 'tailwindcss/tailwind.css'

import SvgIcon from '@/assets/icons/index.js'
import i18n from '@/i18n'

const app = createApp(App)
SvgIcon(app)
app.use(globalRegister)
app.use(i18n)
app.use(store)
app.use(router)
setupStore()
app.mount('#app')
