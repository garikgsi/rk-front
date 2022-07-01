import { apiGet } from "@/composition/requestApi";

export default {
  namespaced: true,
  // store
  state: {
    slug: null,
    plans: {},
    operations: {},
    totals: {},
    period: {},
    periods: {},
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
      return state.period[state.slug] ? state.period[state.slug]?.id : null;
    },
    slug(state) {
      return state.slug;
    },
  },
  // muattions
  mutations: {
    SET_ALL(state, { data }) {
      if (data.current_period) {
        state.period[state.slug] = data.current_period;
        let dataLoaded = false;
        if (data.plans && data.operations && data.totals) {
          // plans
          if (state.plans[state.slug])
            state.plans[state.slug][data.current_period.id] = data.plans;
          else
            state.plans[state.slug] = { [data.current_period.id]: data.plans };
          // operations
          if (state.operations[state.slug])
            state.operations[state.slug][data.current_period.id] =
              data.operations;
          else
            state.operations[state.slug] = {
              [data.current_period.id]: data.operations,
            };
          // totals
          if (state.totals[state.slug])
            state.totals[state.slug][data.current_period.id] = data.totals;
          else
            state.totals[state.slug] = {
              [data.current_period.id]: data.totals,
            };
          dataLoaded = true;
        }
        // is data loaded
        if (state.dataLoaded[state.slug])
          state.dataLoaded[state.slug][data.current_period.id] = dataLoaded;
        else
          state.dataLoaded[state.slug] = {
            [data.current_period.id]: dataLoaded,
          };
        // periods list
        state.periods[state.slug] = data?.periods;
      }
    },
    CHANGE_PERIOD(state, periodId) {
      if (state.periods[state.slug]) {
        return (state.period[state.slug] = state.periods[state.slug].find(
          (period) => period.id == periodId
        ));
      }
      return false;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_DATA_LOADED(state, { isLoaded, periodId }) {
      state.dataLoaded[state.slug][periodId] = isLoaded;
    },
    SET_TABLE_PAGINATION(state, { pagination }) {
      state.tablePagination = pagination;
    },
    SET_SLUG(state, slug) {
      state.slug = slug;
    },
  },
  // actions
  actions: {
    // loading action
    setLoading({ commit }, isLoading) {
      commit("app/SET_LOADING", isLoading, { root: true });
      commit("SET_LOADING", isLoading);
    },
    async setSlug({ commit }, slug) {
      return commit("SET_SLUG", slug);
    },
    async changePeriod({ commit }, periodId) {
      return commit("CHANGE_PERIOD", periodId);
    },
    // fetch data
    async getReport({ commit, getters, dispatch }, periodId = null) {
      dispatch("setLoading", true);
      const url = `report/public/${getters.slug}${
        periodId ? `/${periodId}` : ""
      }`;
      const response = await apiGet({ url });
      dispatch("setLoading", false);
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
