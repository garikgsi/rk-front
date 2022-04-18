<template>
  <q-form
    @submit.stop="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
    ref="tokenForm"
  >
    <app-text-input
      v-model="deviceName"
      required
      label="Device name"
      hint="What device you create token for"
    ></app-text-input>
    <app-select-input
      v-model="tokenAbilities"
      :options="abilitiesOptions"
      label="Abilities"
      multiple
      required
    ></app-select-input>

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
import AppSelectInputVue from "../UI/inputs/AppSelectInput.vue";
import AppTextInputVue from "../UI/inputs/AppTextInput.vue";
export default {
  name: "token-form",
  components: {
    "app-text-input": AppTextInputVue,
    "app-select-input": AppSelectInputVue,
  },
  props: {
    abilities: {
      require: true,
      type: Array,
    },
    name: {
      require: true,
      type: String,
    },
  },
  emits: ["update:name", "update:abilities", "submit"],
  data() {
    return {
      abilitiesOptions: ["*"],
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit");
    },
    onReset() {
      this.deviceName = "";
      this.tokenAbilities = [];
    },
  },
  computed: {
    deviceName: {
      get() {
        return this.name;
      },
      set(val) {
        this.$emit("update:name", val);
      },
    },
    tokenAbilities: {
      get() {
        return this.abilities;
      },
      set(val) {
        this.$emit("update:abilities", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
