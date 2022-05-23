<template>
  <app-table
    :items="items"
    :columns="columns"
    :editable="false"
    title="План - бюджет"
    :searchable="false"
    :hide-pagination="true"
    :pagination="{ rowsPerPage: 0 }"
    :totalRow="{
      title: 'ИТОГО:',
      amount: total,
    }"
    :clickable="false"
  ></app-table>
</template>

<script>
import { ref, toRefs, computed } from "vue";
import AppTableVue from "../UI/table/AppTable.vue";

export default {
  props: {
    plans: {
      type: Array,
      require: true,
    },
    total: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  setup(props) {
    const { plans } = toRefs(props);

    const columns = ref([
      {
        name: "title",
        field: "title",
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
    ]);

    const items = computed(() => plans.value);

    return { columns, items };
  },
  components: {
    "app-table": AppTableVue,
  },
};
</script>

<style lang="scss" scoped></style>
