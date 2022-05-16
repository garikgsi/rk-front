<template>
  <q-card flat bordered>
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
      <q-btn
        color="primary"
        label="Изменить"
        :to="{ name: 'kids-form', params: { id: kid.id, mode: 'edit' } }"
      />
      <q-btn
        color="primary"
        label="Копировать"
        :to="{ name: 'kids-form', params: { id: kid.id, mode: 'copy' } }"
      />
      <table-delete-button
        color="negative"
        :icon="false"
        @submitted="deleteKid(kid.id)"
      ></table-delete-button>
      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="
          cardExpanded[kid.id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
        "
        @click="cardExpanded[kid.id] = !cardExpanded[kid.id]"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="cardExpanded[kid.id]">
        <q-separator />
        <div class="text-subtitle1 q-ma-sm">
          <div v-if="kid.birthday">
            <span class="q-mt-md"
              >День рождения: {{ dateUserFormat(kid.birthday) }}</span
            >
          </div>
        </div>

        <q-card-section class="text-subitle2"> parents here </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script>
import { toRefs, ref } from "vue";
import { useStore } from "vuex";
import { dateUserFormat } from "@/composition/dates";
import TableDeleteButtonVue from "@/components/UI/table/TableDeleteButton.vue";

export default {
  name: "kid-item",
  props: {
    item: {
      require: true,
      type: Object,
    },
  },
  setup(props) {
    // vuex
    const store = useStore();

    const { item } = toRefs(props);

    // expander show in kid card
    let cardExpanded = ref({});

    // CRUD
    // delete kid
    const deleteKid = (id) => {
      store.dispatch("kids/removeKid", { id, params: {} });
    };

    return {
      kid: item,
      cardExpanded,
      dateUserFormat,
      deleteKid,
    };
  },
  components: {
    "table-delete-button": TableDeleteButtonVue,
  },
};
</script>

<style lang="scss" scoped></style>
