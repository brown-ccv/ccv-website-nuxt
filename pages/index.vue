<template>
  <div class="">
    <DHero
      variant="primary"
      title="Center for Computation & Visualization"
      subtitle="Scientific and technical computing expertise to advance computational research"
      class="is-fullheight"
    >
      <template #button>
        <nuxt-link to="/services/">
          <DButton
            name="Learn about CCV's services"
            variant="dark"
            size="medium"
          />
        </nuxt-link>
        <DButton
          v-scroll-to="'#events'"
          name="Go to Events Calendar"
          variant="dark"
          size="medium"
        />
      </template>
    </DHero>
    <section class="d-hero is-small">
      <div class="hero-body">
        <div class="container">
          <h1
            id="events"
            role="heading"
            aria-level="1"
            class="d-calendar-title"
          >
            Events
          </h1>
        </div>
      </div>
    </section>
    <Calendar
      v-if="info.length >= 0"
      :info="info"
      :upcoming-events="upcomingEvents"
      class="container pb-4"
      @month-change="getData"
    />
  </div>
</template>

<script>
import DButton from '@/components/base/DButton';
import DHero from '@/components/base/DHero';
import Calendar from '@/components/calendar/Calendar';
import { getStringDate } from '@/utils.js';
import Vue from 'vue';
import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo);

const numEvents = 4;

export default {
  components: { DHero, DButton, Calendar },
  data() {
    return {
      todo: {},
      /**
       * An array of event objects, the result of the call to the Brown events API.
       */
      info: [],
      /**
       * The next six events.
       */
      upcomingEvents: [],
    };
  },
  async fetch() {
    const currentDate = new Date();
    const firstOfLastMonth = getStringDate(
      currentDate.getMonth(),
      1,
      currentDate.getFullYear()
    );
    const today = getStringDate(
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getFullYear()
    );
    // Get the next 72 events from the first of last month, so the calendar can show events in the past as well
    this.info = await this.getData(firstOfLastMonth);
    // Get the next 72 events from today and extract the next six for the upcoming view
    this.upcomingEvents = await this.getData(today);
    this.upcomingEvents = this.upcomingEvents.slice(0, numEvents);
  },
  methods: {
    /**
     * Gets the next 72 events from a given start date.
     */
    getData(startDate) {
      return fetch(
        'https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/' +
          startDate +
          '/'
      ).then((response) => {
        return response.json();
      });
    },
    scroll() {
      const container = this.$el.querySelector('#scrollTo');
      container.scrollTop = container.scrollHeight;
    },
  },
  // call fetch only on client-side
  fetchOnServer: false,
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
