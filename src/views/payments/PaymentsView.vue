<template>
  <app-page
    title="Оплаты"
    icon="account_balance_wallet"
    sub-title="информация о сданных взносах"
  >
    <payments-list></payments-list>
  </app-page>
</template>

<script>
import PaymentsListVue from "@/components/payments/PaymentsList.vue";

export default {
  name: "payments-view",
  components: {
    "payments-list": PaymentsListVue,
  },
};
</script>

<style lang="scss" scoped></style>
