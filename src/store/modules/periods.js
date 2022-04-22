// import { apiPost, apiPatch, apiGet } from "@/composition/requestApi";
import { apiPost, apiPatch } from "@/composition/requestApi";

export default {
  namespaced: true,
  // store
  state: {
    all: [
      { id: 1, title: "2020-2021 уч.год" },
      { id: 2, title: "2021-2022 уч.год" },
    ],
    current: null,
  },
  // getters
  getters: {
    currentPeriod(state) {
      if (state.current == null) {
        return state.all.reduce((maxIndex, item) =>
          maxIndex.id > item.id ? maxIndex : item
        );
      }
      return state.current;
    },
  },
  // muattions
  mutations: {
    CHANGE_PERIOD(state, { id }) {
      state.current = state.all.find((item) => item.id === id);
    },
    ADD_PERIOD(state, { payload }) {
      state.all.push(payload);
    },
    EDIT_PERIOD(state, { id, payload }) {
      let editedItem = state.all.findIndex((item) => item.id === id);
      if (editedItem) {
        state.all.splice(editedItem, 1, payload);
      } else {
        state.all.push(payload);
      }
    },
    SET_ALL(state, { payload }) {
      state.all = payload;
    },
  },
  // actions
  actions: {
    // change current period
    changePeriod({ commit }, { id }) {
      commit("CHANGE_PERIOD", { id });
    },
    // add new period
    async addPeriod({ commit }, { data }) {
      const response = await apiPost({ url: "periods", data });
      if (!response.isError) {
        commit("ADD_PERIOD", { payload: response.data });
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
    async getPeriods({ commit }, { params }) {
      // const response = await apiGet({ url: `periods`, params });
      // if (!response.isError) {
      //   commit("SET_ALL", { payload: response.data });
      // }
      // return response;
      console.log(commit, params);
      return true;
    },
  },
};
