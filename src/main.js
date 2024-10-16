import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/routes.js";
import store from "@/store.js";

const router = createRouter({
    history : createWebHistory(),
    routes
})

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
