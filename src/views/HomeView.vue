<template>
  <h1>Home page</h1>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      v1: "",
      v2: "",
      count: 5,
    };
  },
  methods: {
    loadMore() {
      this.count += 5;
    },
  },
};
</script>

<style lang="scss">
.card {
  margin-top: 10px;
}
</style>
