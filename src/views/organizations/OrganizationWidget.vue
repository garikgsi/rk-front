<template>
  <app-dashboard-widget
    title="Учебные заведения"
    :color="color"
    :buttons="buttons"
    icon="school"
  >
    <div class="text-subtitle1">
      <div v-if="organizationsCount > 1">Текущее: {{ organization.title }}</div>
      <div v-else>{{ organization.title }}</div>
      <div>
        Публичный отчет:
        <q-btn
          class="q-ml-xs"
          @click="copyPublicUrl"
          icon="content_copy"
          label="скопировать ссылку"
          flat
        ></q-btn>
      </div>
    </div>
  </app-dashboard-widget>
</template>

<script>
import AppDashboardWidgetVue from "@/views/AppSkeleton/AppDashboardWidget.vue";
import currentOrganization from "@/composition/organizations/currentOrganization";
import organizationsRepository from "@/composition/organizations/organizationRepository";
import { ref, computed } from "vue";
import settings from "@/settings";
import { copyToClipboard } from "quasar";
import { addInfo, addError } from "@/composition/addMessage";

export default {
  name: "organizations-widget",
  setup() {
    const { organization } = currentOrganization();
    const { organizationsCount } = organizationsRepository();
    // console.log(`organization=${JSON.stringify(organization.value)}`);
    const color = ref("deep-purple-4");
    const buttons = computed(() => {
      let buttons = [];
      if (organizationsCount.value > 1) {
        buttons.push({
          title: "Сменить",
          to: { name: "organizations" },
          color: "primary",
        });
      }
      buttons = [
        ...buttons,
        ...[
          {
            title: "К отчету",
            to: {
              name: "public",
              params: { slug: organization.value.slug },
            },
            color: "primary",
          },
          {
            title: "Добавить",
            to: { name: "organization-form" },
            color: "positive",
          },
        ],
      ];
      return buttons;
    });

    // public report url
    const publicUrl = computed(() => {
      return `${settings.appUrl}/${organization.value.slug}`;
    });
    // copy public report url to clipboard
    const copyPublicUrl = () => {
      copyToClipboard(publicUrl.value)
        .then(() => {
          addInfo("Ссылка скопирована в буфер обмена");
        })
        .catch(() => {
          addError("Что-то пошло не так");
        });
    };

    return {
      color,
      buttons,
      organization,
      organizationsCount,
      publicUrl,
      copyPublicUrl,
    };
  },
  components: {
    "app-dashboard-widget": AppDashboardWidgetVue,
  },
};
</script>

<style lang="scss" scoped></style>
