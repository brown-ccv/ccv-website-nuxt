<template>
  <div class="full-width flex flex-wrap center-hr">
    <UpcomingEvent
      v-for="(event, index) in upcomingEvents"
      :key="'event-' + index"
      :event="event"
      :view="view"
      :is-soonest="i === 1"
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
    upcomingEvents: Array,
    /**
     * The current calendar view, either "monthly", "weekly", or "upcoming".
     */
    view: String,
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}

.flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
.center-hr {
  justify-content: center;
}
.align-items {
  align-items: center;
}
</style>
