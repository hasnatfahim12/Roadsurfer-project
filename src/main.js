import { createApp, h } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

const app = createApp({
  setup: () => () => h(App)
})
const pinia = createPinia();

app.use(router)
app.use(pinia)
app.mount('#app')
