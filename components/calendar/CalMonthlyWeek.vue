<template>
  <tr class="week">
    <MonthlyDay
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
import MonthlyDay from '@/components/calendar/CalMonthlyDay';

export default {
  name: 'MonthlyWeek',
  components: {
    MonthlyDay,
  },
  props: {
    /**
     * An array of event
     */
    info: { type: Array, required: true },
    /**
     * Array with days visible in this week.
     */
    displayWeek: { type: Array, default: () => [] },
    /**
     * The current year.
     */
    displayYear: { type: Number, default: 2022 },
    /**
     * The current month.
     */
    displayMonth: { type: Number, default: 1 },
    /**
     * Today's date as a string.
     */
    todaysDate: { type: String, default: '' },
    /**
     * The current calendar view, either "monthly", "weekly", or "upcoming".
     */
    view: { type: String, default: 'upcoming' },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.week {
  width: max-content;
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
