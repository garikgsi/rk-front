import { apiGet, apiPost, apiDelete } from "@/composition/requestApi";
import { addError, addInfo } from "@/composition/addMessage";
import { ref, onMounted, computed } from "vue";

export default function tokensRepository() {
  // fetched tokens
  const tokens = ref([]);
  // loading await property
  let loading = ref(false);
  // form data
  const name = ref("");
  const abilities = ref([]);

  // pagination table model
  const pagination = ref({
    sortBy: "name",
    descending: false,
    page: 1,
    rowsPerPage: 5,
    rowsNumber: 0,
  });
  // fetch data
  const getData = async (props) => {
    const { page, rowsPerPage, sortBy, descending } = props.pagination;
    // update pagination
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
    loading.value = true;
    // fetch new data
    const { isError, error, data, count } = await apiGet({
      url: "auth/tokens",
      params: {
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
      },
    });
    if (isError) {
      addError(error ? error : "Неизвестная ошибка загрузки токенов");
    }

    loading.value = false;
    if (data) tokens.value = data;
    pagination.value.rowsNumber = count;
  };
  // fetch data on mount
  onMounted(() => {
    getData({ pagination: pagination.value });
    // console.log(tokens.value);
  });
  // format data for table
  const tableTokens = computed(() => {
    return [...tokens.value].map((token) => {
      return {
        name: token.name,
        id: token.id,
        created_at: token.created_at,
      };
    });
  });
  // create token request
  const createToken = () => {
    const tokenData = new FormData();
    tokenData.append("token_name", name.value);
    tokenData.append("abilities", abilities.value);
    const response = apiPost({ url: "auth/tokens", data: tokenData });
    return response;
  };
  // clear token form
  const clearForm = () => {
    name.value = "";
    abilities.value = [];
  };
  // revike token api request
  const revokeToken = (id) => {
    return apiDelete({ url: `auth/tokens/${id}` });
  };
  // function to delete token
  const deleteToken = async (id) => {
    const { code, isError, error } = await revokeToken(id);
    if (isError) {
      addError(error ? error : "can't add token with unknown error");
    } else {
      if (code == 204) {
        // console.log(code, "token successfully revoked");
        addInfo("token successfully revoked");
        getData({ pagination: pagination.value });
      }
    }
  };

  return {
    name,
    abilities,
    tokens,
    loading,
    pagination,
    tableTokens,
    getData,
    createToken,
    clearForm,
    revokeToken,
    deleteToken,
  };
}
