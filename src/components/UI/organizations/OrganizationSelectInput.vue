<template>
  <app-select-input
    label="Учебное заведение"
    :options="organizationOptions"
    :modelValue="organizationValue"
    :clearable="false"
    @update:modelValue="updateValue($event)"
  ></app-select-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
import AppSelectInputVue from "../inputs/AppSelectInput.vue";
import { computed, onMounted } from "vue";
import organizationRepository from "@/composition/organizations/organizationRepository";
import currentOrganization from "@/composition/organizations/currentOrganization";

export default {
  name: "organization-select-input",
  mixins: [inputMixin],
  setup() {
    const { organizations, changeOrganization, fetchOrganizations } =
      organizationRepository();
    const { organization } = currentOrganization();
    // created hook
    // load all organizations to state
    onMounted(() => {
      fetchOrganizations();
    });

    const updateValue = (val) => {
      if (val?.id != organization.value.id) changeOrganization(val.id);
    };

    return {
      organizationOptions: computed(() => {
        return [...organizations.value].map((organization) => {
          return { id: organization.id, title: organization.title };
        });
      }),
      organizationValue: computed(() => {
        if (organization.value) {
          return {
            id: organization.value.id,
            title: organization.value.title,
          };
        } else {
          return null;
        }
      }),
      updateValue,
    };
  },
  components: {
    "app-select-input": AppSelectInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
