<template>
  <div class="class-container">
    <span class="class-item">
      <!-- add icons -->
      <span
        v-if="
          typeof feature.class === 'string' && feature.class.startsWith('fast')
        "
        :class="[
          'icon',
          'is-size-3',
          feature.class === 'fastest' ? 'has-text-success' : 'has-text-warning',
        ]"
        ><i class="mdi mdi-speedometer"
      /></span>
      <span
        v-else-if="feature.class === true"
        class="icon is-size-3 has-text-success"
        ><i class="mdi mdi-check"
      /></span>
      <span
        v-else-if="feature.class === 'partial'"
        class="icon is-size-3 has-text-success"
        ><i class="mdi mdi-check"
      /></span>
      <span
        v-else-if="feature.class === false"
        class="icon is-size-3 has-text-danger"
        ><i class="mdi mdi-close"
      /></span>
      <span
        v-else-if="[1, 2, 3].includes(feature.class)"
        class="icon is-size-3 has-text-warning"
        ><i class="mdi mdi-shield-half-full"
      /></span>

      {{ classText }}
    </span>

    <ul>
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
  },
  computed: {
    classText() {
      let message = this.feature.class;
      switch (this.feature.class) {
        case false:
          message = 'No';
          break;
        case true:
          message = 'Yes';
          break;
      }

      return message;
    },
  },
};
</script>

<style lang="scss" scoped>
.class-container {
  @extend .py-2;
  @extend .px-1;
  width: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.class-item {
  @extend .mb-2;
  @extend .is-size-5;
  @extend .has-text-weight-bold;
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
