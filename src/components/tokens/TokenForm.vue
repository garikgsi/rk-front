<template>
  <q-form
    @submit.stop="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
    ref="tokenForm"
  >
    <q-input
      filled
      v-model="deviceName"
      required
      type="text"
      label="Device name"
      hint="What device you create token for"
      lazy-rules
      :rules="[(val) => (!!val && val.length > 0) || 'Device name required']"
    />

    <q-select
      v-model="tokenAbilities"
      :options="abilitiesOptions"
      label="Abilities"
      :multiple="true"
      :rules="[
        (val) => (!!val && val.length > 0) || 'Select one or more abilities',
      ]"
    />

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script>
export default {
  name: "token-form",
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
