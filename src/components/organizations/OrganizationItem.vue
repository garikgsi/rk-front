<template>
  <q-card>
    <q-card-section
      :class="selected ? 'bg-purple text-white' : 'bg-white text-purple'"
      @click="selectItem"
    >
      <div class="row">
        <div class="col">
          <div class="text-h6">{{ organization.title }}</div>
        </div>
        <div class="col-1">
          <q-icon name="check_box" size="sm" v-if="selected"></q-icon>
        </div>
      </div>
      <div v-if="organization.is_admin" class="text-purple-11">
        <q-icon
          name="lock_open"
          size="sm"
          color="purple-11"
          class="q-mr-sm"
        ></q-icon
        >(полный доступ)
      </div>
      <div v-else class="text-purple-11">
        <q-icon name="lock" size="sm" color="purple-11"></q-icon>(доступен
        только просмотр)
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat :disabled="selected" @click="selectItem" color="primary">{{
        selected ? "Выбрано" : "Выбрать"
      }}</q-btn>
    </q-card-actions>
    <q-separator></q-separator>
    <q-card-section>
      <div class="row">
        <div class="col-8">
          <app-alert
            title="Поделится публичным отчетом"
            :lines="shareSubTitle"
            v-model="showShare"
            @ok="showShare = false"
          >
            <q-btn
              class="q-ma-xs"
              color="positive"
              round
              icon="share"
              size="md"
              @click="showShare = true"
            ></q-btn>
          </app-alert>

          <table-edit-button
            class="q-ma-xs"
            v-if="isAdmin"
            round
            :to="{
              name: 'organization-form',
              params: { mode: 'edit', id: organization.id },
            }"
          ></table-edit-button>
          <table-copy-button
            class="q-ma-xs"
            v-if="isAdmin"
            round
            :to="{
              name: 'organization-form',
              params: { mode: 'copy', id: organization.id },
            }"
          ></table-copy-button>
        </div>
        <div class="col" align="right">
          <table-delete-button
            class="q-ma-xs"
            v-if="isAdmin"
            round
            @submitted="deleteItem"
          ></table-delete-button>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { toRefs, computed, ref } from "vue";
import TableEditButtonVue from "../UI/table/TableEditButton.vue";
import TableCopyButtonVue from "../UI/table/TableCopyButton.vue";
import TableDeleteButtonVue from "../UI/table/TableDeleteButton.vue";
import AppAlertVue from "../UI/AppAlert.vue";
import settings from "@/settings";
export default {
  name: "organization-item",
  props: {
    organization: {
      type: Object,
      require: true,
    },
    selected: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  emits: ["selected", "delete"],
  setup(props, { emit }) {
    const { organization } = toRefs(props);

    const selectItem = () => {
      emit("selected", organization.value.id);
    };

    const deleteItem = () => {
      emit("delete", organization.value.id);
    };

    const isAdmin = computed(() => organization.value.is_admin);

    // share
    const showShare = ref(false);
    const shareSubTitle = computed(() => {
      return [
        `В настоящий момент не реализован обмен через социальные сети. Чтобы поделиться публичным отчетом скопируйте ссылку и передайте ее любым удобным способом ${settings.appUrl}/${organization.value.slug}`,
      ];
    });

    return { selectItem, deleteItem, isAdmin, shareSubTitle, showShare };
  },
  components: {
    "table-edit-button": TableEditButtonVue,
    "table-copy-button": TableCopyButtonVue,
    "table-delete-button": TableDeleteButtonVue,
    "app-alert": AppAlertVue,
  },
};
</script>

<style lang="scss" scoped></style>
