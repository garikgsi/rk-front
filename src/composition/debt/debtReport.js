import { computed } from "vue";
// import moment from "moment";

import kidsRepository from "@/composition/kids/kidsRepository";
import paymentsRepository from "@/composition/payments/paymentsRepository";
import planRepository from "@/composition/plans/planRepository";
import planKids from "@/composition/plans/planKids";
import paymentKids from "@/composition/payments/paymentKids";
import { fm } from "@/composition/math";

export default function debtReport() {
  const { kidsLoaded, allKidsItems } = kidsRepository();
  const { plansLoaded } = planRepository();
  const { paymentsLoaded } = paymentsRepository();
  const { sumPlanByKids } = planKids();
  const { paymentsByKids } = paymentKids();

  // debts per kid
  const debtData = computed(() => {
    if (kidsLoaded.value && plansLoaded.value && paymentsLoaded.value) {
      const completeData = [...allKidsItems.value].map((kid) => {
        return {
          ...kid,
          ...{
            planSum: sumPlanByKids.value[kid.id]?.planSum
              ? sumPlanByKids.value[kid.id].planSum
              : 0,
            paySum: paymentsByKids.value[kid.id]?.paySum
              ? paymentsByKids.value[kid.id].paySum
              : 0,
          },
        };
      });

      return completeData
        .map((kid) => {
          return {
            ...kid,
            ...{
              debt: fm(kid.paySum - kid.planSum),
              planSum: fm(kid.planSum),
              paySum: fm(kid.paySum),
            },
          };
        })
        .filter(
          (kid) => kid.isOut === false || (kid.isOut === true && kid.debt != 0)
        );
    }
    return [];
  });

  return { debtData };
}
