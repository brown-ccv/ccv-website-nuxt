<template>
  <td
    class="day"
    :class="{
      'greyed-out': greyedOut,
      highlighted: todaysDate === getStringDate(),
    }"
  >
    <div>
      <div class="date">
        {{ date }}
      </div>
      <div class="events">
        <Event
          v-for="ev in removeDuplicates(events)"
          :id="'event-' + ev.id"
          :key="'event-' + ev.id"
          :info="ev"
          :view="view"
        />
      </div>
    </div>
  </td>
</template>

<script>
import { getStringDate } from '../../utils.js';
import Event from '@/components/calendar/CalEvent';

export default {
  name: 'MonthlyDay',
  components: {
    Event,
  },
  props: {
    /**
     * An array of event objects.
     */
    info: { type: Array, required: true },
    /**
     * The day of the month for this day.
     */
    date: { type: Number, default: 1 },
    /**
     * Whether or not the day should have the grey background color.
     */
    greyedOut: { type: Boolean, default: true },
    /**
     * The displayed year.
     */
    displayYear: { type: Number, default: 2022 },
    /**
     * The displaed month.
     */
    displayMonth: { type: Number, default: 1 },
    /**
     * Today's date, used to determine if this day should be highlighted yellow.
     */
    todaysDate: { type: String, default: '' },
    /**
     * The current calendar view, "monthly", "weekly", or "upcoming".
     */
    view: { type: String, default: 'upcoming' },
  },
  data() {
    return {
      /**
       * Hovering over event.
       */
      detailedOpen: false,
      /**
       * Hovering over detail box.
       */
      rolloverDetailed: false,
      /**
       * Info to pass to detailed view.
       */
      detailedInfo: {},
      /**
       * Maximum number of concurrent events to show.
       */
      maxConcurrent: 0,
      /**
       * Total number of half hours slots to show in each day (in weekly view).
       */
      totalHalfHours: 48,
    };
  },
  computed: {
    /**
     * Gets the events for this day.
     *
     * @returns {Array} An array of the event objects for this day.
     */
    events() {
      // get events on this day
      const stringDate = this.getStringDate();
      const newEvents = [];

      for (let i = 0; i < this.info.length; i++) {
        if (this.info[i].date_utc.split(' ')[0] === stringDate) {
          newEvents.push(this.info[i]);
        }
      }
      return newEvents;
    },
  },
  methods: {
    /**
     * Generates the string representation of a date.
     *
     * @returns {string} The date as a string.
     */
    getStringDate() {
      return getStringDate(this.displayMonth, this.date, this.displayYear);
    },
    /**
     * Removes the duplicate events by title.
     *
     * @param {Array} events An array of the events on this day.
     * @returns {Array} The events with duplicates removed.
     */
    removeDuplicates(events) {
      const eventsDict = {};
      for (let i = 0; i < events.length; i++) {
        const title = events[i].title;
        eventsDict[title] = events[i];
      }
      const retEvents = Object.keys(eventsDict).map(function (k) {
        return eventsDict[k];
      });
      return retEvents;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.day {
  position: relative;
  padding-top: 36px;
  height: auto;
  width: 14.28%; /* 1/7 */
  border: 1px solid white;
  background-color: #efece5;
  overflow-y: scroll;
}
.weekViewDay {
  padding-top: 0px;
}
.greyed-out {
  background-color: #f8f8f8;
}
.highlighted {
  background-color: rgba(255, 199, 44, 0.2);
}

.date {
  position: absolute;
  top: 10px;
  left: 10px;
}

.events {
  position: relative;
  max-height: 140px;
  min-height: 90px;
}

/* --- weekly view (segment into hours) ---- */

.hours-table {
  width: 100%;
  border-collapse: collapse;
}

.hours-table tr {
  height: 28px;
  border-bottom: 0.5px dotted white;
  padding: 0px;
}

.hours-table td {
  padding: 0px;
}

.hour-line {
  border-bottom: 2px solid white !important;
}

.viewEvent {
  padding: 4px;
  margin: 0px;
  max-width: 100%;
  max-height: 100%;
  overflow-y: scroll;
  background-color: rgba(0, 179, 152, 0.3);
  border-left: 0.5px solid #efece5;
  border-right: 0.5px solid #efece5;
}
</style>
