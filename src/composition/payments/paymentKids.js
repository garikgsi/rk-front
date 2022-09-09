import { computed } from "vue";
import kidsRepository from "@/composition/kids/kidsRepository";
import paymentRepository from "@/composition/payments/paymentsRepository";

export default function paymentKids() {
  const { allKidsItems, kidsLoaded } = kidsRepository();
  const { paymentsItems, paymentsLoaded } = paymentRepository();
  // console.log(paymentsItems.value);

  const paymentsByKids = computed(() => {
    if (paymentsLoaded.value && kidsLoaded.value) {
      const kidPaymentsArray = [...allKidsItems.value].map((kid) => {
        const kidPayments = [...paymentsItems.value].filter(
          (payment) => payment.kid_id == kid.id
        );
        const kidPaymentsSum = kidPayments.reduce(
          (acc, payment) => (acc += payment.amount),
          0
        );
        // console.log(kidPayments, kidPaymentsSum);
        return { ...kid, ...{ paySum: kidPaymentsSum, payments: kidPayments } };
      });

      const kids = {};
      kidPaymentsArray.forEach((kid) => {
        kids[kid.id] = kid;
      });

      return kids;
    }
    return [];
  });

  return {
    paymentsByKids,
  };
}
