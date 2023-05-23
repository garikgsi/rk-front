import { useStore } from "vuex";
import { computed } from "vue";

export default function currentPeriod() {
  const store = useStore();
  const periodId = computed(
    () => store.state.periods.current[store.state.organizations.current]
  );
  const period = computed(() => {
    try {
      return store.state.periods.all?.[store.state.organizations.current].find(
        (period) => period.id == periodId.value
      );
    } catch (error) {
      return null;
    }
  });

  return { periodId, period };
}
