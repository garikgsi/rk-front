<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="paymentsForm"
    v-focus
  >
    <app-date-input
      v-model="date_payment"
      name="date_payment"
      label="Дата"
      hint="Дата оплаты"
      required
    ></app-date-input>

    <kids-select-input
      label="За кого"
      required
      v-model="kid_id"
    ></kids-select-input>

    <app-text-input
      label="Комментарий"
      :required="true"
      v-model="comment"
      name="comment"
    ></app-text-input>

    <app-money-input
      label="Сумма"
      required
      v-model="amount"
      name="amount"
    ></app-money-input>

    <form-buttons @close="closeForm"></form-buttons>
  </q-form>
</template>

<script>
import AppDateInputVue from "../UI/inputs/AppDateInput.vue";
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import AppMoneyInputVue from "@/components/UI/inputs/AppMoneyInput.vue";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";
import KidsSelectInputVue from "../UI/kids/KidsSelectInput.vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, toRefs, onMounted } from "vue";
import moment from "moment";

import currentPeriod from "@/composition/periods/currentPeriod";
import paymentsSearch from "@/composition/payments/paymentSearch";

export default {
  // name: "operations-form",
  props: {
    id: {
      require: false,
      type: String,
      default: undefined,
    },
    mode: {
      require: false,
      type: String,
      default: "add",
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();
    const { id, mode } = toRefs(props);

    // current period
    const { periodId } = currentPeriod();

    // search by id function
    const { getPaymentById } = paymentsSearch();

    // form field values
    const date_payment = ref(moment().format("YYYY-MM-DD"));
    const comment = ref("");
    const kid_id = ref(null);
    const amount = ref(null);

    // fill inputs empty data
    const clearForm = () => {
      date_payment.value = moment().format("YYYY-MM-DD");
      comment.value = "";
      amount.value = 0;
      kid_id.value = null;
    };

    // fill inputs from repository, if id exists
    onMounted(() => {
      if (id.value) {
        const item = getPaymentById(id.value);
        date_payment.value = item.date_payment;
        comment.value = item.comment;
        amount.value = parseFloat(item.amount);
        kid_id.value = item.kid_id;
      } else {
        clearForm();
      }
    });
    // submit form action
    const formSubmit = (evt) => {
      // load values from form
      const data = new FormData(evt.target);
      // specific values from form
      data.set("kid_id", kid_id.value);
      data.set("date_payment", date_payment.value);
      data.append("period_id", periodId.value);
      // switch method
      if (id.value) {
        // edit || copy
        if (mode.value == "copy") {
          store
            .dispatch("payments/copyPayment", { id: id.value, data })
            .then(router.go(-1));
        } else {
          store
            .dispatch("payments/editPayment", { id: id.value, data })
            .then(router.go(-1));
        }
      } else {
        // insert
        store.dispatch("payments/addPayment", { data }).then(router.go(-1));
      }
    };
    // reset form action
    const formReset = () => {
      clearForm();
    };

    // close form action
    const closeForm = () => {
      router.go(-1);
    };

    return {
      amount,
      date_payment,
      comment,
      kid_id,
      closeForm,
      formSubmit,
      formReset,
    };
  },
  components: {
    "app-date-input": AppDateInputVue,
    "app-text-input": AppTextInputVue,
    "app-money-input": AppMoneyInputVue,
    "form-buttons": FormButtonsVue,
    "kids-select-input": KidsSelectInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
