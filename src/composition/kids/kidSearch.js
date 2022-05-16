import kidsRepository from "@/composition/kids/kidsRepository";

export default function kidSearch() {
  const { kidsItems } = kidsRepository();

  const getKidById = (id) => {
    if (kidsItems.value) {
      return [...kidsItems.value].find((item) => item.id == id);
    }
    return null;
  };

  return { getKidById };
}
