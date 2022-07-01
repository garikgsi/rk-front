<template>
  <organization-require
    title="Выберите учебное учреждение для которого показать отчет"
  >
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
      :clickable="false"
      v-model:search="tableSearchString"
      :pagination="pagination"
      @update:pagination="updatePagination"
    ></app-table>
  </organization-require>
</template>

<script>
import AppTableVue from "../UI/table/AppTable.vue";

import debtReport from "@/composition/debt/debtReport";
import debtFilter from "@/composition/debt/debtFilter";
import debtTotals from "@/composition/debt/debtTotals";
import tablePagination from "@/composition/tablePagination";
import OrganizationRequeryVue from "@/views/organizations/OrganizationRequery.vue";

import { ref, computed } from "vue";
export default {
  setup() {
    const { debtData } = debtReport();

    const { filteredData, tableSearchString } = debtFilter(debtData);

    const tableData = computed(() => {
      return [...filteredData.value].filter((kid) => kid.debt < 0);
    });

    const { totals } = debtTotals(filteredData);

    const columns = ref([
      {
        name: "fio",
        field: "fio",
        label: "ФИО",
        align: "left",
        sortable: true,
        type: "string",
        mobile: "title",
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
        mobile: "subTitle",
      },
    ]);

    // table pagination from store
    const { pagination, updatePagination } = tablePagination("debt");

    return {
      items: tableData,
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
    "organization-require": OrganizationRequeryVue,
  },
};
</script>

<style lang="scss" scoped></style>
