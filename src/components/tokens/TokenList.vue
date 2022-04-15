<template>
  <div>
    <q-table
      :rows="tableTokens"
      :columns="columns"
      row-key="id"
      no-data-label="There is no any tokens"
      v-model:pagination="pagination"
      :loading="loading"
      @request="getTokens"
      :binary-state-sort="true"
    ></q-table>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { fetchTokens } from "@/composition/tokens/fetchTokens";
export default {
  name: "token-list",
  setup() {
    const tokens = ref([]);
    let loading = ref(false);
    const pagination = ref({
      sortBy: "name",
      descending: false,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 0,
    });
    const columns = ref([
      { name: "name", field: "name", label: "Device name", sortable: false },
      {
        name: "abilities",
        field: "abilities",
        label: "Permissions",
        sortable: false,
      },
      {
        name: "created_at",
        field: "created_at",
        label: "Create date",
        sortable: false,
      },
    ]);

    // const getTokens = async () => {
    //   loading.value = true;
    //   const response = await fetchTokens({
    //     page: pagination.value.page,
    //     limit: pagination.value.rowsPerPage,
    //   });
    //   loading.value = false;
    //   tokens.value = response.data;
    //   pagination.value.rowsNumber = response.count;
    // };

    const getTokens = async (props) => {
      // console.log(props);
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      // update pagination
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
      loading.value = true;
      const response = await fetchTokens({
        page: pagination.value.page,
        limit: pagination.value.rowsPerPage,
      });
      loading.value = false;
      tokens.value = response.data;
      tokens.value.splice(0, tokens.value.length, ...response.data);
      pagination.value.rowsNumber = response.count;
    };

    onMounted(() => {
      getTokens({ pagination: pagination.value });
    });

    return {
      getTokens,
      tableTokens: computed(() =>
        [...tokens.value].map((token) => {
          return {
            name: token.name,
            id: token.id,
            abilities: token.abilities,
            created_at: token.created_at,
          };
        })
      ),
      tokens,
      pagination,
      loading,
      columns,
    };
  },
};
</script>

<style lang="scss" scoped></style>
