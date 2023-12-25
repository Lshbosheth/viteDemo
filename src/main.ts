import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index'; //引入vue-router
import axios from 'axios'
import VueAxios from 'vue-axios'
import { setupStore } from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);
setupStore(app)
app.use(router);
app.use(VueAxios, axios)
app.use(ElementPlus)
app.mount('#app');
