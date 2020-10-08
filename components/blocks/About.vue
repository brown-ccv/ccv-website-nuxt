<template>
  <div>
    <div class="toc-container">
      <DTOC :data="tocData" name="newtable" variant="white" class="toc" />
    </div>
    <main class="main-content">
      <section
        v-for="(item, i) in data"
        :id="item.title | urlize"
        :key="'people-section' + i"
        class="content-section"
      >
        <template>
          <h2 class="section-title title">
            <fa
              v-if="item.fa"
              size="2x"
              class="mr-3 has-text-white"
              :icon="[item.fa.prefix, item.fa.icon]"
              :aria-label="'icon of' + item.fa.icon"
            />{{ item.title }}
          </h2>
          <div v-if="item.title === 'Opportunities'" class="card-group">
            <template v-if="item.data.length > 0">
              <DCard
                v-for="(position, ind) in item.data"
                :key="'position' + ind"
                variant="light"
                accent="link"
                class="mx-3 my-3"
              >
                <template #content>
                  <h3>{{ position.title }}</h3>
                  <p>{{ position.team }}</p>
                </template>
                <template #footer>
                  <a
                    :href="position.link"
                    class="d-button is-dark has-text-light"
                    >Read the job descrition and apply</a
                  >
                </template>
              </DCard>
            </template>
            <div v-else>
              <p>
                There are no positions open at the moment Check back with us in
                the future. We appreciate your interest!
              </p>
            </div>
          </div>
          <div v-if="item.title === 'People'" class="card-group">
            <DPersonCard
              v-for="person in item.data"
              :key="person.name | urlize"
              variant="white"
              accent="warning"
              width="small"
              class="mx-1 my-1"
              :name="person.name"
              :title="person.title"
              :team="person.team"
              :main-image="
                'https://ccv.brown.edu/images/people/JPEG/' + person.image
              "
              :hover-image="
                'https://ccv.brown.edu/images/people/JPEG/' +
                  person.image.replace('main', 'hover')
              "
            >
              <template #icons>
                <a
                  :href="'https://github.com/' + person.github_username"
                  aria-label="information icon"
                  ><fa :icon="['fab', 'github']"
                /></a>
              </template>
            </DPersonCard>
          </div>
          <v-runtime-template v-if="item.body" v-lese :template="item.body" />
        </template>
      </section>
    </main>
  </div>
</template>

<script>
import { DTOC, DCard, DPersonCard } from '@brown-ccv/disco-vue-components';
import VRuntimeTemplate from 'v-runtime-template';

export default {
  components: {
    DTOC,
    VRuntimeTemplate,
    DCard,
    DPersonCard
  },
  filters: {
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    toc: {
      type: Array,
      required: true
    }
  },
  computed: {
    tocData() {
      return this.toc.map((d) => {
        return { name: d, link: `#${this.urlize(d)}` };
      });
    }
  },
  methods: {
    urlize(str) {
      return str.toLowerCase().replace(/ /g, '-');
    }
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';
@import '~bulma/sass/helpers/spacing';
@import '~bulma/sass/helpers/visibility';
@import '~bulma/sass/helpers/typography';
.toc-container {
  display: flex;
  justify-content: center;
  @include tablet {
    margin-top: -5rem;
  }
}
.main-content {
  @extend .mt-6;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content-section {
  @include mobile {
    padding: 3ch;
  }
  max-width: 100ch;
  p {
    font-size: $size-4;
  }
  h2 {
    @extend .mt-6;
    font-size: $size-3;
  }
  h3 {
    @extend .mt-4;
    font-size: $size-4;
  }
}
.section-title {
  @extend .py-4;
  @extend .px-4;
  align-items: center;
  background-color: var(--color-primary);
  display: flex;
}
.card-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
</style>
