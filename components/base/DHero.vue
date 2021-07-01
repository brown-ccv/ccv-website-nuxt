<template>
  <section
    role="banner"
    class="d-hero is-medium"
    :class="['is-' + variant, { 'is-full-height': fullHeight }]"
  >
    <div class="hero-body">
      <div class="container">
        <h1 role="heading" aria-level="1" class="d-title">
          {{ title }}
        </h1>
        <h2 data-testid="subtitle" class="d-subtitle">
          {{ subtitle }}
        </h2>
        <slot name="button" />
      </div>
    </div>
  </section>
</template>

<script>
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  mixins: [discoBaseMixin],
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    fullHeight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

