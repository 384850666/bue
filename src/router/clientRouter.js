import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/client/homepage'
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '客户端-用户登录',
                whiteListItem: true
            },
            component: () => import('../views/client/Login')
        },
        {
            path: '/client',
            name: 'client',
            component: () => import('../views/client/layout/Layout'),
            redirect: '/client/homepage',
            props: {appType: 'client'},
            children: [
                {
                    path: 'homepage',
                    name: 'homepage',
                    meta: {
                        title: '客户端-首页',
                        entry: 'client'
                    },
                    component: () => import('../views/client/homepage/HomePage')
                },
                {
                    path: 'bue-crud',
                    name: 'bue-crud',
                    meta: {
                        title: 'BueCrud'
                    },
                    component: () => import('../views/client/bue-crud/bue-crud')
                },
                {
                    path: 'bue-table',
                    name: 'bue-table',
                    meta: {
                        title: 'BueTable'
                    },
                    component: () => import('../views/client/bue-table/bue-table')
                },
                {
                    path: 'bue-form',
                    name: 'bue-form',
                    meta: {
                        title: 'BueForm'
                    },
                    component: () => import('../views/client/bue-form/bue-form'),
                    redirect: '/client/bue-form/bue-form-item',
                    children: [
                        {
                            path: 'bue-form-item',
                            name: 'bue-form-item',
                            meta: {
                                title: 'BueFormItem'
                            },
                            component: () => import('../views/client/bue-form/bue-form-item')
                        },
                        {
                            path: 'bue-select',
                            name: 'bue-select',
                            meta: {
                                title: 'BueSelect'
                            },
                            component: () => import('../views/client/bue-form/bue-select')
                        },
                        {
                            path: 'bue-img-upload',
                            name: 'bue-img-upload',
                            meta: {
                                title: 'BueImgUpload'
                            },
                            component: () => import('../views/client/bue-form/bue-img-upload')
                        },
                        {
                            path: 'bue-code',
                            name: 'bue-code',
                            meta: {
                                title: 'BueCode'
                            },
                            component: () => import('../views/client/bue-form/bue-code')
                        },
                        {
                            path: 'bue-rich-editor',
                            name: 'bue-rich-editor',
                            meta: {
                                title: 'bueRichEditor'
                            },
                            component: () => import('../views/client/bue-form/bue-rich-editor')
                        }
                    ]
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
