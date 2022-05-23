import parentsRepository from "@/composition/parents/parentsRepository";

export default function parentSearch() {
  const { parentsItems } = parentsRepository();

  const getParentById = (id) => {
    if (parentsItems.value) {
      return [...parentsItems.value].find((item) => item.id == id);
    }
    return null;
  };

  return { getParentById };
}
