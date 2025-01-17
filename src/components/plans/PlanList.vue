<template>
  <organization-require
    title="Выберите учебное учреждение для которого показать запланированные расходы"
  >
    <app-table
      :items="items"
      :columns="columns"
      :editable="isAdmin"
      :addable="isAdmin"
      :totalRow="{ title: 'ИТОГО:', amount: totalAmount }"
      v-model:search="tableSearchString"
      :pagination="pagination"
      @update:pagination="updatePagination"
      @row-click="rowClick"
      @add-click="addClick"
      @edit-click="editClick"
      @copy-click="copyClick"
      @delete-click="deleteClick"
    ></app-table>
  </organization-require>
</template>

<script>
import AppTableVue from "../UI/table/AppTable.vue";

import { computed, watch, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { fm } from "@/composition/math";

import currentPeriod from "@/composition/periods/currentPeriod";
import planRepository from "@/composition/plans/planRepository";
import tablePagination from "@/composition/tablePagination";
import currentOrganization from "@/composition/organizations/currentOrganization";
import OrganizationRequeryVue from "@/views/organizations/OrganizationRequery.vue";

export default {
  name: "plan-list",
  components: {
    "app-table": AppTableVue,
    "organization-require": OrganizationRequeryVue,
  },

  setup() {
    // vuex store
    const store = useStore();
    // router
    const router = useRouter();
    // admin permissions
    const { isAdmin } = currentOrganization();
    // table columns
    const columns = computed(() => {
      let columns = [
        {
          name: "title",
          field: "title",
          label: "Статья расходов",
          sortable: false,
          align: "left",
          type: "string",
          mobile: "title",
        },
        {
          name: "amount",
          field: "amount",
          label: "Сумма",
          align: "right",
          sortable: false,
          type: "money",
          mobile: "subTitle",
        },
        {
          name: "start_bill_date",
          field: "start_bill_date",
          label: "Дата начала учета",
          sortable: true,
          align: "left",
          type: "date",
          mobile: "start_bill_date",
        },
        {
          name: "kid_fio",
          field: "kid_fio",
          label: "Для учащегося",
          sortable: true,
          type: "kid",
          mobile: "kid_fio",
        },
      ];
      if (isAdmin.value) {
        columns.push({
          name: "actions",
          field: "actions",
          label: "",
          align: "right",
          sortable: false,
          type: "actions",
        });
      }
      return columns;
    });
    // current period
    const { periodId } = currentPeriod();
    // all plans data for period
    const { planItems, fetchPlansData } = planRepository();
    // is loading prop for plans
    const loading = computed(() => store.state.plans.loading);
    // search line
    let tableSearchString = ref("");

    // fetch data on mounting
    onMounted(() => {
      fetchPlansData();
    });

    // refresh data with new period
    watch(periodId, () => {
      fetchPlansData();
    });

    // formatted table rows
    const tableRows = computed(() => {
      if (planItems.value) {
        let res = [...planItems.value];
        if (tableSearchString.value && tableSearchString.value.length > 0) {
          res = res.filter((row) => {
            return (
              row.title
                .toLowerCase()
                .indexOf(tableSearchString.value.toLowerCase()) > -1
            );
          });
        }
        res = res.map((row) => {
          return {
            id: row.id,
            title: row.title,
            amount: row.amount,
            start_bill_date: row.start_bill_date,
            kid_fio: row.kid_fio,
          };
        });

        return res;
      }
      return [];
    });

    // calc itog amount
    const totalAmount = computed(() => {
      return fm(
        [...tableRows.value].reduce((acc, row) => {
          return acc + parseFloat(row.amount);
        }, 0)
      );
    });

    // remove row
    const remove = (id) => {
      store.dispatch("plans/removePlan", { id, params: {} });
    };

    // table pagination from store
    const { pagination, updatePagination } = tablePagination("plans");

    // row click
    const rowClick = (evt, row) => {
      router.push({
        name: "plan-form",
        params: { id: row.id, mode: "view" },
      });
    };
    // CRUD
    // click add
    const addClick = () => {
      router.push({ name: "plan-form" });
    };
    // click edit
    const editClick = (row) => {
      router.push({
        name: "plan-form",
        params: { id: row.id, mode: "edit" },
      });
    };
    // click copy
    const copyClick = (row) => {
      router.push({
        name: "plan-form",
        params: { id: row.id, mode: "copy" },
      });
    };
    // click delete
    const deleteClick = (row) => {
      remove(row.id);
    };

    return {
      items: tableRows,
      columns,
      totalAmount,
      loading,
      deleteClick,
      pagination,
      updatePagination,
      tableSearchString,
      rowClick,
      addClick,
      editClick,
      copyClick,
      isAdmin,
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
