<template>
  <app-page :title="pageTitle" :sub-title="pageSubTitle" icon="family_restroom">
    <kids-form :id="id" :period-id="periodId"></kids-form>
  </app-page>
</template>

<script>
import KidsFormVue from "@/components/kids/KidsForm.vue";

export default {
  name: "kids-editor-view",

  components: {
    "kids-form": KidsFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
