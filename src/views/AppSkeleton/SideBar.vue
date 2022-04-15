<template>
  <div>
    <q-list>
      <q-item
        clickable
        v-ripple
        :disable="item.disable"
        v-for="item in menuItems"
        :key="item.id"
        :to="item.to"
      >
        <q-item-section avatar v-if="item.icon">
          <q-icon color="primary" :name="item.icon"></q-icon>
        </q-item-section>
        <q-item-section> {{ item.title }} </q-item-section>
      </q-item>

      <q-item clickable v-ripple @click="logOut" :disable="!isAuth">
        <q-item-section avatar>
          <q-icon color="primary" name="logout"></q-icon>
        </q-item-section>
        <q-item-section> Exit from app </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { logOut } from "@/composition/appAuth";
import { mapGetters } from "vuex";
import { useRouter } from "vue-router";
import { computed, toRefs } from "vue";

export default {
  name: "app-sidebar",
  props: {
    items: {
      required: true,
      type: Array,
    },
  },
  setup(props) {
    const router = useRouter();
    const { items } = toRefs(props);
    return {
      // logout function
      logOut: () => {
        logOut();
        router.push("/");
      },
      // menu items
      menuItems: computed(() => {
        return [...items.value].map((item) => {
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
};
</script>

<style lang="scss" scoped></style>
