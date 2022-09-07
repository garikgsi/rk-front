<template>
  <organization-require>
    <div class="row" v-if="kidsLoaded">
      <div class="col-xs-2 col-sm-3 self-center" v-if="isAdmin">
        <q-btn color="primary" :to="{ name: 'kids-form' }" v-if="!isPhone"
          >Добавить ребенка</q-btn
        >
        <q-btn
          color="primary"
          flat
          :to="{ name: 'kids-form' }"
          icon="add_box"
          size="lg"
          v-else
        ></q-btn>
      </div>
      <div class="col-xs-10 col-sm-8 q-px-md">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6">
            <table-search
              v-model="searchLine"
              :dense="false"
              label="Поиск по ФИО ребенка"
            ></table-search>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 q-mt-md q-pl-md">
            <checkbox-input
              v-model="withOut"
              label="Показать убывших"
              color="red"
            ></checkbox-input>
          </div>
        </div>
      </div>
    </div>
    <app-spinner v-else></app-spinner>
    <div class="row">
      <div
        class="col-12 col-md-6 col-lg-4 q-pa-md"
        v-for="kid in kids"
        :key="kid.id"
      >
        <kid-item :item="kid"></kid-item>
      </div>
    </div>
  </organization-require>
</template>

<script>
import TableSearchVue from "../UI/table/TableSearch.vue";
import kidsRepository from "@/composition/kids/kidsRepository";
import { onMounted, ref, computed } from "vue";
import KidItemVue from "./KidItem.vue";
import screen from "@/composition/screen";
import currentOrganization from "@/composition/organizations/currentOrganization";
import OrganizationRequeryVue from "@/views/organizations/OrganizationRequery.vue";
import AppSpinnerVue from "../UI/AppSpinner.vue";
import AppCheckboxInputVue from "../UI/inputs/AppCheckboxInput.vue";

export default {
  setup() {
    // kids items
    const { allKidsItems, fetchKidsData, kidsLoaded } = kidsRepository();

    // is phone prop
    const { isPhone } = screen();

    // is user == admin of organizations
    const { isAdmin } = currentOrganization();

    // search line input
    const searchLine = ref("");
    // if end study
    const withOut = ref(false);

    // kids list
    const kids = computed(() => {
      let filteredKids = [...allKidsItems.value];
      if (withOut.value === false) {
        filteredKids = filteredKids.filter((kid) => kid.isOut === false);
      }
      if (searchLine.value && searchLine.value.length > 0) {
        filteredKids = filteredKids.filter((row) => {
          return (
            `${row.last_name} ${row.name} ${row.patronymic}`
              .toLowerCase()
              .indexOf(searchLine.value.toLowerCase()) > -1
          );
        });
      }
      return filteredKids;
    });

    // fetch data on mounting
    onMounted(() => {
      fetchKidsData();
    });

    return {
      kids,
      searchLine,
      isPhone,
      isAdmin,
      withOut,
      kidsLoaded,
    };
  },
  name: "kids-list",
  components: {
    "kid-item": KidItemVue,
    "table-search": TableSearchVue,
    "organization-require": OrganizationRequeryVue,
    "app-spinner": AppSpinnerVue,
    "checkbox-input": AppCheckboxInputVue,
  },
};
</script>

<style lang="scss" scoped></style>
