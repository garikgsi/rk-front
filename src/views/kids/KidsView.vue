<template>
  <app-page
    title="Ученики и родители"
    icon="family_restroom"
    sub-title="ученики и их родители, контактная информация"
  >
    <kids-list></kids-list>
  </app-page>
</template>

<script>
import KidsListVue from "@/components/kids/KidsList.vue";
export default {
  name: "kids-view",
  components: {
    "kids-list": KidsListVue,
  },
};
</script>

<style lang="scss" scoped></style>
