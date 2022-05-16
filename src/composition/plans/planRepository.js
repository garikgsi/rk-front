import { useStore } from "vuex";
import { computed } from "vue";

import currentPeriod from "@/composition/periods/currentPeriod";

export default function planRepository() {
  const store = useStore();
  const { periodId } = currentPeriod();

  // all plan items for period
  const planItems = computed(() => store.state.plans.all[periodId.value]);
  // data loaded
  const plansLoaded = computed(
    () => store.state.plans?.dataLoaded[periodId.value]
  );

  // sum plan amount
  const sumPlans = computed(() => {
    if (planItems.value)
      return [...planItems.value].reduce((acc, row) => {
        return acc + parseFloat(row.amount);
      }, 0);
    return 0;
  });

  // fetch data params
  const defaultParams = computed(() => {
    return {
      filter: `period_id eq ${periodId.value}`,
      limit: 0,
    };
  });

  // fetch data for period
  const fetchPlansData = async (params = {}) => {
    if (!plansLoaded.value && periodId?.value)
      return store.dispatch("plans/getPlans", {
        params: { ...defaultParams.value, ...params },
      });
  };

  return {
    planItems,
    fetchPlansData,
    plansLoaded,
    sumPlans,
  };
}
