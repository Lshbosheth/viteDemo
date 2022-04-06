import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index'; //引入vue-router
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App);
app.use(router);
app.use(ElementPlus)
app.use(VueAxios, axios)
app.mount('#app');
