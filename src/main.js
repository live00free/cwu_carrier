import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":9527"

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.message == 'Network Error') {
            alert('服务器连接失败，请联系管理员确认！');
            window.sessionStorage.clear();
            router.replace({
                path: '/',
                redirect: 'login'
            });
        }
        if (error.response) {
            switch (error.response.status) {
                case 403:
                    // 返回 401 清除token信息并跳转到登录页面
                    alert('登录已过期，请退出系统重新登录！');
                    window.sessionStorage.clear();
                    router.replace({
                        path: '/',
                        redirect: 'login'
                    });
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });

Vue.prototype.$http = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')