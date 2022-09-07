<template>
  <q-card flat bordered square>
    <q-img v-if="kid.avatar" :src="kid.avatar" />

    <q-card-section class="bg-primary text-white">
      <div class="text-h5 q-mt-sm">
        {{ kid.last_name }} {{ kid.name }} {{ kid.patronymic }}
      </div>

      <div class="text-subtitle2 text-blue-3 q-ma-sm">
        <div v-if="kid.end_study">
          Закончил обучение: {{ dateUserFormat(kid.end_study) }}
        </div>
        <div v-if="kid.birthday">
          <span class="q-mt-md"
            >День рождения: {{ dateUserFormat(kid.birthday) }}</span
          >
        </div>
      </div>
    </q-card-section>

    <q-slide-transition v-if="isAdmin">
      <div v-show="cardExpanded[kid.id]">
        <q-card-section class="q-pa-none active-section">
          <parents-list
            :kid-id="kid.id"
            v-if="cardExpanded[kid.id]"
          ></parents-list>
          <q-separator></q-separator>
        </q-card-section>
      </div>
    </q-slide-transition>

    <q-card-section
      :class="{ 'active-section': cardExpanded[kid.id] }"
      v-if="isAdmin"
    >
      <div class="row">
        <div class="col-8">
          <q-btn
            class="q-ma-xs"
            :color="cardExpanded[kid.id] ? 'white' : 'purple'"
            :text-color="cardExpanded[kid.id] ? 'primary' : 'white'"
            round
            icon="escalator_warning"
            size="md"
            @click="kidExpand(kid.id)"
          ></q-btn>
          <table-edit-button
            class="q-ma-xs"
            v-if="isAdmin"
            round
            :to="{ name: 'kids-form', params: { id: kid.id, mode: 'edit' } }"
          ></table-edit-button>
          <table-copy-button
            class="q-ma-xs"
            v-if="isAdmin"
            round
            :to="{ name: 'kids-form', params: { id: kid.id, mode: 'copy' } }"
          ></table-copy-button>
        </div>
        <div class="col" align="right">
          <table-delete-button
            class="q-ma-xs"
            v-if="isAdmin"
            round
            @submitted="deleteKid(kid.id)"
          ></table-delete-button>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, ref, computed } from "vue";
import { useStore } from "vuex";
import { dateUserFormat } from "@/composition/dates";
import screen from "@/composition/screen";
import currentOrganization from "@/composition/organizations/currentOrganization";

import TableDeleteButtonVue from "@/components/UI/table/TableDeleteButton.vue";
import TableEditButtonVue from "../UI/table/TableEditButton.vue";
import TableCopyButtonVue from "../UI/table/TableCopyButton.vue";
import ParentsListVue from "../parents/ParentsList.vue";

export default {
  name: "kid-item",
  props: {
    item: {
      require: true,
      type: Object,
    },
    editable: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    // vuex
    const store = useStore();

    // is phone prop
    const { isPhone } = screen();

    // is user == admin organization
    const { isAdmin } = currentOrganization();

    const { item } = toRefs(props);

    // load expanded items from store
    const storeExpandedItems = computed(() => {
      return store.state.kids.expanded || {};
    });
    // expander show in kid card
    let cardExpanded = ref(storeExpandedItems);

    // CRUD
    // delete kid
    const deleteKid = (id) => {
      store.dispatch("kids/removeKid", { id, params: {} });
    };

    // expand kid
    const kidExpand = (kidId) => {
      store.dispatch("kids/setExpanded", {
        id: kidId,
        isExpanded: !cardExpanded.value[kidId],
      });
      cardExpanded.value[kidId] = !cardExpanded.value[kidId];
    };

    return {
      kid: item,
      cardExpanded,
      dateUserFormat,
      deleteKid,
      isPhone,
      kidExpand,
      isAdmin,
    };
  },
  components: {
    "table-delete-button": TableDeleteButtonVue,
    "table-edit-button": TableEditButtonVue,
    "table-copy-button": TableCopyButtonVue,
    "parents-list": ParentsListVue,
  },
};
</script>

<style lang="scss" scoped>
.active-section {
  border-left: 4px solid $primary;
}
</style>
