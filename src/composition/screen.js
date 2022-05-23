import { useQuasar } from "quasar";
import { computed } from "vue";

export default function screen() {
  const $q = useQuasar();
  const isPhone = computed(() => $q.screen.lt.sm);
  const screenSize = computed(() => $q.screen);

  return {
    isPhone,
    screenSize,
  };
}
