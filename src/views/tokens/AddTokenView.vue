<template>
  <app-page
    title="Add new token"
    icon="api"
    sub-title="create a new token for device"
  >
    <created-token
      v-if="token"
      :token="token"
      :device="name"
      @createNewToken="createNewToken"
    ></created-token>
    <token-form
      v-model:abilities="abilities"
      v-model:name="name"
      @submit="addToken"
      v-else
    ></token-form>
  </app-page>
</template>

<script>
import TokenFormVue from "@/components/tokens/TokenForm.vue";
import tokensRepository from "@/composition/tokens/tokensRepository";
import { addError } from "@/composition/addMessage";
import CreatedTokenVue from "@/components/tokens/CreatedToken.vue";
import { ref } from "vue";
// import { useRouter } from "vue-router";

export default {
  name: "add-token-view",
  components: { "token-form": TokenFormVue, "created-token": CreatedTokenVue },
  setup() {
    let token = ref(null);
    // const router = useRouter();

    const { createToken, name, abilities, clearForm } = tokensRepository();

    const addToken = async () => {
      const { data, isError, error } = await createToken();
      if (isError) {
        addError(error ? error : "can't add token with unknown error");
      } else {
        token.value = data;
      }
    };

    const createNewToken = () => {
      token.value = null;
      clearForm();
    };

    return {
      name,
      token,
      abilities,
      addToken,
      createNewToken,
      clearForm,
    };
  },
};
</script>

<style lang="scss" scoped></style>
