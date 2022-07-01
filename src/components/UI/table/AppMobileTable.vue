<template>
  <q-card class="flat bordered">
    <!-- header -->
    <q-card-section horizontal class="q-pa-sm">
      <div class="col">
        <div class="row">
          <div class="col-3" v-if="addable">
            <!-- add button -->
            <q-btn
              color="primary"
              icon="add_box"
              size="lg"
              flat
              @click="addClick"
            ></q-btn>
          </div>
          <!-- title -->
          <div :class="addable ? 'col-9' : 'col-12'" v-if="title">
            <div class="text-h5 text-primary">{{ title }}</div>
          </div>
          <div :class="title || !addable ? 'col-12' : 'col-9'">
            <!-- search line -->
            <table-search
              v-if="searchable"
              :modelValue="search"
              @update:modelValue="searchUpdated($event)"
            ></table-search>
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- body -->
    <q-separator />
    <q-list bordered padding separator v-if="mColumns">
      <template v-for="item in formattedItems" :key="item.id">
        <q-expansion-item
          v-if="clickable || editable"
          expand-separator
          group="tablegroup"
          switch-toggle-side
        >
          <template v-slot:header>
            <mobile-table-row
              :columns="mColumns"
              :item="item"
            ></mobile-table-row>
          </template>
          <!-- expanded section -->
          <div class="row q-pa-sm">
            <div class="col" v-if="clickable">
              <q-btn
                color="primary"
                class="q-mr-lg"
                @click.stop="rowClick($event, item)"
                >Просмотр</q-btn
              >
            </div>

            <div class="col float-right" v-if="editable">
              <table-edit-button
                @click="editClick(item)"
                round
                flat
              ></table-edit-button>
              <table-copy-button
                @click="copyClick(item)"
                round
                flat
              ></table-copy-button>
              <table-delete-button
                :sub-title="`Действительно удаляем запись?`"
                round
                flat
                @submitted="deleteClick(item)"
              ></table-delete-button>
            </div>
            <slot name="actions" :row="props.row"></slot>
          </div>
        </q-expansion-item>
        <q-item v-else>
          <mobile-table-row :columns="mColumns" :item="item"></mobile-table-row>
        </q-item>
      </template>
    </q-list>

    <!-- total -->
    <q-card-section horizontal v-if="totalRow">
      <q-separator />
      <q-card-section class="q-pt-xs">
        <div v-for="(col, index) in columns" :key="index">
          <!-- money -->
          <div v-if="totalRow[col.name] !== undefined">
            <div v-if="col.type == 'money'" class="text-subtitle2">
              Итого {{ col.label.toLowerCase() }}:
              <span
                :class="{
                  'text-negative': parseFloat(totalRow[col.name]) < 0,
                }"
                >{{ totalRow[col.name] }}</span
              >
            </div>
          </div>
          <div v-else></div>
        </div>
      </q-card-section>
    </q-card-section>

    <!-- paginator -->
    <q-card-section v-if="!hidePagination">
      <div class="q-px-lg flex flex-center">
        <q-pagination
          :model-value="page"
          :max="maxPages"
          input
          input-class="primary"
          @update:model-value="updatePagination"
        ></q-pagination>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from "moment";
import TableDeleteButtonVue from "@/components/UI/table/TableDeleteButton.vue";
import TableEditButtonVue from "@/components/UI/table/TableEditButton.vue";
import TableCopyButtonVue from "@/components/UI/table/TableCopyButton.vue";
import TableSearchVue from "./TableSearch.vue";
import { ref, toRefs, computed } from "vue";
import MobileTableRowVue from "@/components/UI/table/MobileTableRow.vue";
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

    searchable: {
      require: false,
      type: Boolean,
      default: true,
    },
    clickable: {
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
        return { page: 1, sortBy: "id", rowsPerPage: 10 };
      },
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
  setup(props, { emit }) {
    const { columns, items, pagination } = toRefs(props);

    let page = ref(pagination.value?.page || 1);
    const rowsPerPage = computed(() => pagination.value?.rowsPerPage || 10);
    const maxPages = computed(() =>
      Math.ceil(items.value.length / rowsPerPage.value)
    );

    // format columns in list-item
    const mColumns = computed(() => {
      let mobileColumns = {
        title: null,
        right: null,
        link: null,
        subTitle: [],
      };
      [...columns.value].forEach((column) => {
        if (column.mobile) {
          switch (column.mobile) {
            case "title":
              {
                mobileColumns.title = column.name;
              }
              break;
            case "right":
              {
                mobileColumns.right = column.name;
              }
              break;
            case "subTitle":
              {
                mobileColumns.subTitle.push(column);
              }
              break;
            case "link":
              {
                mobileColumns.link = column.name;
              }
              break;
          }
        }
      });

      return mobileColumns;
    });

    // format data
    const formatDate = (val) => {
      return moment(val, "YYYY-MM-DD").format("DD.MM.YYYY");
    };

    // date columns
    const dateColumns = computed(() => {
      return [...columns.value].filter((col) => col.type == "date");
    });

    // all items with format
    const formattedItems = computed(() => {
      return [...items.value]
        .slice(
          (page.value - 1) * rowsPerPage.value,
          page.value * rowsPerPage.value
        )
        .map((item) => {
          let currentItem = { ...item };
          if (dateColumns.value) {
            dateColumns.value.forEach((col) => {
              if (item[col.name])
                currentItem[col.name] = formatDate(item[col.name]);
            });
          }
          return currentItem;
        });
    });

    // search field updated
    const searchUpdated = (newSearch) => {
      emit("update:search", newSearch);
    };
    // update pagination
    const updatePagination = (newPage) => {
      page.value = newPage;
      emit("update:pagination", { ...pagination.value, ...{ page: newPage } });
    };
    // row-click
    const rowClick = (evt, row) => {
      emit("row-click", evt, row);
    };
    // add row
    const addClick = () => {
      emit("add-click");
    };
    // edit row
    const editClick = (row) => {
      emit("edit-click", row);
    };
    // copy row
    const copyClick = (row) => {
      emit("copy-click", row);
    };
    // add row
    const deleteClick = (row) => {
      emit("delete-click", row);
    };

    return {
      page,
      maxPages,
      mColumns,
      formatDate,
      formattedItems,
      searchUpdated,
      updatePagination,
      rowClick,
      addClick,
      editClick,
      copyClick,
      deleteClick,
    };
  },
  components: {
    "table-delete-button": TableDeleteButtonVue,
    "table-edit-button": TableEditButtonVue,
    "table-copy-button": TableCopyButtonVue,
    "table-search": TableSearchVue,
    "mobile-table-row": MobileTableRowVue,
  },
};
</script>

<style lang="scss" scoped></style>
