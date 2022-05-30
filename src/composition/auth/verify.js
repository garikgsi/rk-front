import { ref } from "vue";
import { apiPost, addToken } from "@/composition/requestApi";
import { useStore } from "vuex";
import { addInfo } from "@/composition/addMessage";
import { storageAdd } from "@/composition/localStorage";

export default function verify() {
  const store = useStore();

  const login = ref("");
  const emailCode = ref("");

  const verifyEmail = async () => {
    let requestData = new FormData();
    requestData.append("email", login.value);
    requestData.append("code", emailCode.value);

    const response = await apiPost({
      url: "auth/confirm_registration",
      data: requestData,
    });

    const { data, isError } = response;
    if (!isError) {
      const { email, name, token } = data;
      store.dispatch("user/setUser", { email, name, token });
      addToken(token);
      addInfo("Регистрация успешно завершена");
      storageAdd("user", data);
    }
    return response;
  };

  return {
    login,
    emailCode,
    verifyEmail,
  };
}
