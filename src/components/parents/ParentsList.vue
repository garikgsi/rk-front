<template>
  <app-table
    :items="items"
    :columns="columns"
    :editable="editable"
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
  </app-table>
  <div class="row">
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
import { computed, toRefs, ref, onMounted } from "vue";
import parentRepository from "@/composition/parents/parentsRepository";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AppTableVue from "../UI/table/AppTable.vue";

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

    const { kidId } = toRefs(props);

    // parents repo
    const { fetchParentsData, kidParents, dataLoaded } = parentRepository();

    // table columns
    const columns = ref([
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
        name: "actions",
        field: "actions",
        label: "",
        align: "right",
        sortable: false,
        type: "actions",
      },
    ]);

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
    };
  },
  components: {
    "app-table": AppTableVue,
  },
};
</script>

<style lang="scss" scoped></style>
