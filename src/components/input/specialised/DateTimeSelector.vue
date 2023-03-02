<script setup lang="ts">
/**
 * Temporary placeholder component that allows for modifiying year,
 * month, date and time
 */
import { defineEmits, defineProps, onBeforeMount, ref, watchEffect } from "vue";

const props = defineProps<{
  modelValue: Date;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: Date): void;
}>();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const year = ref(0);
const month = ref("");
const day = ref(0);
const hours = ref(0);
const minutes = ref(0);

onBeforeMount(() => {
  const date = props.modelValue;
  year.value = date.getFullYear();
  month.value = months[date.getMonth()];
  day.value = date.getDate();
  hours.value = date.getHours();
  minutes.value = date.getMinutes();
});

watchEffect(() => {
  emit(
    "update:modelValue",
    new Date(
      year.value,
      months.indexOf(month.value),
      day.value,
      hours.value,
      minutes.value
    )
  );
});
</script>

<template>
  <text-input v-bind="$attrs" v-model="year" type="number" label="Year" />
  <dropdown v-bind="$attrs" v-model="month" :items="months" label="Month" />
  <text-input v-bind="$attrs" v-model="day" type="number" label="Day" />
  <text-input v-bind="$attrs" v-model="hours" type="number" label="Hours" />
  <text-input v-bind="$attrs" v-model="minutes" type="number" label="Minutes" />
</template>
