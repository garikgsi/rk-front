import { apiGet } from "@/composition/requestApi";
import { ref } from "vue";
export default function debtKidReport(kidId) {
  const report = ref(null);
  const fetchReport = async (periodId) => {
    const response = await apiGet({
      url: `debt/${periodId.value}/${kidId.value}`,
    });
    if (!response.isError) {
      report.value = response.data;
    }
    return response;
  };

  return { fetchReport, report };
}
