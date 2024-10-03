<template>
  <div>
    <BrownLogo role="img" aria-hidden="true" :class="size" />
  </div>
</template>

<script>
import BrownLogo from '@/assets/logos/oit-logo.vue';

export default {
  components: {
    BrownLogo,
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
