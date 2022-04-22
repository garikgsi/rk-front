<template>
  <q-input
    filled
    v-model="value"
    mask="##.##.####"
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="fieldRules"
    clearable
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
          <q-date v-model="value" mask="DD.MM.YYYY">
            <div class="row">
              <div class="col">
                <q-btn label="Сегодня" color="primary" flat @click="setToday" />
              </div>
              <div class="col" align="right">
                <q-btn v-close-popup label="Закрыть" color="secondary" flat />
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
export default {
  name: "app-date-input",
  mixins: [inputMixin],
  data() {
    return {
      dateFormat: "DD.MM.YYYY",
      showCalendar: false,
    };
  },
  computed: {
    fieldRules() {
      const dateRule = [
        (v) =>
          v.match(/^\d{2}\.\d{2}\.\d{4}$/) ||
          "Введите дату в формате ДД.ММ.ГГГГ",
      ];
      if (this.rules) {
        return [...dateRule, ...this.rules];
      } else {
        if (this.required) {
          return [
            (v) => {
              return !!v || `Поле ${this.label} должно быть заполнено`;
            },
            ...dateRule,
          ];
        } else {
          return [...dateRule];
        }
      }
    },
  },
  methods: {
    setToday() {
      this.value = moment().format(this.dateFormat);
      this.showCalendar = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
