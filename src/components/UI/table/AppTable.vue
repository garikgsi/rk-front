<template>
  <component
    :is="componentName"
    :items="items"
    :columns="columns"
    :editable="editable"
    :addable="addable"
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
  >
    <template v-slot:actions="{ row }">
      <slot name="actions" :row="row"></slot>
    </template>
    <template v-slot:top-append>
      <q-btn
        v-if="exportable"
        color="positive"
        icon="file_download"
        @click="exportCsv"
      />
    </template>
  </component>
</template>

<script>
import screen from "@/composition/screen";
import AppDesktopTableVue from "./AppDesktopTable.vue";
import AppMobileTableVue from "./AppMobileTable.vue";
import { toRef, computed } from "vue";
import { exportFile } from "quasar";
import { addError } from "@/composition/addMessage";
// import unicodeToWin1251 from "utf8-to-win1251";

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
    addable: {
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
    exportable: {
      require: false,
      type: Boolean,
      default: false,
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
    const columns = toRef(props, "columns");
    const items = toRef(props, "items");

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

    const wrapCsvValue = (val, formatFn, row) => {
      const winVal = val;
      let formatted = formatFn !== void 0 ? formatFn(winVal, row) : winVal;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted
        .split('"')
        .join('""')
        .split("\n")
        .join("\\n")
        .split("\r")
        .join("\\r");

      return `"${formatted}"`;
    };

    const exportCsv = () => {
      const content = [
        columns.value.map((col) => wrapCsvValue(col.label)).join(";"),
      ]
        .concat(
          items.value.map((row) =>
            columns.value
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(";")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", content, {
        // encoding: "windows-1252",
        // mimeType: "text/csv;charset=windows-1252;",
        encoding: "utf-8",
        mimeType: "text/csv;charset=utf-8;",
      });

      if (status !== true) {
        addError("Браузер не поддерживает загрузку файла");
      }
    };

    return {
      isPhone,
      componentName,
      exportCsv,
    };
  },
  components: {
    "app-desktop-table": AppDesktopTableVue,
    "app-mobile-table": AppMobileTableVue,
  },
  methods: {
    rowClick(evt, row) {
      if (this.clickable) this.$emit("row-click", evt, row);
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
