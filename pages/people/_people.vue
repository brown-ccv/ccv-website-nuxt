<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div class="mt-5">
      <DCard class="mx-3 my-3 px-3" variant="light" accent="light" width="full">
        <template #header>
          <div class="is-flex is-justify-content-center">
            <figure class="image" style="width: 400px; height: 400px">
              <img :src="'/content/images/people/' + person.image" />
            </figure>
          </div>
          <div class="media-content">
            <h2 class="title has-text-black pt-6">{{ person.name }}</h2>
            <h2 class="subtitle has-text-black">{{ person.title }}</h2>
            <h2 class="subtitle has-text-black">
              {{ person.team }} | {{ person.subteam }}
            </h2>
            <a
              v-if="person.github_username"
              :href="'https://github.com/' + person.github_username"
              aria-label="information icon"
              ><span class="icon"><i class="mdi mdi-github" /></span>
            </a>
            <a
              v-if="person.brown_directory_uuid"
              :href="
                'https://directory.brown.edu/uuid/' +
                person.brown_directory_uuid
              "
              aria-label="information icon"
              ><span class="icon"><i class="mdi mdi-information" /></span>
            </a>
          </div>
        </template>
        <template #footer>
          <div class="content">{{ person.bio }}</div>
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
  async asyncData({ $content, params }) {
    const people = await $content('about', 'people').fetch();
    const person = people.data.find((p) => p.github_username === params.people);
    return { person };
  },
};
</script>
