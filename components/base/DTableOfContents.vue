<template>
  <nav
    role="navigation"
    class="d-toc-container box"
    :class="['has-background-' + variant]"
  >
    <ul :name="name" class="d-toc">
      <li v-for="(entry, index) in data" :key="index" data-testid="toc-item">
        <a
          :href="entry.link"
          class="d-toc-content p-5 link"
          :class="[textColor]"
          tabindex="0"
        >
          <span v-if="entry.icon" class="icon">
            <i :class="['d-toc-icon mdi', `mdi-${entry.icon.name}`]" />
          </span>
          <span class="d-toc-start">
            {{ entry['name'] }}
          </span>
          <span class="d-toc-end">{{ index + 1 }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  mixins: [discoBaseMixin],
  props: {
    data: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.d-toc-container {
  display: grid;
  justify-items: center;
}
.d-toc {
  width: 60vw;
  @include mobile {
    width: 90vw;
  }
}
.d-toc-content {
  display: grid;
  grid-template-columns: 1fr 10fr 10fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'icon start . end';
  &:hover {
    background-color: hsl(0, 0%, 96%);
  }
}
.d-toc-start {
  grid-area: start;
}
.d-toc-end {
  grid-area: end;
}
.d-toc-icon {
  grid-area: icon;
}
</style>
