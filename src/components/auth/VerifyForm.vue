<template>
  <q-form
    @submit.stop="onSubmit"
    class="q-gutter-md"
    ref="verifyForm"
    autofocus
  >
    <app-email-input
      v-model="login"
      label="Email"
      :required="true"
      :readonly="true"
    ></app-email-input>

    <app-code-input
      v-model="emailCode"
      :required="true"
      :email="login"
      label="Проверочный код"
    ></app-code-input>

    <div class="row">
      <div class="col">
        <q-btn
          class="q-mr-sm"
          label="Подтвердить"
          type="submit"
          color="primary"
        ></q-btn>
      </div>
    </div>
  </q-form>
</template>

<script>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import verify from "@/composition/auth/verify";
import AppEmailInputVue from "@/components/UI/inputs/AppEmailInput.vue";
import AppCodeInputVue from "@/components/UI/inputs/AppCodeInput.vue";

export default {
  props: {
    email: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const { email } = toRefs(props);
    const router = useRouter();
    const verifyForm = ref(null);

    let { login, emailCode, verifyEmail } = verify();
    if (email.value) login.value = email.value;

    // submit action
    const onSubmit = () => {
      verifyForm.value.validate().then(() => {
        verifyEmail().then((response) => {
          const { isError } = response;
          if (!isError) {
            router.push({ name: "dashboard" });
          }
        });
      });
    };

    return {
      login,
      emailCode,
      onSubmit,
      verifyForm,
    };
  },
  components: {
    "app-email-input": AppEmailInputVue,
    "app-code-input": AppCodeInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
