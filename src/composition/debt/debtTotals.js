import { computed } from "vue";
import debtReport from "@/composition/debt/debtReport";
import { fm } from "@/composition/math";

export default function debtTotals(data) {
  const calcSum = (data) => {
    const sums = data.reduce(
      (acc, row) => {
        return {
          planSum: (acc.planSum += row.planSum),
          paySum: (acc.paySum += row.paySum),
          debt: (acc.debt += row.debt < 0 ? row.debt : 0),
        };
      },
      { planSum: 0, paySum: 0, debt: 0 }
    );
    // format sums
    for (const i in sums) {
      sums[i] = fm(sums[i]);
    }

    return sums;
  };

  // sum oll debt
  const { debtData } = debtReport();
  const sumDebt = computed(() => {
    return calcSum(debtData.value);
  });

  // total row
  const totals = computed(() => {
    return calcSum(data.value);
  });

  return { totals, sumDebt };
}
