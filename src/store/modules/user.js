export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    isAuth(state) {
      return !!state.user;
    },
  },
  mutations: {
    SET_USER(state, { user }) {
      state.user = user;
    },
  },
  actions: {
    logOut({ commit }) {
      commit("SET_USER", { user: null });
    },
    async setUser({ commit }, { email, token, name = null }) {
      return commit("SET_USER", {
        user: { email, token, name: name ? name : email },
      });
    },
  },
};
