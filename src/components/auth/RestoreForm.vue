<template>
  <q-form
    @submit.stop="onSubmit"
    class="q-gutter-md"
    ref="restoreForm"
    autofocus
  >
    <app-email-input
      v-model="login"
      label="Email"
      :required="true"
    ></app-email-input>

    <app-code-input
      v-model="emailCode"
      :required="true"
      :email="login"
      label="Проверочный код"
    ></app-code-input>

    <app-password-input
      v-model="password"
      :required="true"
      :with-confirmation="true"
      label="Пароль"
    ></app-password-input>

    <div class="row">
      <div class="col">
        <q-btn class="q-mr-sm" label="OK" type="submit" color="primary"></q-btn>
      </div>
      <div class="col" align="right">
        <q-btn
          label="Войти"
          color="secondary"
          flat
          :to="{ name: 'login' }"
        ></q-btn>
      </div>
    </div>
  </q-form>
</template>

<script>
import { toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import restore from "@/composition/auth/restore";
import AppEmailInputVue from "@/components/UI/inputs/AppEmailInput.vue";
import AppPasswordInputVue from "@/components/UI/inputs/AppPasswordInput.vue";
import AppCodeInputVue from "@/components/UI/inputs/AppCodeInput.vue";
export default {
  props: {
    email: {
      type: String,
      require: false,
    },
    code: {
      type: String,
      require: false,
    },
  },
  setup(props) {
    const { code, email } = toRefs(props);
    const router = useRouter();

    let { login, password, emailCode, restorePassword } = restore();

    if (email.value) login.value = email.value;
    if (code.value) emailCode.value = code.value;

    const restoreForm = ref(null);

    // submit action
    const onSubmit = () => {
      restoreForm.value.validate().then(() => {
        restorePassword().then((response) => {
          const { isError } = response;
          if (!isError) {
            router.push({ name: "dashboard" });
          }
        });
      });
    };

    return {
      login,
      password,
      emailCode,
      onSubmit,
      restoreForm,
    };
  },
  components: {
    "app-email-input": AppEmailInputVue,
    "app-password-input": AppPasswordInputVue,
    "app-code-input": AppCodeInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
