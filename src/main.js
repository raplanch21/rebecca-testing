import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import HighchartsVue from 'highcharts-vue'

pendo.initialize({
  visitor: {
    id: ''
  }
});

const app = createApp(App)
app.use(router)
app.use(HighchartsVue)
app.mount('#app')



