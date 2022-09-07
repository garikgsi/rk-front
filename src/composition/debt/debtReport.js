import { computed } from "vue";
import moment from "moment";

import kidsRepository from "@/composition/kids/kidsRepository";
import paymentsRepository from "@/composition/payments/paymentsRepository";
import planRepository from "@/composition/plans/planRepository";

export default function debtReport() {
  const { allKidsItems: kidsItems } = kidsRepository();
  const { planItems } = planRepository();
  // const { kidsItems, kidsCount } = kidsRepository();
  // const { sumPlans, planItems } = planRepository();
  const { paymentsItems } = paymentsRepository();

  // all kids with outed
  const debtDataWithOut = computed(() => {
    // const planPerKid = Math.round(sumPlans.value / kidsCount.value);
    if (planItems.value && kidsItems.value && paymentsItems.value) {
      const defPlanPerKid = [...planItems.value].reduce(
        (acc, plan) => (acc += plan.price),
        0
      );
      // console.log(planItems.value);
      return kidsItems.value.map((kid) => {
        let kidPayments = paymentsItems.value
          ? paymentsItems.value
              .filter((payments) => payments.kid_id == kid.id)
              .map((payment) => {
                return {
                  id: payment.id,
                  comment: payment.comment,
                  amount: payment.amount,
                };
              })
          : [];
        let kidPaymentSum = paymentsItems.value
          ? kidPayments.reduce(
              (acc, payment) => (acc += parseFloat(payment.amount)),
              0
            )
          : 0;

        // forming debt from start study date
        let kidPlans = defPlanPerKid;
        if (kid.start_study !== null) {
          kidPlans = [...planItems.value].reduce((acc, plan) => {
            if (moment(kid.start_study) <= moment(plan.created_at)) {
              acc += plan.price;
            }
            return acc;
          }, 0);
        }

        return {
          id: kid.id,
          fio: kid.fio,
          isOut: kid.isOut,
          planSum: kidPlans,
          payments: kidPayments,
          paySum: kidPaymentSum,
          debt: kidPaymentSum - kidPlans,
        };
      });
    }
    return [];
  });

  // table data with only has debts and outed or studieng
  const debtData = computed(() => {
    return debtDataWithOut.value.filter(
      (kid) => kid.isOut === false || (kid.isOut === true && kid.debt != 0)
    );
  });

  return { debtData };
}
