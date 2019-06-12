export default {
    namespaced: true,
    state: {
        menu: ['菜单1', '菜单2', '菜单3'],
        status: false,
        count: 3,
        sum: 0
    },
    getters: {
        newStatus: (state) => {
            return !state.status;
        }
    },
    mutations: {
        CHANGE_STATUS(state, data) {
            state.status = data;
        },
        ADD(state, data){
            state.sum = data;
        }
    },
    actions: {
        ADD_THIS_AND_ROOT({state, commit, rootState}) { //rootState暴露根的state
            let sum = state.count + rootState.rootCount;
            commit('ADD',sum);
        }
    }
};
