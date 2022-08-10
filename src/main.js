import { createApp } from 'vue'
import { createPinia } from 'pinia';

import './tailwind.css'
import App from './App.vue'
import { router } from './routes.js'
import { fakeBackend } from './helpers'

const app = createApp(App)
if (process.env.NODE_ENV === "development") {
  // setup fake backend
  fakeBackend();
}

app.use(createPinia());
app.use(router)
app.mount('#app')
