<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg=9">
          <div class="text-h3 text-primary">
            <q-icon :name="icon" v-if="icon"></q-icon>
            {{ title }}
          </div>
          <div class="text-subtitle3 text-grey-6" v-if="subTitle">
            {{ subTitle }}
          </div>
        </div>
        <div
          class="col-12 col-sm-12 col-md-4 col-lg=3"
          v-if="showPeriodSelector"
        >
          <period-select-input></period-select-input>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
import PeriodSelectInput from "@/components/UI/periods/PeriodSelectInput.vue";

export default {
  name: "app-page",
  props: {
    title: {
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
  },
  components: {
    "period-select-input": PeriodSelectInput,
  },
};
</script>

<style lang="scss" scoped></style>
