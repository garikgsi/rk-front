import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { addError } from "@/composition/addMessage";

export default function periodRepository() {
  const store = useStore();
  // period filds values
  const title = ref("");
  // getters from store
  const periods = computed(() => store.state.periods.all);
  const currentPeriod = computed(() => store.state.periods.current);
  // change current period
  const changePeriod = (id) => {
    return store.dispatch("periods/changePeriod", { id });
  };
  // add new period
  const addPeriod = async ({ data }) => {
    const formData = new FormData();
    formData.append("title", title.value);
    // return promise
    const response = store.dispatch("periods/addPeriod", { data });
    const { isError, error } = response;
    if (isError) {
      addError(error);
    }
    return response;
  };
  // edit period
  const editPeriod = async ({ id, data }) => {
    const formData = new FormData();
    formData.append("title", title.value);
    // return promise
    const response = store.dispatch("periods/editPeriod", {
      id,
      data,
    });
    const { isError, error } = response;
    if (isError) {
      addError(error);
    }
  };
  // get periods
  const getPeriods = async ({ params = {} }) => {
    const response = store.dispatch("periods/getPeriods", { params });
    const { isError, error } = response;
    if (isError) {
      addError(error);
      return false;
    } else {
      return true;
    }
  };

  return {
    title,
    periods,
    currentPeriod,
    changePeriod,
    addPeriod,
    editPeriod,
    getPeriods,
  };
}
