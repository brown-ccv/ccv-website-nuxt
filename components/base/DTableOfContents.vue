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
          class="d-toc-content link"
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
      required: true
    },
    name: {
      type: String
    }
  }
};
</script>
