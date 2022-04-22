<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="planForm"
    v-focus
  >
    <app-date-input
      v-model="date_operation"
      label="Дата"
      hint="Дата расходной операции"
      required
    ></app-date-input>

    <plans-select-input
      label="Статья расходов"
      required
      v-model="plan_id"
    ></plans-select-input>

    <app-text-input
      label="Комментарий"
      :required="false"
      v-model="comment"
    ></app-text-input>

    <app-money-input label="Цена" required v-model="price"></app-money-input>
    <app-money-input
      label="Количество"
      required
      v-model="quantity"
    ></app-money-input>
    <app-money-input label="Сумма" required v-model="amount"></app-money-input>

    <app-file-input
      v-model="image"
      label="Чек/накладная"
      hint="Фотография отчетного документа"
    ></app-file-input>

    <form-buttons @close="closeForm"></form-buttons>
  </q-form>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, toRefs } from "vue";
import moment from "moment";
import AppDateInputVue from "../UI/inputs/AppDateInput.vue";
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import AppMoneyInputVue from "@/components/UI/inputs/AppMoneyInput.vue";
import priceQuantityAmount from "@/composition/app-form/priceQuantityAmount";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";
import PlansSelectInputVue from "../UI/plans/PlansSelectInput.vue";
import AppFileInputVue from "../UI/inputs/AppFileInput.vue";

export default {
  name: "operations-form",
  props: {
    id: {
      require: false,
      type: String,
      default: undefined,
    },
    periodId: {
      require: true,
      type: String,
    },
  },
  setup(props) {
    const router = useRouter();
    // const { editPlan, addPlan, findPlan } = planRepository();
    const { id, periodId } = toRefs(props);
    console.log(`id=${id.value}, periodId=${periodId.value}`);
    let { price, quantity, amount } = priceQuantityAmount();

    // form field values
    const date_operation = ref(moment().format("DD.MM.YYYY"));
    const comment = ref("");
    const image = ref("");
    const plan_id = ref(null);

    // close form action
    const closeForm = () => {
      router.go(-1);
    };

    return {
      router,
      price,
      quantity,
      amount,
      date_operation,
      comment,
      image,
      plan_id,
      closeForm,
    };
  },
  components: {
    "app-date-input": AppDateInputVue,
    "app-text-input": AppTextInputVue,
    "app-money-input": AppMoneyInputVue,
    "form-buttons": FormButtonsVue,
    "plans-select-input": PlansSelectInputVue,
    "app-file-input": AppFileInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
