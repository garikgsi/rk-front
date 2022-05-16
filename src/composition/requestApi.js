import axios from "axios";
import { addError } from "@/composition/addMessage";

// url API
const apiUrl = "http://laravel.test/api/v1";

// add default token
const addToken = (token) =>
  (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);

const removeToken = () =>
  (axios.defaults.headers.common["Authorization"] = null);

// basic request
const apiRequest = async ({ method, url, data, params = {}, token = null }) => {
  const axiosCfg = {
    url: `${apiUrl}/${url}`,
    method,
    data,
    params,
    timeout: 3000,
    headers: {
      post: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  };
  if (token) axiosCfg.headers.Authorization = "Bearer " + token;

  let result = {
    data: undefined,
    error: "Check internet connection",
    count: 0,
  };
  try {
    const response = await axios.request(axiosCfg);

    const status = response.status;
    const { data, error, is_error, count } = response.data;
    result = {
      ...result,
      ...{ data, error, isError: is_error, code: status, count },
    };
  } catch (error) {
    result = {
      ...result,
      ...{
        isError: true,
        code: error?.response?.status,
        error: error?.response?.data?.error
          ? error.response.data?.error
          : "Check internet connection",
      },
    };
    addError(result.error);
  }
  return result;
};

// get request
const apiGet = ({ url, params = {}, token = null }) => {
  const response = apiRequest({ method: "get", url, token, params });
  return response;
};

// post request
const apiPost = ({ url, data, token = null }) => {
  return apiRequest({ method: "post", url, data, token });
};

// put request
const apiPut = ({ url, params, data, token = null }) => {
  data.append("_method", "PUT");
  return apiRequest({ method: "post", url, data, params, token });
};

// patch request
const apiPatch = ({ url, params, data, token = null }) => {
  data.append("_method", "PATCH");
  return apiRequest({ method: "post", url, data, params, token });
};

// delete request
const apiDelete = ({ url, params, token = null }) => {
  return apiRequest({ method: "delete", url, params, token });
};

export {
  apiRequest,
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
  addToken,
  removeToken,
};
