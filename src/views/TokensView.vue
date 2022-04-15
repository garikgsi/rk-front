<template>
  <app-page
    title="My tokens"
    icon="api"
    sub-title="here you can add new or revoke existed tokens"
  >
    <token-list></token-list>
  </app-page>
</template>

<script>
import TokenListVue from "@/components/tokens/TokenList.vue";
export default {
  name: "token-view",
  components: {
    "token-list": TokenListVue,
  },
};
</script>

<style lang="scss" scoped></style>
