import planRepository from "@/composition/plans/planRepository";

export default function planSearch() {
  const { planItems } = planRepository();

  const getPlanById = (id) => {
    if (planItems.value) {
      return [...planItems.value].find((item) => item.id == id);
    }
    return null;
  };

  return { getPlanById };
}
