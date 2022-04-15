import axios from "axios";

// url API
const apiUrl = "http://laravel.test/api/v1";

// add default token
const addToken = (token) =>
  (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);

const removeToken = () =>
  (axios.defaults.headers.common["Authorization"] = null);

// basic request
const request = async ({ method, url, data, params = {}, token = null }) => {
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
    const { data, error, isError, count } = response.data;
    result = {
      ...result,
      ...{ data, error, isError, code: status, count },
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
  }
  return result;
};

// get request
const get = ({ url, params = {}, token = null }) => {
  const response = request({ method: "get", url, token, params });
  return response;
};

// post request
const post = ({ url, data, token = null }) => {
  return request({ method: "post", url, data, token });
};

export { request, get, post, addToken, removeToken };
