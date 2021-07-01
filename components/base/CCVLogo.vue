<template>
  <div>
    <CCVLogo role="img" aria-hidden="true" :class="size" />
  </div>
</template>

<script>
import CCVLogo from '@/assets/logos/ccv-logo.vue';

export default {
  components: {
    CCVLogo,
  },
  props: {
    size: {
      type: String,
      default: 'l',
      validator(value) {
        // The value must match one of these strings
        return ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'].includes(value);
      },
    },
  },
};
</script>
