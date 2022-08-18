import { createApp } from 'vue'
import { createPinia } from 'pinia';
import dayjs from 'dayjs'
    
import './tailwind.css'
import App from './App.vue'
import { router } from './router'
// import { fakeBackend } from './helpers'

const app = createApp(App)
// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV === "development") {
  // setup fake backend
  // fakeBackend();
  // }

app.use(createPinia());
app.use(router)
app.config.globalProperties.$dayjs = dayjs
app.mount('#app')
