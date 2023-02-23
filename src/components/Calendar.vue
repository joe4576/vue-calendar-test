<script setup lang="ts">
import VueCal, { type Event as CalEvent, Props } from "vue-cal";
import "vue-cal/dist/vuecal.css";

export interface EventDrop<T extends CalEvent> {
  event: T;
  external: boolean;
  newDate: Date;
  oldDate: Date;
  originalEvent: T;
}

export interface EventDurationChange<T extends CalEvent> {
  event: T;
  oldDate: Date;
  originalEvent: T;
}

interface CalendarEmits<T extends CalEvent> {
  (e: "event-click", calEvent: T, nativeEvent: Event): void;
  (e: "event-drop", eventDrop: EventDrop<T>): void;
  (
    e: "event-duration-change",
    eventDurationChange: EventDurationChange<T>
  ): void;
}

const emit = defineEmits<CalendarEmits<any>>();

interface CalendarProps extends Props {}

defineProps<CalendarProps>();

// for some reason, this doesn't follow the same pattern as other events
const bubbleEventClick = (calEvent: CalEvent, nativeEvent: Event) => {
  emit("event-click", calEvent, nativeEvent);
};

const bubbleEventDrop = <T extends CalEvent>(eventDrop: EventDrop<T>) => {
  emit("event-drop", eventDrop);
};

const bubbleEventDurationChange = <T extends CalEvent>(
  eventDurationChange: EventDurationChange<T>
) => {
  emit("event-duration-change", eventDurationChange);
};
</script>

<template>
  <vue-cal
    v-bind="$attrs"
    :disable-views="['years']"
    :time-step="30"
    today-button
    :editable-events="{
      title: false,
      drag: true,
      resize: true,
      delete: false,
      create: false,
    }"
    :on-event-click="bubbleEventClick"
    @event-drop="bubbleEventDrop"
    @event-duration-change="bubbleEventDurationChange"
  >
    <template #today-button>
      <v-tooltip location="top">
        <template #activator="{ props }">
          <v-btn v-bind="props" variant="outlined"> Today </v-btn>
        </template>
        <span>Go to Today's date</span>
      </v-tooltip>
    </template>
  </vue-cal>
</template>

<!-- These styles need to be global -->
<style>
.vuecal__special-hours {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
}

.vuecal__special-hours em {
  font-size: 0.9em;
  color: #999;
}

.closed {
  background: #fff7f0
    repeating-linear-gradient(
      -45deg,
      rgba(255, 162, 87, 0.25),
      rgba(255, 162, 87, 0.25) 5px,
      rgba(255, 255, 255, 0) 5px,
      rgba(255, 255, 255, 0) 15px
    );
  color: #f6984c;
}

.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
</style>
