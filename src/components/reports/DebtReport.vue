<template>
  <organization-require
    title="Выберите учебное учреждение для которого показать отчет"
  >
    <app-table
      v-if="isAdmin"
      :items="items"
      :columns="columns"
      :editable="false"
      :addable="false"
      :clickable="true"
      v-model:search="tableSearchString"
      :pagination="tablePagination"
      :total-row="totals"
      @update:pagination="updatePagination"
      @row-click="showDetails"
    ></app-table>
    <div v-else>
      <h1>Просматривать отчет по долгам могут только администраторы</h1>
    </div>
  </organization-require>
</template>

<script>
import AppTableVue from "../UI/table/AppTable.vue";

import OrganizationRequeryVue from "@/views/organizations/OrganizationRequery.vue";
import currentOrganization from "@/composition/organizations/currentOrganization";
import currentPeriod from "@/composition/periods/currentPeriod";
import debtReport from "@/composition/debt/debtReport";

import { ref, onMounted, watch } from "vue";
import router from "@/router";
export default {
  setup() {
    const { periodId } = currentPeriod();

    const {
      search,
      formattedDebt,
      fetchDebt,
      tablePagination,
      updatePagination,
      total,
    } = debtReport();

    // is user == admin of organizations
    const { isAdmin } = currentOrganization();

    onMounted(() => {
      console.log("mounted debt report", periodId.value);
      if (periodId.value) fetchData(periodId);
    });

    const fetchData = async (periodId) => {
      if (periodId.value) {
        return await fetchDebt(periodId);
      }
      return null;
    };

    const showDetails = (event, row) => {
      router.push({
        path: "/debt_details",
        query: { period_id: periodId.value, kid_id: row.id },
      });
      if (row.id) console.log("row clicked", row);
    };

    watch(periodId, () => {
      // console.log("fetch debt report with new period", newPeriodId);
      fetchData(periodId);
    });

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

    return {
      items: formattedDebt,
      columns,
      tableSearchString: search,
      tablePagination,
      totals: total,
      isAdmin,
      updatePagination,
      showDetails,
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
