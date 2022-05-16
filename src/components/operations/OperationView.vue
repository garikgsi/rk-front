<template>
  <q-card class="q-mb-md" flat bordered>
    <q-card-section horizontal>
      <q-img v-if="item.image" class="col-5" :src="item.image" />
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ item.date_operation }} | {{ item.comment }}
        </div>
        <q-separator />
        <div class="text-h6 q-mt-sm q-mb-xs">
          Статья затрат: {{ item.plan }}
        </div>
        <div class="text-green text-h6">
          Сумма операции: {{ item.price }} x {{ item.quantity }} =
          {{ item.amount }} руб.
        </div>
        <!-- <q-card-section>
          <q-rating size="18px" v-model="stars" :max="5" color="primary" />
        </q-card-section> -->
      </q-card-section>
    </q-card-section>
  </q-card>
  <form-buttons
    @close="closeForm"
    :cancelable="false"
    :saveable="false"
  ></form-buttons>
</template>

<script>
import moment from "moment";
import { useRouter } from "vue-router";
import { ref, toRefs, onMounted } from "vue";

import operationSearch from "@/composition/operations/operationSearch";
import planSearch from "@/composition/plans/planSearch";
import FormButtonsVue from "../UI/form/FormButtons.vue";

export default {
  name: "operation-view",
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

    // search operation by id function
    const { getOperationById } = operationSearch();
    // search plan by id function
    const { getPlanById } = planSearch();

    let item = ref({});

    // fill inputs from repository, if id exists
    onMounted(() => {
      if (id.value) {
        item.value = getOperationById(id.value);
        if (item.value.plan_id)
          item.value.plan = getPlanById(item.value.plan_id)?.title;
        if (item.value.date_operation)
          item.value.date_operation = moment(item.value.date_operation).format(
            "DD.MM.YYYY"
          );
      }
    });
    // close form action
    const closeForm = () => {
      router.go(-1);
    };

    return {
      item,
      closeForm,
    };
  },
  components: {
    "form-buttons": FormButtonsVue,
  },
};
</script>

<style lang="scss" scoped></style>
