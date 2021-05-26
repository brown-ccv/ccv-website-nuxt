export const COLOR_VARIANTS = [
  'primary',
  'success',
  'danger',
  'warning',
  'info',
  'link',
  'dark',
  'light',
  'white',
];

export const SIZES_ABBR = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

export const SIZES = ['small', 'medium', 'large'];

export const variantValidator = (variant) => {
  return COLOR_VARIANTS.includes(variant) !== -1;
};
