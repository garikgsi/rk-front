<template>
  <q-input
    filled
    v-model="value"
    :label="label"
    :hint="inputHint"
    :rules="fieldRules"
    lazy-rules
    mask="######"
    clearable
    @update:model-value="updateInput"
  >
    <template v-slot:append>
      <q-card flat square>
        <q-card-actions>
          <q-btn
            unelevated
            color="secondary"
            label="Отправить код"
            :disabled="btnDisabled"
            @click="sendCode"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </template>
  </q-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
import code from "@/composition/auth/code";
import { computed, ref, toRefs, onMounted } from "vue";
import { storageAdd, storageHas, storageGet } from "@/composition/localStorage";
import { addInfo } from "@/composition/addMessage";

export default {
  name: "app-code-input",
  mixins: [inputMixin],
  props: {
    email: {
      type: String,
      require: false,
    },
    interval: {
      type: Number,
      require: false,
      default: 30,
    },
  },
  emits: ["update:model-value"],
  setup(props, { emit }) {
    const { email, interval, required, modelValue } = toRefs(props);
    // field value
    const value = ref(modelValue.value);
    // time last code request
    let lastRequestTime = ref(null);
    // next request for seconds
    let nextRequestFor = ref(0);
    // manual disable send code
    let sendDisabled = ref(false);
    // disable request code hardcode
    const btnDisabled = computed(() => {
      return !email.value || sendDisabled.value || nextRequestFor.value > 1;
    });

    const { getCode } = code();

    // validation rules
    const fieldRules = computed(() => {
      if (required.value) {
        return [
          (v) => {
            return (
              (!!v && v.match(/^\d{5,6}$/)) ||
              "Введите код так, как он пришел в письме"
            );
          },
        ];
      } else {
        return [true];
      }
    });

    // hint input
    const inputHint = computed(() => {
      if (lastRequestTime.value === null) {
        return `Если у Вас нет кода заполните email и нажмите кнопку Отправить код`;
      } else if (nextRequestFor.value > 1) {
        return `Повторная отправка кода возможна через ${
          nextRequestFor.value > 60
            ? `${Math.round(nextRequestFor.value / 60)} мин`
            : `несколько секунд`
        }`;
      } else {
        return `Проверьте вашу почту, код уже должен быть там. Если нет - нажмите на кнопку Отправить код`;
      }
    });

    // waiter for request a code
    const startWaiter = () => {
      const leftTime =
        Date.now() - lastRequestTime.value - interval.value * 1000;
      // console.log(`left time=${leftTime}`);
      if (leftTime < 0) {
        let counterId = setInterval(() => {
          nextRequestFor.value = lastRequestTime.value
            ? interval.value -
              Math.ceil((Date.now() - lastRequestTime.value) / 1000)
            : 0;
        }, 1000);
        setTimeout(() => {
          clearInterval(counterId);
        }, interval.value * 1000);
      }
    };

    // request new code
    const sendCode = async () => {
      lastRequestTime.value = Date.now();
      storageAdd("code", lastRequestTime.value);
      const { isError } = await getCode(email.value);
      if (!isError) {
        addInfo(`Код отправлен на электронную почту ${email.value}`);
        startWaiter();
      }
    };

    // load last request from storage and launch waiter
    onMounted(() => {
      if (storageHas("code")) {
        lastRequestTime.value = storageGet("code");
        startWaiter();
      }
    });

    const updateInput = (newValue) => {
      emit("update:model-value", newValue);
    };

    return {
      value,
      inputHint,
      sendCode,
      btnDisabled,
      nextRequestFor,
      lastRequestTime,
      fieldRules,
      updateInput,
    };
  },
};
</script>

<style lang="scss" scoped></style>
