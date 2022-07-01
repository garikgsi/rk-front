<template>
  <organization-require
    title="Чтобы просмотреть оплаты выберите сначала учебное заведение"
  >
    <app-table
      :items="items"
      :columns="columns"
      :editable="isAdmin"
      :addable="isAdmin"
      :totalRow="{ title: 'ИТОГО:', amount: sumPayments }"
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

import tablePagination from "@/composition/tablePagination";
import currentPeriod from "@/composition/periods/currentPeriod";
import paymentsRepository from "@/composition/payments/paymentsRepository";
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
          name: "date_payment",
          field: "date_payment",
          label: "Дата оплаты",
          sortable: true,
          align: "left",
          sortOrder: "ad",
          type: "date",
          mobile: "right",
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
          name: "kid",
          field: "kid",
          label: "За кого",
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
      ];
      if (isAdmin.value)
        columns.push({
          name: "actions",
          field: "actions",
          label: "",
          align: "right",
          sortable: false,
          type: "actions",
        });
      return columns;
    });

    // current period
    const { periodId } = currentPeriod();
    // all operations data for period
    const { paymentsItems, fetchPaymentsData, sumPayments } =
      paymentsRepository();
    // is loading prop for plans
    const loading = computed(() => store.state.payments.loading);
    // search line
    let tableSearchString = ref("");

    // fetch data on mounting
    onMounted(() => {
      fetchPaymentsData();
    });

    // refresh data with new period
    watch(periodId, () => {
      fetchPaymentsData();
    });

    // formatted table rows
    const tableRows = computed(() => {
      if (paymentsItems.value) {
        let res = [...paymentsItems.value];
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
            kid: row.kid,
            amount: row.amount,
            date_payment: row.date_payment,
          };
        });

        return res;
      }
      return [];
    });

    // table pagination from store
    const { pagination, updatePagination } = tablePagination("payments");

    // remove row
    const remove = (id) => {
      store.dispatch("payments/removePayment", { id, params: {} });
    };

    // row click
    const rowClick = (evt, row) => {
      router.push({
        name: "payments-form",
        params: { id: row.id, mode: "view" },
      });
    };
    // CRUD
    // click add
    const addClick = () => {
      router.push({ name: "payments-form" });
    };
    // click edit
    const editClick = (row) => {
      router.push({
        name: "payments-form",
        params: { id: row.id, mode: "edit" },
      });
    };
    // click copy
    const copyClick = (row) => {
      router.push({
        name: "payments-form",
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
      sumPayments,
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
