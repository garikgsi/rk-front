<template>
  <app-page
    :title="pageTitle"
    icon="school"
    :sub-title="pageSubTitle"
    :show-period-selector="false"
  >
    <organization-form :id="id" :mode="mode"></organization-form>
  </app-page>
</template>

<script>
import { toRefs, computed, onMounted, ref } from "vue";
import organizationSearch from "@/composition/organizations/organizationSearch";
import OrganizationsFormVue from "@/components/organizations/OrganizationsForm.vue";

export default {
  name: "plan-editor-view",
  props: {
    id: {
      require: false,
      type: String,
      default: undefined,
    },
    mode: {
      require: false,
      type: String,
      default: "add",
    },
  },
  setup(props) {
    const { id, mode } = toRefs(props);

    const { getOrganizationById } = organizationSearch();

    let item = ref({
      title: "",
    });

    // get actual item from repository if id exists
    onMounted(() => {
      item.value = { ...getOrganizationById(id.value) };
    });

    // page titles
    const pageTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Редактируем учебное учреждение`;
          }
          case "view": {
            return `Просмотр учебного учреждения`;
          }
          case "copy":
          default: {
            return `Копируем учебное учреждение`;
          }
        }
      } else {
        return `Новое учебное учреждение`;
      }
    });
    const pageSubTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Изменяем  ${item.value.title}`;
          }
          case "view": {
            return `Просмотр ${item.value.title}`;
          }
          case "copy":
          default: {
            return `Копируем ${item.value.title}`;
          }
        }
      } else {
        return `Добавление нового учебного учреждения`;
      }
    });

    return {
      pageTitle,
      pageSubTitle,
    };
  },
  components: {
    "organization-form": OrganizationsFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
