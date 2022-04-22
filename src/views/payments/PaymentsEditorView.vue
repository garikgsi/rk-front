<template>
  <app-page
    title="Форма внесения оплаты"
    icon="account_balance_wallet"
    sub-title="внесение или редактирования оплаты"
  >
    <payments-form></payments-form>
  </app-page>
</template>

<script>
import PaymentsFormVue from "@/components/payments/PaymentsForm.vue";
export default {
  setup() {
    return {};
  },
  name: "payments-editor-view",
  components: { "payments-form": PaymentsFormVue },
};
</script>

<style lang="scss" scoped></style>
