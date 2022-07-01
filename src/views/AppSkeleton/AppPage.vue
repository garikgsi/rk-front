<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="row">
        <div
          :class="
            showPeriods ? 'col-xs-12 col-sm-12 col-md-6 col-lg-8' : 'col-12'
          "
        >
          <div class="row justify-between">
            <div class="col-10">
              <div class="text-h3 text-primary">
                <q-icon :name="icon" v-if="icon"></q-icon>
                {{ title }}
              </div>
              <div class="text-subtitle3 text-grey-6" v-if="subTitle">
                {{ subTitle }}
              </div>
            </div>
            <div class="col-2 self-center" align="right">
              <app-alert
                v-if="help"
                :title="help.title"
                :lines="help.lines"
                v-model="showHelp"
                @ok="showHelp = false"
              >
                <q-btn
                  icon="help"
                  flat
                  size="xl"
                  color="warning"
                  round
                  @click="showHelp = true"
                  ><q-tooltip>Как это работает?</q-tooltip></q-btn
                >
              </app-alert>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4" v-if="showPeriods">
          <div class="row">
            <div class="col-xs-12 col-md-6 q-pr-sm">
              <organization-select-input></organization-select-input>
            </div>
            <div class="col-xs-12 col-md-6 q-pr-sm">
              <period-select-input></period-select-input>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-linear-progress
      query
      color="primary"
      v-if="isLoading"
      size="3px"
    ></q-linear-progress>
    <q-separator v-else size="3px"></q-separator>

    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import PeriodSelectInput from "@/components/UI/periods/PeriodSelectInput.vue";
import currentOrganization from "@/composition/organizations/currentOrganization";
import OrganizationSelectInputVue from "@/components/UI/organizations/OrganizationSelectInput.vue";
import { toRefs, computed, ref } from "vue";
import { useStore } from "vuex";
import AppAlertVue from "@/components/UI/AppAlert.vue";
import { useMeta } from "quasar";

export default {
  name: "app-page",
  props: {
    title: {
      required: false,
      type: String || null,
      default: null,
    },
    metaTitle: {
      required: false,
      type: String || null,
      default: null,
    },
    icon: {
      required: false,
      type: String || null,
      default: null,
    },
    subTitle: {
      required: false,
      type: String || null,
      default: null,
    },
    showPeriodSelector: {
      required: false,
      type: Boolean,
      default: true,
    },
    help: {
      required: false,
      type: Object,
      default: undefined,
    },
  },
  setup(props) {
    const store = useStore();

    const { organizationId } = currentOrganization();
    const { showPeriodSelector, metaTitle, title } = toRefs(props);

    const showPeriods = computed(() => {
      return showPeriodSelector.value && organizationId.value;
    });

    const isLoading = computed(() => store.state.app.isLoading);

    const showHelp = ref(false);

    // page meta
    useMeta(() => {
      {
        return {
          title: metaTitle.value || title.value || "",
        };
      }
    });

    return {
      showPeriods,
      isLoading,
      showHelp,
    };
  },
  components: {
    "period-select-input": PeriodSelectInput,
    "organization-select-input": OrganizationSelectInputVue,
    "app-alert": AppAlertVue,
  },
};
</script>

<style lang="scss" scoped></style>
