<template>
  <td
    class="day"
    :class="{
      'greyed-out': greyedOut,
      highlighted: todaysDate === getStringDate()
    }"
  >
    <div>
      <div class="date">{{ date }}</div>
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
    Event
  },
  props: {
    /**
     * An array of event objects.
     */
    info: { type: Array, required: true },
    /**
     * The day of the month for this day.
     */
    date: Number,
    /**
     * Whether or not the day should have the grey background color.
     */
    greyedOut: Boolean,
    /**
     * The displayed year.
     */
    displayYear: Number,
    /**
     * The displaed month.
     */
    displayMonth: Number,
    /**
     * Today's date, used to determine if this day should be highlighted yellow.
     */
    todaysDate: String,
    /**
     * The current calendar view, "monthly", "weekly", or "upcoming".
     */
    view: String
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
      totalHalfHours: 48
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
    }
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
     * Set detailedOpen to false after 0.1 seconds, to allow time for potential mouseover.
     */
    startDetailClose() {
      setTimeout(() => {
        if (!this.rolloverDetailed) {
          this.detailedOpen = false;
        }
      }, 100);
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
      const retEvents = Object.keys(eventsDict).map(function(k) {
        return eventsDict[k];
      });
      return retEvents;
    },
    /**
     * Organizes events into their respective timeslots and handles overlapping events.
     *
     * @param {Array} events An array of the events on this day.
     */
    getEventsDict(events) {
      const eventsDict = {}; // { time/tr index : [ event ] }; (ea. event only appears in FIRST row / start time)
      const calcConcurrentDict = {}; // separate copy of eventsDict (ea. event appears in ALL rows in timespan)

      const eventToOverlapDict = {}; // { eventId: numOverlap } (holds # events overlapping given event)
      let countConcurrent = 1; // determines max number of columns in day (min = 1, even if 0 events)

      for (let i = 0; i < this.totalHalfHours; i++) {
        // 48 half hour slots
        eventsDict[i] = [];
        calcConcurrentDict[i] = [];
      }

      for (let i = 0; i < events.length; i++) {
        const ev = events[i];

        // convert to current time zone
        const startTime = new Date(0);
        startTime.setUTCSeconds(parseInt(ev.date_ts));
        const endTime = new Date(0);
        endTime.setUTCSeconds(parseInt(ev.date2_ts));

        // determine table row position in calendar (1 table row = 1/2 hour)
        const enteredStart =
          (startTime.getHours() * 60 + startTime.getMinutes()) / 30;
        const enteredEnd =
          (endTime.getHours() * 60 + endTime.getMinutes()) / 30;
        const timeSpan = enteredEnd - enteredStart;
        ev.rowspan = timeSpan;

        for (let t = enteredStart; t < enteredEnd; t++) {
          // add info to dictionaries for each table row
          const existingEvents = eventsDict[t];
          const concurrentEvents = calcConcurrentDict[t];
          if (t === enteredStart) {
            existingEvents.push(ev);
          }
          concurrentEvents.push(ev);
          eventsDict[t] = existingEvents;
          calcConcurrentDict[t] = concurrentEvents;

          countConcurrent = Math.max(
            countConcurrent,
            concurrentEvents.length + 1
          );

          // for every event overlapping with current event,
          // update eventToOverlapDict with its overlap count
          for (let eventI = 0; eventI < concurrentEvents.length; eventI++) {
            const currentId = concurrentEvents[eventI].id;
            if (currentId in eventToOverlapDict) {
              eventToOverlapDict[currentId] = Math.max(
                concurrentEvents.length,
                eventToOverlapDict[currentId]
              );
            } else {
              eventToOverlapDict[currentId] = calcConcurrentDict[t].length;
            }
          }
        }
      }

      // for every event in each time segment,
      // save final # of overlaps from eventToOverlapDict to its properties
      for (let t = 0; t < this.totalHalfHours; t++) {
        for (let eventI = 0; eventI < eventsDict[t].length; eventI++) {
          const currentId = eventsDict[t][eventI].id;
          if (currentId in eventToOverlapDict) {
            eventsDict[t][eventI].concurrent = eventToOverlapDict[currentId];
          } else {
            eventsDict[t][eventI].concurrent = 1;
          }
        }
      }

      this.maxConcurrent = countConcurrent;
      return eventsDict;
    },
    calcColSpan(eventElem) {
      if (eventElem.concurrent === 1) {
        return this.maxConcurrent;
      }
      return this.maxConcurrent / eventElem.concurrent;
    },
    calcMaxWidth(numConcurrent) {
      return 60 / numConcurrent + 'px';
    }
  }
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
  /* overflow-y: scroll;
  overflow-x: hidden; */
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
