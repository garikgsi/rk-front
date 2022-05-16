<template>
  <q-card flat bordered v-if="imageUrl">
    <q-card-section horizontal>
      <q-img
        :src="imageUrl"
        style="height: 150px"
        fit="contain"
        position="left bottom"
      >
      </q-img>

      <q-card-actions vertical class="justify-top q-px-md">
        <q-btn flat color="grey" icon="cancel" @click="clearImage"></q-btn>
      </q-card-actions>
    </q-card-section>
  </q-card>

  <q-file
    v-else
    illed
    :modelValue="value"
    :label="label"
    :hint="hint"
    lazy-rules
    :rules="fieldRules"
    clearable
    @update:modelValue="fileChanged"
  >
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
  </q-file>
</template>

<script>
import inputMixin from "@/mixins/inputMixin";
import { toRef, computed } from "vue";

export default {
  // name: "app-file-input",
  mixins: [inputMixin],
  props: {
    modelValue: {
      require: true,
      type: [File, Array, FileList, null],
      default: null,
    },
    url: {
      require: false,
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const modelValue = toRef(props, "modelValue");
    const url = toRef(props, "url");

    const value = computed(() => modelValue.value);
    const imageUrl = computed(() => url.value);

    // clear image action
    const clearImage = () => {
      emit("update:url", null);
      emit("update:modelValue", null);
    };
    // change file input field
    const fileChanged = (newFile) => {
      emit("update:modelValue", newFile);
    };

    return {
      value,
      imageUrl,
      clearImage,
      fileChanged,
    };
  },
  emits: ["update:modelValue", "update:url"],
};
</script>

<style lang="scss" scoped></style>
