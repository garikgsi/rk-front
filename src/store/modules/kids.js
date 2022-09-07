import { apiGet, apiDelete, apiPost, apiPut } from "@/composition/requestApi";
import { addInfo } from "@/composition/addMessage";
import organizationStore from "./organizations";

export default {
  namespaced: true,
  // store
  state: {
    all: {},
    loading: false,
    dataLoaded: {},
    expanded: {},
  },
  // getters
  getters: {
    organizationId() {
      return organizationStore.state.current;
    },
  },
  // muattions
  mutations: {
    SET_DATA_LOADED(state, { isLoaded, organizationId }) {
      state.dataLoaded[organizationId] = isLoaded;
    },
    SET_ALL(state, { organizationId, data }) {
      state.all[organizationId] = data;
    },

    ADD(state, { data }) {
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
    SET_EXPANDED(state, { id, isExpanded }) {
      state[id] = isExpanded;
    },
  },
  // actions
  actions: {
    // loading action
    setLoading({ commit }, isLoading) {
      // commit("app/SET_LOADING", isLoading, { root: true });
      commit("SET_LOADING", isLoading);
    },
    // fetch data
    async getKids({ commit, getters, dispatch }, { params }) {
      // console.log(`getting kids for org=${getters.organizationId}`);
      dispatch("setLoading", true);
      const response = await apiGet({ url: `kids`, params });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("SET_ALL", {
          data: response.data,
          organizationId: getters.organizationId,
        });
        commit("SET_DATA_LOADED", {
          isLoaded: true,
          organizationId: getters.organizationId,
        });
      }
      return response;
    },
    // remove row
    async removeKid({ commit, getters, dispatch }, { id, params }) {
      dispatch("setLoading", true);
      const response = await apiDelete({ url: `kids/${id}`, params });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("REMOVE", { id, organizationId: getters.organizationId });
        addInfo(`Запись успешно удалена`);
      }
      return response.isError;
    },
    // create row
    async addKid({ commit, dispatch }, { data }) {
      dispatch("setLoading", true);
      const response = await apiPost({ url: `kids`, data });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("ADD", { data: response.data });
        addInfo(`Запись успешно добавлена`);
      }
      return response.isError;
    },
    // edit row
    async editKid({ commit, dispatch }, { id, data }) {
      dispatch("setLoading", true);
      const response = await apiPut({ url: `kids/${id}`, data });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("EDIT", { data: response.data });
        addInfo(`Запись успешно изменена`);
      }
      return response.isError;
    },
    // copy row
    async copyKid({ commit, dispatch }, { id, data }) {
      dispatch("setLoading", true);
      const response = await apiPost({ url: `kids/${id}`, data });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("ADD", { data: response.data });
        addInfo(`Запись успешно скопирована`);
      }
      return response.isError;
    },
    // save expanded state
    setExpanded({ commit }, { id, isExpanded }) {
      commit("SET_EXPANDED", { id, isExpanded });
    },
  },
};
