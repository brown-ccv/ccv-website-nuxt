<template>
  <div class="column is-half">
    <div class="card" :class="{ 'not-expanded': !expanded }">
      <header class="card-header" @click="toggleCardState">
        <p class="card-header-title">
          {{ title }}
        </p>
        <a class="card-header-icon">
          <span class="icon">
            <i class="fa fa-angle-up"></i>
          </span>
        </a>
      </header>

      <div class="card-content">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    expandAll: Boolean,
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    toggleCardState() {
      this.expanded = !this.expanded;
    },
    closeAll() {
      this.expanded = false;
    },
  },
};
</script>
