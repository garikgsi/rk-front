<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="parentsForm"
    v-focus
  >
    <app-text-input
      v-model="last_name"
      name="last_name"
      label="Фамилия"
      hint="Фамилия родителя"
      required
    ></app-text-input>
    <app-text-input
      v-model="name"
      name="name"
      label="Имя"
      hint="Имя родителя"
      required
    ></app-text-input>
    <app-text-input
      v-model="patronymic"
      name="patronymic"
      label="Отчество"
      hint="Отчество родителя(при наличии)"
      :required="false"
    ></app-text-input>

    <app-phone-input
      v-model="phone"
      name="phone"
      label="Телефон"
      hint="номер телефона"
      :required="false"
    ></app-phone-input>

    <form-buttons @close="closeForm" :closable="closable"></form-buttons>
  </q-form>
</template>

<script>
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, toRefs, onMounted } from "vue";

import parentSearch from "@/composition/parents/parentSearch";
import AppPhoneInputVue from "../UI/inputs/AppPhoneInput.vue";

export default {
  // name: "kids-form",
  props: {
    id: {
      require: false,
      type: [Number, String],
      default: undefined,
    },
    kidId: {
      require: false,
      type: [Number, String],
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
    const { id, mode, returnOnSubmit, kidId } = toRefs(props);

    // search by id function
    const { getParentById } = parentSearch();

    // form field values
    const last_name = ref(null);
    const name = ref(null);
    const patronymic = ref(null);
    const phone = ref(null);

    // fill inputs empty data
    const clearForm = () => {
      last_name.value = null;
      name.value = null;
      patronymic.value = null;
      phone.value = null;
    };

    // fill inputs from repository, if id exists
    onMounted(() => {
      if (id.value) {
        const parentItem = getParentById(id.value);
        last_name.value = parentItem.last_name;
        name.value = parentItem.name;
        patronymic.value = parentItem.patronymic;
        phone.value = parentItem.phone;
      } else {
        clearForm();
      }
    });
    // submit form action
    const formSubmit = (evt) => {
      // load values from form
      const data = new FormData(evt.target);
      data.append("kid_id", kidId.value);

      // switch method
      if (id.value) {
        // edit || copy
        if (mode.value == "copy") {
          store
            .dispatch("parents/copyParent", { id: id.value, data })
            .then((isError) => {
              if (!isError) closeForm();
            });
        } else {
          store
            .dispatch("parents/editParent", { id: id.value, data })
            .then((isError) => {
              if (!isError) closeForm();
            });
        }
      } else {
        // insert
        store.dispatch("parents/addParent", { data }).then((isError) => {
          if (!isError) closeForm();
        });
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
      phone,

      closeForm,
      formSubmit,
      formReset,
    };
  },
  components: {
    "app-text-input": AppTextInputVue,
    "form-buttons": FormButtonsVue,
    "app-phone-input": AppPhoneInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
