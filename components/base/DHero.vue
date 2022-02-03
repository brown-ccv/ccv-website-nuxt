<template>
  <section
    role="banner"
    class="hero is-medium"
    :class="[
      'is-' + variant,
      {
        'is-full-height': fullHeight,
      },
      'header-image',
      $route.path === '/' ? 'image-home' : 'image-alt',
    ]"
    :style="{
      '--ccv-image': isWinter
        ? 'url(/images/ccv-winter.jpg)'
        : 'url(/images/ccv-original.jpg)',
    }"
  >
    <div class="hero-body px-0">
      <div class="container px-2">
        <div class="hero-text">
          <h1 role="heading" aria-level="1" class="d-title">
            {{ title }}
          </h1>
          <h2 data-testid="subtitle" class="d-subtitle">
            {{ subtitle }}
          </h2>
          <slot name="button" />
        </div>
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
  data() {
    return {
      isWinter: new Date().getMonth() <= 2 || new Date().getMonth() >= 10,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-image {
  background-position: center bottom;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

.image-home {
  background-image: var(--ccv-image);

  .hero-text {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    margin: 0 -1rem;
  }
}

.image-alt {
  background-image: url('@/assets/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg');

  .hero-text {
    color: hsla(0, 0, 20%, 0.9);
    background-color: hsla(0, 0, 100%, 0.2);
    padding: 1rem;
    margin: 0 -1rem 0.5rem;
  }
}

.subtitle {
  font-weight: 600;
}
</style>
