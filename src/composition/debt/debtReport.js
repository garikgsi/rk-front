import { computed, ref } from "vue";
import { apiGet } from "@/composition/requestApi";
import { fm } from "@/composition/math";

export default function debtReport() {
  const debtLoaded = ref(false);
  const debt = ref([]);
  const search = ref("");

  const tablePagination = ref({
    page: 1,
    sortBy: "debt",
    descending: false,
    rowsPerPage: 20,
  });

  const updatePagination = (pagination) => {
    tablePagination.value = pagination;
  };

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

  const fetchDebt = async (periodId) => {
    const response = await apiGet({ url: `debt/${periodId.value}` });
    if (!response.isError) {
      debtLoaded.value = true;
      debt.value = response.data;
    }
    return response;
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
    tablePagination,
    updatePagination,
    total,
  };
}
