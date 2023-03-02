<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";

export interface DropdownProps<T> {
  modelValue: T;
  items: T[];
  itemTitle?: (item: T) => string;
  itemValue?: (item: T) => string;
}

const props = defineProps<DropdownProps<unknown>>();

const emit = defineEmits<{
  (e: "update:modelValue", v: unknown): void;
}>();

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <v-autocomplete
    v-model="value"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
  />
</template>
