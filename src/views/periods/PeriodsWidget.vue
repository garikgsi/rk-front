<template>
  <app-dashboard-widget
    title="Текущий период"
    color="info"
    icon="date_range"
    v-if="currentPeriod"
  >
    <template v-slot:buttons>
      <q-btn label="Новый период" flat color="primary">
        <q-menu v-model="showAddPeriod">
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
    </template>
    <div class="text-subtitle1">
      <div>
        Текущий период: <span>{{ currentPeriod.title }}</span>
      </div>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";
import PeriodFormVue from "@/components/periods/PeriodForm.vue";
import { ref } from "vue";
import periodRepository from "@/composition/periods/periodRepository";

export default {
  name: "periods-widget",
  components: {
    "app-dashboard-widget": AppDashboardWidgetVue,
    "period-form": PeriodFormVue,
  },
  setup() {
    const { currentPeriod } = periodRepository();
    let showAddPeriod = ref(false);
    // submitted add new period form
    const submitted = (response) => {
      if (response.data) showAddPeriod.value = false;
    };

    return {
      submitted,
      currentPeriod,
      showAddPeriod,
    };
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
}
</style>
