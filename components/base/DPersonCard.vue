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
        @click="$router.push(`/people/${name}`)"
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
        <h5 @click="$router.push(`/people/${name}`)">{{ name }}</h5>
        <p data-testid="title-team">
          <div><small>{{ title }}</small></div>
          <div><small>{{ team }}</small></div>
          <div><small>{{ subteam }}</small></div><span class="icon" :class="[`has-text-${accent}`]" @click="scrollToElement(subteam)">
            <i :class="['icon mdi', `${teamIcon(subteam)}`]" />
          </span>
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
    subteam: {
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
      teamIconArray: {
        'Computational Biology Core': 'mdi-dna',
        'Graphics, Software, and Data Core': 'mdi-graph',
        'High-Performance Computing': 'mdi-server',
        'High-Performance Computing Systems': 'mdi-server-network',
        'Research Technical Services': 'mdi-earth'
      },
      teamElementArray: {
        'Computational Biology Core': 'computational-biology-core',
        'Graphics, Software, and Data Core': 'graphics-software-and-data-core',
        'High-Performance Computing': 'high-performance-computing',
        'High-Performance Computing Systems': 'high-performance-computing-systems',
        'Research Technical Services': 'research-technical-services'
      },
    };
  },
  methods: {
    teamIcon(team) {
      return this.teamIconArray[team];
    },
    scrollToElement(team) {
      document.getElementById(this.teamElementArray[team]).scrollIntoView();
    },
  },
};
</script>

<style>
.d-person-card {
  cursor: pointer;
}
</style>
