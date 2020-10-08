<template>
  <div>
    <ul>
      <li v-for="(d, i) in toc" :key="'datum' + i">
        <nuxt-link
          :to="{
            name: 'main-category',
            params: {
              ...$route.params,
              category: d
            }
          }"
        >
          {{ d }}
        </nuxt-link>
      </li>
    </ul>
    {{ data }}
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    toc: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
