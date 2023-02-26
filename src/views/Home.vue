<script lang="ts" setup>
import Calendar from "@/components/Calendar.vue";
import { useCalendar } from "@/composables/useCalendar";
import { VisitService, type Visit } from "@/services/visitService";
import { refNoUnwrap } from "@/utils/reactivityUtils";
import { onMounted } from "vue";

const visitService = new VisitService();

const visits = refNoUnwrap<Visit[]>([]);

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

      await refresh();
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

      await refresh();
    },
  });

const refresh = async () => {
  visits.value = visitService.getAllVisits();
  console.log("refreshed");
};

onMounted(() => {
  visits.value = visitService.getAllVisits();
});
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6">
      <h1>Calendar Test</h1>
    </v-col>
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
</template>
