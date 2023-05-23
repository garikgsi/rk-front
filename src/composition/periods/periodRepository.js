import { computed } from "vue";
import { useStore } from "vuex";
import { addError } from "@/composition/addMessage";
import { watch } from "vue";
import planRepository from "@/composition/plans/planRepository";
import operationsRepository from "@/composition/operations/operationsRepository";
import paymentsRepository from "@/composition/payments/paymentsRepository";
import currentOrganization from "@/composition/organizations/currentOrganization";

export default function periodRepository() {
  const store = useStore();
  const { organizationId } = currentOrganization();
  // getters from store
  const periods = computed(() => {
    if (
      organizationId.value &&
      store.state.periods.all?.[organizationId.value]
    ) {
      return store.state.periods.all[organizationId.value].filter(
        (period) => period.organization_id == organizationId.value
      );
    }
    return [];
  });
  const currentPeriodId = computed(() => {
    return store.state.periods.current?.[organizationId.value] || null;
  });
  const currentPeriod = computed(() => {
    if (
      currentPeriodId.value &&
      store.state.periods.all?.[organizationId.value]
    ) {
      return store.state.periods.all[organizationId.value].find(
        (period) => period.id == currentPeriodId.value
      );
    }
    return null;
  });

  const dataLoaded = computed(() => {
    // console.log(
    //   `periods loaded=${
    //     store.state.periods.dataLoaded[organizationId.value] === true
    //   }`
    // );
    return (
      store.state.periods.dataLoaded?.[organizationId.value] === true || false
    );
  });
  const periodsCount = computed(() => periods.value.length);

  const { fetchPlansData } = planRepository();
  const { fetchOperationsData } = operationsRepository();
  const { fetchPaymentsData } = paymentsRepository();

  // change current period
  const changePeriod = (id) => {
    return store.dispatch("periods/changePeriod", { id }).then(() => {
      fetchPlansData();
      fetchOperationsData();
      fetchPaymentsData();
    });
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

  // fetch periods data params
  const defaultPeriodsParams = computed(() => {
    return {
      filter: `organization_id eq ${organizationId.value}`,
      limit: 0,
    };
  });
  // fetch periods for organization
  const fetchPeriods = async (params = {}) => {
    // console.log(`get orgs, dataLoaded=${dataLoaded.value}`);

    if (!dataLoaded.value && organizationId.value) {
      // console.log(`frequesting periods for org=${organizationId.value}...`);
      return getPeriods({
        params: { ...defaultPeriodsParams.value, ...params },
      });
    }
  };

  // actions on period changed
  watch(currentPeriod, (newPeriod, oldPeriod) => {
    if (oldPeriod?.id !== newPeriod?.id) {
      // fetchPlansData();
      // fetchOperationsData();
      // fetchPaymentsData();
    }
  });

  return {
    periods,
    periodsCount,
    currentPeriod,
    currentPeriodId,
    changePeriod,
    addPeriod,
    editPeriod,
    getPeriods,
    dataLoaded,
    fetchPeriods,
  };
}
