import paymentsRepository from "@/composition/payments/paymentsRepository";

export default function paymentSearch() {
  const { paymentsItems } = paymentsRepository();

  const getPaymentById = (id) => {
    if (paymentsItems.value) {
      return [...paymentsItems.value].find((item) => item.id == id);
    }
    return null;
  };

  return { getPaymentById };
}
