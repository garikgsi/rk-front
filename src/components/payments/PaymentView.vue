<template>
  <q-card class="q-mb-md" flat bordered>
    <q-card-section horizontal>
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">
          {{ item.date_payment }} | {{ item.comment }}
        </div>
        <q-separator />
        <div class="text-h6 q-mt-sm q-mb-xs">Оплата за: {{ item.kid }}</div>
        <div class="text-green text-h6">Сумма: {{ item.amount }} руб.</div>
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

import paymentSearch from "@/composition/payments/paymentSearch";
import kidSearch from "@/composition/kids/kidSearch";
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
    const { getPaymentById } = paymentSearch();
    // search plan by id function
    const { getKidById } = kidSearch();

    let item = ref({});

    // fill inputs from repository, if id exists
    onMounted(() => {
      if (id.value) {
        item.value = getPaymentById(id.value);
        if (item.value.kid_id)
          item.value.kid = getKidById(item.value.kid_id)?.fio;
        if (item.value.date_payment)
          item.value.date_payment = moment(item.value.date_payment).format(
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
