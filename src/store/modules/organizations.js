import { apiPost, apiPatch, apiGet, apiDelete } from "@/composition/requestApi";

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
    currentOrganization(state) {
      if (state.all && state.current) {
        return state.all.find((org) => org.id == state.current);
      }
      return null;
    },
  },
  // muattions
  mutations: {
    CHANGE_ORGANIZATION_BY_ID(state, { id }) {
      state.current = id;
    },
    SET_DEFAULT_ORGANIZATION(state) {
      if (state.all.length == 1) state.current = state.all[0]?.id;
    },
    ADD_ORGANIZATION(state, { payload }) {
      state.all.push(payload);
    },
    EDIT_ORGANIZATION(state, { id, payload }) {
      let editedItem = state.all.findIndex((item) => item.id == id);
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
    REMOVE(state, { id }) {
      const removedItem = state.all.findIndex((row) => row.id === id);
      // console.log(`remove=${id}, removedItem=${removedItem}`);
      if (removedItem !== -1) state.all.splice(removedItem, 1);
    },
  },
  // actions
  actions: {
    // loading action
    setLoading({ commit }, isLoading) {
      commit("app/SET_LOADING", isLoading, { root: true });
      commit("SET_LOADING", isLoading);
    },
    // change current organization
    async changeOrganization({ commit }, { id }) {
      return commit("CHANGE_ORGANIZATION_BY_ID", { id });
    },
    // change organization to default
    setDefaultOrganization({ commit }) {
      commit("SET_DEFAULT_ORGANIZATION");
    },
    // add new organization
    async addOrganization({ commit }, { data }) {
      const response = await apiPost({ url: "organizations", data });
      if (!response.isError) {
        commit("ADD_ORGANIZATION", { payload: response.data });
        commit("SET_DEFAULT_ORGANIZATION");
      }
      return response.isError;
    },
    // edit organization
    async editOrganization({ commit }, { id, data }) {
      const response = await apiPatch({ url: `organizations/${id}`, data });
      if (!response.isError) {
        commit("EDIT_ORGANIZATION", { id, payload: response.data });
      }
      return response.isError;
    },
    // copy row
    async copyOrganization({ commit, dispatch }, { id, data }) {
      dispatch("setLoading", true);
      const response = await apiPost({ url: `organizations/${id}`, data });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("ADD_ORGANIZATION", { data: response.data });
      }
      return response.isError;
    },

    // get organizations
    async getOrganizations({ commit, getters, dispatch }, { params }) {
      dispatch("setLoading", true);
      commit("SET_DATA_LOADED", false);

      const response = await apiGet({ url: `organizations`, params });
      dispatch("setLoading", false);

      if (!response.isError) {
        commit("SET_ALL", { payload: response.data });
        if (!getters.current) {
          commit("SET_DEFAULT_ORGANIZATION");
        }
        commit("SET_DATA_LOADED", true);
      }
      return response.isError;
    },
    // remove row
    async removeOrganization({ commit, dispatch }, { id, params }) {
      dispatch("setLoading", true);
      const response = await apiDelete({ url: `organizations/${id}`, params });
      dispatch("setLoading", false);
      if (!response.isError) {
        commit("REMOVE", { id });
      }
      return response.isError;
    },
  },
};
