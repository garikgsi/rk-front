import { apiPost, apiPatch, apiGet } from "@/composition/requestApi";

export default {
  namespaced: true,
  // store
  state: {
    all: [],
    current: null,
    loading: false,
    dataLoaded: false,
  },
  // getters
  getters: {
    currentPeriod(state) {
      if (state.all && state.current) {
        return state.all.find((period) => period.id == state.current);
      }
      return null;
    },
  },
  // muattions
  mutations: {
    CHANGE_PERIOD_BY_ID(state, { id }) {
      state.current = id;
    },
    SET_LAST_PERIOD(state) {
      const lastPeriod = state.all.reduce((maxIndex, item) =>
        maxIndex.id > item.id ? maxIndex : item
      );
      if (lastPeriod) state.current = lastPeriod.id;
    },
    ADD_PERIOD(state, { payload }) {
      state.all.push(payload);
    },
    EDIT_PERIOD(state, { id, payload }) {
      let editedItem = state.all.findIndex((item) => item.id === id);
      if (editedItem !== -1) {
        state.all.splice(editedItem, 1, payload);
      } else {
        state.all.push(payload);
      }
    },
    SET_ALL(state, { payload }) {
      state.all = payload;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_DATA_LOADED(state, isLoaded) {
      state.dataLoaded = isLoaded;
    },
  },
  // actions
  actions: {
    // change current period
    changePeriod({ commit }, { id }) {
      commit("CHANGE_PERIOD_BY_ID", { id });
    },
    // change period to last one
    changeLastPeriod({ commit }) {
      commit("SET_LAST_PERIOD");
    },
    // add new period
    async addPeriod({ commit }, { data }) {
      const response = await apiPost({ url: "periods", data });
      if (!response.isError) {
        commit("ADD_PERIOD", { payload: response.data });
        commit("SET_LAST_PERIOD");
      }
      return response;
    },
    // edit period
    async editPeriod({ commit }, { id, data }) {
      const response = await apiPatch({ url: `periods/${id}`, data });
      if (!response.isError) {
        commit("EDIT_PERIOD", { id, payload: response.data });
      }
      return response;
    },
    // get periods
    async getPeriods({ commit, getters }, { params }) {
      commit("SET_LOADING", true);
      commit("SET_DATA_LOADED", false);

      const response = await apiGet({ url: `periods`, params });
      commit("SET_LOADING", false);

      if (!response.isError) {
        commit("SET_ALL", { payload: response.data });
        if (!getters.current) {
          commit("SET_LAST_PERIOD");
        }
        commit("SET_DATA_LOADED", true);
      }
      return response;
    },
  },
};
