<template>
  <DCard
    :variant="variant"
    :width="width"
    :accent="accent"
    :border="border"
    class="d-person-card"
    :person="true"
    title=""
  >
    <template #content class="d-card-content">
      <figure
        tabindex="0"
        class="content person-image-figure"
        data-testid="person-image-figure"
        @focus="active = true"
        @blur="active = false"
        @mouseover="active = true"
        @mouseout="active = false"
      >
        <img
          :alt="'Picture of' + name"
          class="person-image"
          :src="active ? hoverImage : mainImage"
          data-testid="person-image"
        />
      </figure>
    </template>
    <template #footer>
      <footer class="content py-3 px-3">
        <h5>{{ name }}</h5>
        <p data-testid="title-team">
          <small>{{ title }} | {{ team }}</small>
        </p>
        <slot name="icons" />
      </footer>
    </template>
  </DCard>
</template>

<script>
import DCard from '@/components/base/DCard.vue';
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  components: {
    DCard,
  },
  mixins: [discoBaseMixin],
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    hoverImage: {
      type: String,
      required: true,
    },
    border: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: false,
      hover: false,
    };
  },
};
</script>

<style>
.d-person-card {
  cursor: pointer;
}
</style>
