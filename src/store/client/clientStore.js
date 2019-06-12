import Vue from 'vue'
import Vuex from 'vuex'
import module1 from "./modules/module1";
import module2 from "./modules/module2";
import * as Cookies from "js-cookie";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        module1,
        module2
    },
    state: {
        currentUser: {
            cid: window.sessionStorage.getItem('cid'),
            companyName: window.sessionStorage.getItem('companyName'),
            codeCard: window.sessionStorage.getItem('codeCard'),
            phone: window.sessionStorage.getItem('phone')
        }
    },
    getters: {}, //store的计算属性
    mutations: {
        // 用户登录状态，获取登录信息
        USER_STATUS(state, user) {
            if (user) {
                state.currentUser.cid = user.cid;
                state.currentUser.companyName = user.companyName;
                state.currentUser.codeCard = user.codeCard;
                state.currentUser.phone = user.phone;
                window.sessionStorage.setItem('cid', user.cid);
                window.sessionStorage.setItem('companyName', user.companyName);
                window.sessionStorage.setItem('codeCard', user.codeCard);
                window.sessionStorage.setItem('phone', user.phone);
            } else {
                state.currentUser.cid = null;
                state.currentUser.companyName = null;
                state.currentUser.codeCard = null;
                state.currentUser.phone = null;
                window.sessionStorage.removeItem('cid');
                window.sessionStorage.removeItem('companyName');
                window.sessionStorage.removeItem('codeCard');
                window.sessionStorage.removeItem('phone');
            }
        }
    },
    actions: { //aciton可进行异步操作及分发多重mutation
        SET_USER({commit}, user) {
            commit('USER_STATUS', user);
        },
        //用户注销登录
        LOGOUT({commit}) {
            return new Promise(resolve => {
                Cookies.remove('c_id');
                commit('USER_STATUS', '');
                resolve()
            })
        }
    }
})
