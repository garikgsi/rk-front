import { computed } from "vue";
import { useStore } from "vuex";
import { addError, addInfo } from "@/composition/addMessage";
import { watch } from "vue";
import periodRepository from "@/composition/periods/periodRepository";
import kidsRepository from "@/composition/kids/kidsRepository";

export default function organizationRepository() {
  const store = useStore();
  // getters from store
  const organizations = computed(() => store.state.organizations.all);
  // current organization id
  const currentOrganizationId = computed(
    () => store.state.organizations.current
  );
  // data already loaded
  const dataLoaded = computed(() => store.state.organizations.dataLoaded);
  // count of organizations
  const organizationsCount = computed(() => organizations.value.length);
  // fetch belongs data
  const { fetchPeriods } = periodRepository();
  const { fetchKidsData } = kidsRepository();

  // change current organization
  const changeOrganization = async (id) => {
    return await store
      .dispatch("organizations/changeOrganization", { id })
      .then(() => {
        fetchPeriods();
        fetchKidsData();
      });
  };

  // add new organization
  const addOrganization = async ({ data }) => {
    // return promise
    const response = store.dispatch("periods/addPeriod", { data });
    const { isError, error } = response;
    if (isError) {
      addError(error);
    }
    return response;
  };
  // edit organization
  const removeOrganization = async ({ id }) => {
    // return promise
    const response = store.dispatch("organizations/removeOrganization", {
      id,
    });
    const { isError, error } = response;
    if (isError) {
      addError(error);
    } else {
      addInfo(`Запись успешно удалена`);
    }
    return response;
  };
  // edit period
  const editOrganization = async ({ id, data }) => {
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
  // get organizations
  const getOrganizations = async ({ params = {} }) => {
    // console.log(`get orgs, dataLoaded=${dataLoaded.value}`);
    if (!dataLoaded.value) {
      // console.log(`requested organizations...`);
      const response = store.dispatch("organizations/getOrganizations", {
        params,
      });
      const { isError, error } = response;
      if (isError) {
        addError(error);
        return false;
      } else {
        return true;
      }
    }
  };

  // fetch all organizations
  const fetchOrganizations = async () => {
    return getOrganizations({}).then(() => {
      if (organizationsCount.value == 1)
        changeOrganization(organizations.value[0].id);
      // fetchPeriods();
      // fetchKidsData();
    });
  };

  // actions on organization changed
  watch(currentOrganizationId, (newOrganization, oldOrganization) => {
    if (oldOrganization !== newOrganization) {
      // fetchPeriods();
      // fetchKidsData();
    }
  });

  return {
    organizations,
    organizationsCount,
    dataLoaded,
    changeOrganization,
    addOrganization,
    editOrganization,
    getOrganizations,
    removeOrganization,
    fetchOrganizations,
  };
}
