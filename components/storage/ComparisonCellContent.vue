<template>
  <div class="class-container" :class="{ 'py-2': padding, 'px-1': padding }">
    <div
      class="class-item"
      :class="[
        `is-size-${fontSize}`,
        `is-flex-direction-${flexDirection}`,
        padding ? 'mb-2' : '',
      ]"
    >
      <!-- add icons -->
      <span
        v-if="
          typeof feature.class === 'string' && feature.class.startsWith('fast')
        "
        :class="[
          'icon',
          `is-size-${iconSize}`,
          feature.class === 'fastest' ? 'has-text-success' : 'has-text-warning',
        ]"
        ><i class="mdi mdi-speedometer"
      /></span>
      <span
        v-else-if="feature.class === 'slow'"
        :class="[
          'icon',
          `is-size-${iconSize}`,
          'has-text-danger',
        ]"
        ><i class="mdi mdi-speedometer-slow"
      /></span>
      <span
        v-else-if="feature.class === 'hot'"
        :class="[
          'icon',
          `is-size-${iconSize}`,
          'has-text-danger',
        ]"
        ><i class="mdi mdi-thermometer-high"
      /></span>

      <span
        v-else-if="feature.class === 'warm'"
        :class="[
          'icon',
          `is-size-${iconSize}`,
          'has-text-warning',
        ]"
        ><i class="mdi mdi-thermometer"
      /></span>
      <span
        v-else-if="feature.class === 'cold'"
        :class="[
          'icon',
          `is-size-${iconSize}`,
          'has-text-info',
        ]"
        ><i class="mdi mdi-thermometer-low"
      /></span>
      <span
        v-else-if="feature.class === true"
        class="icon has-text-success"
        :class="[`is-size-${iconSize}`]"
        ><i class="mdi mdi-check"
      /></span>
      <span
        v-else-if="feature.class === 'partial'"
        class="icon has-text-success"
        :class="[`is-size-${iconSize}`]"
        ><i class="mdi mdi-check"
      /></span>
      <span
        v-else-if="feature.class === false"
        class="icon has-text-danger"
        :class="[`is-size-${iconSize}`]"
        ><i class="mdi mdi-close"
      /></span>
      <span
        v-else-if="[1, 2, 3].includes(feature.class)"
        class="icon has-text-warning"
        :class="[`is-size-${iconSize}`]"
        ><i class="mdi mdi-shield-half-full"
      /></span>

      <!--If this is a row, add some margin to the classText if there's a preceding icon -->
      <span :class="{ 'class-text': flexDirection === 'row' }">{{
        classText
      }}</span>
    </div>

    <ul v-if="includeNotes">
      <li v-for="(note, j) in feature.notes" :key="j" class="note">
        {{ note }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    feature: {
      type: Object,
      required: true,
    },
    iconSize: {
      type: Number,
      default: 3,
    },
    fontSize: {
      type: Number,
      default: 5,
    },
    includeNotes: {
      type: Boolean,
      default: true,
    },
    flexDirection: {
      type: String,
      default: 'column',
    },
    padding: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classText() {
      let message = this.feature.class;
      /* eslint-disable indent */
      switch (this.feature.class) {
        case false:
          message = 'No';
          break;
        case true:
          message = 'Yes';
          break;
        /* eslint-enable indent */
      }

      return message;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: auto;
}
.class-text:not(:first-child) {
  margin-left: 0.25rem;
}

.class-container {
  width: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  @include mobile {
    max-width: 10rem;
    width: auto;
  }
}

.class-item {
  @extend .has-text-weight-bold;
  @include mobile {
    margin-bottom: 0 !important;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.note {
  @extend .has-text-centered;
  @extend .has-text-weight-normal;
  @extend .is-size-6;
  margin: 0 0.5rem;
  padding-bottom: 0.5rem;
  line-height: 1.2;
}
</style>
