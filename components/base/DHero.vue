<template>
  <section
    role="banner"
    class="d-hero is-medium"
    :class="['is-' + variant, { 'is-full-height': fullHeight, 'header-image': !$route.params.main }]"
  >
    <div class="hero-body">
      <div class="container">
        <div class="hero-text p-4 mb-2">
          <h1 role="heading" aria-level="1" class="d-title">
            {{ title }}
          </h1>
          <h2 data-testid="subtitle" class="d-subtitle">
            {{ subtitle }}
          </h2>
         </div> 
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

<style lang="scss" scoped>
.header-image {
  background-image: url('@/assets/ccv-original.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #999;

  .hero-text {
    background-color: rgb(0,0,0,0.3)
  }
}
</style>
