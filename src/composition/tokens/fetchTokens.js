import { get } from "@/composition/requestApi";
import { addError } from "@/composition/addMessage";
import { ref, onMounted, computed } from "vue";

export default function fetchTokens() {
  // fetched tokens
  const tokens = ref([]);
  // loading await property
  let loading = ref(false);
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
    const { isError, error, data, count } = await get({
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
    tokens.value = data;

    pagination.value.rowsNumber = count;
  };
  // fetch data on mount
  onMounted(() => {
    getData({ pagination: pagination.value });
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

  return {
    tokens,
    loading,
    pagination,
    tableTokens,
    getData,
  };
}
