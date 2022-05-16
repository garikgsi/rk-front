import { ref, computed } from "vue";

export default function debtFilter(data) {
  const tableSearchString = ref("");

  const filteredData = computed(() =>
    data.value.filter((row) => {
      if (tableSearchString.value)
        return (
          row.fio
            .toLowerCase()
            .indexOf(tableSearchString.value.toLowerCase()) !== -1
        );
      return data;
    })
  );

  return { filteredData, tableSearchString };
}
