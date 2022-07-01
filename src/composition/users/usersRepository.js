import { computed } from "vue";
import { useStore } from "vuex";

export default function usersRepository() {
  const store = useStore();
  // current user
  const userId = computed(() => store.state.user.user?.id || null);

  return {
    userId,
  };
}
