<template>
  <app-page
    :title="pageTitle"
    icon="show_chart"
    :sub-title="pageSubTitle"
    :show-period-selector="false"
  >
    <plan-view :id="id" v-if="mode == 'view'"></plan-view>
    <plan-form :id="id" :mode="mode" v-else></plan-form>
  </app-page>
</template>

<script>
import PlanFormVue from "@/components/plans/PlanForm.vue";
import { toRefs, computed, onMounted, ref } from "vue";
import planSearch from "@/composition/plans/planSearch";
import PlanViewVue from "@/components/plans/PlanView.vue";

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

    const { getPlanById } = planSearch();

    let item = ref({
      title: "",
    });

    // get actual item from repository if id exists
    onMounted(() => {
      item.value = { ...getPlanById(id.value) };
    });

    // page titles
    const pageTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Редактируем запись бюджета`;
          }
          case "view": {
            return `Просмотр записи бюджета`;
          }
          case "copy":
          default: {
            return `Копируем запись бюджета`;
          }
        }
      } else {
        return `Создание записи в бюджет`;
      }
    });
    const pageSubTitle = computed(() => {
      if (id.value) {
        switch (mode.value) {
          case "edit": {
            return `Изменяем данные для записи ${item.value.title}`;
          }
          case "view": {
            return `Просмотр ${item.value.title}`;
          }
          case "copy":
          default: {
            return `Копируем запись ${item.value.title}`;
          }
        }
      } else {
        return `Добавление новой записи в бюджет на текущий период`;
      }
    });

    return {
      pageTitle,
      pageSubTitle,
    };
  },
  components: {
    "plan-form": PlanFormVue,
    "plan-view": PlanViewVue,
  },
};
</script>

<style lang="scss" scoped></style>
