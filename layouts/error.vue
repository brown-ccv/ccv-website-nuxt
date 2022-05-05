<template>
  <div class="container bg-block">
    <h1 v-if="error.statusCode === 404" class="main-text">
      404
      <p class="body-text">Woof... Sorry, this page does not exist!</p>
    </h1>
    <h1 v-else class="body-text">An error occurred - {{ error.statusCode }}</h1>
    <img class="header-image" src="@/assets/riggins404nobg.png" alt="" />
    <div class="home-button">
      <nuxtLink to="/">
        <DButton name="Home" variant="warning" size="medium" />
      </nuxtLink>
    </div>
  </div>
</template>

<script>
import DButton from '@/components/base/DButton.vue';

export default {
  components: {
    DButton,
  },
  layout: 'error',
  props: ['error'],
};
</script>

<style lang="scss" scoped>
.bg-block {
  border-radius: 5px;
  margin-top: 2em;
  margin-bottom: 2em;
}

.header-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3.5em;
  margin-top: 2em;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5))
    drop-shadow(0 2px 2px rgba(0, 0, 0, 0.5))
    drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5))
    drop-shadow(0 8px 8px rgba(0, 0, 0, 0.5))
    drop-shadow(0 16px 16px rgba(0, 0, 0, 0.5))
    drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5));
}

.main-text {
  font-family: var($font-family-bold);
  text-align: center;
  font-size: 100px;
}

.body-text {
  font-family: var($font-family-bold);
  text-align: center;
  font-size: 30px;
}

.home-button {
  @extend .container;
  text-align: center;
  padding-bottom: 2.5em;
}
</style>
