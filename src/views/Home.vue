<script lang="ts" setup>
import Calendar from "@/components/Calendar.vue";
import { useCalendar } from "@/composables/useCalendar";
import { VisitService, type Visit } from "@/services/visitService";
import { onMounted, ref } from "vue";

const visitService = new VisitService();

const visits = ref<Visit[]>([]);

const { events, onEventClick, onEventDrop, onEventDurationChange } =
  useCalendar({
    events: visits,
    startDateExtractor: (item) => item.startTime,
    endDateExtractor: (item) => item.endTime,
    dateExtractor: (item) => item.date,
    titleExtractor: (item) => item.outletName,
    contentExtractor: (item) => item.notes ?? "",
    onEventClick: (item) => {
      console.log(item.outletName);
    },
    onEventDrop: async ({ event }) => {
      await new Promise((res) => setTimeout(res, 600));
      visitService.saveVisit(event);
      console.log("saved");

      await refresh();
    },
    onEventDurationChange: async ({ event }) => {
      await new Promise((res) => setTimeout(res, 600));
      visitService.saveVisit(event);
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
        @on-event-click="onEventClick"
        @event-drop="onEventDrop"
        @event-duration-change="onEventDurationChange"
      />
    </v-col>
  </v-row>
</template>
