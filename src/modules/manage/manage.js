/* 后台管理入口页 */
import Vue from 'vue'
import Manage from './Manage.vue'
import router from '@/router/manageRouter'
import store from '@/store/manage/manageStore'
import * as Cookies from "js-cookie";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

/* 调用全局css */
import '@/common/scss/mixin.scss';
import '@/common/scss/style.scss';

Vue.config.productionTip = false

/* 全局守卫 */
router.beforeEach((to, from, next) => {
    let aid = Cookies.getJSON('a_id');
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.meta.whiteListItem) { //白名单
        next();
    } else {
        if (aid) {
            store.dispatch('SET_USER', {
                aid: aid,
                account: Cookies.getJSON('a_account')
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
    render: h => h(Manage)
}).$mount('#app')