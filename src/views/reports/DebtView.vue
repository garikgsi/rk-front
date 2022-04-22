<template>
  <app-page title="Долги" icon="money_off" sub-title="информация по долгам">
    <debt-report></debt-report>
  </app-page>
</template>

<script>
import DebtReportVue from "@/components/reports/DebtReport.vue";
export default {
  setup() {
    return {};
  },
  name: "debt-view",
  components: {
    "debt-report": DebtReportVue,
  },
};
</script>

<style lang="scss" scoped></style>
