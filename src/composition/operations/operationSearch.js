import operationRepository from "@/composition/operations/operationsRepository";

export default function operationSearch() {
  const { operationItems } = operationRepository();

  const getOperationById = (id) => {
    if (operationItems.value) {
      return [...operationItems.value].find((item) => item.id == id);
    }
    return null;
  };

  return { getOperationById };
}
