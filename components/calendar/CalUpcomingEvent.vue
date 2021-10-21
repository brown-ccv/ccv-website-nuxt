<template>
  <div class="greyed-out padding-1 overflow-hidden column item">
    <Event :info="event" :view="view" />
    <Description :desc="event.description_long" :url="event.url" />
  </div>
</template>

<script>
import Event from '@/components/calendar/CalEvent';
import Description from '@/components/calendar/CalDescription';

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
  },
};
</script>

<style scoped>
.greyed-out {
  background-color: #f8f8f8;
}

.padding-1 {
  padding: 1em;
}

.overflow-hidden {
  overflow: hidden;
}

.item {
  min-width: 30ch;
}
</style>
