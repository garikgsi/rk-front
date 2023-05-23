import { apiGet, apiDelete, apiPost, apiPut } from "@/composition/requestApi";
import { addInfo } from "@/composition/addMessage";
import periodStore from "./periods";
import organizationStore from "./organizations";

export default {
  namespaced: true,
  // store
  state: {
    all: null,
    loading: false,
    dataLoaded: null,
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
      return periodStore.state.current[organizationStore.state.current];
    },
  },
  // muattions
  mutations: {
    SET_ALL(state, { periodId, data }) {
      if (state.all === null) {
        state.all = { [periodId]: data };
      } else {
        state.all[periodId] = data;
      }
    },
    SET_DATA_LOADED(state, { isLoaded, periodId }) {
      if (state.dataLoaded === null) {
        state.dataLoaded = { [periodId]: isLoaded };
      } else {
        state.dataLoaded[periodId] = isLoaded;
      }
    },
    ADD(state, { data }) {
      if (state.all[data.period_id]) {
        state.all[data.period_id].push(data);
      } else {
        state.all[data.period_id] = [data];
      }
    },
    EDIT(state, { data, oldPeriodId }) {
      // const editedItem = state.all[data.period_id].findIndex(
      //   (row) => row.id === data.id
      // );
      // if (editedItem !== -1) state.all[data.period_id][editedItem] = data;
      const editedItem = state.all[oldPeriodId].findIndex(
        (row) => row.id === data.id
      );
      if (editedItem !== -1) {
        if (oldPeriodId == data.period_id) {
          state.all[data.period_id][editedItem] = data;
        } else {
          state.all[oldPeriodId].splice(editedItem, 1);
          if (state.all[data.period_id]) {
            state.all[data.period_id].push(data);
          } else {
            state.all[data.period_id] = [data];
          }
        }
      }
    },
    SET_LOADING(state, isLoading) {
      state.loading = isLoading;
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
      commit("app/SET_LOADING", isLoading, { root: true });
      commit("SET_LOADING", isLoading);
    },
    // fetch data
    async getPayments({ commit, getters, dispatch }, { params }) {
      const periodId = await getters.periodId;

      dispatch("setLoading", true);
      commit("SET_DATA_LOADED", {
        isLoaded: false,
        periodId: periodId,
      });
      const response = await apiGet({ url: `payments`, params });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("SET_ALL", {
          data: response.data,
          periodId: periodId,
        });
        commit("SET_DATA_LOADED", {
          isLoaded: true,
          periodId: periodId,
        });
      }
      return response;
    },
    // remove row
    async removePayment({ commit, getters, dispatch }, { id, params }) {
      dispatch("setLoading", true);
      const response = await apiDelete({ url: `payments/${id}`, params });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("REMOVE", { id, periodId: getters.periodId });
        addInfo(`Запись успешно удалена`);
      }
      return response.isError;
    },
    // create row
    async addPayment({ commit, dispatch }, { data }) {
      dispatch("setLoading", true);
      const response = await apiPost({ url: `payments`, data });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("ADD", { data: response.data });
        addInfo(`Запись успешно добавлена`);
      }
      return response.isError;
    },
    // edit row
    async editPayment({ commit, dispatch, getters }, { id, data }) {
      dispatch("setLoading", true);
      const response = await apiPut({ url: `payments/${id}`, data });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("EDIT", { data: response.data, oldPeriodId: getters.periodId });
        addInfo(`Запись успешно изменена`);
      }
      return response.isError;
    },
    // copy row
    async copyPayment({ commit, dispatch }, { id, data }) {
      dispatch("setLoading", true);
      const response = await apiPost({ url: `payments/${id}`, data });
      dispatch("setLoading", false);
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
