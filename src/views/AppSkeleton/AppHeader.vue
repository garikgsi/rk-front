<template>
  <q-toolbar>
    <q-btn
      :disable="!isAuth"
      class="q-mr-sm"
      dense
      flat
      round
      icon="menu"
      @click="toggleLeftDrawer"
    />
    <q-separator dark vertical inset />
    <q-btn
      class="q-ml-sm gt-xs"
      stretch
      flat
      size="lg"
      label="Родительский комитет"
      to="/"
    ></q-btn>
    <q-btn class="xs" icon="home" to="/" flat stretch></q-btn>
    <q-space></q-space>
    <q-btn-group stretch flat :round="false" outline>
      <template v-if="isAuth">
        <q-btn
          v-for="item in items"
          :key="item.id"
          :label="item.title"
          :to="item.to"
        ></q-btn>

        <q-btn label="Выйти" @click="logOut"></q-btn>
      </template>
      <q-btn v-else label="Войти" :to="{ name: 'login' }"></q-btn>
    </q-btn-group>
  </q-toolbar>
</template>

<script>
import { toRefs, computed } from "vue";
import { mapGetters } from "vuex";
import { useRouter } from "vue-router";
import { logOut } from "@/composition/auth/appAuth";

export default {
  props: {
    menuItems: {
      required: true,
      type: Array,
    },
  },
  setup(props) {
    const router = useRouter();
    const { menuItems } = toRefs(props);
    return {
      logOut: () => {
        logOut();
        router.push("/");
      },
      items: computed(() => {
        return [...menuItems.value].map((item) => {
          return { ...item, ...{ id: Date.now() } };
        });
      }),
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "user/isAuth",
    }),
  },
  methods: {
    toggleLeftDrawer() {
      this.$emit("toggleLeftDrawer");
    },
  },
};
</script>

<style lang="scss" scoped></style>
