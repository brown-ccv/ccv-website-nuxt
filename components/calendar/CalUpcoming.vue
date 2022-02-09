<template>
  <div
    class="is-flex is-flex-wrap-wrap is-justify-content-space-between gapped"
  >
    <UpcomingEvent
      v-for="(event, index) in upcomingEvents"
      :key="'event-' + index"
      :event="event"
      :view="view"
    />
  </div>
</template>

<script>
import UpcomingEvent from '@/components/calendar/CalUpcomingEvent';
export default {
  name: 'Upcoming',
  components: {
    UpcomingEvent,
  },
  props: {
    /**
     * An array of the next six event objects.
     */
    upcomingEvents: { type: Array, default: () => [] },
    /**
     * The current calendar view, either "monthly", "weekly", or "upcoming".
     */
    view: { type: String, default: 'upcoming' },
  },
};
</script>

<style lang="scss" scoped>
.gapped {
  gap: 1em;
}
</style>
