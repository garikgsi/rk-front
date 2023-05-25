<script setup>
import { onMounted, toRef, computed } from "vue";
import useDebtKidReport from "@/composition/debt/debtKidReport";
import router from "vue-router";
import { fm } from "../../composition/math";
import { dateUserFormat } from "../../composition/dates";
import currentOrganization from "@/composition/organizations/currentOrganization";
import AppTable from "@/components/UI/table/AppTable.vue";

const props = defineProps({
  kidId: {
    type: [String, Number],
    required: true,
  },
  periodId: {
    type: [String, Number],
    required: true,
  },
});
const kidId = toRef(props, "kidId");
const periodId = toRef(props, "periodId");

const { fetchReport, report } = useDebtKidReport(kidId);

const { isAdmin } = currentOrganization();

const colorClass = (sum, invert = false) =>
  sum >= 0 && !invert ? "text-green" : "text-red";

onMounted(() => {
  fetchReport(periodId);
});

const closeForm = () => {
  router.go(-1);
};

const planColumns = computed(() => {
  return [
    {
      name: "start_bill_date",
      field: "start_bill_date",
      label: "Дата начала учета",
      sortable: true,
      align: "left",
      type: "date",
      mobile: "start_bill_date",
    },
    {
      name: "title",
      field: "title",
      label: "Статья расходов",
      sortable: false,
      align: "left",
      type: "string",
      mobile: "title",
    },
    {
      name: "price",
      field: "price",
      label: "Сумма",
      align: "right",
      sortable: false,
      type: "money",
      mobile: "subTitle",
    },
  ];
});

const paymentColumns = computed(() => {
  return [
    {
      name: "date",
      field: "date",
      label: "Дата оплаты",
      sortable: true,
      align: "left",
      sortOrder: "ad",
      type: "date",
      mobile: "right",
    },
    {
      name: "comment",
      field: "comment",
      label: "Комментарий",
      align: "left",
      sortable: false,
      type: "string",
      mobile: "title",
    },
    {
      name: "amount",
      field: "amount",
      label: "Сумма",
      align: "right",
      sortable: false,
      type: "money",
      mobile: "subTitle",
    },
  ];
});
</script>

<template>
  <q-card class="q-mb-md" flat bordered v-if="report">
    <q-card-section v-if="isAdmin">
      <div class="text-h4 q-mt-sm q-mb-xs">
        {{ report.fio }}
        <span
          class="q-px-sm"
          :class="[colorClass(report.debt)]"
          v-if="report.debt !== 0"
          >! {{ report.debt < 0 ? "долг" : "переплата" }}
          {{ fm(Math.abs(report.debt)) }} !</span
        >
      </div>
      <div class="text-subtitle2 q-my-md">
        <div class="q-py-sm" v-if="report.start_study || report.end_study">
          <span v-if="report.start_study" class="q-pr-md"
            >Начало обучения:
            <span class="text-accent">{{
              dateUserFormat(report.start_study)
            }}</span></span
          >
          <span v-if="report.end_study"
            >Окончание обучения:
            <span class="text-accent">{{
              dateUserFormat(report.end_study)
            }}</span></span
          >
        </div>
        <div class="q-py-sm">
          Детализация отчета за период:
          <span class="text-primary">{{ report.period.name }}</span>
        </div>
      </div>
      <q-separator></q-separator>
      <div
        class="text-h6"
        :class="[colorClass(report.start_saldo, true)]"
        v-if="report.start_saldo !== 0"
      >
        Долг на начало периода: {{ fm(report.start_saldo) }}
      </div>
      <div class="text-green text-h6 q-mt-lg">
        Всего начислено за период: {{ fm(report.sumPlan) }}
      </div>
      <app-table
        :columns="planColumns"
        :items="report.plans"
        :editable="false"
        :addable="false"
        :clickable="false"
        :searchable="false"
        :hide-pagination="true"
      ></app-table>
      <div class="text-h6 q-mt-lg" :class="[colorClass(report.debt)]">
        Всего оплачено за период: {{ fm(report.sumPay) }}
      </div>
      <app-table
        :columns="paymentColumns"
        :items="report.payments"
        :editable="false"
        :addable="false"
        :clickable="false"
        :searchable="false"
        :hide-pagination="true"
      ></app-table>
      <div class="text-h6 q-mt-lg">
        Итого за период:
        <span
          class="q-px-sm"
          :class="[colorClass(report.debt)]"
          v-if="report.debt !== 0"
          >{{ report.debt < 0 ? "долг" : "переплата" }}
          {{ fm(Math.abs(report.debt)) }}</span
        >
        <span v-else class="text-green"> все отлично) </span>
      </div>
    </q-card-section>
    <q-card-section v-else>
      <h1>Просматривать отчет могут только администраторы</h1>
    </q-card-section>
  </q-card>
  <form-buttons
    @close="closeForm"
    :cancelable="false"
    :saveable="false"
  ></form-buttons>
</template>

<style lang="scss" scoped></style>
