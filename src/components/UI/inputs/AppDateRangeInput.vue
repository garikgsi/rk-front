<template>
  <q-input
    ref="inputRef"
    filled
    :model-value="strValue"
    mask="##.##.####-##.##.####"
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="fieldRules"
    clearable
    @update:modelValue="updateTextDate"
    @change="completeInput"
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
            range
            @update:modelValue="updateDate"
          >
            <div class="row">
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
// import moment from "moment";
// import { dateUserFormat } from "@/composition/dates";
import { dateUserFormat, dateDbFormat } from "@/composition/dates";
import { ref, toRef, computed } from "vue";
export default {
  name: "app-date-range-input",
  mixins: [inputMixin],
  props: {
    modelValue: {
      type: Array,
      require: true,
    },
  },
  setup(props, { emit }) {
    // props from mixin
    const rules = toRef(props, "rules");
    const label = toRef(props, "label");
    const required = toRef(props, "required");
    const inputRef = ref(null);

    // model value
    const modelValue = toRef(props, "modelValue");
    const strValue = computed(() => {
      if (modelValue.value.length == 2) {
        return `${dateUserFormat(modelValue.value[0])}-${dateUserFormat(
          modelValue.value[1]
        )}`;
      }
      return null;
      // dateUserFormat(modelValue.value)
    });
    const value = computed(() => {
      if (modelValue.value.length == 2) {
        return {
          from: dateUserFormat(modelValue.value[0]),
          to: dateUserFormat(modelValue.value[1]),
        };
      }
      return { from: null, to: null };
    });

    // show calendar prop
    let showCalendar = ref(false);

    // update value action
    const updateDate = (newValue) => {
      // const newRange = [newValue.from, newValue.to];
      let newRange = [];
      if (newValue && newValue.from && newValue.to) {
        newRange = [dateDbFormat(newValue.from), dateDbFormat(newValue.to)];
      }
      emit("update:modelValue", newRange);
    };

    // transform text range to model
    const transformFromText = (val) => {
      let newRange = null;
      if (val && val.match(/^\d{2}\.\d{2}\.\d{4}-\d{2}\.\d{2}\.\d{4}$/)) {
        const dates = val.split("-");
        newRange = [dateDbFormat(dates[0]), dateDbFormat(dates[1])];
      }
      return newRange;
    };
    // update from keyboard
    const updateTextDate = (newValue) => {
      const newRange = transformFromText(newValue);
      if (newRange) emit("update:modelValue", newRange);
    };
    // complete typing by keyboard
    const completeInput = (val) => {
      const newRange = transformFromText(val);
      emit("update:modelValue", newRange ? newRange : []);
      inputRef.value.validate();
    };

    // rules
    const fieldRules = computed(() => {
      const dateRule = [
        (v) =>
          v.match(/^\d{2}\.\d{2}\.\d{4}-\d{2}\.\d{2}\.\d{4}$/) ||
          "Введите дату в формате ДД.ММ.ГГГГ-ДД.ММ.ГГГГ",
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
      inputRef,
      value,
      strValue,
      label,
      fieldRules,
      updateDate,
      updateTextDate,
      showCalendar,
      completeInput,
    };
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped></style>
