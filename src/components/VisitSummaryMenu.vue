<script setup lang="ts">
import { Visit } from "@/services/visitService";
import { defineProps } from "vue";

defineProps<{
  visit?: Visit;
  activator: any;
}>();

defineEmits<{
  (e: "edit", v: string): void;
}>();
</script>

<template>
  <v-menu
    v-if="visit"
    v-bind="$attrs"
    :activator="activator"
    :close-on-content-click="false"
    location="end"
  >
    <v-card min-width="300">
      <v-list>
        <v-list-item :title="visit.outletName" prepend-icon="mdi-map-marker">
          <template #append>
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="text"
                  icon="mdi-pencil"
                  color="primary"
                  @click="$emit('edit', visit!.id)"
                />
              </template>
              <span>Edit visit</span>
            </v-tooltip>
          </template>
        </v-list-item>
        <v-divider />
        <v-list-item>
          {{ visit.notes }}
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
