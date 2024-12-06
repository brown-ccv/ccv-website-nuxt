<template>
  <div class="sticky-container">
    <div class="service-selection px-2 sticky">
      <div
        v-for="(s, i) in services"
        :id="'field' + s.name + i"
        :key="'field' + s.name + i"
        class="field service-box my-1 p-4"
        :class="[
          matchingServices[i] ? 'has-background-info' : 'has-background-light',
        ]"
      >
        <div>
          <button
            class="button-nostyle"
            type="button"
            :disabled="!matchingServices[i]"
            @click="change(i)"
          >
            <span class="icon is-size-2"
              ><i
                :class="[
                  'mdi',
                  selectedServices[i] ||
                  (selectedServices[i] === null && matchingServices[i])
                    ? 'mdi-checkbox-marked'
                    : matchingServices[i]
                    ? 'mdi-checkbox-blank'
                    : 'mdi-checkbox-blank-off',
                ]"
            /></span>
          </button>
          <Accordion title="{{humanize(s.name)}}">
            <div class="content" v-html="$md.render(s.description || '')"></div>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { humanize } from '@/utils';
import Accordion from '~/components/base/Accordion.vue';

export default {
  comments: {
    Accordion,
  },
  components: { Accordion },
  props: {
    services: {
      type: Array,
      required: true,
    },
    selectedServices: {
      type: Array,
      required: true,
    },
    matchingServices: {
      type: Array,
      required: true,
    },
  },
  methods: {
    change(id) {
      this.$emit('service', { id });
    },
    humanize,
  },
};
</script>

<style lang="scss" scoped>
.sticky-container {
  position: relative;
}

.sticky {
  position: sticky;
  top: 10px;
}

.service-selection {
  display: flex;
  flex-basis: 30%;
  flex-wrap: wrap;
  flex-grow: 2;
  align-content: flex-start;
  max-width: 500px;
  @include mobile {
    width: 100%;
  }
}
.service-box {
  width: 100%;
  border-radius: 0;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
}
.service-label {
  font-weight: bold;
  font-size: 1.1rem;
}

.service-details {
  cursor: pointer;
  max-width: 50ch;
}
</style>
