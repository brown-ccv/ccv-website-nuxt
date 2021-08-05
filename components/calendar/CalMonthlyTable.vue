<template>
  <div id="table-scrollable" class="is-hidden-mobile">
    <table>
      <thead>
        <tr>
          <th
            v-for="(date, i) in displayDates[0]"
            id="weekday-names"
            :key="'weekday-names-' + i"
          >
            <div>{{ allDaysOfWeek[i] }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <MonthlyWeek
          v-for="i in weeksInDisplay"
          :key="'week-' + i"
          :info="info"
          :display-year="displayYear"
          :display-month="displayMonth"
          :display-week="displayDates[i - 1]"
          :todays-date="todaysDate"
          :view="view"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import MonthlyWeek from '@/components/calendar/CalMonthlyWeek';
import {
  ALL_MONTHS,
  ALL_DAYS_OF_WEEK,
  TODAYS_DATE,
  weeksInMonth,
} from '../../utils.js';

export default {
  name: 'MonthlyTable',
  components: {
    MonthlyWeek,
  },
  props: {
    // Passed directly from CalendarTable
    view: String,
    info: { type: Array, required: true },
    displayYear: Number,
    displayMonth: Number,
    displayDay: Number,
  },
  computed: {
    /**
     * @returns {number} The number of weeks being displayed.
     */
    weeksInDisplay() {
      const month = this.displayMonth - 1;
      const year = this.displayYear;

      return weeksInMonth(month, year);
    },
    /**
     * @returns {Array} An array containing objects that represent the dates to be displayed. If the current view
     * is set to monthly then the array will contain arrays of these objects, where each inner array represents a week.
     */
    displayDates() {
      // month is 0 indexed
      const month = this.displayMonth - 1;
      const year = this.displayYear;

      return this.monthViewDates(month, year);
    },
  },
  created() {
    this.allMonths = ALL_MONTHS;
    this.allDaysOfWeek = ALL_DAYS_OF_WEEK;
    this.todaysDate = TODAYS_DATE;
  },
  methods: {
    /**
     * Generates an array of the dates to display in the calendar.
     *
     * @param {number} month The current month.
     * @param {number} year The current year.
     * @returns {Array} An array of arrays of objects containing data information. The inner arrays represent weeks.
     */
    monthViewDates(month, year) {
      // month is 0 indexed
      // get list of dates shown in month view
      const prevMonthLength = new Date(year, month, 0).getDate(); // # days in prev month
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // # days in current month
      const firstDay = new Date(year, month, 1).getDay(); // day of the week of 1st
      let firstDisplayDay = prevMonthLength - firstDay + 1; // first visible date
      if (firstDay === 0) {
        firstDisplayDay = 1;
      }

      const displayDaysArr = [];
      let weekDaysArr = [];
      const numWeeks = weeksInMonth(month, year);

      const prevMonth = new Date(year, month - 1, 1);
      const nextMonth = new Date(year, month + 1, 1);
      let dateToAdd = firstDisplayDay;

      for (let i = 0; i < numWeeks; i++) {
        for (let j = 0; j < 7; j++) {
          // grey out days not in current month
          if (i === 0 && dateToAdd > 7) {
            weekDaysArr.push({
              month: prevMonth.getMonth() + 1,
              year: prevMonth.getFullYear(),
              date: dateToAdd,
              greyedOut: true,
            });
          } else if (i > 1 && dateToAdd < 7) {
            weekDaysArr.push({
              month: nextMonth.getMonth() + 1,
              year: nextMonth.getFullYear(),
              date: dateToAdd,
              greyedOut: true,
            });
          } else {
            weekDaysArr.push({
              month: month + 1,
              year,
              date: dateToAdd,
              greyedOut: false,
            });
          }

          if (i === 0 && dateToAdd > 7 && dateToAdd === prevMonthLength) {
            dateToAdd = 1;
          } else if (i > 0 && dateToAdd === daysInMonth) {
            dateToAdd = 1;
          } else {
            dateToAdd++;
          }
        }
        displayDaysArr.push(weekDaysArr);
        weekDaysArr = [];
      }
      return displayDaysArr;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}

.table-scrollable {
  max-height: 600px;
  overflow-y: scroll;
  min-width: 500px;
}
.table-scrollable th {
  z-index: 1;
  position: sticky;
  margin: 0px;
  padding: 2px;
  top: 0px;
  background-color: white;
}
</style>
