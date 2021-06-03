<template>
  <div id="time-row">
    <div
      v-if="scrollButtons"
      id="time-back-btn"
      class="time-btn"
      @click="timeBtnClick(false)"
    >
      <font-awesome-icon :icon="['fas', 'chevron-circle-left']" size="lg" />
    </div>
    <div>
      <h1>
        <slot></slot>
      </h1>
    </div>
    <div
      v-if="scrollButtons"
      id="time-forward-btn"
      class="time-btn"
      @click="timeBtnClick(true)"
    >
      <font-awesome-icon :icon="['fas', 'chevron-circle-right']" size="lg" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Title',
  props: {
    /**
     * Whether to show the scroll buttons in the title.
     */
    scrollButtons: Boolean
  },
  methods: {
    /**
     * Emits the "scroll-time" event when the scroll buttons are clicked.
     * This is handled by the Calendar component and scrolls the calendar.
     *
     * @param {boolean} forward If true, scroll the calendar forward in time, if false, backward.
     */
    timeBtnClick(forward) {
      this.$emit('scroll-time', forward);
    }
  }
};
</script>
<style scoped>
#time-row div {
  display: inline-block;
  vertical-align: middle;
  padding: 0px 10px;
}
.time-btn {
  color: rgba(0, 179, 152, 0.5);
}
.time-btn:hover {
  cursor: pointer;
  color: rgba(0, 179, 152, 0.7);
}
.mb-2 {
  margin-bottom: 2em;
}
.mt-2 {
  margin-top: 2em;
}
</style>
