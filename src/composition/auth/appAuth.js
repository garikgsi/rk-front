import store from "@/store";
import { addInfo } from "../addMessage";
import { apiPost, apiGet, addToken, removeToken } from "../requestApi";
import {
  storageAdd,
  storageHas,
  storageRemove,
  storageGet,
} from "../localStorage";

// logout from app
const logOut = () => {
  store.dispatch("user/logOut");
  storageRemove("user");
  addInfo("Вы вышли");
};

// auth by email & password
const logIn = async ({ email, password, saveLogged }) => {
  // logout first
  store.dispatch("user/logOut");
  storageRemove("user");
  // request data
  let requestData = new FormData();
  requestData.append("email", email);
  requestData.append("password", password);
  requestData.append("device_name", "siteAuth");

  const response = await apiPost({
    url: "auth/token",
    data: requestData,
  });

  const { data, isError } = response;
  const token = data;
  if (!isError) {
    addToken(token);

    const userDataResponse = await apiGet({
      url: "auth/user",
    });
    const { data, isError } = userDataResponse;
    if (!isError) {
      const userData = { ...data, ...{ token } };
      store.dispatch("user/setUser", userData);
      if (saveLogged) storageAdd("user", userData);
    }

    addInfo("Вы успешно авторизованы");
  }
  return response;
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
