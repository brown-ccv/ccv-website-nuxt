<template>
  <dialog
    aria-live="polite"
    role="dialog"
    class="d-dialog modal"
    :class="{ 'is-active': isActive }"
    data-testid="dialog"
  >
    <!-- area surrounding modal -->
    <div class="modal-background" />

    <!-- main modal area -->
    <div
      data-testid="modal-card"
      class="modal-card"
      :class="[
        'is-width-' + width,
        'has-border-top-' + accent,
        'has-background-' + variant
      ]"
    >
      <!-- header -->
      <header
        v-if="closeOptions == 'header' || closeOptions == 'both'"
        data-testid="modal-header"
      >
        <button
          class="d-button-delete is-pulled-right"
          aria-label="close"
          @click="onClose"
        />
      </header>

      <!-- modal content -->
      <!-- need to add background variant again here 
      to override the background of modal-card-body -->
      <div
        data-testid="modal-content"
        class="modal-card-body"
        tabindex="0"
        :class="[textColor, 'has-background-' + variant]"
      >
        <slot name="content" />
      </div>

      <!-- modal footer with close button -->
      <footer
        v-if="closeOptions == 'footer' || closeOptions == 'both'"
        data-testid="modal-footer"
        class="px-2 pb-2"
      >
        <d-button
          id="closebutton"
          aria-label="close"
          :name="closeButtonText"
          :variant="accent"
          @click="onClose"
        />
      </footer>
    </div>
  </dialog>
</template>

<script>
import DButton from '@/components/base/DButton';
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  components: {
    'd-button': DButton
  },
  mixins: [discoBaseMixin],
  props: {
    closeButtonText: {
      type: String,
      default: 'Close'
    },
    closeOptions: {
      type: String,
      default: 'header',
      validator(value) {
        return ['header', 'footer', 'both'].includes(value);
      }
    }
  },
  data() {
    return {
      isActive: true
    };
  },
  methods: {
    onClose() {
      this.isActive = false;
      this.$emit('close');
    }
  }
};
</script>
