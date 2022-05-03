<template>
  <div>
    <h1 class="main-text" v-if="error.statusCode === 404">
      404
      <p class="body-text">Woof... this page does not exist!</p>
    </h1>
    <h1 v-else>An error occurred - {{ error.statusCode }}</h1>
    <img class="header-image" src="@/assets/riggins404nobg.jpg" alt="" />
    <div class="home-button">
      <nuxtLink to="/" @click.native="handleClick">
        <DButton name="Return Home" variant="link" size="medium" />
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
.header-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
}

.main-text {
  text-align: center;
  font-size: 150px;
  padding: 2rem;
  margin: 0 -1rem;
}

.body-text {
  text-align: center;
  font-size: 30px;
}

.home-button {
  @extend .container;
  text-align: center;
  margin-bottom: 50px;
}
</style>
