<template>
  <q-form
    @submit.stop="formSubmit"
    @reset="formReset"
    class="q-gutter-md"
    ref="inviteForm"
    v-focus
  >
    <app-text-input
      v-model="nameValue"
      name="name"
      label="Кого приглашаем"
      hint="Обращение сохранится в приветственном письме"
      required
    ></app-text-input>
    <app-email-input
      v-model="emailValue"
      name="email"
      label="Email"
      hint="Электронная почта для регистрации"
      required
    ></app-email-input>

    <form-buttons @close="closeForm" :closable="true"></form-buttons>
  </q-form>
</template>

<script>
import AppTextInputVue from "@/components/UI/inputs/AppTextInput.vue";
import FormButtonsVue from "@/components/UI/form/FormButtons.vue";
import AppEmailInputVue from "./UI/inputs/AppEmailInput.vue";

import { useRouter } from "vue-router";
import { ref, toRefs, onMounted } from "vue";
import { inviteParent } from "@/composition/auth/invite";
import { addInfo } from "@/composition/addMessage";

export default {
  name: "invite-form",
  props: {
    name: {
      require: false,
      type: String,
    },
    email: {
      require: false,
      type: String,
    },
    parentId: {
      require: false,
      type: [Number, String],
    },
  },
  setup(props) {
    const router = useRouter();

    const { email, name, parentId } = toRefs(props);

    // form field values
    const nameValue = ref(name.value);
    const emailValue = ref(email.value);

    // fill inputs empty data
    const clearForm = () => {
      nameValue.value = name.value;
      emailValue.value = email.value;
    };

    // fill inputs from repository, if id exists
    onMounted(() => {
      clearForm();
    });

    // submit form action
    const formSubmit = async () => {
      const { isError, code } = await inviteParent({
        name: nameValue.value,
        email: emailValue.value,
        parentId: parentId.value,
      });
      if (!isError) {
        // message
        switch (code) {
          case 200:
            {
              // user exists
              addInfo(
                "Пользователь с таким адресом электронной почты уже зарегистрирован и закреплен за указанным родителем"
              );
            }
            break;
          case 201:
            {
              // create invite
              addInfo(
                "Приглашение успешно отправлено, как только пользователь зарегистрируется - он будет иметь доступ к своему профилю и профилу учащегося"
              );
            }
            break;
        }

        closeForm();
      }
    };
    // reset form action
    const formReset = () => {
      clearForm();
    };

    // close form action
    const closeForm = () => {
      router.go(-1);
    };

    return {
      nameValue,
      emailValue,

      closeForm,
      formSubmit,
      formReset,
    };
  },
  components: {
    "app-text-input": AppTextInputVue,
    "app-email-input": AppEmailInputVue,
    "form-buttons": FormButtonsVue,
  },
};
</script>

<style lang="scss" scoped></style>
