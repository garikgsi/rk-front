import { apiGet, apiDelete, apiPost, apiPut } from "@/composition/requestApi";
import { addInfo } from "@/composition/addMessage";

export default {
  namespaced: true,
  // store
  state: {
    all: [],
    loading: false,
    dataLoaded: false,
  },
  // getters
  getters: {},
  // muattions
  mutations: {
    SET_ALL(state, { data }) {
      state.all = data;
      state.dataLoaded = true;
    },
    ADD(state, { data }) {
      state.all.push(data);
      state.dataLoaded = true;
    },
    EDIT(state, { data }) {
      const editedItem = state.all.findIndex((row) => row.id === data.id);
      if (editedItem !== -1) state.all[editedItem] = data;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    REMOVE(state, { id }) {
      const removedItem = state.all.findIndex((row) => row.id === id);
      if (removedItem !== -1) state.all.splice(removedItem, 1);
    },
  },
  // actions
  actions: {
    // loading action
    setLoading({ commit }, isLoading) {
      commit("SET_LOADING", isLoading);
    },
    // fetch data
    async getKids({ commit }, { params }) {
      commit("SET_LOADING", true);
      const response = await apiGet({ url: `kids`, params });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("SET_ALL", {
          data: response.data,
        });
      }
      return response;
    },
    // remove row
    async removeKid({ commit }, { id, params }) {
      commit("SET_LOADING", true);
      const response = await apiDelete({ url: `kids/${id}`, params });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("REMOVE", { id });
        addInfo(`Запись успешно удалена`);
      }
    },
    // create row
    async addKid({ commit }, { data }) {
      commit("SET_LOADING", true);
      const response = await apiPost({ url: `kids`, data });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("ADD", { data: response.data });
        addInfo(`Запись успешно добавлена`);
      }
    },
    // edit row
    async editKid({ commit }, { id, data }) {
      commit("SET_LOADING", true);
      const response = await apiPut({ url: `kids/${id}`, data });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("EDIT", { data: response.data });
        addInfo(`Запись успешно изменена`);
      }
    },
    // copy row
    async copyKid({ commit }, { id, data }) {
      commit("SET_LOADING", true);
      const response = await apiPost({ url: `kids/${id}`, data });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("ADD", { data: response.data });
        addInfo(`Запись успешно скопирована`);
      }
    },
  },
};
