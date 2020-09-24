<template>
  <div>
    <DHero :title="index.title" :subtitle="index.hero.lead">
      <template #button>
        <DButton variant="dark" :name="index.hero.cfa.text" />
      </template>
    </DHero>
    <div class="card-group">
      <a v-for="(page, i) in services" :key="'card' + i" href="#"
        ><DCard
          :title="page.title"
          variant="white"
          accent="warning"
          width="medium"
        >
          <template #content>
            <div class="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </template>
        </DCard>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DCard, DButton, DHero } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DCard,
    DButton,
    DHero
  },
  computed: {
    ...mapState('services', ['services', 'index', 'rates'])
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/helpers/spacing';

.card-group {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5rem;
  padding-right: 5rem;
}
.d-card {
  @extend .my-6;
}
</style>
