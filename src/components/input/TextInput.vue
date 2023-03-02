<script setup lang="ts">
import { computed } from "vue";
import { VTextField } from "vuetify/lib/components/VTextField/index";
import { VTextarea } from "vuetify/lib/components/VTextarea/index";

const props = defineProps<{
  modelValue: string | number;
  textArea?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: string | number): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <component
    :is="textArea ? VTextarea : VTextField"
    v-bind="$attrs"
    v-model="value"
    variant="underlined"
    color="primary"
  />
</template>
