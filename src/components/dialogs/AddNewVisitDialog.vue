<script setup lang="ts">
import { computed, toRaw } from "vue";
import { Visit } from "@/services/visitService";
import { useFormValidation } from "@/composables/useFormValidation";
import { reactiveNoUnwrap } from "@/utils/reactivityUtils";
import DateTimeSelector from "@/components/input/specialised/DateTimeSelector.vue";
import { required } from "@/components/input/rules";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "submit", v: Visit): void;
}>();

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const formValues = reactiveNoUnwrap<Visit>({
  id: "",
  outletName: "",
  startTime: new Date(),
  endTime: new Date().addHours(1),
  notes: "",
});

const { form } = useFormValidation();

const submit = async () => {
  const isValid = await form.value?.validate();

  if (!isValid?.valid) {
    return;
  }

  emit("submit", toRaw(formValues));
  visible.value = false;
};
</script>

<template>
  <v-dialog v-model="visible" max-width="600px">
    <v-card>
      <v-card-title>Add new visit</v-card-title>
      <c-form ref="form">
        <v-card-text>
          <text-input v-model="formValues.id" label="ID" :rules="[required]" />
          <text-input
            v-model="formValues.outletName"
            label="Outlet Name"
            :rules="[required]"
          />
          <text-input v-model="formValues.notes" text-area label="Notes" />
          <!-- This isn't the best UX - just a temp proof of concept -->
          <v-expansion-panels multiple>
            <v-expansion-panel title="Start time">
              <v-expansion-panel-text>
                <date-time-selector
                  v-model="formValues.startTime"
                  :rules="[required]"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="End time">
              <v-expansion-panel-text>
                <date-time-selector
                  v-model="formValues.endTime"
                  :rules="[required]"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" color="red" @click="visible = false">
            Cancel
          </v-btn>
          <v-btn variant="text" color="primary" @click="submit">Submit</v-btn>
        </v-card-actions>
      </c-form>
    </v-card>
  </v-dialog>
</template>
