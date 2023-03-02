import { CFormInterface } from "@/components/CForm.vue";
import { ref } from "vue";

export function useFormValidation() {
  const form = ref<CFormInterface>();

  return {
    form,
  };
}
