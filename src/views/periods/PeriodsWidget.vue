<template>
  <app-dashboard-widget
    title="Текущий период"
    color="info"
    icon="date_range"
    v-if="currentPeriod"
  >
    <template v-slot:buttons v-if="isAdmin">
      <q-btn label="Новый" flat color="primary">
        <q-menu v-model="showAddPeriod" self="top middle">
          <q-card>
            <q-card-section>
              <period-form
                class="q-pa-md form"
                @closed="showAddPeriod = false"
                @submitted="submitted($event)"
              ></period-form>
            </q-card-section>
          </q-card>
        </q-menu>
      </q-btn>
      <q-btn label="Переименовать" flat color="secondary">
        <q-menu v-model="showEditPeriod" self="top middle">
          <q-card class="q-ma-md" flat>
            <q-card-section>
              <period-form
                :id="currentPeriod.id"
                class="q-pa-md form"
                @closed="showEditPeriod = false"
                @submitted="submittedEdit($event)"
              ></period-form>
            </q-card-section>
          </q-card>
        </q-menu>
      </q-btn>
    </template>
    <div class="text-subtitle1">
      <div>
        Текущий период: <span>{{ currentPeriod.name }}</span>
      </div>
      <div>
        {{ period }}
      </div>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";
import PeriodFormVue from "@/components/periods/PeriodForm.vue";
import { computed, ref } from "vue";
import periodRepository from "@/composition/periods/periodRepository";
import currentOrganization from "@/composition/organizations/currentOrganization";
import { dateUserFormat } from "@/composition/dates";

export default {
  name: "periods-widget",
  components: {
    "app-dashboard-widget": AppDashboardWidgetVue,
    "period-form": PeriodFormVue,
  },
  setup() {
    const { isAdmin } = currentOrganization();
    const { currentPeriod } = periodRepository();
    let showAddPeriod = ref(false);
    let showEditPeriod = ref(false);
    // period
    const period = computed(() => {
      return `${dateUserFormat(
        currentPeriod.value.start_date
      )}-${dateUserFormat(currentPeriod.value.end_date)}`;
    });

    // submitted add new period form
    const submitted = (response) => {
      if (response.data) showAddPeriod.value = false;
    };
    // submitted edit period form
    const submittedEdit = (response) => {
      if (response.data) showEditPeriod.value = false;
    };
    return {
      submitted,
      submittedEdit,
      currentPeriod,
      showAddPeriod,
      showEditPeriod,
      isAdmin,
      period,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
}
</style>
