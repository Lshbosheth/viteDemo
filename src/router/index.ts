import {createRouter, createWebHistory} from 'vue-router';
import index from '../views/index.vue'
import socket from '../views/socket.vue'
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        component: index
    },
    {
        path: '/socket',
        component: socket
    }
];

const router = createRouter({
    history: createWebHistory('/'), //替代之前的mode，是必须的
    routes
});
export default router;
