import periodRepository from "@/composition/periods/periodRepository";

export default function periodSearch() {
  const { periods } = periodRepository();

  const getPeriodById = (id) => {
    if (periods.value) {
      return [...periods.value].find((item) => item.id == id);
    }
    return null;
  };

  return { getPeriodById };
}
