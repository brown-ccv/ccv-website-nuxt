<template>
  <portal to="calendar-detail-box">
    <div class="detail-box" :style="location">
      <div class="displayed-info">
        <div class="detail-title">
          {{ info.title }}
        </div>
        <div class="detail-time">
          <div class="teal">When:</div>
          <div>{{ info.date }}, {{ info.date_time }}</div>
        </div>
        <div class="detail-loc">
          <div class="teal">Where:</div>
          <div>{{ info.location }}</div>
        </div>
        <div class="detail-info">
          <div class="teal">Description:</div>
          <div v-html="description" />
        </div>
      </div>
      <a :href="info.url" target="_blank" class="more-info-btn teal"
        >More Info</a
      >
    </div>
  </portal>
</template>

<script>
export default {
  name: 'DetailBox',
  props: {
    /**
     * An array of event objects.
     */
    info: {
      type: Object,
      required: true,
    },
    /**
     * The year being displayed.
     */
    displayYear: Number,
    /**
     * The current view.
     */
    view: String,
    parentId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      /**
       * Whether or not to show the detail box.
       */
      detailedOpen: false,
    };
  },
  computed: {
    /**
     * Formatting the detailed description.
     */
    description() {
      let str = this.info.description_long;
      if (str === undefined) {
        str = '';
      }
      if (!str.includes('_blank')) {
        str = str.replace('<a', '<a target="_blank"');
      }
      return str;
    },
    offsetTop() {
      const thisEl = document
        .getElementById(this.parentId)
        .getBoundingClientRect();
      const containerEl = document
        .getElementById('calendar-detail-box-parent')
        .getBoundingClientRect();
      return thisEl.top - containerEl.top;
    },
    offsetLeft() {
      const thisEl = document
        .getElementById(this.parentId)
        .getBoundingClientRect();
      const containerEl = document
        .getElementById('calendar-detail-box-parent')
        .getBoundingClientRect();
      return (
        thisEl.left - containerEl.left + (thisEl.right - thisEl.left) / 2 - 100
      );
    },
    location() {
      return { top: this.offsetTop - 210 + 'px', left: this.offsetLeft + 'px' };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teal {
  color: #00b398;
  font-weight: bold;
}

.detail-box {
  z-index: 4;
  position: absolute;
  display: block;
  height: 200px;
  width: 200px;
  /* top: 20px;
  left: -45%; */
  padding: 20px 25px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  text-align: left;
}

.detail-box::after {
  /* Popup arrow from w3 */
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -8px;
  border-width: 8px;
  border-style: solid;
  border-color: white transparent transparent transparent;
}

.close-btn {
  position: absolute;
  top: 4px;
  right: 5px;
  height: 20px;
  width: 20px;
  font-size: 20px;
}
.close-btn:hover {
  cursor: pointer;
}

.displayed-info {
  margin-bottom: 35px;
  height: 130px;
  max-height: 130px;
  overflow-y: scroll;
}

.detail-box p {
  margin: 4px;
}

.detail-title {
  margin: 10px 0px;
  font-weight: bold;
  font-size: 16px;
}

.detail-time div,
.detail-loc div,
.detail-info div {
  display: inline;
  font-size: 14px;
}

.detail-info {
  display: inline;
  word-wrap: break-word;
}
.detail-info div {
  display: block;
  font-size: 14px;
}

.more-info-btn {
  position: absolute;
  right: 20px;
  bottom: 15px;
  height: 20px;
  text-decoration: none;
  border-bottom: 2px solid #00b398;
  font-size: 14px;
}
.more-info-btn:hover {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}
</style>
