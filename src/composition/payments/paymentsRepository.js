import { useStore } from "vuex";
import { computed } from "vue";
import kidSearch from "@/composition/kids/kidSearch";

import currentPeriod from "@/composition/periods/currentPeriod";

export default function operationRepository() {
  const store = useStore();
  const { periodId } = currentPeriod();

  // kid search function
  const { getKidById } = kidSearch();

  // data loaded for period
  const dataLoaded = computed(
    () => store.state.payments?.dataLoaded[periodId.value] || false
  );

  // all operations items for period
  const paymentsItems = computed(() => {
    if (periodId.value && dataLoaded.value) {
      return [...store.state.payments.all[periodId.value]].map((payment) => {
        let modPayment = { ...payment };
        if (payment.kid_id) {
          const kid = getKidById(payment.kid_id);
          modPayment.kid = kid.fio;
        }
        return modPayment;
      });
    }
    return [];
  });
  // data loaded
  const paymentsLoaded = computed(() => store.state.payments.dataLoaded);

  // fetch data params
  const defaultParams = computed(() => {
    return {
      filter: `period_id eq ${periodId.value}`,
      limit: 0,
    };
  });

  // fetch data for period
  const fetchPaymentsData = (params = {}) => {
    if (!dataLoaded.value && periodId?.value) {
      store.dispatch("payments/getPayments", {
        params: { ...defaultParams.value, ...params },
      });
    }
  };

  // sum operations amount
  const sumPayments = computed(() => {
    if (paymentsItems.value)
      return [...paymentsItems.value].reduce((acc, row) => {
        return acc + parseFloat(row.amount);
      }, 0);
    return 0;
  });

  return {
    paymentsItems,
    fetchPaymentsData,
    sumPayments,
    paymentsLoaded,
  };
}
