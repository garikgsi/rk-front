import { apiGet } from "@/composition/requestApi";
import { ref } from "vue";
import { useStore } from "vuex";

export default function debtKidReport(kidId) {
  const store = useStore();
  const report = ref(null);

  const fetchReport = async (periodId) => {
    store.commit("app/SET_LOADING", true);
    const response = await apiGet({
      url: `debt/${periodId.value}/${kidId.value}`,
    });
    if (!response.isError) {
      report.value = response.data;
    }
    store.commit("app/SET_LOADING", false);
    return response;
  };

  return { fetchReport, report };
}
