<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :class="'has-background-' + variant"
  >
    <div class="navbar-brand">
      <slot name="brand"></slot>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        :aria-expanded="expanded"
        data-target="navbar-main"
        @click="expand"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbar-main"
      class="navbar-menu"
      :class="{ 'is-active': expanded }"
    >
      <ul class="navbar-start" data-testid="navbar-start">
        <slot name="start"></slot>
      </ul>
      <ul class="navbar-end" data-testid="navbar-end">
        <slot name="end"></slot>
      </ul>
    </div>
  </nav>
</template>

<script>
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  mixins: [discoBaseMixin],
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
    }
  }
};
</script>
