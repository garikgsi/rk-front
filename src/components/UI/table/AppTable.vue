<template>
  <component
    :is="componentName"
    :items="items"
    :columns="columns"
    :editable="editable"
    :searchable="searchable"
    :hide-pagination="hidePagination"
    :total-row="totalRow"
    :search="search"
    :title="title"
    :pagination="pagination"
    :clickable="clickable"
    @update:pagination="updatePagination"
    @update:search="searchUpdated"
    @row-click="rowClick"
    @delete-click="deleteClick"
    @add-click="addClick"
    @edit-click="editClick"
    @copy-click="copyClick"
  ></component>
</template>

<script>
import screen from "@/composition/screen";
import AppDesktopTableVue from "./AppDesktopTable.vue";
import AppMobileTableVue from "./AppMobileTable.vue";
import { toRef, computed } from "vue";

export default {
  name: "app-table",
  props: {
    items: {
      require: true,
      type: Array,
      default() {
        return [];
      },
    },
    columns: {
      require: true,
      type: Array,
    },
    editable: {
      require: false,
      type: Boolean,
      default: true,
    },
    clickable: {
      require: false,
      type: Boolean,
      default: true,
    },
    searchable: {
      require: false,
      type: Boolean,
      default: true,
    },
    hidePagination: {
      require: false,
      type: Boolean,
      default: false,
    },
    totalRow: {
      require: false,
      type: [Object, null],
      default: null,
    },
    search: {
      require: false,
      type: String,
      default: null,
    },
    title: {
      require: false,
      type: String,
      default: null,
    },
    pagination: {
      require: false,
      type: Object,
      default() {
        return { page: 1, sortBy: "id", rowsPerPage: 20 };
      },
    },
    view: {
      require: false,
      type: String,
      default: null,
    },
  },
  emits: [
    "row-click",
    "update:search",
    "delete-click",
    "add-click",
    "edit-click",
    "copy-click",
    "update:pagination",
  ],
  setup(props) {
    const { isPhone } = screen();

    const view = toRef(props);

    const componentName = computed(() => {
      let component = isPhone.value ? "app-mobile-table" : "app-desktop-table";
      if (view.value) {
        switch (view.value) {
          case "mobile":
            {
              component = "app-mobile-table";
            }
            break;
          case "desktop":
            {
              component = "app-desktop-table";
            }
            break;
        }
      }
      return component;
    });

    return {
      isPhone,
      componentName,
    };
  },
  components: {
    "app-desktop-table": AppDesktopTableVue,
    "app-mobile-table": AppMobileTableVue,
  },
  methods: {
    rowClick(evt, row) {
      this.$emit("row-click", evt, row);
    },
    searchUpdated(searchStr) {
      this.$emit("update:search", searchStr);
    },
    deleteClick(row) {
      this.$emit("delete-click", row);
    },
    addClick() {
      this.$emit("add-click");
    },
    editClick(row) {
      this.$emit("edit-click", row);
    },
    copyClick(row) {
      this.$emit("copy-click", row);
    },
    updatePagination(pagination) {
      this.$emit("update:pagination", pagination);
    },
  },
};
</script>

<style lang="scss" scoped></style>
