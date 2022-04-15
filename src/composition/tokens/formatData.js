import { computed } from "vue";

export default function formatData(tokens) {
  return computed(() => {
    return [...tokens].map((token) => {
      return {
        name: token.name,
        id: token.id,
        created_at: token.created_at,
      };
    });
  });
}
