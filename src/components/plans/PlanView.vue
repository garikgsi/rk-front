<template>
  <q-card class="q-mb-md" flat bordered>
    <q-card-section>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ planItem.title }}</div>
      <q-separator> </q-separator>
      <div class="text-green text-h6">
        {{ planItem.price }} x {{ planItem.quantity }} =
        {{ planItem.amount }} руб.
        <span v-if="planPerKid">({{ planPerKid }} руб. с человека)</span>
      </div>
    </q-card-section>
  </q-card>
  <form-buttons
    @close="closeForm"
    :cancelable="false"
    :saveable="false"
  ></form-buttons>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, toRefs, onMounted, computed } from "vue";

import planSearch from "@/composition/plans/planSearch";
import kidsRepository from "@/composition/kids/kidsRepository";

import FormButtonsVue from "../UI/form/FormButtons.vue";

export default {
  name: "plan-view",
  props: {
    id: {
      require: false,
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const router = useRouter();

    const { id } = toRefs(props);
    const { fetchKidsData, kidsCount } = kidsRepository();

    // search by id function
    const { getPlanById } = planSearch();

    let planItem = ref({});

    // fill inputs from repository, if id exists
    onMounted(() => {
      fetchKidsData();
      if (id.value) {
        planItem.value = getPlanById(id.value);
      }
    });

    // plan sum per 1 kid
    const planPerKid = computed(() => {
      if (planItem.value && kidsCount.value)
        return Math.round(planItem.value.amount / kidsCount.value);
      return 0;
    });

    // close form action
    const closeForm = () => {
      router.go(-1);
    };

    return {
      planItem,
      closeForm,
      planPerKid,
      kidsCount,
    };
  },
  components: {
    "form-buttons": FormButtonsVue,
  },
};
</script>

<style lang="scss" scoped></style>
