<script lang="ts" setup>
import Calendar from "@/components/Calendar.vue";
import { useCalendar } from "@/composables/useCalendar";
import { VisitService, type Visit } from "@/services/visitService";
import { refNoUnwrap } from "@/utils/reactivityUtils";
import { onMounted, ref } from "vue";
import AddNewVisitDialog from "@/components/dialogs/AddNewVisitDialog.vue";

const visitService = new VisitService();

const visits = refNoUnwrap<Visit[]>([]);
const showAddVisitDialog = ref(false);

const { events, onEventClick, onEventDrop, onEventDurationChange } =
  useCalendar({
    events: visits,
    startDateExtractor: (item) => item.startTime,
    endDateExtractor: (item) => item.endTime,
    titleExtractor: (item) => item.outletName,
    contentExtractor: (item) => item.notes ?? "",
    onEventClick: ({ payload }) => {
      console.log(payload.outletName);
    },
    onEventDrop: async ({ event }) => {
      await new Promise((res) => setTimeout(res, 600));
      const { id } = event.payload;
      const { start, end } = event;
      const visit = visits.value.find((visit) => visit.id === id);

      if (!visit) {
        return;
      }

      visit.startTime = start as Date;
      visit.endTime = end as Date;

      visitService.saveVisit(visit);
      console.log("saved");

      refresh();
    },
    onEventDurationChange: async ({ event }) => {
      await new Promise((res) => setTimeout(res, 600));
      const { id } = event.payload;
      const { start, end } = event;
      const visit = visits.value.find((visit) => visit.id === id);

      if (!visit) {
        return;
      }

      visit.startTime = start as Date;
      visit.endTime = end as Date;

      visitService.saveVisit(visit);
      console.log("saved duration change");

      refresh();
    },
  });

const refresh = () => {
  visits.value = visitService.getAllVisits();
};

onMounted(refresh);

const addNewVisit = (visit: Visit) => {
  visitService.createVisit(visit);
  refresh();
};
</script>

<template>
  <v-row class="justify-space-between">
    <v-col cols="auto">
      <h1>Calendar Test</h1>
    </v-col>
    <v-col cols="auto">
      <v-btn color="primary" @click="showAddVisitDialog = true">
        Add new event
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <calendar
        :events="events"
        events-on-month-view
        :snap-to-time="15"
        @event-click="onEventClick"
        @event-drop="onEventDrop"
        @event-duration-change="onEventDurationChange"
      />
    </v-col>
  </v-row>
  <add-new-visit-dialog
    v-if="showAddVisitDialog"
    v-model="showAddVisitDialog"
    @submit="addNewVisit"
  />
</template>
