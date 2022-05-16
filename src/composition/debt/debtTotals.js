import { computed } from "vue";

export default function debtTotals(data) {
  // total row
  const totals = computed(() =>
    data.value.reduce(
      (acc, row) => {
        return {
          planSum: (acc.planSum += row.planSum),
          paySum: (acc.paySum += row.paySum),
          debt: (acc.debt += row.debt),
        };
      },
      { planSum: 0, paySum: 0, debt: 0 }
    )
  );

  return { totals };
}
