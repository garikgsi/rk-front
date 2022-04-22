<template>
  <q-card flat bordered>
    <q-card-section :class="`bg-${color}`">
      <div class="text-h5 q-mt-sm q-mb-sm text-white">
        <q-icon :name="icon" v-if="icon" color="white"></q-icon>
        {{ title }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-caption" :class="`text-${textColor}`">
        <slot></slot>
      </div>
    </q-card-section>
    <q-separator spaced="md" />

    <q-card-actions>
      <template v-if="buttons">
        <q-btn
          v-for="(button, i) in buttons"
          flat
          :key="i"
          :label="button.title"
          :to="button.to"
          :color="button.color"
        />
      </template>
      <slot name="buttons"></slot>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "app-dashboard-widget",
  props: {
    title: {
      require: true,
      type: String,
    },
    icon: {
      require: false,
      type: String,
    },
    color: {
      require: false,
      type: String,
      default: "primary",
    },
    textColor: {
      require: false,
      type: String,
      default: "grey",
    },
    buttons: {
      require: false,
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped></style>
