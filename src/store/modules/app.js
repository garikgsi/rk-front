export default {
  namespaced: true,
  state: {
    messages: [],
  },
  mutations: {
    ADD_MESSAGE(state, { message, type }) {
      state.messages.push({ message, type, id: Date.now(), read: false });
    },
    SET_READ(state, { id }) {
      state.messages = state.messages.map((msg) =>
        msg.id == id ? (msg.read = true) : msg
      );
    },
  },
  actions: {
    addMessage({ commit }, { message, type }) {
      commit("ADD_MESSAGE", { message, type });
    },
    setRead({ commit }, { id }) {
      commit("SET_READ", { id });
    },
  },
  getters: {
    unreadMessage(state) {
      return state.messages.filter((msg) => msg.read == false) || [];
    },
    hasMessage(state, getters) {
      return getters.unreadMessage.length > 0 || false;
    },
    lastMessage(state, getters) {
      return getters.unreadMessage.pop();
    },
  },
};
