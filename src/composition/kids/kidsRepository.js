import { useStore } from "vuex";
import { computed } from "vue";

export default function kidsRepository() {
  const store = useStore();
  // data loaded for period
  const dataLoaded = computed(() => store.state.kids?.dataLoaded || false);

  // all operations items for period
  const kidsItems = computed(() => {
    if (kidsLoaded.value) {
      return store.state.kids.all
        .map((kid) => {
          return {
            ...kid,
            ...{ fio: `${kid.last_name} ${kid.name} ${kid.patronymic}` },
          };
        })
        .sort((a, b) => a.fio.localeCompare(b.fio));
    }
    return [];
  });
  // data loaded
  const kidsLoaded = computed(() => store.state.kids.dataLoaded);

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
      limit: 0,
    };
  });

  // fetch data for period
  const fetchKidsData = (params = {}) => {
    if (!dataLoaded.value) {
      store.dispatch("kids/getKids", {
        params: { ...defaultParams.value, ...params },
      });
    }
  };

  return {
    kidsItems,
    fetchKidsData,
    kidsLoaded,
    kidsCount,
    dataLoaded,
  };
}
