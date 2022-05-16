import { useStore } from "vuex";
import { computed } from "vue";

export default function currentPeriod() {
  const store = useStore();
  const period = computed(() => store.getters["periods/currentPeriod"]);
  const periodId = computed(() => store.state.periods.current);

  return { periodId, period };
}
