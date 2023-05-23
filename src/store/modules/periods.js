import { apiPost, apiPatch, apiGet } from "@/composition/requestApi";
import organizationStore from "./organizations";

export default {
  namespaced: true,
  // store
  state: {
    all: null,
    current: {},
    loading: false,
    dataLoaded: null,
  },
  // getters
  getters: {
    organizationId() {
      return organizationStore.state.current;
    },
  },
  // muattions
  mutations: {
    CHANGE_PERIOD_BY_ID(state, { id, organizationId }) {
      state.current[organizationId] = id;
    },
    SET_LAST_PERIOD(state, organizationId) {
      const lastPeriod = state.all[organizationId].reduce(
        (maxIndex, item) => (maxIndex.id > item.id ? maxIndex : item),
        0
      );
      if (lastPeriod) state.current[organizationId] = lastPeriod.id;
    },
    SET_DATA_LOADED(state, { isLoaded, organizationId }) {
      if (state.dataLoaded === null) {
        state.dataLoaded = { [organizationId]: isLoaded };
      } else {
        state.dataLoaded[organizationId] = isLoaded;
      }
    },
    SET_ALL(state, { organizationId, data }) {
      if (state.all === null) {
        console.log("organizationId, data", organizationId, data);
        state.all = { [organizationId]: data };
      } else {
        state.all[organizationId] = data;
      }
    },

    ADD_PERIOD(state, { data }) {
      if (state.all[data.organization_id]) {
        state.all[data.organization_id].push(data);
      } else {
        state.all[data.organization_id] = [data];
      }
    },
    EDIT(state, { data }) {
      const editedItem = state.all[data.organization_id].findIndex(
        (row) => row.id === data.id
      );
      if (editedItem !== -1) state.all[data.organization_id][editedItem] = data;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    REMOVE(state, { id, organizationId }) {
      const removedItem = state.all[organizationId].findIndex(
        (row) => row.id === id
      );
      if (removedItem !== -1) state.all[organizationId].splice(removedItem, 1);
    },
  },
  // actions
  actions: {
    // loading action
    setLoading({ commit }, isLoading) {
      commit("app/SET_LOADING", isLoading, { root: true });
      commit("SET_LOADING", isLoading);
    },
    // change current period
    changePeriod({ commit, getters }, { id }) {
      commit("CHANGE_PERIOD_BY_ID", {
        id,
        organizationId: getters.organizationId,
      });
    },
    // change period to last one
    async changeLastPeriod({ commit, getters }) {
      return commit("SET_LAST_PERIOD", getters.organizationId);
    },
    // add new period
    async addPeriod({ commit, getters }, { data }) {
      const response = await apiPost({ url: "periods", data });
      if (!response.isError) {
        commit("ADD_PERIOD", { data: response.data });
        commit("SET_LAST_PERIOD", getters.organizationId);
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
      const organizationId = await getters.organizationId;
      // dispatch("setLoading", true);
      commit("SET_DATA_LOADED", {
        isLoaded: false,
        organizationId: organizationId,
      });

      const response = await apiGet({ url: `periods`, params });
      // dispatch("setLoading", false);

      if (!response.isError) {
        commit("SET_ALL", {
          organizationId: organizationId,
          data: response.data,
        });
        if (!getters.current) {
          commit("SET_LAST_PERIOD", organizationId);
        }
        commit("SET_DATA_LOADED", {
          isLoaded: true,
          organizationId: organizationId,
        });
      }
      return response;
    },
  },
};
