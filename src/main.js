import { createApp } from 'vue'
import App from './App.vue'
// import './assets/scss/custom.scss'; 
import './assets/global.scss'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'



createApp(App).use(bootstrap).mount('#app')
