<template>
  <app-page
    title="Учебные учреждения"
    icon="school"
    sub-title="Вы можете добавить учебное заведение или просматривать уже созданное"
    :show-period-selector="false"
  >
    <organizations-list></organizations-list>
  </app-page>
</template>

<script>
import OrganizationsListVue from "@/components/organizations/OrganizationsList.vue";
export default {
  name: "plans-view",
  components: {
    "organizations-list": OrganizationsListVue,
  },
};
</script>

<style lang="scss" scoped></style>
