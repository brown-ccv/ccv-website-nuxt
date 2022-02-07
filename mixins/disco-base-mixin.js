import * as utils from '@/utils.js';

const discoBase = {
  props: {
    accent: {
      type: String,
      default: 'danger',
      validator(value) {
        return utils.variantValidator(value);
      },
    },
    variant: {
      type: String,
      default: 'primary',
      validator(value) {
        return utils.variantValidator(value);
      },
    },
    width: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['xsmall', 'small', 'medium-small', 'medium', 'large'].includes(
          value
        );
      },
    },
  },
  filters: {
    uppercase(str) {
      return str.toUpperCase();
    },
  },
  computed: {
    textColor() {
      let color = ['danger', 'dark', 'link'].includes(this.variant)
        ? 'has-text-light'
        : 'has-text-dark';
      if (this.outlined) {
        color = `has-text-${this.variant}`;
      }
      return color;
    },
    borderColor() {
      const bordercolor = this.border
        ? 'has-border-' + this.accent
        : 'has-border-top-' + this.accent;
      return bordercolor;
    },
    headerRule() {
      return this.border ? 'has-header-rule-' + this.accent : 'header-rule';
    },
  },
};

export default discoBase;
