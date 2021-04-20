<template>
  <footer
    class="d-footer"
    data-testid="footer"
    :class="['has-background-' + variant, textColor]"
  >
    <div class="d-footer-content-first">
      <slot name="first"></slot>
    </div>
    <div class="d-footer-content-second">
      <slot name="second"></slot>
    </div>
    <div class="d-footer-content-third">
      <slot name="third"></slot>
    </div>
  </footer>
</template>

<script>
import discoBaseMixin from '@/mixins/disco-base-mixin.js';
export default {
  mixins: [discoBaseMixin]
};
</script>
