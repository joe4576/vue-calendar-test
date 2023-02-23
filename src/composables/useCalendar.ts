import { EventDrop, EventDurationChange } from "@/components/Calendar.vue";
import { Ref, ref, watch } from "vue";
import { Event as CalEvent } from "vue-cal";

interface CalendarConfiguration<T> {
  events: Ref<T[]>;
  startDateExtractor: (item: T) => string;
  endDateExtractor: (item: T) => string;
  dateExtractor: (item: T) => string;
  titleExtractor?: (item: T) => string;
  contentExtractor?: (item: T) => string;
  class?: (item: T) => string;
  onEventClick: (
    item: DecoratedCalEvent<T>,
    nativeEvent: Event
  ) => void | Promise<void>;
  onEventDrop: (
    eventDrop: EventDrop<DecoratedCalEvent<T>>
  ) => void | Promise<void>;
  onEventDurationChange: (
    eventDurationChange: EventDurationChange<DecoratedCalEvent<T>>
  ) => void | Promise<void>;
}

type DecoratedCalEvent<T> = CalEvent & T;

export function useCalendar<T>(configuration: CalendarConfiguration<T>) {
  const events = ref([]) as Ref<DecoratedCalEvent<T>[]>;

  /**
   * TODO: use proper date formatting
   */
  const buildCalendarEvent = (event: T): DecoratedCalEvent<T> => {
    const date = configuration.dateExtractor(event);
    return {
      ...event,
      start: `${date} ${configuration.startDateExtractor(event)}`,
      end: `${date} ${configuration.endDateExtractor(event)}`,
      title: configuration.titleExtractor?.(event),
      content: configuration.contentExtractor?.(event),
      class: configuration.class?.(event),
    };
  };

  watch(configuration.events, () => {
    events.value = configuration.events.value.map(buildCalendarEvent);
  });

  return {
    events,
    onEventClick: configuration.onEventClick,
    onEventDrop: configuration.onEventDrop,
    onEventDurationChange: configuration.onEventDurationChange,
  };
}
