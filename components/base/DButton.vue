<template>
  <button
    :type="type"
    :name="name"
    data-testid="button"
    class="d-button"
    :class="[
      'is-' + size,
      'is-' + variant,
      textColor,
      { 'is-outlined': outlined },
    ]"
    @click="onClick"
  >
    <slot name="icon-left" />
    <span>{{ name | uppercase }}</span>
    <slot name="icon-right" />
  </button>
</template>

<script>
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  mixins: [discoBaseMixin],
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      required: false,
      validator(value) {
        return ['small', 'normal', 'medium', 'large'].includes(value);
      },
      default: 'normal',
    },
    icon: {
      type: Boolean,
      default: true,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
