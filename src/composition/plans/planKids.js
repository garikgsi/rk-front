import { computed } from "vue";
import moment from "moment";
import kidsRepository from "@/composition/kids/kidsRepository";
import planRepository from "@/composition/plans/planRepository";

export default function planKids() {
  const { allKidsItems, kidsLoaded } = kidsRepository();
  const { planItems, plansLoaded } = planRepository();

  const planPerKids = computed(() => {
    if (plansLoaded.value && kidsLoaded.value) {
      return [...planItems.value].map((plan) => {
        return {
          ...plan,
          ...{
            kidsFor: [...allKidsItems.value].filter((kid) => {
              return (
                (kid.start_study === null && kid.end_study === null) ||
                (kid.end_study !== null &&
                  moment(kid.end_study) > moment(plan.created_at)) ||
                (kid.start_study !== null &&
                  moment(kid.start_study) <= moment(plan.created_at))
              );
            }),
          },
        };
      });
    }
    return [];
  });

  const sumPlanByKids = computed(() => {
    if (planPerKids.value.length > 0) {
      let kids = {};
      planPerKids.value.forEach((plan) => {
        const planPerKid = plan.amount / plan.kidsFor.length;
        plan.kidsFor.forEach((kid) => {
          if (kids[kid.id]) {
            kids[kid.id].planSum += planPerKid;
            kids[kid.id].plans.push(plan);
          } else {
            kids[kid.id] = {
              ...kid,
              plans: [plan],
              planSum: planPerKid,
            };
          }
        });
      });
      return kids;
    }
    return [];
  });
  return { planPerKids, sumPlanByKids };
}
