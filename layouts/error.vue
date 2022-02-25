<template>
  <div>
    <h1 v-if="error.statusCode === 404">
      Woof... You are lost!
      <img src="/assets/riggins404.jpeg" alt="" />
    </h1>
    <h1 v-else>An error occurred - {{ error.statusCode }}</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: ['error'],
};
</script>
