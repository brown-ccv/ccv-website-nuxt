<template>
  <div>
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

<style lang="scss" scoped>
.card {
  margin-bottom: 10px;
  width: 100%;

  .card-header {
    cursor: pointer;

    .icon {
      transform: rotate(180deg);
      transition: transform 150ms ease-out;
    }
  }

  .card-content {
    transition: all 150ms ease;
  }
}

.card.not-expanded {
  .card-header {
    .icon {
      transform: rotate(0deg);
    }
  }
  .card-content {
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    height: 0;
    padding: 0;
  }
}
</style>
