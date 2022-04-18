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
          <q-btn flat :to="{ name: 'token-add' }">Create new token</q-btn>
        </q-toolbar>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="delete_outline"
            flat
            @click="runDialog(props.row.id)"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
    <app-dialog
      v-model="openDialog"
      title="Do you realy want revoke this token?"
      sub-title="You can not restore revoked token!"
      @select="dialogSelect($event)"
    ></app-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import tokensRepository from "@/composition/tokens/tokensRepository";

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
    const { tokens, loading, pagination, tableTokens, getData, deleteToken } =
      tokensRepository();

    return {
      getData,
      tableTokens,
      tokens,
      pagination,
      loading,
      columns,
      deleteToken,
    };
  },
  data() {
    return {
      openDialog: false,
      revokeTokenId: null,
    };
  },
  methods: {
    dialogSelect(action) {
      switch (action) {
        case "yes":
          {
            this.deleteConfirmed();
          }
          break;
        case "no": {
          this.cancelDeleteToken();
        }
      }
    },
    runDialog(tokenId) {
      this.revokeTokenId = tokenId;
      this.openDialog = true;
    },
    cancelDeleteToken() {
      this.revokeTokenId = null;
      this.openDialog = false;
    },
    deleteConfirmed() {
      this.deleteToken(this.revokeTokenId);
      this.openDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
