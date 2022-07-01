export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    isAuth(state) {
      return !!state.user;
    },
    currentUser(state) {
      if (state.user?.id) {
        return state.user.id;
      }
      return null;
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
    async setUser({ commit }, { id, email, token, name = null }) {
      const userData = { email, token, name: name ? name : email };
      if (id) userData.id = id;
      return commit("SET_USER", {
        user: userData,
      });
    },
  },
};
