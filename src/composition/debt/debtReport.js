import { computed, ref } from "vue";
// import { apiGet } from "@/composition/requestApi";
import { fm } from "@/composition/math";
import { useStore } from "vuex";

export default function debtReport(periodId) {
  const store = useStore();
  // const debtLoaded = ref(false);
  // const debt = ref([]);
  const search = ref("");

  const debt = computed(() => store.state.debt.debt?.[periodId.value] || []);
  const debtLoaded = computed(
    () => store.state.debt.debtLoaded?.[periodId.value] || false
  );

  // store.dispatch("operations/getOperations", {
  //   params: { ...defaultParams.value, ...params },
  // });
  // const operationsLoaded = computed(
  //   () => store.state.operations?.dataLoaded?.[periodId.value] || false
  // );

  // const tablePagination = ref({
  //   page: 1,
  //   sortBy: "debt",
  //   descending: false,
  //   rowsPerPage: 20,
  // });

  // const updatePagination = (pagination) => {
  //   tablePagination.value = pagination;
  // };

  const filteredItems = computed(() => {
    if (search.value && !!debt.value) {
      return debt.value.filter((item) => {
        return (
          item.fio.toLowerCase().indexOf(search.value.toLowerCase()) !== -1
        );
      });
    }
    return debt.value;
  });

  const fetchDebt = async () => {
    return store.dispatch("debt/getDebtReport", {
      params: { periodId: periodId.value },
    });
    // const response = await apiGet({ url: `debt/${periodId.value}` });
    // if (!response.isError) {
    //   debtLoaded.value = true;
    //   debt.value = response.data;
    // }
    // return response;
  };

  const formattedDebt = computed(() => {
    return filteredItems.value.map((item) => ({
      id: item.id,
      fio: item.fio,
      debt: fm(item.debt),
      planSum: fm(item.sumPlan),
      paySum: fm(item.sumPay),
    }));
  });

  const total = computed(() => {
    return filteredItems.value.reduce(
      (acc, row) => {
        return {
          planSum: (acc.planSum += row.sumPlan),
          paySum: (acc.paySum += row.sumPay),
          debt: (acc.debt += row.debt < 0 ? row.debt : 0),
        };
      },
      { planSum: 0, paySum: 0, debt: 0 }
    );
  });

  return {
    debt,
    debtLoaded,
    search,
    filteredItems,
    formattedDebt,
    fetchDebt,
    // tablePagination,
    // updatePagination,
    total,
  };
}
