<template>
  <div>
    <main class="main-content">
      <!-- General markdown content pages -->
      <nuxt-content
        v-if="item.extension === '.md'"
        class="content"
        :document="item"
      />
    </main>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null,
    },
  },
};
</script>
