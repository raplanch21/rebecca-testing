import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import HighchartsVue from 'highcharts-vue'

function getVisitorId() {
  let id = localStorage.getItem('_anon_vid');
  if (!id) {
    id = 'anon-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('_anon_vid', id);
  }
  return id;
}

pendo.initialize({
  visitor: {
    id: getVisitorId()
  }
});

const app = createApp(App)
app.use(router)
app.use(HighchartsVue)
app.mount('#app')



