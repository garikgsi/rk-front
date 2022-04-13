<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> SMS Application </q-toolbar-title>
      </q-toolbar>

      <q-tabs v-if="isAuth" align="left">
        <q-route-tab to="/login" label="Login" :disable="isAuth" />
        <q-route-tab to="/dashboard" label="Home" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <app-sidebar :items="sideBarMenu"></app-sidebar>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <app-banner v-if="lastMessage" :msg="lastMessage"></app-banner>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import { mapGetters, useStore } from "vuex";
import AppBanner from "@/components/UI/AppBanner.vue";
import AppSideBar from "@/views/AppSkeleton/SideBar.vue";
import { useRouter } from "vue-router";
import { checkStoredUser } from "@/composition/appAuth";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    // router & store
    const router = useRouter();
    const store = useStore();

    checkStoredUser().then(() => {
      router.push("/dashboard");
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
  },
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
    }),
    sideBarMenu() {
      return [{ to: "tokens", title: "My tokens", icon: "api" }];
    },
  },
};
</script>
