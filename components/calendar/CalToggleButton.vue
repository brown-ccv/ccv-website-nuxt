<template>
  <div class="control-row is-hidden-touch">
    <div class="toggle-btn">
      <p
        id="week"
        :class="{ selected: view === 'weekly' }"
        @click="viewChange('weekly')"
      >
        Weekly
      </p>
      <p
        id="month"
        :class="{ selected: view === 'monthly' }"
        @click="viewChange('monthly')"
      >
        Monthly
      </p>
      <p
        id="upcoming"
        :class="{ selected: view === 'upcoming' }"
        @click="viewChange('upcoming')"
      >
        Upcoming
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: {
    /**
     * The current calendar view, either "monthly", "weekly", or "upcoming".
     */
    view: String,
  },
  methods: {
    /**
     * Emits the "view-change" event when a different toggle button is selected. This event passes
     * the new view up to the Calendar component.
     */
    viewChange(newView) {
      this.$emit('view-change', newView);
    },
  },
};
</script>

<style scoped>
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
</style>
