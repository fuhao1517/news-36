import Vue from "vue";
// 路由：1.导入路由构造函数
import VueRouter from "vue-router";
/* 导入vant-ui组件 */
import Vant from 'vant';
// 导入axios
import axios from "axios"

// 导入组件
import App from "@/App";
import Login from "@/pages/Login";



// 在.vue文件中要使用router-link或者router-view.需要注册下插件
Vue.use(VueRouter);
Vue.use(Vant);
/* 把axios挂载到原型 */
Vue.prototype.$axios = axios; //this.$axios
/* 基准路径，以后每次请求都会自动在前面加上该路径 */
axios.defaults.baseURL = "http://localhost:3000";

// 路由：2.创建路由配置
const routes = [{
    path: "/login",
    component: Login
}]

// 路由：3.创建对象
const router = new VueRouter({
    routes
});




new Vue({
    el: "#app",
    // 路由：4.挂载到根实例
    router,

    // 指定一个组件渲染根实例，这个组件可以成为最底层的组件
    render(createElement) {
        // render函数使用固定的写法，只有App是可变；
        return createElement(App);
    }
})