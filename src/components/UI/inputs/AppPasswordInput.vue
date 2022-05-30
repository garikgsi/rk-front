<template>
  <q-input
    filled
    ref="passwordRef"
    v-model="password"
    type="password"
    :label="label"
    :hint="hint"
    :rules="passwordRules"
    lazy-rules
    clearable
  ></q-input>
  <q-input
    class="q-mt-none"
    ref="confirmRef"
    v-if="withConfirmation"
    filled
    v-model="password_confirmation"
    type="password"
    :label="`${label}(подтверждение)`"
    clearable
  >
  </q-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
import { toRefs, ref, computed, watch } from "vue";

export default {
  name: "app-password-input",
  mixins: [inputMixin],
  props: {
    withConfirmation: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    let password = ref("");
    let password_confirmation = ref("");
    const { withConfirmation, required, label } = toRefs(props);

    const passwordRef = ref(null);

    // if (withConfirmation.value) {
    const passwordRules = computed(() => {
      let res = [];
      if (required.value)
        res.push((v) => !!v || `Поле ${label.value} должно быть заполнено`);
      res.push(
        (v) => v.length >= 8 || "Пароль должен быть не менее 8 символов"
      );
      if (withConfirmation.value)
        res.push(
          (v) =>
            (!!v && password.value == password_confirmation.value) ||
            `${label.value} не соответствует подтверждению`
        );
      return res;
    });

    const changePassword = () => {
      passwordRef.value.validate();
      // if (!passwordRef.value.hasError) {
      emit("update:modelValue", password.value);
      // }
    };

    watch([password, password_confirmation], () => {
      changePassword();
    });

    return {
      password_confirmation,
      password,
      passwordRules,
      passwordRef,
    };
  },
};
</script>

<style lang="scss" scoped></style>
