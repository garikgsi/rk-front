<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h4 text-primaty">Token created</div>
      <div class="text-subtitle2">
        Congratulations! Your token for device {{ device }} was succefully
        created!
      </div>
    </q-card-section>

    <q-card-section>
      <p>Please save your token now!</p>
    </q-card-section>

    <q-separator dark />
    <q-card-section>
      <div class="text-h6">
        {{ token }}
      </div>
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-btn flat @click="createNewToken">Create another token</q-btn>
      <q-btn flat :to="{ name: 'tokens' }">Go to token list</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "created-token",
  props: {
    token: {
      require: true,
      type: String,
    },
    device: {
      require: true,
      type: String,
    },
  },
  emits: ["createNewToken"],
  methods: {
    createNewToken() {
      this.$emit("createNewToken");
    },
  },
};
</script>

<style lang="scss" scoped></style>
