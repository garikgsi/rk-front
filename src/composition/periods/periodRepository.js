import { computed } from "vue";
import { useStore } from "vuex";
import { addError } from "@/composition/addMessage";
import { watch } from "vue";
import planRepository from "@/composition/plans/planRepository";
import operationsRepository from "@/composition/operations/operationsRepository";
import paymentsRepository from "@/composition/payments/paymentsRepository";

export default function periodRepository() {
  const store = useStore();
  // getters from store
  const periods = computed(() => store.state.periods.all);
  const currentPeriod = computed(() => store.getters["periods/currentPeriod"]);
  const currentPeriodId = computed(() => store.state.periods.current);
  const dataLoaded = computed(() => store.state.periods.dataLoaded);

  const { fetchPlansData } = planRepository();
  const { fetchOperationsData } = operationsRepository();
  const { fetchPaymentsData } = paymentsRepository();

  // change current period
  const changePeriod = (id) => {
    return store.dispatch("periods/changePeriod", { id });
  };

  // add new period
  const addPeriod = async ({ data }) => {
    // return promise
    const response = store.dispatch("periods/addPeriod", { data });
    const { isError, error } = response;
    if (isError) {
      addError(error);
    }
    return response;
  };
  // edit period
  const editPeriod = async ({ id, data }) => {
    // return promise
    const response = store.dispatch("periods/editPeriod", {
      id,
      data,
    });
    const { isError, error } = response;
    if (isError) {
      addError(error);
    }
    return response;
  };
  // get periods
  const getPeriods = async ({ params = {} }) => {
    if (!dataLoaded.value) {
      const response = store.dispatch("periods/getPeriods", { params });
      const { isError, error } = response;
      if (isError) {
        addError(error);
        return false;
      } else {
        return true;
      }
    }
  };

  // actions on period changed
  watch(currentPeriod, (newPeriod, oldPeriod) => {
    if (oldPeriod?.id !== newPeriod.id) {
      fetchPlansData();
      fetchOperationsData();
      fetchPaymentsData();
    }
  });

  return {
    periods,
    currentPeriod,
    currentPeriodId,
    changePeriod,
    addPeriod,
    editPeriod,
    getPeriods,
  };
}
