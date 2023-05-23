import { useStore } from "vuex";
import { computed } from "vue";

import currentPeriod from "@/composition/periods/currentPeriod";

export default function operationRepository() {
  const store = useStore();
  const { periodId } = currentPeriod();

  // all operations items for period
  const operationItems = computed(() =>
    periodId.value ? store.state.operations.all?.[periodId.value] : []
  );
  // data loaded for period
  const operationsLoaded = computed(
    () => store.state.operations?.dataLoaded?.[periodId.value] || false
  );

  // fetch data params
  const defaultParams = computed(() => {
    return {
      filter: `period_id eq ${periodId.value}`,
      limit: 0,
    };
  });

  // fetch data for period
  const fetchOperationsData = (params = {}) => {
    if (!operationsLoaded.value && periodId.value) {
      store.dispatch("operations/getOperations", {
        params: { ...defaultParams.value, ...params },
      });
    }
  };

  // sum operations amount
  const sumOperations = computed(() => {
    if (operationsLoaded.value) {
      const sumOp = [...operationItems.value].reduce((acc, row) => {
        return acc + parseFloat(row.amount);
      }, 0);
      return Math.round(sumOp * 100) / 100;
    }
    return 0;
  });

  return {
    operationItems,
    fetchOperationsData,
    sumOperations,
    operationsLoaded,
  };
}
