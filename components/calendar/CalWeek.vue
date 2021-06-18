<template>
  <tr v-if="view !== 'upcoming'" id="week" class="week">
    <td v-if="view === 'weekly'">
      <div class="time-labels">
        <table class="time-labels-table">
          <tr
            v-for="i in 48"
            :id="'time-label-' + i / 2"
            :key="'time-label-' + i"
          >
            <td v-if="i % 2 == 1 && i / 2 > 1">
              <p>{{ convertToTimeLabel(i / 2 - 0.5) }}</p>
            </td>
            <td v-else>
              <br >
            </td>
          </tr>
        </table>
      </div>
    </td>

    <WeeklyDay
      v-for="i in 7"
      :key="'day-' + i"
      :info="info"
      :date="displayWeek[i - 1].date"
      :display-year="displayWeek[i - 1].year"
      :display-month="displayWeek[i - 1].month"
      :todays-date="todaysDate"
      :greyed-out="displayWeek[i - 1].greyedOut"
      :view="view"
    />
  </tr>
</template>

<script>
import WeeklyDay from '@/components/calendar/CalWeeklyDay';

export default {
  name: 'Week',
  components: {
    WeeklyDay
  },
  props: {
    /**
     * An array of event
     */
    info: { type: Array, required: true },
    /**
     * Array with days visible in this week.
     */
    displayWeek: Array,
    /**
     * The current year.
     */
    displayYear: Number,
    /**
     * The current month.
     */
    displayMonth: Number,
    /**
     * Today's date as a string.
     */
    todaysDate: String,
    /**
     * The current calendar view, either "monthly", "weekly", or "upcoming".
     */
    view: String
  },
  watch: {
    /**
     * When the view changes to weekly, scroll to 8 AM.
     */
    changeView() {
      this.$nextTick(function() {
        if (this.view === 'weekly') {
          this.scrollToHour(8.5); // scroll to 8 am
        }
      });
    }
  },
  mounted() {
    /**
     * If the view is weekly when the component mounts, scroll to 8 AM.
     */
    if (this.view === 'weekly') {
      this.scrollToHour(8.5); // scroll to 8 am
    }
  },
  methods: {
    /**
     * Computes the time with correct time label ("AM" or "PM").
     *
     * @param {number} givenIndex The hour index.
     * @returns {string} The time as a string with the correct time label.
     */
    convertToTimeLabel(givenIndex) {
      if (givenIndex === 12) {
        return '12 PM';
      } else if (givenIndex < 12) {
        return givenIndex + ' AM';
      }
      return givenIndex - 12 + ' PM';
    },
    /**
     * Automatically scrolls to the specified hour.
     *
     * @param {number} hour The hour to scroll to.
     */
    scrollToHour(hour) {
      const calendarBody = document.getElementById('table-scrollable');
      const label = document.getElementById('time-label-' + hour);
      calendarBody.scrollTop = label.offsetTop;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.week {
  width: 100%;
}

.time-labels-table {
  border-collapse: collapse;
}
.time-labels-table tr {
  height: 28px;
  vertical-align: top;
}
.time-labels p {
  margin: -10px 0px;
  font-size: 13px;
  color: grey;
}
</style>
