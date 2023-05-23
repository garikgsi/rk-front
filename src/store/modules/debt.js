import { apiGet } from "@/composition/requestApi";

export default {
  namespaced: true,
  // store
  state: {
    debt: {},
    kidDebt: {},
    debtLoaded: {},
    debtKidLoaded: {},
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
    SET_DEBT(state, { periodId, data }) {
      state.debt[periodId] = data;
    },
    SET_DEBT_LOADED(state, { periodId, isLoaded }) {
      state.debtLoaded[periodId] = isLoaded;
    },
    SET_KID_DEBT_LOADED(state, { periodId, kidId, isLoaded }) {
      state.debtKidLoaded[periodId][kidId] = isLoaded;
    },
    SET_KID_DEBT(state, { periodId, kidId, data }) {
      state.debt[periodId][kidId] = data;
    },
    SET_TABLE_PAGINATION(state, { pagination }) {
      state.tablePagination = pagination;
    },
  },
  // actions
  actions: {
    // loading action
    setLoading({ commit }, isLoading) {
      // commit("app/SET_LOADING", isLoading, { root: true });
      commit("SET_LOADING", isLoading);
    },

    // set pagination for table
    setTablePagination({ commit }, { pagination }) {
      commit("SET_TABLE_PAGINATION", { pagination });
    },

    // fetch debt data
    async getDebtReport({ commit, dispatch }, { params }) {
      dispatch("setLoading", true);
      const response = await apiGet({ url: `debt/${params.periodId}` });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("SET_DEBT", {
          data: response.data,
          periodId: params.periodId,
        });
        commit("SET_DEBT_LOADED", {
          isLoaded: true,
          periodId: params.periodId,
        });
      }
      return response;
    },
    // fetch debt data
    async getKidDebtReport({ commit, dispatch }, { params }) {
      dispatch("setLoading", true);
      const response = await apiGet({
        url: `debt/${params.periodId}/${params.kidId}`,
      });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("SET_KID_DEBT", {
          data: response.data,
          periodId: params.periodId,
          kidId: params.kidId,
        });
        commit("SET_KID_DEBT_LOADED", {
          isLoaded: true,
          periodId: params.periodId,
          kidId: params.kidId,
        });
      }
      return response;
    },
  },
};
