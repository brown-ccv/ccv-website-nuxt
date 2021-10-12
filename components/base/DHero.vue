<template>
  <section
    role="banner"
    class="d-hero is-medium"
    :class="[
      'is-' + variant,
      {
        'is-full-height': fullHeight,
        'header-image': $route.params,
        'image-home': !$route.params.main,
        'image-alt': $route.params.main,
      },
    ]"
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
  background-image: url('@/assets/ccv-original.jpg');

  .hero-text {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.image-alt {
  background-image: url('@/assets/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg');

  .hero-text {
    color: hsla(0, 0, 20%, 0.9);
    background-color: hsla(0, 0, 100%, 0.2);
  }
}

.subtitle {
  font-weight: 600;
}
</style>
