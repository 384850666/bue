/* 客户端入口页 */
import Vue from 'vue'
import Client from './Client.vue'
import router from '@/router/clientRouter'
import store from '@/store/client/clientStore'
import axios from 'axios'
import * as Cookies from 'js-cookie';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'

Vue.use(ElementUI);
Vue.use(VueLazyload);

/* 配置vue原型 */
Vue.prototype.$axios = axios;

/* 调用全局css */
import '@/common/scss/mixin.scss';
import '@/common/scss/style.scss';

Vue.config.productionTip = false

/* 全局守卫 */
router.beforeEach((to, from, next) => {
    let cid = Cookies.getJSON('c_id');
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.meta.whiteListItem) { //白名单
        next();
    } else {
        if (cid) {
            store.dispatch('SET_USER', {
                cid: cid,
                companyName: Cookies.getJSON('c_companyName'),
                codeCard: Cookies.getJSON('c_codeCard'),
                phone: Cookies.getJSON('c_phone')
            });
            next();
        } else {
            Vue.prototype.$message({
                message: '请先登录',
                type: 'info'
            });
            next('/login');
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(Client)
}).$mount('#app')