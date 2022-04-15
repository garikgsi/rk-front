import { get } from "@/composition/requestApi";
import { addError } from "@/composition/addMessage";

const fetchTokens = async ({ page, limit }) => {
  const response = await get({ url: "auth/tokens", params: { page, limit } });
  if (response.isError) {
    addError(
      response.error ? response.error : "Неизвестная зшибка загрузки токенов"
    );
  }
  return response;
};
export { fetchTokens };
