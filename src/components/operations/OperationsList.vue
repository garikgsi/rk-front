<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    no-data-label="Нет данных за период"
  >
    <template v-slot:top-left>
      <q-toolbar class="" align="right">
        <q-btn
          color="primary"
          :to="{
            name: 'operations-form',
          }"
          >Добавить</q-btn
        >
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
          <span v-else-if="col.name == 'date_operation'">ИТОГО:</span>
          <span v-else></span>
        </q-td>
      </q-tr>
    </template>

    <template v-slot:body-cell-comment="props">
      <q-td :props="props">
        <div>
          {{ props.row.comment.substring(0, 60) }}
          <q-tooltip>{{ props.row.comment }}</q-tooltip>
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <table-edit-button
          :to="{
            name: 'operations-form',
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
import { ref, onMounted } from "vue";
import operationsRepository from "@/composition/operations/operationsRepository";
export default {
  name: "operations-list",
  components: {
    "table-delete-button": TableDeleteButtonVue,
    "table-edit-button": TableEditButtonVue,
  },
  setup() {
    const { pagination, columns, totalAmount, removeOperation, getData } =
      operationsRepository();
    let { items } = operationsRepository();
    const loading = ref(false);

    // simple refresh data
    const fetchData = () => {
      return getData({ pagination: pagination.value });
    };

    // remove row
    const remove = (id) => {
      removeOperation({ id }).then(fetchData());
    };

    // load data on mouted
    onMounted(() => {
      items = fetchData();
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
