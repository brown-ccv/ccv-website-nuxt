<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div class="mt-5">
      <DCard class="mx-3 my-3 px-3" variant="light" accent="light" width="full">
        <template #header>
          <div class="is-flex is-justify-content-center">
            <figure class="image is-128x128">
              <img
                class="is-rounded"
                :src="'/content/images/people/' + person.image"
              />
            </figure>
          </div>
          <div class="media-content">
            <h2 class="title has-text-black pt-3">{{ person.name }}</h2>
            <h2 class="subtitle has-text-black pt-3">{{ person.title }}</h2>
            <a
              v-if="person.github_username"
              :href="'https://github.com/' + person.github_username"
              aria-label="information icon"
              ><span class="icon is-large"
                ><i class="mdi mdi-48px mdi-github"
              /></span>
            </a>
            <a
              v-if="person.brown_directory_uuid"
              :href="
                'https://directory.brown.edu/uuid/' +
                person.brown_directory_uuid
              "
              aria-label="information icon"
              ><span class="icon is-large"
                ><i class="mdi mdi-48px mdi-email"
              /></span>
            </a>
          </div>
        </template>
        <template #footer>
          <div>{{ person.bio }}</div>
        </template>
      </DCard>
    </div>
  </main>
</template>

<script>
import DCard from '@/components/base/DCard.vue';
export default {
  components: {
    DCard,
  },
  props: {
    post: {
      default() {
        return [];
      },
      type: Array,
    },
    people: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  computed: {
    person() {
      const person = this.people[0].data.find(
        (d) => d.name === this.post.author
      );
      return person;
    },
  },
};
</script>
