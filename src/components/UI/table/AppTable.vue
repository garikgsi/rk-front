<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    dense
    no-data-label="Нет данных"
    :pagination="pagination"
    :hide-pagination="hidePagination"
    @update:pagination="updatePagination"
    @onRowClick="rowClick"
  >
    <!-- add button -->
    <template v-slot:top-left>
      <q-toolbar align="right" v-if="editable">
        <q-btn color="primary" @click="addClick">Добавить</q-btn>
        <q-separator vertical inset spaced="md"></q-separator>
      </q-toolbar>
      <div class="text-h5 text-primary" v-if="title">{{ title }}</div>
    </template>
    <template v-slot:top-right>
      <!-- search line -->
      <table-search
        v-if="searchable"
        :modelValue="search"
        @update:modelValue="searchUpdated($event)"
      ></table-search>
    </template>

    <!-- total row -->
    <template v-slot:bottom-row="cols" v-if="totalRow">
      <q-tr class="total-tr">
        <template v-for="(col, index) in cols.cols" :key="index">
          <q-td :class="[{ 'text-right': col.align == 'right' }, 'text-h6']">
            <!-- money -->

            <div v-if="totalRow[col.name] !== undefined">
              <div v-if="col.type == 'money'">
                <span
                  :class="{
                    'text-negative': parseFloat(totalRow[col.name]) < 0,
                  }"
                  >{{ totalRow[col.name] }}</span
                >
              </div>
              <div v-else></div>
            </div>
            <div v-else></div>
          </q-td>
        </template>
      </q-tr>
    </template>

    <!-- row formatter -->
    <template
      v-for="(col, index) in columns"
      :key="index"
      v-slot:[`body-cell-${col.name}`]="props"
    >
      <q-td :props="props">
        <!-- actions -->
        <div v-if="col.name == 'actions'">
          <table-edit-button @click="editClick(props.row)"></table-edit-button>
          <table-copy-button @click="copyClick(props.row)"></table-copy-button>
          <table-delete-button
            :sub-title="`Действительно удаляем запись?`"
            @submitted="deleteClick(props.row)"
          ></table-delete-button>
        </div>
        <!-- images -->
        <div v-else-if="col.type == 'image'">
          <q-btn
            icon="attach_file"
            flat
            v-if="props.row[col.name]"
            :href="props.row[col.name]"
            target="_blank"
            @click.stop="clickImg"
          ></q-btn>
        </div>
        <!-- date -->
        <div v-else-if="col.type == 'date'">
          <span>{{ formatDate(props.row[col.name]) }}</span>
        </div>
        <!-- money -->
        <div v-else-if="col.type == 'money'">
          <span
            :class="{ 'text-negative': parseFloat(props.row[col.name]) < 0 }"
            >{{ props.row[col.name] }}</span
          >
        </div>
        <!-- other types -->
        <div v-else>{{ props.row[col.name] }}</div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import moment from "moment";

import TableDeleteButtonVue from "@/components/UI/table/TableDeleteButton.vue";
import TableEditButtonVue from "@/components/UI/table/TableEditButton.vue";
import TableCopyButtonVue from "@/components/UI/table/TableCopyButton.vue";
import TableSearchVue from "@/components/UI/table/TableSearch.vue";

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
  },
  setup() {},
  components: {
    "table-delete-button": TableDeleteButtonVue,
    "table-edit-button": TableEditButtonVue,
    "table-copy-button": TableCopyButtonVue,
    "table-search": TableSearchVue,
  },
  methods: {
    rowClick(evt, row) {
      this.$emit("row-click", row);
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
    clickImg() {},
    formatDate(val) {
      return moment(val, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
  },
};
</script>

<style lang="scss" scoped>
.total-tr {
  td {
    border-top: 1px solid grey;
  }
}
</style>
