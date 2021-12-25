import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index'; //引入vue-router
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
const app = createApp(App);
app.use(router);
app.use(ElementPlus)
app.mount('#app');