export default {
  namespaced: true,
  // store
  state: {
    isLoading: false,
  },
  // getters
  getters: {},
  // muattions
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  // actions
  actions: {
    // set pagination for table
    setLoading({ commit }, isLoading) {
      commit("SET_LOADING", isLoading);
    },
  },
};
