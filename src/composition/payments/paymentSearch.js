import paymentsRepository from "@/composition/payments/paymentsRepository";

export default function paymentSearch() {
  const { paymentsItems } = paymentsRepository();

  const getPaymentById = (id) => {
    if (paymentsItems.value) {
      const payment = [...paymentsItems.value].find((item) => item.id == id);
      if (payment) return { ...payment };
    }
    return null;
  };

  return { getPaymentById };
}
