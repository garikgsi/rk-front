import { useStore } from "vuex";
import { computed } from "vue";

export default function parentsRepository() {
  const store = useStore();
  // data loaded for period
  const dataLoaded = computed(() => store.state.parents?.dataLoaded || false);

  // all operations items for period
  const parentsItems = computed(() => {
    if (dataLoaded.value) {
      return store.state.parents.all.map((parent) => {
        return {
          ...parent,
          ...{
            fio: `${parent.last_name} ${parent.name} ${
              parent.patronymic ? parent.patronymic : ""
            }`,
          },
        };
      });
    }
    return [];
  });

  // get kid parents
  const kidParents = (kidId) => {
    return (
      [...parentsItems.value].filter((parent) => parent.kid_id == kidId) || []
    );
  };

  // fetch data params
  const defaultParams = computed(() => {
    return {
      limit: 0,
    };
  });

  // fetch data for period
  const fetchParentsData = (params = {}) => {
    if (!dataLoaded.value) {
      store.dispatch("parents/getParents", {
        params: { ...defaultParams.value, ...params },
      });
    }
  };

  return {
    parentsItems,
    fetchParentsData,
    kidParents,
    dataLoaded,
  };
}
