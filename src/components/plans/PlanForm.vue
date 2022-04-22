<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="planForm"
  >
    <app-text-input
      label="Статья учета"
      required
      v-model="title"
      v-focus
    ></app-text-input>
    <app-money-input label="Цена" required v-model="price"></app-money-input>
    <app-money-input
      label="Количество"
      required
      v-model="quantity"
    ></app-money-input>
    <app-money-input label="Сумма" required v-model="amount"></app-money-input>
    <form-buttons @close="closeForm"></form-buttons>
  </q-form>
</template>

<script>
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import AppMoneyInputVue from "@/components/UI/inputs/AppMoneyInput.vue";
import priceQuantityAmount from "@/composition/app-form/priceQuantityAmount";
import planRepository from "@/composition/plans/planRepository";
import { useRouter } from "vue-router";
import { ref, toRefs, onMounted } from "vue";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";

export default {
  name: "plan-form",
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
    const { editPlan, addPlan, findPlan } = planRepository();
    const { id, periodId } = toRefs(props);
    let { price, quantity, amount } = priceQuantityAmount();

    // form inputs
    // price/quantity/amount imported
    // id & periodId refs from props
    let title = ref("");

    // fill inputs empty data
    const clearForm = () => {
      title.value = "";
      price.value = 0;
      quantity.value = 1;
      amount.value = 0;
    };

    // fill inputs from repository, if id exists
    onMounted(async () => {
      if (id.value) {
        const planItem = await findPlan(id.value);
        title.value = planItem.title;
        price.value = planItem.price;
        quantity.value = planItem.quantity;
        amount.value = planItem.amount;
      } else {
        clearForm();
      }
    });

    // submit form action
    const formSubmit = () => {
      const data = new FormData();
      data.append("title", title.value);
      data.append("price", price.value);
      data.append("quantity", quantity.value);
      data.append("amount", amount.value);
      data.append("periodId", periodId.value);
      if (id.value) {
        // edit
        editPlan({ id: id.value, data }).then(router.go(-1));
      } else {
        // insert
        addPlan({ data }).then(router.go(-1));
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
      title,
      formSubmit,
      formReset,
      closeForm,
    };
  },
  components: {
    "app-text-input": AppTextInputVue,
    "app-money-input": AppMoneyInputVue,
    "form-buttons": FormButtonsVue,
  },
};
</script>

<style lang="scss" scoped></style>
