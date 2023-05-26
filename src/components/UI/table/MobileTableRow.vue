<template>
  <q-item-section>
    <q-item-label v-if="item[columns.title]">{{
      item[columns.title]
    }}</q-item-label>
    <q-item-label caption v-if="columns.subTitle">
      <div v-for="(col, index) in columns.subTitle" :key="index">
        <div v-if="item[col.name]" class="text-subtitle2">
          <!-- col title -->
          <span>{{ col.label }}: </span>
          <!-- money format -->
          <span
            v-if="col.type == 'money'"
            :class="{
              'text-negative': parseFloat(item[col.name]) < 0,
            }"
            >{{ item[col.name] }} руб.</span
          >
          <!-- no format -->
          <span v-else>{{ item[col.name] }}</span>
        </div>
      </div>
    </q-item-label>
  </q-item-section>

  <q-item-section side top v-if="item[columns.right] || item[columns.link]">
    <q-item-label
      caption
      class="text-primary text-subtitle2"
      v-if="item[columns.right]"
      >{{ item[columns.right] }}</q-item-label
    >
    <q-btn
      icon="attach_file"
      v-if="item[columns.link]"
      flat
      :href="item[columns.link]"
      @click.stop="() => false"
    ></q-btn>
  </q-item-section>
</template>

<script>
export default {
  props: {
    columns: {
      require: true,
      type: Object,
    },
    item: {
      require: true,
      type: Object,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
