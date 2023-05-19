<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="planForm"
  >
    <period-selector v-model="period" :update-period="false"></period-selector>

    <app-text-input
      label="Статья учета"
      required
      v-model="title"
      name="title"
      v-focus
    ></app-text-input>
    <kids-select-input
      label="Только для учащегося"
      v-model="kidId"
      name="kid_id"
    ></kids-select-input>
    <app-money-input
      label="Цена"
      required
      v-model="price"
      name="price"
    ></app-money-input>
    <app-money-input
      label="Количество"
      required
      :readonly="!!kidId"
      v-model="quantity"
      name="quantity"
    ></app-money-input>
    <app-money-input
      label="Сумма"
      required
      :readonly="!!kidId"
      v-model="amount"
      name="amount"
    ></app-money-input>
    <app-date-input
      label="Дата начала учета"
      required
      v-model="startBillDate"
      name="start_bill_date"
    ></app-date-input>

    <form-buttons @close="closeForm"></form-buttons>
  </q-form>
</template>

<script>
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import AppMoneyInputVue from "@/components/UI/inputs/AppMoneyInput.vue";
import priceQuantityAmount from "@/composition/app-form/priceQuantityAmount";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";

import { useRouter } from "vue-router";
import { ref, toRefs, onMounted, watch } from "vue";
import { useStore } from "vuex";
import currentPeriod from "@/composition/periods/currentPeriod";
import planSearch from "@/composition/plans/planSearch";
import kidsRepository from "@/composition/kids/kidsRepository";
import PeriodSelectInputVue from "../UI/periods/PeriodSelectInput.vue";
import AppDateInput from "@/components/UI/inputs/AppDateInput.vue";
import KidsSelectInput from "@/components/UI/kids/KidsSelectInput.vue";
import moment from "moment";
export default {
  name: "plan-form",
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

    const { kidsCount } = kidsRepository();

    // current period
    const { period: curPeriod } = currentPeriod();
    // const { periodId, period: curPeriod } = currentPeriod();

    // search by id function
    const { getPlanById } = planSearch();

    // form inputs
    // price/quantity/amount imported
    // id refs from props
    const title = ref("");
    const period = ref(curPeriod.value);
    const startBillDate = ref(moment().format("YYYY-MM-DD"));
    const kidId = ref(null);

    // fill inputs empty data
    const clearForm = () => {
      title.value = "";
      price.value = 0;
      quantity.value = kidsCount.value;
      amount.value = 0;
      startBillDate.value = moment().format("YYYY-MM-DD");
      kidId.value = null;
    };

    const planItem = ref(getPlanById(id.value));

    // fill inputs from repository, if id exists
    onMounted(() => {
      if (id.value) {
        title.value = planItem.value.title;
        price.value = parseFloat(planItem.value.price);
        quantity.value = parseFloat(planItem.value.quantity);
        amount.value = parseFloat(planItem.value.amount);
        startBillDate.value = planItem.value.start_bill_date;
        kidId.value = planItem.value.kid_id;
      } else {
        clearForm();
      }
    });

    // submit form action
    const formSubmit = (evt) => {
      const data = new FormData(evt.target);
      data.append("period_id", period.value.id);
      data.set("kid_id", kidId.value || "");
      data.set("start_bill_date", startBillDate.value);
      if (id.value) {
        // edit || copy
        if (mode.value == "copy") {
          store
            .dispatch("plans/copyPlan", { id: id.value, data })
            .then((isError) => {
              if (!isError) closeForm();
            });
        } else {
          store
            .dispatch("plans/editPlan", { id: id.value, data })
            .then((isError) => {
              if (!isError) closeForm();
            });
        }
      } else {
        // insert
        store.dispatch("plans/addPlan", { data }).then((isError) => {
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

    watch(kidId, (newKidId) => {
      if (newKidId) {
        quantity.value = 1;
      } else {
        quantity.value = parseFloat(
          planItem.value?.quantity || kidsCount.value
        );
      }
    });

    return {
      price,
      quantity,
      amount,
      title,
      period,
      startBillDate,
      kidId,
      formSubmit,
      formReset,
      closeForm,
    };
  },
  components: {
    KidsSelectInput,
    AppDateInput,
    "app-text-input": AppTextInputVue,
    "app-money-input": AppMoneyInputVue,
    "form-buttons": FormButtonsVue,
    "period-selector": PeriodSelectInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
