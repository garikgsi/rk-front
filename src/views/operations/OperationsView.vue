<template>
  <app-page
    title="Расходные операции"
    icon="point_of_sale"
    sub-title="все расходные операции за период"
  >
    <operations-list></operations-list>
  </app-page>
</template>

<script>
import OperationsListVue from "@/components/operations/OperationsList.vue";
export default {
  name: "operations-view",
  components: {
    "operations-list": OperationsListVue,
  },
};
</script>

<style lang="scss" scoped></style>
