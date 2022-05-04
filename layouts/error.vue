<template>
  <div class="container bg-block">
    <h1 class="main-text" v-if="error.statusCode === 404">
      404
      <p class="body-text">Woof... this page does not exist!</p>
    </h1>
    <h1 v-else>An error occurred - {{ error.statusCode }}</h1>
    <img class="header-image" src="@/assets/riggins404nobg.png" alt="" />
    <div class="home-button">
      <nuxtLink to="/" @click.native="handleClick">
        <DButton name="Return Home" variant="warning" size="medium" />
      </nuxtLink>
    </div>
  </div>
</template>

<script>
import DButton from '@/components/base/DButton.vue';

export default {
  layout: 'error',
  props: ['error'],
  components: {
    DButton,
  },
};
</script>

<style lang="scss" scoped>
.bg-block {
  background-color: hsl(208, 100%, 22%);
  border-radius: 5px;
  margin-top: 2em;
  margin-bottom: 2em;
}

.header-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  margin-top: 1em;
}

.main-text {
  font-family: var($font-family-bold);
  color: white;
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
