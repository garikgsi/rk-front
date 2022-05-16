import { computed } from "vue";
import kidsRepository from "@/composition/kids/kidsRepository";
import paymentsRepository from "@/composition/payments/paymentsRepository";
import planRepository from "@/composition/plans/planRepository";

export default function debtReport() {
  const { kidsItems, kidsCount } = kidsRepository();
  const { paymentsItems } = paymentsRepository();
  const { sumPlans } = planRepository();

  // table data
  const debtData = computed(() => {
    const planPerKid = Math.round(sumPlans.value / kidsCount.value);
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
      let kidPaymentSum = kidPayments.reduce(
        (acc, payment) => (acc += parseFloat(payment.amount)),
        0
      );
      return {
        id: kid.id,
        fio: kid.fio,
        planSum: planPerKid,
        payments: kidPayments,
        paySum: kidPaymentSum,
        debt: kidPaymentSum - planPerKid,
      };
    });
  });

  return { debtData };
}
