<template>
  <div class="row">
    <div class="col-12 col-sm-3">
      <q-btn color="primary" :to="{ name: 'kids-form' }"
        >Добавить ребенка</q-btn
      >
    </div>
    <div class="col-12 col-sm-8 q-px-md">
      <table-search
        v-model="searchLine"
        :dense="false"
        label="Поиск по ФИО ребенка"
      ></table-search>
    </div>
  </div>
  <div class="row">
    <div
      class="col-12 col-md-6 col-lg-4 col-xl-1 q-pa-md"
      v-for="kid in kids"
      :key="kid.id"
    >
      <kid-item :item="kid"></kid-item>
    </div>
  </div>
</template>

<script>
import TableSearchVue from "../UI/table/TableSearch.vue";
import kidsRepository from "@/composition/kids/kidsRepository";
import { onMounted, ref, computed } from "vue";
import KidItemVue from "./KidItem.vue";

export default {
  setup() {
    // kids items
    const { kidsItems, fetchKidsData } = kidsRepository();

    // search line input
    const searchLine = ref("");

    // kids list
    const kids = computed(() => {
      if (searchLine.value && searchLine.value.length > 0) {
        return [...kidsItems.value].filter((row) => {
          return (
            `${row.last_name} ${row.name} ${row.patronymic}`
              .toLowerCase()
              .indexOf(searchLine.value.toLowerCase()) > -1
          );
        });
      }
      return kidsItems.value;
    });

    // fetch data on mounting
    onMounted(() => {
      fetchKidsData();
    });

    return {
      kids,
      searchLine,
    };
  },
  name: "kids-list",
  components: {
    "kid-item": KidItemVue,
    "table-search": TableSearchVue,
  },
};
</script>

<style lang="scss" scoped></style>
