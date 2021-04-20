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
          <d-icon
            class="d-toc-icon"
            :name="entry.icon.name"
            :family="entry.icon.family"
          ></d-icon>
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
import DIcon from '@/components/disco-vue-components/d-icon.vue';
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  components: {
    'd-icon': DIcon
  },
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
