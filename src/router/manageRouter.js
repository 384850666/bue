import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/manage/homepage'
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '后台管理-登录',
                whiteListItem: true
            },
            component: () => import('../views/manage/Login.vue')
        },
        {
            path: '/manage',
            name: 'manage',
            component: () => import('../views/manage/layout/Layout.vue'),
            redirect: '/manage/homepage',
            children: [
                {
                    path: 'homepage',
                    name: 'homepage',
                    meta: {
                        title: '后台管理-首页'
                    },
                    component: () => import('../views/manage/homepage/HomePage.vue')
                }
            ]
        },
        {
            path: '/error',
            name: 'error',
            component: () => import('../views/404.vue'),
            meta: {whiteListItem: true}
        },
        {
            path: '*',
            redirect: '/error'
        }
    ],
    linkActiveClass: 'active'
})
