<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <app-header
        @toggleLeftDrawer="toggleLeftDrawer"
        :menu-items="headerMenu"
      ></app-header>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <app-sidebar :items="sideBarMenu"></app-sidebar>
    </q-drawer>

    <q-page-container>
      <app-banner v-if="lastMessage" :msg="lastMessage"></app-banner>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs class="text-primary" align="justify">
        <q-route-tab
          :icon="menu.icon"
          :to="menu.to"
          v-for="menu in footerMenu"
          :key="menu.id"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { computed, ref } from "vue";
import { mapGetters, useStore } from "vuex";
import { useRouter } from "vue-router";
import AppBanner from "@/components/UI/AppBanner.vue";
import AppSideBar from "@/views/AppSkeleton/SideBar.vue";
import { checkStoredUser } from "@/composition/appAuth";
import AppHeader from "@/views/AppSkeleton/AppHeader.vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    // router & store
    const router = useRouter();
    const store = useStore();

    checkStoredUser().then((isAuth) => {
      router.push(isAuth ? "/dashboard" : "/");
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      // messages
      hasMessage: computed(() => store.getters["app/hasMessage"]),
      lastMessage: computed(() => store.getters["app/lastMessage"]),
      // check saved token in localStorage
      checkStoredUser,
    };
  },
  components: {
    "app-banner": AppBanner,
    "app-sidebar": AppSideBar,
    "app-header": AppHeader,
  },
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
    }),
    sideBarMenu() {
      return [
        { to: { name: "tokens" }, title: "My tokens", icon: "api" },
        {
          to: { name: "plans" },
          title: "Планирование бюджета",
          icon: "show_chart",
        },
        {
          to: { name: "operations" },
          title: "Расходные операции",
          icon: "point_of_sale",
        },
        {
          to: { name: "payments" },
          title: "Оплаты",
          icon: "account_balance_wallet",
        },
        {
          to: { name: "kids" },
          title: "Ученики и родители",
          icon: "family_restroom",
        },
        {
          to: { name: "debt" },
          title: "Долги",
          icon: "money_off",
        },
      ];
    },
    headerMenu() {
      return [{ to: { name: "dashboard" }, title: "Главная" }];
    },
    footerMenu() {
      return [
        {
          id: 1,
          to: { name: "plans" },
          title: "Планирование бюджета",
          icon: "show_chart",
        },
        {
          id: 2,
          to: { name: "operations" },
          title: "Расходные операции",
          icon: "point_of_sale",
        },
        {
          id: 3,
          to: { name: "payments" },
          title: "Оплаты",
          icon: "account_balance_wallet",
        },
        {
          id: 3,
          to: { name: "debt" },
          title: "Долги",
          icon: "money_off",
        },
      ];
    },
  },
};
</script>
