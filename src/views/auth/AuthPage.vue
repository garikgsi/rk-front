<template>
  <div class="row justify-center">
    <div class="col-xs-12 col-sm-6 col-md-5 col-lg-3 q-pa-sm">
      <div class="q-ma-lg">
        <h2 class="q-my-xs">{{ title }}</h2>
        <div class="subtitle1 text-primary">
          {{ subTitle }}
        </div>
      </div>
      <div class="q-mt-lg">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    subTitle: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
