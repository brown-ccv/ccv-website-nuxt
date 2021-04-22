<template>
  <div data-testid="icon-wrapper" class="icon-wrapper">
    <svg
      class="icon"
      :width="width"
      :height="height"
      aria-hidden="true"
      role="img"
    >
      <use v-bind="{ 'xlink:href': `/icons/${family}.svg#${name}` }" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    family: {
      type: String,
      default: 'regular'
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  }
};
</script>
