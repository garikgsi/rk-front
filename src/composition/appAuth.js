import store from "@/store";
import { addInfo } from "./addMessage";
import { apiPost, apiGet, addToken, removeToken } from "./requestApi";
import { addError } from "./addMessage";
import {
  storageAdd,
  storageHas,
  storageRemove,
  storageGet,
} from "./localStorage";

// logout from app
const logOut = () => {
  store.dispatch("user/logOut");
  storageRemove("user");
  addInfo("You are successfully logged out");
};

// auth by email & password
const logIn = async ({ email, password, saveLogged }) => {
  let requestData = new FormData();
  requestData.append("email", email);
  requestData.append("password", password);
  requestData.append("device_name", "siteAuth");

  const response = await apiPost({
    url: "auth/token",
    data: requestData,
  });

  const { data, isError, error } = response;
  if (isError) {
    addError(error);
    return false;
  } else {
    const userData = { email, token: data };
    store.dispatch("user/setUser", userData);
    addToken(data);
    addInfo("You are logged in!");
    if (saveLogged) storageAdd("user", userData);
    return true;
  }
};

// check if existed saved token in localStorage and use it
const checkStoredUser = async () => {
  if (storageHas("user")) {
    const userData = storageGet("user");
    const { token } = userData;

    const userResponse = await apiGet({ url: "auth/user", token });
    if (userResponse) {
      store.dispatch("user/setUser", userData);
      addToken(token);
      return true;
    } else {
      removeToken();
      storageRemove("user");
      return false;
    }
  } else {
    return false;
  }
};

export { logIn, logOut, checkStoredUser };
