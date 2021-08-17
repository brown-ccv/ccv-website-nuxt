<template>
  <section
  v-if="$route.params.main==='services' || $route.params.main==='our-work' || $route.params.main==='help' || $route.params.main==='about'"
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
  <section
  v-else
  role="banner"
  class="d-hero is-medium header-image"
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

<style scoped>
.header-image {
  background-image: url('../../assets/ccv-original.jpg') ;
  background-position: center center;
  background-repeat:  no-repeat;
  background-attachment: fixed;
  background-size:  cover;
  background-color: #999;
}
</style>