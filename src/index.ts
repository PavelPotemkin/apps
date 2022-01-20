import 'assets/scss/main.scss'
import 'material-icons/iconfont/material-icons.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import { store } from '@/store'
import axios from "@/plugins/axios";

const app = createApp(App)

app.directive('focus', {
  mounted(el, binding) {
    console.log(binding.value)
    if (binding.value) {
      el.focus()
    }
  }
})

app.config.globalProperties.$http = axios

app.use(store).use(router).mount('#app')
