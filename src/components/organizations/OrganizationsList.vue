<template>
  <div class="row q-pa-sm">
    <div class="col-xs-2 col-sm-3 self-center">
      <q-btn color="primary" :to="{ name: 'organization-form' }" v-if="!isPhone"
        >Добавить</q-btn
      >
      <q-btn
        color="primary"
        flat
        :to="{ name: 'organization-form' }"
        icon="add_box"
        size="lg"
        v-else
      ></q-btn>
    </div>
    <div class="col-xs-10 col-sm-8 q-px-md">
      <table-search
        v-model="searchLine"
        :dense="false"
        label="Поиск по названию"
      ></table-search>
    </div>
  </div>

  <div class="row">
    <div
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 q-pa-sm"
      v-for="organization in filteredOrganizations"
      :key="organization.id"
    >
      <organization-item
        :organization="organization"
        :selected="organization.id == organizationId"
        @selected="selectOrganization($event)"
        @delete="deleteOrganization($event)"
      ></organization-item>
    </div>
  </div>
</template>

<script>
import organizationRepository from "@/composition/organizations/organizationRepository";
import currentOrganization from "@/composition/organizations/currentOrganization";
import { onMounted, ref, computed } from "vue";
import OrganizationItemVue from "./OrganizationItem.vue";
import screen from "@/composition/screen";
import TableSearchVue from "../UI/table/TableSearch.vue";
import { addInfo } from "@/composition/addMessage";
import { useRouter } from "vue-router";

export default {
  setup() {
    // router
    const router = useRouter();
    // is phone prop
    const { isPhone } = screen();

    // search line
    const searchLine = ref("");
    // organizations list
    const filteredOrganizations = computed(() => {
      if (searchLine.value && searchLine.value.length > 0) {
        return [...organizations.value].filter((row) => {
          return (
            row.title.toLowerCase().indexOf(searchLine.value.toLowerCase()) > -1
          );
        });
      }
      return organizations.value;
    });

    // organization repo
    const {
      fetchOrganizations,
      organizations,
      changeOrganization,
      removeOrganization,
    } = organizationRepository();
    const { organizationId } = currentOrganization();

    // set organization
    const selectOrganization = async (id) => {
      await changeOrganization(id);
      router.push("dashboard");
    };

    // remove organization
    const deleteOrganization = (id) => {
      const isError = removeOrganization({ id });
      if (!isError) {
        addInfo("Запись успешно удалена");
      }
    };

    onMounted(() => {
      fetchOrganizations();
    });

    return {
      organizations,
      filteredOrganizations,
      organizationId,
      selectOrganization,
      deleteOrganization,
      isPhone,
      searchLine,
    };
  },
  components: {
    "organization-item": OrganizationItemVue,
    "table-search": TableSearchVue,
  },
};
</script>

<style lang="scss" scoped></style>
