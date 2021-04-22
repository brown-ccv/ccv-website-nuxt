<template>
  <section
    v-if="!dismissed"
    role="banner"
    class="d-banner mb-0 py-2 has-text-centered"
    :class="['has-background-' + variant]"
  >
    <button
      class="d-button-delete is-pulled-right"
      aria-label="dismiss"
      data-testid="dismiss"
      @click="dismiss()"
    ></button>
    <div class="subtitle" :class="[tagTextColor(variant)]" data-testid="text">
      <span
        v-if="$slots.badge"
        class="tag"
        :class="['is-' + accent, tagTextColor(accent), 'is-' + tagSize]"
      >
        <slot name="badge"></slot>
      </span>
      {{ text }}
    </div>
  </section>
</template>

<script>
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  mixins: [discoBaseMixin],
  props: {
    text: {
      type: String,
      required: true
    },
    tagSize: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'medium', 'large'].includes(value);
      }
    }
  },
  data() {
    return {
      dismissed: false
    };
  },
  methods: {
    tagTextColor(color) {
      const textcolor = ['danger', 'dark', 'link'].includes(color)
        ? 'has-text-light'
        : 'has-text-dark';
      return textcolor;
    },
    dismiss() {
      this.dismissed = true;
    }
  }
};
</script>
