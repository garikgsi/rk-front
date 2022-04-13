import store from "@/store";

const createMessage = (message, type) => {
  store.dispatch("app/addMessage", {
    message,
    type,
  });
};

const addError = (text) => {
  createMessage(text, "error");
};

const addInfo = (text) => {
  createMessage(text, "info");
};

export { addError, addInfo };
