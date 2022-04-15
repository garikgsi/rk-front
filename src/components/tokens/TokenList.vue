<template>
  <div>
    <q-table
      :rows="tableTokens"
      :columns="columns"
      row-key="id"
      no-data-label="There is no any tokens"
      v-model:pagination="pagination"
      :loading="loading"
      @request="getData"
      :binary-state-sort="true"
    >
      <template v-slot:top>
        <q-toolbar class="bg-primary text-white" align="right">
          <q-btn flat @click="addToken">Create new token</q-btn>
        </q-toolbar>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="delete_outline"
            flat
            @click="revokeToken(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import fetchTokens from "@/composition/tokens/fetchTokens";

export default {
  name: "token-list",
  setup() {
    const columns = ref([
      { name: "name", field: "name", label: "Device name", sortable: false },
      {
        name: "created_at",
        field: "created_at",
        label: "Create date",
        sortable: false,
      },
      {
        name: "actions",
        sortable: false,
        label: "Actions",
      },
    ]);
    // tokens repo
    const { tokens, loading, pagination, tableTokens, getData } = fetchTokens();

    return {
      getData,
      tableTokens,
      tokens,
      pagination,
      loading,
      columns,
    };
  },
};
</script>

<style lang="scss" scoped></style>
