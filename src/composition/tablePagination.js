import { computed } from "vue";
import { useStore } from "vuex";

export default function tablePagination(tableName) {
  const store = useStore();

  //  table pagination from store
  let pagination = computed(() => {
    return store.state?.[tableName].tablePagination;
  });

  // save pagination to store
  const updatePagination = (newPagination) => {
    store.dispatch(`${tableName}/setTablePagination`, {
      pagination: newPagination,
    });
  };

  return {
    pagination,
    updatePagination,
  };
}
