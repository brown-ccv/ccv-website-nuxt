<template>
  <div>
    <DHero :title="index.title" :subtitle="index.hero.lead">
      <template #button>
        <DButton variant="dark" :name="index.hero.cfa.text" />
      </template>
    </DHero>
    <div class="toc-container">
      <DTOC :data="tocObject" variant="white" />
    </div>
    <section
      v-for="cat in tocObject"
      :id="cat.link.replace('#', '')"
      :key="'section' + cat.link"
      class="service-section"
    >
      <h2 class="service-section-title title">{{ cat.name }}</h2>
      <div class="card-group">
        <a
          v-for="(page, i) in allServices.filter(
            (a) => a.category === cat.name
          )"
          :key="'card' + i"
          href="#"
          ><DCard
            :title="page.title"
            variant="white"
            accent="warning"
            width="medium"
          >
            <template #content>
              <div class="content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </template>
          </DCard>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DCard, DButton, DHero, DTOC } from '@brown-ccv/disco-vue-components';
import _ from 'lodash';

export default {
  components: {
    DCard,
    DButton,
    DHero,
    DTOC
  },
  async fetch({ store, error }) {
    await store.dispatch('services/fetchData');
  },
  computed: {
    ...mapState({
      service: (state) => state.services.service,
      consulting: (state) => state.services.consulting,
      infrastructure: (state) => state.services.infrastructure,
      index: (state) => state.services.index,
      rates: (state) => state.services.rates
    }),
    allServices() {
      return this.consulting.concat(this.infrastructure);
    },
    tocObject() {
      return _.uniq(this.allServices.map((a) => a.category))
        .filter((a) => a != null)
        .map((a) => {
          const link = `#${a.toLowerCase().replace(/ /g, '-')}`;
          return { name: a, link, icon: 'carrot-right' };
        });
    }
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/helpers/spacing';
@import '~bulma/sass/utilities/_all';

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
.toc-container {
  display: flex;
  justify-content: center;
  @include tablet {
    margin-top: -5rem;
  }
}
.service-section {
  @extend .mt-6;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.service-section-title {
  align-self: center;
}
</style>
