<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    dense
    no-data-label="Нет данных"
    :hide-pagination="true"
    :hide-header="true"
  >
    <!-- table header -->
    <template v-slot:top>
      <div class="text-h5 text-primary">Сводная таблица</div>
    </template>
    <!-- money formatter -->
    <template v-slot:body-cell-amount="props">
      <q-td :props="props">
        <span :class="{ 'text-negative': parseFloat(props.row.amount) < 0 }">{{
          props.row.amount
        }}</span>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { computed, toRefs, ref } from "vue";
export default {
  props: {
    totals: {
      type: Object,
      require: true,
    },
  },
  setup(props) {
    const { totals } = toRefs(props);

    const items = computed(() => {
      return [
        { id: 0, title: "Остаток на начало:", amount: totals.value.startDebt },
        { id: 1, title: "Всего сдано:", amount: totals.value.payments },
        { id: 2, title: "Потрачено:", amount: -totals.value.operations },
        {
          id: 3,
          title: "Остаток текущий:",
          amount:
            totals.value.startDebt +
            totals.value.payments -
            totals.value.operations,
        },
        {
          id: 4,
          title: "Долги (не сдано):",
          amount: totals.value.payments - totals.value.plans,
        },
      ];
    });

    const columns = ref([
      {
        name: "title",
        field: "title",
        label: "Комментарий",
        align: "left",
        sortable: false,
        type: "string",
      },
      {
        name: "amount",
        field: "amount",
        label: "Сумма",
        align: "right",
        sortable: false,
        type: "money",
      },
    ]);

    return { items, columns };
  },
};
</script>

<style lang="scss" scoped></style>
