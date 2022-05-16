<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="kidsForm"
    v-focus
  >
    <app-text-input
      v-model="last_name"
      name="last_name"
      label="Фамилия"
      hint="Фамилия ребенка"
      required
    ></app-text-input>
    <app-text-input
      v-model="name"
      name="name"
      label="Имя"
      hint="Имя ребенка"
      required
    ></app-text-input>
    <app-text-input
      v-model="patronymic"
      name="patronymic"
      label="Отчество"
      hint="Отчество ребенка(при наличии)"
      :required="false"
    ></app-text-input>

    <app-date-input
      v-model="birthday"
      name="birthday"
      label="День рождения"
      hint="дата рождения ребенка"
      :required="false"
    ></app-date-input>

    <app-date-input
      v-model="start_study"
      name="start_study"
      label="Дата начала обучения"
      hint="дата начала обучения (учета)"
      :required="false"
    ></app-date-input>
    <app-date-input
      v-model="end_study"
      name="end_study"
      label="Дата окончания обучения"
      hint="дата окончания обучения (учета)"
      :required="false"
    ></app-date-input>

    <form-buttons @close="closeForm" :closable="closable"></form-buttons>
  </q-form>
</template>

<script>
import AppDateInputVue from "../UI/inputs/AppDateInput.vue";
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, toRefs, onMounted } from "vue";

import kidSearch from "@/composition/kids/kidSearch";

export default {
  // name: "kids-form",
  props: {
    id: {
      require: false,
      type: String,
      default: undefined,
    },
    mode: {
      require: false,
      type: String,
      default: "add",
    },
    closable: {
      require: false,
      type: Boolean,
      default: true,
    },
    returnOnSubmit: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
  emits: ["submitted"],
  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();
    const { id, mode, returnOnSubmit } = toRefs(props);

    // search by id function
    const { getKidById } = kidSearch();

    // form field values
    const last_name = ref(null);
    const name = ref(null);
    const patronymic = ref(null);
    const birthday = ref(null);
    const start_study = ref(null);
    const end_study = ref(null);

    // fill inputs empty data
    const clearForm = () => {
      last_name.value = null;
      name.value = null;
      patronymic.value = null;
      birthday.value = null;
      start_study.value = null;
      end_study.value = null;
    };

    // fill inputs from repository, if id exists
    onMounted(() => {
      if (id.value) {
        const kidItem = getKidById(id.value);
        last_name.value = kidItem.last_name;
        name.value = kidItem.name;
        patronymic.value = kidItem.patronymic;
        birthday.value = kidItem.birthday;
        start_study.value = kidItem.start_study;
        end_study.value = kidItem.end_study;
      } else {
        clearForm();
      }
    });
    // submit form action
    const formSubmit = (evt) => {
      // load values from form
      const data = new FormData(evt.target);
      // specific values from form
      if (birthday.value) data.set("birthday", birthday.value);
      else data.delete("birthday");
      if (start_study.value) data.set("start_study", start_study.value);
      else data.delete("start_study");
      if (end_study.value) data.set("end_study", end_study.value);
      else data.delete("end_study");

      // switch method
      if (id.value) {
        // edit || copy
        if (mode.value == "copy") {
          store
            .dispatch("kids/copyKid", { id: id.value, data })
            .then(closeForm());
        } else {
          store
            .dispatch("kids/editKid", { id: id.value, data })
            .then(closeForm());
        }
      } else {
        // insert
        store.dispatch("kids/addKid", { data }).then(closeForm());
      }
    };
    // reset form action
    const formReset = () => {
      clearForm();
    };

    // close form action
    const closeForm = () => {
      if (returnOnSubmit.value) {
        router.go(-1);
      } else {
        emit("submitted");
      }
    };

    return {
      last_name,
      name,
      patronymic,
      birthday,
      start_study,
      end_study,

      closeForm,
      formSubmit,
      formReset,
    };
  },
  components: {
    "app-date-input": AppDateInputVue,
    "app-text-input": AppTextInputVue,
    "form-buttons": FormButtonsVue,
  },
};
</script>

<style lang="scss" scoped></style>
