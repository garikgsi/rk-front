import { useStore } from "vuex";
import { computed } from "vue";

export default function currentOrganization() {
  const store = useStore();
  const organizationId = computed(() => store.state.organizations.current);
  const organization = computed(() => {
    // () => store.getters["organizations/currentOrganization"]
    if (organizationId.value) {
      return store.state.organizations.all.find(
        (org) => org.id == organizationId.value
      );
    }
    return null;
  });
  const isAdmin = computed(() => {
    return organization.value?.is_admin || false;
  });

  return { organizationId, organization, isAdmin };
}
