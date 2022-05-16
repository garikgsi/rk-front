<template>
  <app-table
    :items="items"
    :columns="columns"
    :editable="false"
    :totalRow="{
      fio: 'ИТОГО:',
      planSum: totals.planSum,
      paySum: totals.paySum,
      debt: totals.debt,
    }"
    v-model:search="tableSearchString"
    :pagination="pagination"
    @update:pagination="updatePagination"
  ></app-table>
</template>

<script>
import AppTableVue from "../UI/table/AppTable.vue";

import debtReport from "@/composition/debt/debtReport";
import debtFilter from "@/composition/debt/debtFilter";
import debtTotals from "@/composition/debt/debtTotals";
import tablePagination from "@/composition/tablePagination";
import { ref } from "vue";
export default {
  setup() {
    const { debtData } = debtReport();

    const { filteredData, tableSearchString } = debtFilter(debtData);

    const { totals } = debtTotals(filteredData);

    const columns = ref([
      {
        name: "fio",
        field: "fio",
        label: "ФИО",
        align: "left",
        sortable: true,
        type: "string",
      },
      {
        name: "planSum",
        field: "planSum",
        label: "Сумма план",
        align: "right",
        sortable: false,
        type: "money",
      },
      {
        name: "paySum",
        field: "paySum",
        label: "Сумма оплат",
        align: "right",
        sortable: false,
        type: "money",
      },
      {
        name: "debt",
        field: "debt",
        label: "Долг",
        align: "right",
        sortable: true,
        type: "money",
      },
    ]);

    // table pagination from store
    const { pagination, updatePagination } = tablePagination("debt");

    return {
      items: filteredData,
      columns,
      tableSearchString,
      pagination,
      totals,
      updatePagination,
    };
  },
  name: "debt-report",
  components: {
    "app-table": AppTableVue,
  },
};
</script>

<style lang="scss" scoped></style>
