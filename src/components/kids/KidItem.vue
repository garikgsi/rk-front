<template>
  <q-card flat bordered square>
    <q-img v-if="kid.avatar" :src="kid.avatar" />

    <q-card-section>
      <div class="text-h5 q-mt-sm">
        {{ kid.last_name }} {{ kid.name }} {{ kid.patronymic }}
      </div>
      <div v-if="kid.end_study" class="text-overline text-grey">
        Закончил обучение {{ dateUserFormat(kid.end_study) }}
      </div>
    </q-card-section>

    <q-card-actions>
      <template v-if="editable">
        <div class="col-10" v-if="!isPhone">
          <q-btn
            class="q-mr-md"
            color="primary"
            label="Изменить"
            :to="{ name: 'kids-form', params: { id: kid.id, mode: 'edit' } }"
          />
          <q-btn
            class="q-mr-md"
            color="primary"
            label="Копировать"
            :to="{ name: 'kids-form', params: { id: kid.id, mode: 'copy' } }"
          />
          <table-delete-button
            class="q-mr-md"
            color="negative"
            :icon="false"
            @submitted="deleteKid(kid.id)"
          ></table-delete-button>
        </div>
        <div v-else>
          <table-edit-button
            :to="{ name: 'kids-form', params: { id: kid.id, mode: 'edit' } }"
          ></table-edit-button>
          <table-copy-button
            :to="{ name: 'kids-form', params: { id: kid.id, mode: 'copy' } }"
          ></table-copy-button>
          <table-delete-button
            :sub-title="`Действительно удаляем запись?`"
            @submitted="deleteKid(kid.id)"
          ></table-delete-button>
        </div>
      </template>
      <div class="col" align="right">
        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="
            cardExpanded[kid.id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
          "
          @click="kidExpand(kid.id)"
        ></q-btn>
      </div>
    </q-card-actions>

    <q-slide-transition>
      <div v-show="cardExpanded[kid.id]">
        <q-separator />
        <div class="text-subtitle1 q-ma-sm" v-if="kid.birthday">
          <div v-if="kid.birthday">
            <span class="q-mt-md"
              >День рождения: {{ dateUserFormat(kid.birthday) }}</span
            >
          </div>
        </div>

        <q-card-section class="q-pa-none parents-section">
          <parents-list
            :kid-id="kid.id"
            v-if="cardExpanded[kid.id]"
          ></parents-list>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
import { toRefs, ref } from "vue";
import { useStore } from "vuex";
import { dateUserFormat } from "@/composition/dates";
import screen from "@/composition/screen";

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

    const { item } = toRefs(props);

    // expander show in kid card
    let cardExpanded = ref({});

    // CRUD
    // delete kid
    const deleteKid = (id) => {
      store.dispatch("kids/removeKid", { id, params: {} });
    };

    // expand kid
    const kidExpand = (kidId) => {
      cardExpanded.value[kidId] = !cardExpanded.value[kidId];
    };

    return {
      kid: item,
      cardExpanded,
      dateUserFormat,
      deleteKid,
      isPhone,
      kidExpand,
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
.parents-section {
  border-left: 8px solid $primary;
}
</style>
