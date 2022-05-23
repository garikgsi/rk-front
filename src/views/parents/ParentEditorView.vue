<template>
  <app-page
    :title="pageTitle"
    :sub-title="pageSubTitle"
    icon="escalator_warning"
    :show-period-selector="false"
  >
    <parent-form :id="id" :kid-id="kidId" :mode="mode"></parent-form>
  </app-page>
</template>

<script>
import { toRefs, computed, onMounted, ref } from "vue";
import kidSearch from "@/composition/kids/kidSearch";
import parentSearch from "@/composition/parents/parentSearch";
import ParentFormVue from "@/components/parents/ParentForm.vue";

export default {
  name: "parents-editor-view",
  props: {
    id: {
      require: false,
      type: [Number, String],
      default: undefined,
    },
    kidId: {
      require: true,
      type: [Number, String],
      default: undefined,
    },
    mode: {
      require: false,
      type: String,
      default: "add",
    },
  },
  setup(props) {
    const { id, mode, kidId } = toRefs(props);

    const { getKidById } = kidSearch();
    let kid = ref({});

    let item = ref({
      title: "",
    });
    const { getParentById } = parentSearch();

    // get actual item from repository if id exists
    onMounted(() => {
      if (kidId.value) kid.value = { ...getKidById(kidId.value) };
      if (id.value) item.value = { ...getParentById(id.value) };
    });

    // page titles
    const pageTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Редактируем родителя ${kid.value?.fio}`;
          }
          case "view": {
            return `Просмотр родителя ${kid.value?.fio}`;
          }
          case "copy":
          default: {
            return `Копируем родителя ${item.value?.fio} - родителя ${kid.value?.fio}`;
          }
        }
      } else {
        return `Создание родителя ${kid.value?.fio}`;
      }
    });
    const pageSubTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Изменяем ${item.value?.fio}`;
          }
          case "view": {
            return `Просмотр ${item.value?.fio}`;
          }
          case "copy":
          default: {
            return `Копируем ${item.value?.fio} `;
          }
        }
      } else {
        return `Добавление нового родителя`;
      }
    });

    return {
      pageTitle,
      pageSubTitle,
    };
  },
  components: {
    "parent-form": ParentFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
