import { apiGet, apiDelete, apiPost, apiPut } from "@/composition/requestApi";
import { addInfo } from "@/composition/addMessage";
import periodStore from "./periods";

export default {
  namespaced: true,
  // store
  state: {
    all: {},
    loading: false,
    dataLoaded: {},
    tablePagination: {
      page: 1,
      sortBy: "date_payment",
      descending: true,
      rowsPerPage: 20,
    },
  },
  // getters
  getters: {
    periodId() {
      return periodStore.state.current;
    },
  },
  // muattions
  mutations: {
    SET_ALL(state, { periodId, data }) {
      state.all[periodId] = data;
    },
    ADD(state, { data }) {
      if (state.all[data.period_id]) {
        state.all[data.period_id].push(data);
      } else {
        state.all[data.period_id] = [data];
      }
    },
    EDIT(state, { data }) {
      const editedItem = state.all[data.period_id].findIndex(
        (row) => row.id === data.id
      );
      if (editedItem !== -1) state.all[data.period_id][editedItem] = data;
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
    },
    SET_DATA_LOADED(state, { isLoaded, periodId }) {
      state.dataLoaded[periodId] = isLoaded;
    },
    REMOVE(state, { id, periodId }) {
      const removedItem = state.all[periodId].findIndex((row) => row.id === id);
      if (removedItem !== -1) state.all[periodId].splice(removedItem, 1);
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
    // fetch data
    async getPayments({ commit, getters }, { params }) {
      commit("SET_LOADING", true);
      commit("SET_DATA_LOADED", {
        isLoaded: false,
        periodId: getters.periodId,
      });
      const response = await apiGet({ url: `payments`, params });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("SET_ALL", {
          data: response.data,
          periodId: getters.periodId,
        });
        commit("SET_DATA_LOADED", {
          isLoaded: true,
          periodId: getters.periodId,
        });
      }
      return response;
    },
    // remove row
    async removePayment({ commit, getters }, { id, params }) {
      commit("SET_LOADING", true);
      const response = await apiDelete({ url: `payments/${id}`, params });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("REMOVE", { id, periodId: getters.periodId });
        addInfo(`Запись успешно удалена`);
      }
      return response.isError;
    },
    // create row
    async addPayment({ commit }, { data }) {
      commit("SET_LOADING", true);
      const response = await apiPost({ url: `payments`, data });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("ADD", { data: response.data });
        addInfo(`Запись успешно добавлена`);
      }
      return response.isError;
    },
    // edit row
    async editPayment({ commit }, { id, data }) {
      commit("SET_LOADING", true);
      const response = await apiPut({ url: `payments/${id}`, data });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("EDIT", { data: response.data });
        addInfo(`Запись успешно изменена`);
      }
      return response.isError;
    },
    // copy row
    async copyPayment({ commit }, { id, data }) {
      commit("SET_LOADING", true);
      const response = await apiPost({ url: `payments/${id}`, data });
      commit("SET_LOADING", false);
      if (!response.isError) {
        commit("ADD", { data: response.data });
        addInfo(`Запись успешно скопирована`);
      }
      return response.isError;
    },
    // set pagination for table
    setTablePagination({ commit }, { pagination }) {
      commit("SET_TABLE_PAGINATION", { pagination });
    },
  },
};
