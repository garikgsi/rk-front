import { useStore } from "vuex";
import { computed } from "vue";
import currentOrganization from "@/composition/organizations/currentOrganization";
import moment from "moment";
import currentPeriod from "@/composition/periods/currentPeriod";

export default function kidsRepository() {
  const store = useStore();
  // current organization
  const { organizationId } = currentOrganization();
  const { period } = currentPeriod();

  // data loaded for organization
  const kidsLoaded = computed(() => {
    if (organizationId.value && period.value) {
      return store.state.kids.dataLoaded?.[organizationId.value];
    }
    return false;
  });

  const storeItems = computed(() => {
    if (organizationId.value && period.value) {
      const data = store.state.kids.all?.[organizationId.value];
      if (data) {
        return [...data].filter((kid) => {
          return (
            (kid.start_study === null && kid.end_study === null) ||
            (kid.start_study !== null &&
              moment(kid.start_study) > moment(period.value.start_date) &&
              moment(kid.start_study) < moment(period.value.end_date)) ||
            (kid.end_study !== null &&
              moment(kid.end_study) > moment(period.value.start_date))
          );
        });
      }
    }
    return [];
  });

  // all kids in organization
  const allKidsItems = computed(() => {
    if (organizationId.value && storeItems.value && period.value) {
      return [...storeItems.value]
        .map((kid) => {
          return {
            ...kid,
            ...{
              fio: `${kid.last_name} ${kid.name} ${
                kid.patronymic ? kid.patronymic : ""
              }`,
              isOut:
                kid.end_study !== null &&
                moment(kid.end_study) < moment(period.value.end_date) &&
                moment(kid.end_study) <= moment(),
            },
          };
        })
        .sort((a, b) => a.fio.localeCompare(b.fio));
    }
    return [];
  });

  // by default return only studieing kids
  const kidsItems = computed(() => {
    if (kidsLoaded.value) {
      return [...allKidsItems.value].filter((kid) => !kid.isOut);
    }
    return [];
  });

  // kids count
  const kidsCount = computed(() => {
    if (kidsLoaded.value) {
      return kidsItems.value.length;
    }
    return 0;
  });

  // fetch data params
  const defaultParams = computed(() => {
    return {
      filter: `organization_id eq ${organizationId.value}`,
      limit: 0,
    };
  });

  // fetch data for period
  const fetchKidsData = (params = {}) => {
    // console.log(`kids loaded=${kidsLoaded.value}`);
    if (organizationId.value && !kidsLoaded.value) {
      store.dispatch("kids/getKids", {
        params: { ...defaultParams.value, ...params },
      });
    }
  };

  return {
    kidsItems,
    allKidsItems,
    fetchKidsData,
    kidsLoaded,
    kidsCount,
    dataLoaded: kidsLoaded,
  };
}
