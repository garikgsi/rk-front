<template>
  <div>
    <app-page
      :title="pageTitle"
      :subTitle="pageSubTitle"
      :icon="pageIcon"
      :help="organizationId ? helpText : null"
    >
      <div class="row" v-if="!organizationsLoaded">
        <div class="col">
          <q-spinner color="primary" size="3em"></q-spinner>
        </div>
      </div>
      <div v-else>
        <template v-if="organizationId">
          <div class="row" v-if="showWidgets">
            <div
              class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-md"
              n
              v-for="(widget, i) in widgets"
              :key="i"
            >
              <component :is="widget"></component>
            </div>
          </div>
          <div class="col" v-else>
            <empty-view></empty-view>
          </div>
        </template>
        <organizations-list v-else></organizations-list>
      </div>
    </app-page>
  </div>
</template>

<script>
import organizationRepository from "@/composition/organizations/organizationRepository";
import currentOrganization from "@/composition/organizations/currentOrganization";

import periodRepository from "@/composition/periods/periodRepository";
import kidsRepository from "@/composition/kids/kidsRepository";
import { computed, onMounted } from "vue";

import OperationsWidgetVue from "./operations/OperationsWidget.vue";
import PaymentsWidgetVue from "./payments/PaymentsWidget.vue";
import PeriodsWidgetVue from "./periods/PeriodsWidget.vue";
import PlansWidgetVue from "./plans/PlansWidget.vue";
import KidsWidgetVue from "@/views/kids/KidsWidger.vue";
import EmptyViewVue from "./EmptyView.vue";
import OrganizationWidgetVue from "./organizations/OrganizationWidget.vue";
import OrganizationsListVue from "@/components/organizations/OrganizationsList.vue";
import BirthdayWidgetVue from "./misc/BirthdayWidget.vue";

export default {
  name: "dashboard-view",
  setup() {
    const { organizationId, isAdmin } = currentOrganization();
    const widgets = computed(() => {
      let widgets = [
        BirthdayWidgetVue,
        OrganizationWidgetVue,
        PlansWidgetVue,
        OperationsWidgetVue,
        PaymentsWidgetVue,
        KidsWidgetVue,
      ];
      if (isAdmin.value) {
        widgets = [...widgets, ...[PeriodsWidgetVue]];
      }
      return widgets;
    });

    onMounted(() => {
      fetchOrganizations();
      // fetchKidsData();
      // fetchPeriods();
    });

    const { fetchOrganizations } = organizationRepository();

    const periodsData = periodRepository();
    // const { fetchPeriods } = periodRepository();
    const periodsCount = periodsData.periodsCount;
    const periodsLoaded = periodsData.dataLoaded;

    const organizationsData = organizationRepository();
    const organizationsLoaded = organizationsData.dataLoaded;
    const organizationsCount = organizationsData.organizationsCount;

    const { kidsCount, kidsLoaded } = kidsRepository();
    // const { fetchKidsData } = kidsRepository();

    const showWidgets = computed(() => {
      return (
        organizationsCount.value > 0 &&
        periodsCount.value > 0 &&
        kidsCount.value > 0
      );
      // return true;
    });

    const dataLoaded = computed(() => {
      // return (
      //   kidsLoaded.value && periodsLoaded.value && organizationsLoaded.value
      // );
      return organizationsCount.value > 0
        ? periodsCount.value > 0
          ? kidsLoaded.value && periodsLoaded.value
          : periodsLoaded.value
        : organizationsLoaded.value;
    });

    const pageTitle = computed(() => {
      return organizationId.value
        ? "Рабочий стол"
        : organizationsCount.value > 0
        ? "Выбор учебного учреждения"
        : "Добавьте учебное учреждение";
    });

    const pageSubTitle = computed(() => {
      return organizationId.value
        ? "основные действия программы на одном экране"
        : "для начала работы необходимо выбрать одно из учебных учреждений или создать его";
    });

    const pageIcon = computed(() => {
      return organizationId.value ? "dashboard" : "school";
    });
    // help
    const helpText = computed(() => {
      return {
        title: "Как работает программа?",
        lines: [
          "Для каждого периода:",
          "Сумма всех записей раздела 'Планируемые затраты' - это денежная сумма, из которой формируется общий бюджет. Бюджет делится на количество учеников и получается сумма, которую должны сдать родители за каждого обучающегося. Таким образом суммарная сумма взносов за период с 1 учащегося равна СуммаВзносовЗа1ученика=Сумма('Планируемые затраты')/КоличествоУчеников",
          "В разделе 'Расходы за период' заносятся все потраченные денежные средства вместе с чеками и сопровождающей информацией",
          "В разделе 'Полученные взносы' перечисляются все полученные взносы",
          "В сводном отчете графа 'Остаток текущий' = 'Полученные взносы'-'Расходы за период', т.е. показывает сколько осталось из сданных денег",
          "а графа 'Долг' = 'Полученные взносы'-'Планируемые затраты', т.е. при наличии несданных взносов будет выведено отрицательное значение, равное разнице запланированных затрат и сданных денег",
        ],
      };
    });

    return {
      widgets,
      showWidgets,
      dataLoaded,
      kidsCount,
      periodsCount,
      organizationsLoaded,
      organizationsCount,
      organizationId,
      pageTitle,
      pageSubTitle,
      pageIcon,
      periodsLoaded,
      kidsLoaded,
      helpText,
    };
  },
  components: {
    "empty-view": EmptyViewVue,
    "organizations-list": OrganizationsListVue,
  },
};
</script>

<style lang="scss" scoped></style>
