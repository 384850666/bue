import Vue from 'vue'
import Vuex from 'vuex'
import module1 from "./modules/module1";
import module2 from "./modules/module2";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        module1,
        module2
    },
    state: {
        currentUser: {
            aid: window.sessionStorage.getItem('aid'),
            account: window.sessionStorage.getItem('account')
        }
    },
    getters: {}, //store的计算属性
    mutations: {
        // 用户登录状态，获取登录信息
        USER_STATUS(state, user) {
            if (user) {
                state.currentUser.aid = user.aid;
                state.currentUser.account = user.account;
                window.sessionStorage.setItem('aid', user.aid);
                window.sessionStorage.setItem('account', user.account);
            } else {
                state.currentUser.aid = null;
                state.currentUser.account = null;
                window.sessionStorage.removeItem('aid');
                window.sessionStorage.removeItem('account');
            }
        }
    },
    actions: { //aciton可进行异步操作及分发多重mutation
        SET_USER({commit}, user) {
            commit('USER_STATUS', user);
        }
    }
})
