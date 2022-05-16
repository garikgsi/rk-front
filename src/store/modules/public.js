import { apiGet } from "@/composition/requestApi";

export default {
  namespaced: true,
  // store
  state: {
    plans: {},
    operations: {},
    totals: {},
    period: null,
    periods: [],
    loading: false,
    dataLoaded: {},
    tablePagination: {
      page: 1,
      sortBy: "date_operation",
      descending: true,
      rowsPerPage: 20,
    },
  },
  // getters
  getters: {
    periodId(state) {
      return state.period ? state.period.id : null;
    },
  },
  // muattions
  mutations: {
    SET_ALL(state, { data }) {
      if (data.current_period) {
        state.period = data.current_period;
        if (data.plans && data.operations && data.totals) {
          state.plans[data.current_period.id] = data.plans;
          state.operations[data.current_period.id] = data.operations;
          state.totals[data.current_period.id] = data.totals;
          state.dataLoaded[data.current_period.id] = true;
        } else {
          state.dataLoaded[data.current_period.id] = false;
        }
        state.periods = data?.periods;
      }
    },
    CHANGE_PERIOD(state, periodId) {
      if (state.periods) {
        return (state.period = state.periods.find(
          (period) => period.id == periodId
        ));
      }
      return false;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_DATA_LOADED(state, { isLoaded, periodId }) {
      state.dataLoaded[periodId] = isLoaded;
    },
    SET_TABLE_PAGINATION(state, { pagination }) {
      state.tablePagination = pagination;
    },
  },
  // actions
  actions: {
    // loading action
    setLoading({ commit }, isLoading) {
      commit("SET_LOADING", isLoading);
    },
    async changePeriod({ commit }, periodId) {
      return commit("CHANGE_PERIOD", periodId);
    },
    // fetch data
    async getReport({ commit }, periodId = null) {
      commit("SET_LOADING", true);
      const url = `report/public${periodId ? `/${periodId}` : ""}`;
      const response = await apiGet({ url });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("SET_ALL", {
          data: response.data,
        });
      }
      return response;
    },
    // set pagination for table
    setTablePagination({ commit }, { pagination }) {
      commit("SET_TABLE_PAGINATION", { pagination });
    },
  },
};
