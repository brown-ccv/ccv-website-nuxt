<template>
  <main class="card-container-wrapper is-flex is-justify-content-center">
    <div class="mt-5">
      <DCard class="mx-3 my-3 px-3" variant="light" accent="light" width="full">
        <template #header>
          <!-- <div class="is-flex is-justify-content-center">
            <figure class="image detail-image-bio">
              <img :src="'/content/images/people/' + detail" />
            </figure>
          </div> -->
          <div class="media-content">
            <h2 class="title has-text-black pt-6">{{ detail }}</h2>
            <h2 class="subtitle has-text-black">{{ detail }}</h2>
            <h2 class="subtitle has-text-black">{{ detail }} | {{ detail }}</h2>
          </div>
        </template>
        <template #footer>
          <div class="content">{{ data }}</div>
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
    data: {
      type: Array,
      required: true,
    },
  },
  async asyncData({ $content, params }) {
    const detail = await $content('our-work').fetch();
    return { detail };
  },
};
</script>
