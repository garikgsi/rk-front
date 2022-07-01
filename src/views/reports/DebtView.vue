<template>
  <app-page :title="pageTitle" icon="money_off" :sub-title="pageSubTitle">
    <debt-report></debt-report>
  </app-page>
</template>

<script>
import DebtReportVue from "@/components/reports/DebtReport.vue";
import currentOrganization from "@/composition/organizations/currentOrganization";
import { computed } from "vue";

export default {
  setup() {
    const { isAdmin } = currentOrganization();
    const pageTitle = computed(() =>
      isAdmin.value ? `Долги` : `Информация по долгам недоступна`
    );
    const pageSubTitle = computed(() =>
      isAdmin.value
        ? `информация по долгам`
        : `информация по долгам доступна только администраторам`
    );
    return { isAdmin, pageTitle, pageSubTitle };
  },
  name: "debt-view",
  components: {
    "debt-report": DebtReportVue,
  },
};
</script>

<style lang="scss" scoped></style>
