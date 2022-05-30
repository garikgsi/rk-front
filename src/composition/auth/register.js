import { ref } from "vue";
import { apiPost } from "@/composition/requestApi";
import { addInfo } from "@/composition/addMessage";

export default function () {
  const name = ref("");
  const login = ref("");
  const password = ref("");

  const makeRegister = async () => {
    let requestData = new FormData();
    requestData.append("name", name.value);
    requestData.append("email", login.value);
    requestData.append("password", password.value);
    requestData.append("password_confirmation", password.value);

    const response = await apiPost({
      url: "auth/register",
      data: requestData,
    });

    const { isError } = response;
    if (!isError) {
      addInfo("Вы успешно зарегистрированы, подтвердите Ваш email");
    }
    return response;
  };

  return {
    makeRegister,
    name,
    login,
    password,
  };
}
