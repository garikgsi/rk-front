<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    dense
    square
    no-data-label="Нет данных"
    :hide-pagination="true"
    :hide-header="true"
    :pagination="{ rowsPerPage: 0 }"
  >
    <!-- table header -->
    <template v-slot:top>
      <div class="text-h5 text-primary">Сводная таблица</div>
    </template>
    <!-- money formatter -->
    <template v-slot:body-cell-amount="props">
      <q-td :props="props">
        <span :class="{ 'text-negative': parseFloat(props.row.amount) < 0 }">{{
          fm(props.row.amount)
        }}</span>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { computed, toRefs, ref } from "vue";
import { fm } from "@/composition/math";
export default {
  props: {
    totals: {
      type: Object,
      require: true,
    },
  },
  setup(props) {
    const { totals } = toRefs(props);

    const formatTotals = computed(() => {
      const vals = [
        "startDebt",
        "payments",
        "operations",
        "plans",
        "startSaldo",
        "currentSaldo",
      ];
      let res = {};
      for (let key of vals) {
        if (isNaN(totals.value[key])) {
          res[key] = 0;
        } else {
          res[key] = totals.value[key];
        }
      }

      return res;
    });

    const items = computed(() => {
      return [
        {
          id: 0,
          title: "Остаток на начало:",
          amount: formatTotals.value.startSaldo,
        },
        { id: 1, title: "Всего сдано:", amount: formatTotals.value.payments },
        { id: 2, title: "Потрачено:", amount: -formatTotals.value.operations },
        {
          id: 3,
          title: "Остаток текущий:",
          amount: fm(
            // formatTotals.value.startSaldo +
            //   formatTotals.value.startDebt +
            //   formatTotals.value.payments -
            //   formatTotals.value.operations
            formatTotals.value.currentSaldo
          ),
        },
        {
          id: 4,
          title: "Долг:",
          amount: fm(formatTotals.value.payments - formatTotals.value.plans),
        },
        {
          id: 5,
          title: "Долги прошлых периодов:",
          amount: fm(formatTotals.value.startDebt),
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

    return { items, columns, formatTotals, fm };
  },
};
</script>

<style lang="scss" scoped></style>
