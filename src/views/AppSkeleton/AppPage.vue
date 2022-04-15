<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h3 text-primary">
        <q-icon :name="icon" v-if="icon"></q-icon>
        {{ title }}
      </div>
      <div class="text-subtitle3 text-grey-6" v-if="subTitle">
        {{ subTitle }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-card-section><slot></slot></q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "app-page",
  props: {
    title: {
      required: false,
      type: String || null,
      default: null,
    },
    icon: {
      required: false,
      type: String || null,
      default: null,
    },
    subTitle: {
      required: false,
      type: String || null,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped></style>
