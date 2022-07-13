import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { makeServer } from "./api/mockserver"

const app = createApp(App)
if (import.meta.env.mode === "development") {
  console.log('devvv')
  makeServer()
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.mount('#app')
