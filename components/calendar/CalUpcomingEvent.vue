<template>
  <div
    class="
      greyed-out
      event-width event-height
      padding-1
      margin-half
      overflow-hidden
      column
    "
    :class="{ today: isSoonest }"
  >
    <Event :info="event" :view="view" />
    <Description :desc="event.description_long" :url="event.url" />
  </div>
</template>

<script>
import Event from '@/components/calendar/CalEvent';
import Description from '@/components/calendar/CalDescription';

const currentDate = new Date();

export default {
  name: 'UpcomingEvent',
  components: {
    Event,
    Description,
  },
  props: {
    /**
     * An object representing an event.
     */
    event: { type: Object, required: true },
    /**
     * The current calendar view, either "monthly", "weekly", or "upcoming".
     */
    view: { type: String, required: true },
    /**
     * Whether this event is the soonest upcoming event. Defines whether to highlight this
     * event yellow.
     */
    isSoonest: Boolean,
  },
  data() {
    return {
      /**
       * The current month.
       */
      displayMonth: currentDate.getMonth(),
      /**
       * The current year.
       */
      displayYear: currentDate.getFullYear(),
    };
  },
};
</script>

<style scoped>
.greyed-out {
  background-color: #f8f8f8;
}
.today {
  background-color: rgba(255, 199, 44, 0.2);
}

.padding-1 {
  padding: 1em;
}
.margin-half {
  margin: 0.5em;
}

.overflow-hidden {
  overflow: hidden;
}

.column {
  flex-basis: 20%;
}

@media (max-width: 1160px) {
  .column {
    flex-basis: 35%;
  }
}

@media (max-width: 580px) {
  .column {
    flex-basis: 70%;
  }
}
</style>
