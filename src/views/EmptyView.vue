<template>
  <div v-if="!hasPeriods">
    <h4>Пока что не создано ни одного периода</h4>
    <div class="subtitle1 text-primary">Давайте начнем с создания периода</div>
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
        <kids-form :closable="false" :return-on-submit="false"></kids-form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import kidsRepository from "@/composition/kids/kidsRepository";
import periodRepository from "@/composition/periods/periodRepository";
import PeriodFormVue from "@/components/periods/PeriodForm.vue";
import KidsFormVue from "@/components/kids/KidsForm.vue";

export default {
  setup() {
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
    };
  },
  components: {
    "period-form": PeriodFormVue,
    "kids-form": KidsFormVue,
  },
};
</script>

<style lang="scss" scoped></style>
