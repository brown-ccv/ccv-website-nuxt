<template>
  <div>
    <h1>Person Name</h1>
    {{ person }}
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const people = await $content('about', 'people').fetch();
    const person = people.data.find((p) => p.github_username === params.people);
    return { person };
  },
};
</script>
