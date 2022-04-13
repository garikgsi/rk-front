import axios from "axios";

// url API
const apiUrl = "http://laravel.test/api/v1";

// add default token
const addToken = (token) =>
  (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);

const removeToken = () =>
  (axios.defaults.headers.common["Authorization"] = null);

// basic request
const request = async ({ method, url, data, token = null }) => {
  const axiosCfg = {
    url: `${apiUrl}/${url}`,
    method,
    data,
    timeout: 3000,
    headers: {
      post: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  };
  if (token) axiosCfg.headers.Authorization = "Bearer " + token;

  let result = {
    error: "Check internet connection",
  };
  try {
    const { data, status } = await axios.request(axiosCfg);
    result = {
      ...result,
      ...{ data, error: null, isError: false, code: status },
    };
  } catch (error) {
    result = {
      ...result,
      ...{
        isError: true,
        code: error?.response?.status,
        error: error?.response?.data
          ? error.response.data
          : "Check internet connection",
      },
    };

    result.error = error;
  }
  return result;
};

// get request
const get = ({ url, token = null }) => {
  return request({ method: "get", url, token });
};

// post request
const post = ({ url, data, token = null }) => {
  return request({ method: "post", url, data, token });
};

export { request, get, post, addToken, removeToken };
