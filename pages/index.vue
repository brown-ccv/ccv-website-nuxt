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
      </template>
    </DHero>
    <template>
      <div id="app">
        <Calendar
          v-if="info.length >= 0"
          :info="info"
          :upcoming-events="upcomingEvents"
          @month-change="getData"
        />
      </div>
    </template>
    <client-only>
      <p>{{ todo.id }}</p>
      {{ todo }}
    </client-only>
  </div>
</template>

<script>
import axios from 'axios';
import DButton from '@/components/base/DButton';
import DHero from '@/components/base/DHero';
import Calendar from '@/components/calendar/Calendar';

export default {
  components: { DHero, DButton, Calendar },
  async fetch() {
    // example to prove out the client-only rendering
    const num = Math.floor(Math.random() * 10);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${num}`
    );
    this.todo = await response.json();
  },
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
      upcomingEvents: []
    };
  },
  methods: {
    /**
     * Gets the next 72 events from a given start date.
     */
    getData(startDate) {
      return axios
        .get(
          'https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/' +
            startDate +
            '/'
        )
        .then((response) => {
          return response.data;
        });
    }
  },
  // call fetch only on client-side
  fetchOnServer: false
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
