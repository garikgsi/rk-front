<template>
  <div class="row justify-center q-pa-md">
    <div class="col"></div>
    <div class="col-auto col-md-5">
      <div class="text-center">
        <q-spinner-clock color="primary" size="3em"></q-spinner-clock>
      </div>
      <div class="text-h5 text-primary q-my-lg">
        {{ title }}
      </div>
      <div class="text-subtitle3 text-blue-7">{{ subTitle }}</div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: false,
      default: "Подождите, идет загрузка...",
    },
    subTitle: {
      type: String,
      require: false,
      default:
        "Стараюсь как можно быстрее загрузить данные. Время ожидания зависит отскорости интернета и загрузки сервера",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
