module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    indent: ['warn', 2],
    'no-multi-spaces': ['warn'],
    'vue/comment-directive': 'off',
    'prettier/prettier': 'warn'
  },
};
