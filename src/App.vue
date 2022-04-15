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
      <router-view />
    </q-page-container>

    <app-banner v-if="lastMessage" :msg="lastMessage"></app-banner>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs class="text-primary">
        <q-tab name="about" icon="info" label="About" />
        <q-tab name="sms" icon="sms" label="SMS" />
        <q-tab name="contacts" icon="contacts" label="Contacts" />
        <q-tab name="faq" icon="help" label="FAQ" />
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
      return [{ to: { name: "tokens" }, title: "My tokens", icon: "api" }];
    },
    headerMenu() {
      return [{ to: { name: "dashboard" }, title: "Dashboard" }];
    },
  },
};
</script>
