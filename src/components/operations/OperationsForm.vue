<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="operationsForm"
    v-focus
  >
    <period-selector v-model="period" :update-period="false"></period-selector>

    <app-date-input
      v-model="date_operation"
      name="date_operation"
      label="Дата"
      hint="Дата расходной операции"
      required
    ></app-date-input>

    <plans-select-input
      label="Статья расходов"
      :required="false"
      v-model="plan_id"
      name="plan_id"
    ></plans-select-input>

    <app-text-input
      label="Комментарий"
      :required="true"
      v-model="comment"
      name="comment"
    ></app-text-input>

    <app-money-input
      label="Цена"
      required
      v-model="price"
      name="price"
    ></app-money-input>
    <app-money-input
      label="Количество"
      required
      v-model="quantity"
      name="quantity"
    ></app-money-input>
    <app-money-input
      label="Сумма"
      required
      v-model="amount"
      name="amount"
    ></app-money-input>

    <app-text-input
      label="Ссылка на чек/накладную"
      :required="false"
      v-model="check_url"
      name="check_url"
    ></app-text-input>

    <app-file-input
      v-model="image"
      v-model:url="imageUrl"
      name="image"
      label="Чек/накладная"
      hint="Фотография отчетного документа"
    ></app-file-input>

    <form-buttons @close="closeForm"></form-buttons>
  </q-form>
</template>

<script>
import AppDateInputVue from "../UI/inputs/AppDateInput.vue";
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import AppMoneyInputVue from "@/components/UI/inputs/AppMoneyInput.vue";
import priceQuantityAmount from "@/composition/app-form/priceQuantityAmount";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";
import PlansSelectInputVue from "../UI/plans/PlansSelectInput.vue";
import AppFileInputVue from "../UI/inputs/AppFileInput.vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, toRefs, onMounted } from "vue";
import moment from "moment";

import currentPeriod from "@/composition/periods/currentPeriod";
import operationSearch from "@/composition/operations/operationSearch";
import PeriodSelectInputVue from "../UI/periods/PeriodSelectInput.vue";

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

    let { price, quantity, amount } = priceQuantityAmount();
    // current period
    const { period: curPeriod } = currentPeriod();
    // const { periodId, period: curPeriod } = currentPeriod();

    // search by id function
    const { getOperationById } = operationSearch();

    // form field values
    let date_operation = ref(moment().format("YYYY-MM-DD"));
    let comment = ref("");
    let plan_id = ref(null);
    let image = ref(null);
    let imageUrl = ref(null);
    let check_url = ref("");
    let period = ref(curPeriod.value);

    // fill inputs empty data
    const clearForm = () => {
      date_operation.value = moment().format("YYYY-MM-DD");
      comment.value = "";
      price.value = 0;
      quantity.value = 1;
      amount.value = 0;
      image.value = null;
      plan_id.value = null;
      check_url = "";
    };

    // fill inputs from repository, if id exists
    onMounted(() => {
      if (id.value) {
        const operationItem = getOperationById(id.value);
        date_operation.value = operationItem.date_operation;
        comment.value = operationItem.comment;
        price.value = parseFloat(operationItem.price);
        quantity.value = parseFloat(operationItem.quantity);
        amount.value = parseFloat(operationItem.amount);
        plan_id.value = operationItem.plan_id;
        imageUrl.value = operationItem.image;
        check_url.value = operationItem.check_url;
      } else {
        clearForm();
      }
    });
    // submit form action
    const formSubmit = (evt) => {
      // load values from form
      const data = new FormData(evt.target);
      if (imageUrl.value == null && !image.value) {
        data.set("image", "");
      }
      // specific values from form
      if (plan_id.value) data.set("plan_id", plan_id.value);
      data.set("date_operation", date_operation.value);
      data.append("period_id", period.value.id);
      // data.append("period_id", periodId.value);
      // switch method
      if (id.value) {
        // edit || copy
        if (mode.value == "copy") {
          store
            .dispatch("operations/copyOperation", { id: id.value, data })
            .then((isError) => {
              if (!isError) closeForm();
            });
        } else {
          store
            .dispatch("operations/editOperation", { id: id.value, data })
            .then((isError) => {
              if (!isError) closeForm();
            });
        }
      } else {
        // insert
        store.dispatch("operations/addOperation", { data }).then((isError) => {
          if (!isError) closeForm();
        });
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
      price,
      quantity,
      amount,
      date_operation,
      comment,
      image,
      imageUrl,
      check_url,
      plan_id,
      period,
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
    "plans-select-input": PlansSelectInputVue,
    "app-file-input": AppFileInputVue,
    "period-selector": PeriodSelectInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
