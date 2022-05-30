import { apiPost } from "@/composition/requestApi";
export default function code() {
  const getCode = async (email) => {
    let requestData = new FormData();
    requestData.append("email", email);

    const response = await apiPost({
      url: "auth/new_code",
      data: requestData,
    });

    return response;
  };

  return {
    getCode,
  };
}
