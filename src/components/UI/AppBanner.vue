<template>
  <div>
    <q-banner inline-actions class="text-white" :class="classes" v-if="isShow">
      {{ msg.message }}
      <template v-slot:action>
        <q-btn flat color="white" label="OK" @click="setRead({ id: msg.id })" />
      </template>
    </q-banner>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app-banner",
  props: {
    msg: {
      require: true,
      type: Object,
    },
    timeout: {
      require: true,
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  mounted() {
    {
      setTimeout(() => {
        if (this.msg.type != "error") {
          this.isShow = false;
        }
        this.setRead({ id: this.msg.id });
      }, this.timeout * 1000);
    }
  },
  computed: {
    classes() {
      switch (this.msg.type) {
        case "info": {
          return "bg-primary";
        }
        case "error": {
          return "bg-red";
        }
        default: {
          return "bg-green";
        }
      }
    },
  },
  methods: {
    ...mapActions({
      setRead: "app/setRead",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
