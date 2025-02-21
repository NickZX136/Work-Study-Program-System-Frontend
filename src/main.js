import '../../../../../Grade 3 last/软件设计与体系结构/用MVC架构来迭代个人图书管理系统的类模型/vue/src/assets/main.scss'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@/router'
import {createPinia} from "pinia";
import {createPersistedState} from "pinia-persistedstate-plugin";

import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
const persist = createPersistedState();
pinia.use(persist)
app.use(pinia)
app.use(router)
app.use(ElementPlus);
app.mount('#app')
