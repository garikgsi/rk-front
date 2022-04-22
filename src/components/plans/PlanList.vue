<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    no-data-label="Нет данных за период"
    v-model:pagination="pagination"
    :loading="loading"
    @request="getData"
    :binary-state-sort="true"
    :rows-per-page-options="[100, 200, 0]"
  >
    <template v-slot:top-left>
      <q-toolbar class="" align="right">
        <q-btn color="primary" :to="{ name: 'plan-form' }">Добавить</q-btn>
        <q-separator vertical inset spaced="md"></q-separator>
      </q-toolbar>
    </template>

    <template v-slot:bottom-row="cols">
      <q-tr class="total-tr">
        <q-td
          v-for="(col, index) in cols.cols"
          :key="index"
          :class="[{ 'text-right': col.name == 'amount' }, 'text-h6']"
        >
          <span v-if="col.name == 'amount'">{{ totalAmount }}</span>
          <span v-else-if="col.name == 'title'">ИТОГО:</span>
          <span v-else></span>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <table-edit-button
          :to="{
            name: 'plan-form',
            params: { id: props.row.id },
          }"
        ></table-edit-button>
        <table-delete-button
          :sub-title="`Действительно удаляем ${props.row.title}?`"
          @submitted="remove(props.row.id)"
        ></table-delete-button>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import TableDeleteButtonVue from "../UI/table/TableDeleteButton.vue";
import TableEditButtonVue from "../UI/table/TableEditButton.vue";
import planRepository from "@/composition/plans/planRepository";
import { ref, onMounted } from "vue";
export default {
  name: "plan-list",
  components: {
    "table-delete-button": TableDeleteButtonVue,
    "table-edit-button": TableEditButtonVue,
  },

  setup() {
    const {
      pagination,
      columns,
      totalAmount,
      removePlan,
      getData,
      fetchTableData,
    } = planRepository();
    let { items } = planRepository();
    const loading = ref(false);

    // remove row
    const remove = (id) => {
      removePlan({ id }).then(fetchTableData());
    };

    // load data on mouted
    onMounted(() => {
      items.value = fetchTableData();
    });

    return {
      items,
      pagination,
      columns,
      loading,
      totalAmount,
      remove,
      getData,
    };
  },
};
</script>

<style lang="scss" scoped>
.total-tr {
  td {
    border-top: 2px solid grey;
  }
}
</style>
