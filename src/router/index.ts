import {createRouter, createWebHistory} from 'vue-router';
import index from '../views/index.vue'
import socket from '../views/socket.vue'
import unocss from '../views/unocss.vue'
import mqtt from '../views/mqtt.vue'
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
    },
    {
        path: '/unocss',
        component: unocss
    },
    {
        path: '/mqtt',
        component: mqtt
    }
];

const router = createRouter({
    history: createWebHistory('/'), //替代之前的mode，是必须的
    routes
});
export default router;
