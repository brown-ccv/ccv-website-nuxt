<template>
  <div 
    v-if="(view === 'upcoming') | (view === 'weekly')"
    class="event"
    @click="toggleDetail(true)"
    @mouseover="toggleDetail(false)"
    @mouseleave="toggleDetail(false)"
  >
    <DetailBox
      v-if="detailedOpen"
      :info="info"
      :display-year="this.displayYear"
      :view="view"
      @detailed-close="toggleDetail(false)"
    />
    <div v-if="view === 'upcoming'">
      {{ date }}
    </div>
    <div :class="{ title: true, 'big-font': view === 'upcoming' }">
      {{ info.title }}
    </div>
    <div :class="{ datetime: true, 'weekly-datetime': view === 'weekly' }">
      {{ info.date_time }}
    </div>
  </div>
  <div 
    v-else
    class="event"
    @click="toggleDetail(true)"
    @mouseover="toggleDetail(true)"
    @mouseleave="toggleDetail(false)"
  >
    <DetailBox
      v-if="detailedOpen"
      :info="info"
      :display-year="this.displayYear"
      :view="view"
      @detailed-close="toggleDetail(false)"
    />
    <div v-if="view === 'upcoming'">
      {{ date }}
    </div>
    <div :class="{ title: true, 'big-font': view === 'upcoming' }">
      {{ info.title }}
    </div>
    <div :class="{ datetime: true, 'weekly-datetime': view === 'weekly' }">
      {{ info.date_time }}
    </div>
  </div>
</template>

<script>
import DetailBox from '@/components/calendar/CalDetailBox';

export default {
  name: 'Event',
  components: {
    DetailBox
  },
  props: {
    /**
     * An array of event objects.
     */
    info: { type: Object, required: true },
    /**
     * The current calendar view, either "monthly", "weekly", or "upcoming".
     */
    view: String
  },
  data() {
    return {
      detailedOpen: false
    };
  },
  computed: {
    /**
     * Computes the date for this event. Only used in the upcoming view.
     * @returns {string} The date with the day of the week.
     */
    date() {
      const dateTime = new Date(this.info.date_utc.replace(/-/g, "/"));
      const stringDate = this.info.date;
      return (
        new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dateTime) +
        ', ' +
        stringDate
      );
    },
    displayYear() {
      const d = new Date(this.date);
      return d.getFullYear();
    }
  },
  methods: {
    toggleDetail(show) {
      this.detailedOpen = show;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.event {
  position: relative;
  margin-bottom: 6px;
  text-align: left;
  padding: 2px 4px 2px 9px;
  /*background-color: lightblue;*/
}
.event * {
  margin: 0;
}
.datetime {
  font-size: 13px;
  color: #00b398;
}
.weekly-datetime {
  color: #2c3e50;
}
.title {
  font-size: 15px;
  font-weight: bold;
  word-wrap: break-word;
}
.title:hover {
  cursor: pointer;
}
.big-font {
  font-size: 1.5em;
}
</style>
