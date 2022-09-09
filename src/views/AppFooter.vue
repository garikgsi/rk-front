<template>
  <q-footer bordered class="bg-white text-primary">
    <q-tabs class="text-primary" align="justify">
      <q-route-tab
        :icon="menu.icon"
        :to="menu.to"
        v-for="menu in items"
        :key="menu.id"
        :label="isPhone ? null : menu.title"
      />
    </q-tabs>
    <div class="bg-primary text-white text-right q-py-sm q-px-xl copyright">
      <a href="tg://resolve?domain=garikgsi">web-creator</a>
    </div>
  </q-footer>
</template>

<script>
import screen from "@/composition/screen";
export default {
  props: {
    items: {
      type: Array,
      require: true,
    },
  },
  setup() {
    const { isPhone } = screen();
    return { isPhone };
  },
};
</script>

<style lang="scss" scoped>
.copyright {
  a {
    color: white;
    text-decoration: none;
  }
}
</style>
