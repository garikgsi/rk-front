<template>
  <app-table
    :items="items"
    :columns="columns"
    :editable="false"
    title="Расходные операции"
    v-model:search="tableSearchString"
    :pagination="pagination"
    @update:pagination="updatePagination"
    :totalRow="{
      date_operation: 'ИТОГО:',
      amount: total,
    }"
    :clickable="false"
  ></app-table>
</template>

<script>
import { ref, toRefs, computed } from "vue";
import tablePagination from "@/composition/tablePagination";
import AppTableVue from "../UI/table/AppTable.vue";
export default {
  props: {
    operations: {
      type: Array,
      require: true,
    },
  },
  setup(props) {
    const columns = ref([
      {
        name: "date_operation",
        field: "date_operation",
        label: "Дата",
        align: "left",
        sortable: true,
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
        name: "amount",
        field: "amount",
        label: "Сумма",
        align: "right",
        sortable: false,
        type: "money",
        mobile: "subTitle",
      },
      {
        name: "check",
        field: "check",
        label: "Чек/накладная",
        align: "right",
        sortable: false,
        type: "image",
        mobile: "link",
      },
    ]);

    const tableSearchString = ref("");
    const { operations } = toRefs(props);

    const items = computed(() => {
      return tableSearchString.value
        ? [...operations.value].filter(
            (operation) =>
              operation.comment
                .toLowerCase()
                .indexOf(tableSearchString.value.toLowerCase()) !== -1
          )
        : operations.value;
    });

    const total = computed(() => {
      return items.value
        ? items.value.reduce((acc, item) => (acc += item.amount), 0)
        : 0;
    });

    // table pagination from store
    const { pagination, updatePagination } = tablePagination("public");
    const reportPagination = computed(() => {
      return { ...pagination.value, ...{ rowsPerPage: 10 } };
    });

    return {
      columns,
      pagination: reportPagination,
      updatePagination,
      items,
      tableSearchString,
      total,
    };
  },
  components: {
    "app-table": AppTableVue,
  },
};
</script>

<style lang="scss" scoped></style>
