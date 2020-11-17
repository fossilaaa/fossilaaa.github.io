import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/addblog',
        name: 'AddBlog',
        component: () => import('../views/AddBlog'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/Blog')
    },
    {
        path: '/myinfo',
        name: 'MyInfo',
        component: () => import('../views/MyInfo.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '*',
        name: 'Other',
        component: () => import('../views/404Error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!localStorage.getItem('user')) {
            alert(to.fullPath);
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    }
    next();
})

export default router