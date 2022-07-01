<template>
  <app-page
    title="Приглашение на регистрацию"
    :show-period-selector="false"
    sub-title="В настоящее время пригласить зарегистрироваться можно только через электронную почту"
    icon="send"
  >
    <invite-form :name="name" :parent-id="parentId"></invite-form>
  </app-page>
</template>

<script>
import InviteFormVue from "@/components/InviteForm.vue";
import AppPageVue from "./AppSkeleton/AppPage.vue";
export default {
  name: "invite-register",
  props: {
    name: {
      type: String,
      require: false,
    },
    parentId: {
      require: false,
      type: [Number, String],
    },
  },
  setup() {
    return {};
  },
  components: {
    "invite-form": InviteFormVue,
    "app-page": AppPageVue,
  },
};
</script>

<style lang="scss" scoped></style>
