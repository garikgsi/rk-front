<template>
  <div v-if="!hasOrganizations">
    <h4>Пока что не создано ни одного учебного учреждения</h4>
    <div class="subtitle1 text-primary">
      Вы можете создать свою организацию и стать ее администратором или
      попросить добавить Вас в имеющуюся
    </div>
    <organization-form
      :closable="false"
      :return-on-submit="false"
    ></organization-form>
  </div>

  <div v-if="!hasPeriods && hasOrganizations">
    <h4>Пока что не создано ни одного периода</h4>
    <div class="subtitle1 text-primary">
      Периоды необходимы, чтобы не тратить время на поиск информации и не
      загромождать программу. Обычно используют учебные года или полугодия.
    </div>
    <period-form :closable="false"></period-form>
  </div>

  <div v-if="!hasKids && hasPeriods">
    <h4>Отлично, периоды созданы! Но не заполнена информация об учащихся</h4>
    <div class="subtitle1 text-primary">
      Давайте создадим учащихся, чтобы можно было использовать все преимущества
      сервиса. Редактор учащихся в бургер-меню в разделе "Ученики и родители"
    </div>
    <div class="row">
      <div class="col q-pa-lg">
        <!-- <kids-form :closable="false" :return-on-submit="false"></kids-form> -->
        <kids-list></kids-list>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import organizationRepository from "@/composition/organizations/organizationRepository";
import kidsRepository from "@/composition/kids/kidsRepository";
import periodRepository from "@/composition/periods/periodRepository";
import PeriodFormVue from "@/components/periods/PeriodForm.vue";
// import KidsFormVue from "@/components/kids/KidsForm.vue";

import OrganizationsFormVue from "@/components/organizations/OrganizationsForm.vue";
import KidsListVue from "@/components/kids/KidsList.vue";

export default {
  setup() {
    // organizations
    const { organizationsCount, dataLoaded } = organizationRepository();
    const hasOrganizations = computed(() => {
      return dataLoaded.value && organizationsCount.value > 0;
    });

    // periods
    const { periods } = periodRepository();
    const hasPeriods = computed(() => {
      return periods.value.length > 0;
    });

    // kids
    const { kidsCount, fetchKidsData } = kidsRepository();
    onMounted(() => fetchKidsData());
    const hasKids = computed(() => {
      return kidsCount.value > 0;
    });

    return {
      periods,
      hasPeriods,
      hasKids,
      hasOrganizations,
    };
  },
  components: {
    "organization-form": OrganizationsFormVue,
    "period-form": PeriodFormVue,
    // "kids-form": KidsFormVue,
    "kids-list": KidsListVue,
  },
};
</script>

<style lang="scss"></style>
