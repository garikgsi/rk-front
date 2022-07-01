import operationRepository from "@/composition/operations/operationsRepository";

export default function operationSearch() {
  const { operationItems } = operationRepository();

  const getOperationById = (id) => {
    if (operationItems.value) {
      const operation = [...operationItems.value].find((item) => item.id == id);
      if (operation) return { ...operation };
    }
    return null;
  };

  return { getOperationById };
}
