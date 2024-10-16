import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            userId: null,
            connected: false,
        };
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        },
        setConnected(state, status) {
            state.connected = status;
        },
    },
    actions: {
        updateUserId({ commit }, userId) {
            commit('setUserId', userId);
            commit('setConnected', true);
        },
        logout({ commit }) {
            commit('setUserId', null);
            commit('setConnected', false);
        },
    },
});

export default store;