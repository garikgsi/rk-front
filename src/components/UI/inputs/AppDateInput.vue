<template>
  <q-input
    filled
    :model-value="value"
    mask="##.##.####"
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="fieldRules"
    clearable
    :disable="disabled"
    :readonly="readonly"
    @update:modelValue="updateDate"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          v-model="showCalendar"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :model-value="value"
            mask="DD.MM.YYYY"
            @update:modelValue="updateDate"
          >
            <div class="row">
              <div class="col">
                <q-btn label="Сегодня" color="primary" flat @click="setToday" />
              </div>
              <div class="col" align="right">
                <q-btn v-close-popup label="OK" color="secondary" flat />
              </div>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
import moment from "moment";
import { dateUserFormat, dateDbFormat } from "@/composition/dates";
import { ref, toRef, computed } from "vue";
export default {
  name: "app-date-input",
  mixins: [inputMixin],
  setup(props, { emit }) {
    // props from mixin
    const rules = toRef(props, "rules");
    const label = toRef(props, "label");
    const required = toRef(props, "required");

    // model value
    const modelValue = toRef(props, "modelValue");
    const value = computed(() => dateUserFormat(modelValue.value));

    // show calendar prop
    let showCalendar = ref(false);

    // set today function
    const setToday = () => {
      updateDate(moment());
      showCalendar.value = false;
    };

    // update value action
    const updateDate = (newValue) => {
      emit("update:modelValue", dateDbFormat(newValue));
    };

    // rules
    const fieldRules = computed(() => {
      const dateRule = [
        (v) =>
          v.match(/^\d{2}\.\d{2}\.\d{4}$/) ||
          "Введите дату в формате ДД.ММ.ГГГГ",
      ];
      if (rules.value) {
        // return [...rules.value];
        return [...dateRule, ...rules.value];
      } else {
        if (required.value) {
          return [
            (v) => {
              return !!v || `Поле ${label.value} должно быть заполнено`;
            },
            ...dateRule,
          ];
        } else {
          // return [...dateRule];
          return [true];
        }
      }
    });

    return {
      value,
      label,
      fieldRules,
      updateDate,
      showCalendar,
      setToday,
    };
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped></style>
