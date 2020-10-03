import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import carrier from '../components/carrier/carrier.vue'
import unit from '../components/unit/unit.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: 'login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/home/welcome',
        children: [{
                path: '/home/welcome',
                component: Welcome
            },
            {
                path: '/home/users',
                component: Users
            },
            {
                path: '/home/carrier',
                component: carrier
            },
            {
                path: '/home/unit',
                component: unit
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();
    console.info(to.path);
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) return next('/login');
    next();
})

export default router