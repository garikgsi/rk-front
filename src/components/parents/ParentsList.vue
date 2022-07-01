<template>
  <app-table
    :items="items"
    :columns="columns"
    :editable="editable && isAdmin"
    :searchable="false"
    :clickable="false"
    title="Родители"
    :hide-pagination="true"
    :pagination="{ rowsPerPage: 0 }"
    :addable="false"
    @edit-click="editClick"
    @copy-click="copyClick"
    @delete-click="deleteClick"
  >
    <template v-slot:actions="{ row }">
      <q-btn
        icon="send"
        color="positive"
        flat
        round
        :to="{ name: 'invite', params: { name: row.fio, parentId: row.id } }"
      ></q-btn>
    </template>
  </app-table>
  <div class="row" v-if="isAdmin">
    <div class="col q-pa-md" align="right">
      <q-btn
        @click="addClick"
        label="Добавить родителя"
        flat
        color="primary"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { computed, toRefs, onMounted } from "vue";
import parentRepository from "@/composition/parents/parentsRepository";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AppTableVue from "../UI/table/AppTable.vue";
import currentOrganization from "@/composition/organizations/currentOrganization";

export default {
  name: "parents-list",
  props: {
    kidId: {
      require: true,
      type: Number,
    },
    editable: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // vuex store
    const store = useStore();
    // router
    const router = useRouter();

    // admin permissions
    const { isAdmin } = currentOrganization();

    const { kidId, editable } = toRefs(props);

    // parents repo
    const { fetchParentsData, kidParents, dataLoaded } = parentRepository();

    // table columns
    const columns = computed(() => {
      let columns = [
        {
          name: "fio",
          field: "fio",
          label: "ФИО",
          align: "left",
          sortable: false,
          type: "string",
          mobile: "title",
        },
        {
          name: "phone",
          field: "phone",
          label: "Телефон",
          align: "left",
          sortable: false,
          type: "string",
          mobile: "subTitle",
        },
        {
          name: "email",
          field: "email",
          label: "Email",
          align: "left",
          sortable: false,
          type: "string",
          mobile: "subTitle",
        },
      ];
      if (isAdmin.value && editable.value) {
        columns.push({
          name: "actions",
          field: "actions",
          label: "",
          align: "right",
          sortable: false,
          type: "actions",
        });
      }
      return columns;
    });

    // fetch data on mounting
    onMounted(() => {
      fetchParentsData();
    });

    // kid parets table items
    const items = computed(() => {
      return kidParents(kidId.value);
    });

    // CRUD
    // click add
    const addClick = () => {
      router.push({
        name: "parents-form",
        params: {
          kidId: kidId.value,
        },
      });
    };
    // click edit
    const editClick = (row) => {
      router.push({
        name: "parents-form",
        params: { id: row.id, kidId: kidId.value, mode: "edit" },
      });
    };
    // click copy
    const copyClick = (row) => {
      router.push({
        name: "parents-form",
        params: { id: row.id, kidId: kidId.value, mode: "copy" },
      });
    };
    // click delete
    const deleteClick = (row) => {
      store.dispatch("parents/removeParent", { id: row.id, params: {} });
    };

    return {
      columns,
      dataLoaded,
      items,
      addClick,
      editClick,
      copyClick,
      deleteClick,
      isAdmin,
    };
  },
  components: {
    "app-table": AppTableVue,
  },
};
</script>

<style lang="scss" scoped></style>
