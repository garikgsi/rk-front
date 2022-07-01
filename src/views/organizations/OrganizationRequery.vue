<template>
  <div v-if="organizationId">
    <slot></slot>
  </div>
  <div v-else>
    <h5 class="text-primary" v-if="title">
      {{ title }}
    </h5>
    <organizations-list></organizations-list>
  </div>
</template>

<script>
import currentOrganization from "@/composition/organizations/currentOrganization";
import OrganizationsList from "@/components/organizations/OrganizationsList.vue";

export default {
  props: {
    title: {
      type: String,
      require: false,
      default: "Выберите сначала учебное заведение",
    },
  },
  setup() {
    // get current organization id
    const { organizationId } = currentOrganization();

    return { organizationId };
  },
  components: {
    "organizations-list": OrganizationsList,
  },
};
</script>

<style lang="scss" scoped></style>
