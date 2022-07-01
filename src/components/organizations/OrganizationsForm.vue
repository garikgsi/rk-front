<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="organizationsForm"
    v-focus
  >
    <app-text-input
      label="Наименование"
      :required="true"
      v-model="title"
      name="title"
      hint="Например, школа 1А"
    ></app-text-input>

    <app-text-input
      label="Идентификатор"
      :required="true"
      v-model="slug"
      name="slug"
      hint="Идентификатор в публичном отчете"
      :rules="slugRules"
    ></app-text-input>

    <form-buttons
      @close="closeForm"
      :cancelable="false"
      :closable="closable"
    ></form-buttons>
  </q-form>
</template>

<script>
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, toRefs, onMounted } from "vue";
import usersRepository from "@/composition/users/usersRepository";
import organizationSearch from "@/composition/organizations/organizationSearch";

export default {
  // name: "operations-form",
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
    returnOnClose: {
      require: false,
      type: Boolean,
      default: true,
    },
  },
  emits: ["submitted", "close"],

  setup(props, { emit }) {
    const router = useRouter();
    const store = useStore();
    const { id, mode, returnOnSubmit, returnOnClose } = toRefs(props);
    const { userId } = usersRepository();

    // search by id function
    const { getOrganizationById } = organizationSearch();

    // generate slug
    const genSlug = () => {
      const source = "abcdefghijklmnopqrstuvwxyz1234567890";
      const length = source.length - 1;
      let res = "";
      for (let i = 0; i < 12; i++) {
        res += source[Math.floor(Math.random() * length)];
      }
      return res;
    };

    // form field values
    let title = ref("");
    let slug = ref("");

    // fill inputs empty data
    const clearForm = () => {
      title.value = "";
      slug.value = genSlug();
    };

    // fill inputs from repository, if id exists
    onMounted(() => {
      if (id.value) {
        const organizationItem = getOrganizationById(id.value);
        title.value = organizationItem.title;
        slug.value = organizationItem.slug;
      } else {
        clearForm();
      }
    });
    // submit form action
    const formSubmit = (evt) => {
      // load values from form
      const data = new FormData(evt.target);
      data.append("admin_id", userId.value);
      // switch method
      if (id.value) {
        // edit || copy
        if (mode.value == "copy") {
          store
            .dispatch("organizations/copyOrganization", { id: id.value, data })
            .then((isError) => {
              if (!isError) submittedForm();
            });
        } else {
          store
            .dispatch("organizations/editOrganization", { id: id.value, data })
            .then((isError) => {
              if (!isError) submittedForm();
            });
        }
      } else {
        // insert
        store
          .dispatch("organizations/addOrganization", { data })
          .then((isError) => {
            if (!isError) submittedForm();
          });
      }
    };
    // reset form action
    const formReset = () => {
      clearForm();
    };

    // close form action
    const submittedForm = () => {
      if (returnOnSubmit.value) {
        router.go(-1);
      } else {
        emit("submitted");
      }
    };
    const closeForm = () => {
      if (returnOnClose.value) {
        router.go(-1);
      } else {
        emit("close");
      }
    };

    // rules for slug field input
    const slugRules = [
      (v) => (!!v && v.length > 0) || `Заполните идентификатор`,
      (v) => {
        return (
          (!!v && v.match(/^\w+$/)) ||
          "Идентификатор должен состоять из литинских букв, цифр и знака _"
        );
      },
    ];

    return {
      title,
      slug,
      closeForm,
      formSubmit,
      formReset,
      userId,
      slugRules,
    };
  },
  components: {
    "app-text-input": AppTextInputVue,
    "form-buttons": FormButtonsVue,
  },
};
</script>

<style lang="scss" scoped></style>
