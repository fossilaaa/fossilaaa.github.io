import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        meta: {
            title: '欢迎使用Bubble个人博客'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register'),
        meta: {
            title: '欢迎注册Bubble个人博客'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login'),
        meta: {
            title: '欢迎登录Bubble个人博客'
        }
    },
    {
        path: '/addblog',
        name: 'AddBlog',
        component: () => import('../views/AddBlog'),
        meta: {
            requireAuth: true,
            title: '发布博客'
        }
    },
    {
        path: '/blog/:blogId',
        name: 'Blog',
        component: () => import('../views/Blog'),
        meta: {
            title: 'Bubble博客'
        }
    },
    {
        path: '/myinfo',
        name: 'MyInfo',
        component: () => import('../views/MyInfo.vue'),
        meta: {
            requireAuth: true,
            title: '我的信息'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home'),
        meta: {
            requireAuth: true,
            title: '我的主页'
        }
    },
    {
        path: '/search?key',
        name: 'Search',
        component: () => import('../views/Search'),
        meta: {
            title: '搜索'
        }
    },
    {
        path: '/blogsoftag/:tagId',
        name: 'BlogsOfTag',
        component: () => import('../views/BlogsOfTag'),
        meta: {
            title: 'Bubble博客'
        }
    },
    {
        path: '/blogsofauthor/:userId',
        name: 'BlogsOfAuthor',
        component: () => import('../views/BlogsOfAuthor'),
        meta: {
            title: 'Bubble博客'
        }
    },
    {
        path: '/notices',
        name: 'Notices',
        component: () => import('../views/Notices'),
        meta: {
            requireAuth: true,
            title: '我的通知'
        }
    },
    {
        path: '/collections',
        name: 'Collections',
        component: () => import('../views/Collections'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About'),
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
    if (to.meta.title){
        document.title = to.meta.title;
    }
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