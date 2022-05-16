<template>
  <app-page
    :title="pageTitle"
    :sub-title="pageSubTitle"
    icon="account_balance_wallet"
  >
    <payments-view :id="id" v-if="mode == 'view'"></payments-view>
    <payments-form :id="id" :mode="mode" v-else></payments-form>
  </app-page>
</template>

<script>
import { toRefs, computed, onMounted, ref } from "vue";

import PaymentsFormVue from "@/components/payments/PaymentsForm.vue";
import PaymentViewVue from "@/components/payments/PaymentView.vue";

import paymentSearch from "@/composition/payments/paymentSearch";

export default {
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
    const { id, mode } = toRefs(props);

    const { getPaymentById } = paymentSearch();

    let item = ref({
      title: "",
    });

    // get actual item from repository if id exists
    onMounted(() => {
      item.value = { ...getPaymentById(id.value) };
    });

    // page titles
    const pageTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Редактируем поступление средств`;
          }
          case "view": {
            return `Просмотр поступления средств`;
          }
          case "copy":
          default: {
            return `Копируем поступление средств`;
          }
        }
      } else {
        return `Создание нового поступления средств`;
      }
    });
    const pageSubTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Изменяем  поступление средств ${item.value.comment}`;
          }
          case "view": {
            return `Просмотр ${item.value.comment}`;
          }
          case "copy":
          default: {
            return `Копируем  поступление средств ${item.value.comment}`;
          }
        }
      } else {
        return `Создание нового поступления средств`;
      }
    });

    return {
      pageTitle,
      pageSubTitle,
    };
  },
  name: "payments-editor-view",
  components: {
    "payments-form": PaymentsFormVue,
    "payments-view": PaymentViewVue,
  },
};
</script>

<style lang="scss" scoped></style>
