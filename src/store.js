import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            userId: localStorage.getItem('userId') || null,
            connected: localStorage.getItem('connected') === 'true',
        };
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
            localStorage.setItem('userId', userId);
        },
        setConnected(state, status) {
            state.connected = status;
            localStorage.setItem('connected', status);
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
            localStorage.removeItem('userId');
            localStorage.removeItem('connected');
        },
    },
});

export default store;