<template>
  <h4 class="q-px-sm q-ma-sm">Онлайн отчет за период</h4>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-7 col-xl-8 q-pa-sm">
      <div class="row">
        <div class="col q-pa-sm">
          <app-select-input
            v-if="periods"
            label="Период"
            :options="periods"
            :modelValue="period"
            :clearable="false"
            option-label="name"
            @update:modelValue="changePeriod"
          ></app-select-input>
        </div>
      </div>
      <div class="row">
        <div class="col q-pa-sm">
          <public-operations-report
            v-if="operations"
            :operations="operations"
          ></public-operations-report>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-5 col-xl-4 q-pa-sm">
      <div class="row">
        <div class="col q-pa-sm">
          <public-common-report
            :totals="totals"
            v-if="totals"
          ></public-common-report>
        </div>
      </div>
      <div class="row">
        <div class="col q-pa-sm">
          <public-plans-report
            v-if="plans"
            :plans="plans"
            :total="totals?.plans"
          ></public-plans-report>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicOperationsReportVue from "@/components/reports/PublicOperationsReport.vue";
import PublicPlansReportVue from "@/components/reports/PublicPlansReport.vue";
import AppSelectInputVue from "@/components/UI/inputs/AppSelectInput.vue";
import PublicCommonReportVue from "@/components/reports/PublicCommonReport.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "home-view",
  setup() {
    // vuex store
    const store = useStore();
    // current period
    const period = computed(() => store.state.public.period);
    // all periods
    const periods = computed(() => store.state.public.periods);
    // data loaded for period property
    const dataLoaded = computed(() => {
      return store.state.public.dataLoaded[period.value?.id] || false;
    });
    // change current period action
    const changePeriod = async (newPeriod) => {
      store.dispatch("public/changePeriod", newPeriod.id);
      fetchData();
    };
    // fetch data for period function
    const fetchData = () => {
      if (!dataLoaded.value)
        store.dispatch("public/getReport", period.value?.id);
    };
    // operations for period
    const operations = computed(() => {
      return period.value?.id
        ? store.state.public.operations[period.value.id]
        : [];
    });
    // plans for period
    const plans = computed(() => {
      return period.value?.id ? store.state.public.plans[period.value.id] : [];
    });

    // totals for period
    const totals = computed(() => {
      return period.value?.id ? store.state.public.totals[period.value.id] : [];
    });

    onMounted(() => {
      fetchData();
    });

    return {
      dataLoaded,
      changePeriod,
      period,
      periods,
      operations,
      plans,
      totals,
    };
  },
  components: {
    "public-operations-report": PublicOperationsReportVue,
    "public-plans-report": PublicPlansReportVue,
    "public-common-report": PublicCommonReportVue,
    "app-select-input": AppSelectInputVue,
  },
};
</script>

<style lang="scss"></style>
