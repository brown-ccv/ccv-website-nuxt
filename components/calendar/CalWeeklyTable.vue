<template>
  <div id="table-scrollable" class="table-scrollable">
    <table>
      <thead>
        <tr>
          <th style="width: 40px"></th>
          <th
            v-for="(date, i) in displayDates[0]"
            id="weekday-names"
            :key="'weekday-names-' + i"
          >
            <div>{{ allDaysOfWeek[i] }} {{ date.month + '/' + date.date }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <Week
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
import { ALL_MONTHS, ALL_DAYS_OF_WEEK, TODAYS_DATE } from '../../utils.js';
import Week from '@/components/calendar/CalWeek';

export default {
  name: 'WeeklyTable',
  components: {
    Week
  },
  props: {
    // Passed directly from CalendarTable
    view: String,
    info: { type: Array, required: true },
    displayYear: Number,
    displayMonth: Number,
    displayDay: Number
  },
  computed: {
    /**
     * @returns {Array} An array containing objects that represent the dates to be displayed. If the current view
     * is set to monthly then the array will contain arrays of these objects, where each inner array represents a week.
     */
    displayDates() {
      // month is 0 indexed
      const day = this.displayDay;
      const month = this.displayMonth - 1;
      const year = this.displayYear;

      if (this.view === 'monthly') {
        return this.monthViewDates(month, year);
      }
      // get display dates for weekly view
      const displayDaysArr = [];

      // add in overflow from last month
      const todayDayOfWeek = new Date(year, month, day).getDay(); // 0 = sunday, etc.
      let weekStart = day - todayDayOfWeek;
      if (weekStart <= 0) {
        // if negative, then part of last month
        const prevMonth = new Date(year, month - 1, 1);
        const prevMonthLength = new Date(year, month, 0).getDate(); // # days in prev month
        for (let i = prevMonthLength + weekStart; i <= prevMonthLength; i++) {
          displayDaysArr.push({
            month: prevMonth.getMonth() + 1,
            year: prevMonth.getFullYear(),
            date: i,
            greyedOut: true
          });
        }
        weekStart = 1;
      }

      // add in overflow to next month
      const tempArr = [];
      let weekEnd = day + (7 - (todayDayOfWeek + 1));
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // # days in current month
      if (weekEnd > daysInMonth) {
        // if > # days in current month
        const nextMonth = new Date(year, month + 1, 1);
        for (let i = 1; i <= weekEnd - daysInMonth; i++) {
          tempArr.push({
            month: nextMonth.getMonth() + 1,
            year: nextMonth.getFullYear(),
            date: i,
            greyedOut: true
          });
        }
        weekEnd = daysInMonth;
      }

      for (let i = weekStart; i <= weekEnd; i++) {
        displayDaysArr.push({
          month: month + 1,
          year,
          date: i,
          greyedOut: false
        });
      }
      return [displayDaysArr.concat(tempArr)];
    }
  },
  created() {
    this.weeksInDisplay = 1;
    this.allMonths = ALL_MONTHS;
    this.allDaysOfWeek = ALL_DAYS_OF_WEEK;
    this.todaysDate = TODAYS_DATE;
  }
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
