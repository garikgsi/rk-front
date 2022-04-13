import store from "@/store";
import { addInfo } from "./addMessage";
import { post, get, addToken, removeToken } from "./requestApi";
import { addError } from "./addMessage";
import {
  storageAdd,
  storageHas,
  storageRemove,
  storageGet,
} from "./localStorage";
import { platformName } from "./platform";

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
  requestData.append("device_name", platformName());

  const response = await post({
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

    const userResponse = await get({ url: "auth/user", token });
    if (userResponse) {
      store.dispatch("user/setUser", userData);
      addToken(token);
      return true;
    } else {
      removeToken();
      storageRemove("user");
      return false;
    }
  }
};

export { logIn, logOut, checkStoredUser };
