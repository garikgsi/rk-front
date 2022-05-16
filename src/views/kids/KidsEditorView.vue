<template>
  <app-page
    :title="pageTitle"
    :sub-title="pageSubTitle"
    icon="family_restroom"
    :show-period-selector="false"
  >
    <kids-form :id="id" :mode="mode"></kids-form>
  </app-page>
</template>

<script>
import { computed, toRefs, onMounted, ref } from "vue";

import KidsFormVue from "@/components/kids/KidsForm.vue";
import kidSearch from "@/composition/kids/kidSearch";

export default {
  name: "kids-editor-view",
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

    // search kid by id function
    const { getKidById } = kidSearch();

    let item = ref({
      title: "",
    });

    // get actual item from repository if id exists
    onMounted(() => {
      item.value = { ...getKidById(id.value) };
    });

    // page titles
    const pageTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Редактируем профиль ребека`;
          }
          case "copy":
          default: {
            return `Копируем профиль ребека`;
          }
        }
      } else {
        return `Создание профиля ребека`;
      }
    });
    const pageSubTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Изменяем профиль ребека ${item.value.last_name} ${item.value.name}`;
          }
          case "copy":
          default: {
            return `Копируем профиль ребека ${item.value.last_name} ${item.value.name}`;
          }
        }
      } else {
        return `Добавление профиля новой ребенка`;
      }
    });

    return {
      pageTitle,
      pageSubTitle,
    };
  },
  components: {
    "kids-form": KidsFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
