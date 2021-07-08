<template>
  <div class="calendar-container">
    <!--
       Display the title if not in the upcoming view.
       Call scrollTime when the scroll buttons are clicked.
     -->
    <Title
      v-if="view !== 'upcoming'"
      :scroll-buttons="true"
      @scroll-time="scrollTime"
    >
      {{ allMonths[displayMonth - 1] }} {{ displayYear }}
    </Title>
    <div
      :class="{
        calendar: true,
        'weekly-calendar': view === 'weekly',
        'bump-margin-top': view === 'upcoming',
      }"
    >
      <!-- Show toggle buttons if the view is not upcoming, and handle view change with the changeView method -->
      <ToggleButton
        v-if="view !== 'upcoming' || showToggles"
        :view="view"
        @view-change="changeView"
      />
      <!-- Display for the monthly or weekly views -->
      <MonthlyTable
        v-if="view === 'monthly'"
        :view="view"
        :info="info"
        :display-year="displayYear"
        :display-month="displayMonth"
        :display-day="displayDay"
      />
      <WeeklyTable
        v-if="view === 'weekly'"
        :view="view"
        :info="info"
        :display-year="displayYear"
        :display-month="displayMonth"
        :display-day="displayDay"
      />
      <!-- Display for the upcoming view -->
      <Upcoming
        v-if="view === 'upcoming'"
        :view="view"
        :upcoming-events="upcomingEvents"
      />
      <div class="calendar-button">
        <a href="https://events.brown.edu/ccv/all" target="_blank">
          <DButton name="View All Events" variant="dark" size="medium" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/calendar/CalTitle';
import ToggleButton from '@/components/calendar/CalToggleButton';
import Upcoming from '@/components/calendar/CalUpcoming';
import WeeklyTable from '@/components/calendar/CalWeeklyTable';
import MonthlyTable from '@/components/calendar/CalMonthlyTable';
import DButton from '@/components/base/DButton';
import { ALL_MONTHS, ALL_DAYS_OF_WEEK, getStringDate } from '../../utils.js';

export default {
  name: 'Calendar',
  components: {
    WeeklyTable,
    MonthlyTable,
    Title,
    ToggleButton,
    Upcoming,
    DButton,
  },
  props: {
    /**
     * An array of event objects from the event API.
     */
    info: { type: Array, required: true },
    /**
     * The next five events.
     */
    upcomingEvents: { type: Array, required: true },
  },
  data() {
    return {
      /**
       * Default view.
       */
      view: 'upcoming',
      /**
       * Default to showing toggle buttons.
       */
      showToggles: true,
      allMonths: ALL_MONTHS,
      allDaysOfWeek: ALL_DAYS_OF_WEEK,
      /**
       * The year as a four-digit integer.
       */
      displayYear: new Date().getFullYear(),
      /**
       * The month as an integer with no leading 0 for months less than 10. Add one because getMonth is zero-indexed.
       */
      displayMonth: new Date().getMonth() + 1,
      /**
       * The integer representation of the current day.
       */
      displayDay: new Date().getDate(),
      /**
       * Gets the string representation of the current date.
       */
      todaysDate: getStringDate(
        new Date().getDate(),
        new Date().getMonth() + 1,
        new Date().getFullYear()
      ),
    };
  },
  watch: {
    /**
     * Watch for when the current month changes. When this happens, the component emits the "month-change" event,
     * which triggers a new call to the events API in the App component.
     */
    displayMonth() {
      const firstOfLastMonth = getStringDate(
        this.displayMonth - 1,
        1,
        this.displayYear
      );
      this.$emit('month-change', firstOfLastMonth);
    },
  },
  beforeMount() {
    /**
     * Set a resizing listener for hiding the toggle buttons on mobile.
     */
    window.addEventListener('resize', this.onWindowResize);
  },
  beforeDestroy() {
    /**
     * Set a resizing listener for hiding the toggle buttons on mobile.
     */
    window.removeEventListener('resize', this.onWindowResize);
  },
  methods: {
    /**
     * Changes the view of the page.
     *
     * @param newView A string, the new view for the calendar.
     */
    changeView(newView) {
      this.view = newView;
    },
    /**
     * Handles resizing of the window, and hides the toggle buttons for window widths of less
     * than 829 pixels (a relatively arbitrary number).
     */
    onWindowResize() {
      const windowWidth = window.innerWidth;
      this.showToggles = windowWidth > 829;
    },
    /**
     * Handles scrolling between weeks or months in the calendar.
     *
     * @param {boolean} scrollForward If true, scroll forward, if false, scroll backward.
     */
    scrollTime(scrollForward) {
      const currentDate = new Date(
        this.displayYear,
        this.displayMonth - 1,
        this.displayDay
      );
      if (scrollForward) {
        if (this.view === 'weekly') {
          // change week for weekly view
          currentDate.setDate(currentDate.getDate() + 7);
        } else {
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      } else if (this.view === 'weekly') {
        currentDate.setDate(currentDate.getDate() - 7);
      } else {
        currentDate.setMonth(currentDate.getMonth() - 1);
      }
      this.displayYear = currentDate.getFullYear();
      this.displayMonth = currentDate.getMonth() + 1;
      this.displayDay = currentDate.getDate();
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 0px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.calendar {
  margin: auto;
  width: 100%;
}
.weekly-calendar {
  width: 87%;
  margin-left: 5.5%;
}

.control-row {
  min-height: 32px;
  position: relative;
}

.toggle-btn {
  position: absolute;
  top: -8px;
  right: 4px;
  padding: 4px;
  border-radius: 2px;
  background-color: rgba(0, 179, 152, 0.3);
  box-shadow: inset 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
}

.toggle-btn p {
  display: inline-block;
  margin: 0px;
  border-radius: 2px;
  padding: 4px 8px 2px 8px;
  font-size: 15px;
}
.toggle-btn p:hover {
  cursor: pointer;
}
.toggle-btn .selected {
  background-color: white;
  box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.2);
}

.bump-margin-top {
  margin-top: 6em;
}

.calendar-container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.calendar-button {
  margin-top: 10px;
}
</style>
