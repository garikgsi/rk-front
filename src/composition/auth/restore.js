import { ref } from "vue";
import { apiPost, addToken } from "@/composition/requestApi";
import { useStore } from "vuex";
import { addInfo } from "@/composition/addMessage";
import { storageAdd } from "@/composition/localStorage";

export default function restore() {
  const store = useStore();

  const login = ref("");
  const password = ref("");
  const emailCode = ref("");

  const restorePassword = async () => {
    let requestData = new FormData();
    requestData.append("email", login.value);
    requestData.append("password", password.value);
    requestData.append("password_confirmation", password.value);
    requestData.append("code", emailCode.value);

    const response = await apiPost({
      url: "auth/restore_password",
      data: requestData,
    });

    const { data, isError } = response;
    if (!isError) {
      const { email, name, token } = data;
      store.dispatch("user/setUser", { email, name, token });
      addToken(token);
      addInfo("Пароль успешно изменен");
      const userData = { ...data, ...{ token } };
      store.dispatch("user/setUser", userData);
      storageAdd("user", data);
    }
    return response;
  };

  return {
    restorePassword,
    login,
    password,
    emailCode,
  };
}
