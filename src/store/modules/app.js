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
    // set loading
    setLoading(/*{ commit }, isLoading*/) {
      console.log("set loading");
      // commit("SET_LOADING", isLoading);
    },
  },
};
