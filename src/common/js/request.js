import axios from 'axios'
import {Message} from 'element-ui'
import clientStore from '@/store/client/clientStore'
import manageStore from '@/store/manage/manageStore'
// import { getToken } from '@/utils/auth'

const store = window.APP_ENTRY === 'client' ? clientStore : manageStore

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        /*if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }*/
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非0是抛错 可结合自己业务进行修改
         */
        const res = response.data
        if (res.code === 0) {
            return res.data
        } else {
            Message({
                message: res.message ? res.message : 'error',
                type: 'error',
                duration: 5 * 1000
            })
            // if (res.code === 1001) {
            //     console.log('error')
            //     //需特殊处理事件(1001:非法的token; 1002:其他客户端登录了; 1003:Token 过期了;)
            // }
            return Promise.reject('error')
        }
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    Message({
                        message: '未授权或授权过期，请重新登录',
                        type: 'error',
                        duration: 5 * 1000
                    });
                    store.dispatch('LOGOUT').then(() => {
                        window.location.reload();
                    });
                    break;
                case 400:
                    Message({
                        message: error.response.data.message,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    break;
                case 403:
                    Message({
                        message: '权限不足',
                        type: 'error',
                        duration: 5 * 1000
                    });
                    break;
                case 404:
                    Message({
                        message: '接口地址错误',
                        type: 'error',
                        duration: 5 * 1000
                    });
                    break;
                default:
                    Message({
                        message: '未定义的错误',
                        type: 'error',
                        duration: 5 * 1000
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }
)

export default service
