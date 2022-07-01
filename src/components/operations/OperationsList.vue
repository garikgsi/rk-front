<template>
  <organization-require
    title="Выберите учебное учреждение для которого показать расходные операции"
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
import AppTableVue from "@/components/UI/table/AppTable.vue";

import { computed, watch, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import currentPeriod from "@/composition/periods/currentPeriod";
import operationsRepository from "@/composition/operations/operationsRepository";
import tablePagination from "@/composition/tablePagination";
import currentOrganization from "@/composition/organizations/currentOrganization";
import OrganizationRequeryVue from "@/views/organizations/OrganizationRequery.vue";

export default {
  name: "operations-list",
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
          name: "date_operation",
          field: "date_operation",
          label: "Дата",
          sortable: true,
          align: "left",
          sortOrder: "ad",
          type: "date",
        },
        {
          name: "comment",
          field: "comment",
          label: "Комментарий",
          align: "left",
          sortable: false,
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
          name: "image",
          field: "image",
          label: "Чек/накладная",
          align: "right",
          sortable: false,
          type: "image",
          mobile: "link",
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
    // all operations data for period
    const { operationItems, fetchOperationsData } = operationsRepository();
    // is loading prop for plans
    const loading = computed(() => store.state.operations.loading);
    // search line
    let tableSearchString = ref("");

    // fetch data on mounting
    onMounted(() => {
      fetchOperationsData();
    });

    // refresh data with new period
    watch(periodId, () => {
      fetchOperationsData();
    });

    // formatted table rows
    const tableRows = computed(() => {
      if (operationItems.value) {
        let res = [...operationItems.value];
        if (tableSearchString.value && tableSearchString.value.length > 0) {
          res = res.filter((row) => {
            return (
              row.comment
                .toLowerCase()
                .indexOf(tableSearchString.value.toLowerCase()) > -1
            );
          });
        }
        res = res.map((row) => {
          return {
            id: row.id,
            comment: row.comment,
            amount: row.amount,
            date_operation: row.date_operation,
            image: row.image ? row.image : row.check_url ? row.check_url : "",
          };
        });

        return res;
      }
      return [];
    });

    // calc itog amount
    const totalAmount = computed(() => {
      return [...tableRows.value].reduce((acc, row) => {
        return acc + parseFloat(row.amount);
      }, 0);
    });

    // table pagination from store
    const { pagination, updatePagination } = tablePagination("operations");

    // remove row
    const remove = (id) => {
      store.dispatch("operations/removeOperation", { id, params: {} });
    };

    // row click
    const rowClick = (evt, row) => {
      router.push({
        name: "operations-form",
        params: { id: row.id, mode: "view" },
      });
    };
    // CRUD
    // click add
    const addClick = () => {
      router.push({ name: "operations-form" });
    };
    // click edit
    const editClick = (row) => {
      router.push({
        name: "operations-form",
        params: { id: row.id, mode: "edit" },
      });
    };
    // click copy
    const copyClick = (row) => {
      router.push({
        name: "operations-form",
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
