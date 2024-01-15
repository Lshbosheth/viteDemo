import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index'; //引入vue-router
import axios from 'axios'
import VueAxios from 'vue-axios'
import { setupStore } from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === "json") {
            return new jsonWorker()
        }
        if (label === "css" || label === "scss" || label === "less") {
            return new cssWorker()
        }
        if (label === "html" || label === "handlebars" || label === "razor") {
            return new htmlWorker()
        }
        if (label === "typescript" || label === "javascript") {
            return new tsWorker()
        }
        return new editorWorker()
    }
}
setupStore(app)
app.use(router);
app.use(VueAxios, axios)
app.use(ElementPlus)
app.mount('#app');
