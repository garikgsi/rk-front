export default {
  namespaced: true,
  // store
  state: {
    tablePagination: {
      page: 1,
      sortBy: "debt",
      descending: false,
      rowsPerPage: 20,
    },
  },
  // getters
  getters: {},
  // muattions
  mutations: {
    SET_TABLE_PAGINATION(state, { pagination }) {
      state.tablePagination = pagination;
    },
  },
  // actions
  actions: {
    // set pagination for table
    setTablePagination({ commit }, { pagination }) {
      commit("SET_TABLE_PAGINATION", { pagination });
    },
  },
};
