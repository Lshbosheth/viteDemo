import {createRouter, createWebHistory} from 'vue-router';
import index from '../views/index.vue'
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: index
    }
];

const router = createRouter({
    history: createWebHistory('/'), //替代之前的mode，是必须的
    routes
});
export default router;
