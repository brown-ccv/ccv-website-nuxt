<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :class="'has-background-light'"
  >
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/" aria-label="Back to Home">
        <BrownLogo class="d-nav-brand pr-3" size="s" />
        <CCVLogo size="s" />
      </nuxt-link>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        :aria-expanded="expanded"
        data-target="navbar-main"
        @click="expanded = !expanded"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbar-main"
      class="navbar-menu"
      :class="{ 'is-active': expanded }"
      @click="expanded = !expanded"
    >
      <ul class="navbar-start" data-testid="navbar-start">
        <li class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-link" to="/services"> Services </nuxt-link>
          <ul class="navbar-dropdown">
            <li class="navbar-item">
              <nuxt-link to="/services/classroom" tabindex="0">
                Classroom
              </nuxt-link>
            </li>
            <li class="navbar-item">
              <nuxt-link to="/services/computing" tabindex="0">
                Computing
              </nuxt-link>
            </li>
            <li class="navbar-item">
              <nuxt-link to="/services/file-storage-and-transfer" tabindex="0">
                File Storage and Transfer
              </nuxt-link>
            </li>
            <li class="navbar-item">
              <nuxt-link to="/services/visualization" tabindex="0">
                Visualization Systems
              </nuxt-link>
            </li>
            <li class="navbar-item">
              <nuxt-link
                to="/services/consulting/advanced-research-computing"
                tabindex="0"
              >
                Consulting
              </nuxt-link>
            </li>
          </ul>
        </li>
        <li tabindex="0" class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-link" to="/our-work"> Our Work </nuxt-link>
          <ul class="navbar-dropdown">
            <li class="navbar-item">
              <nuxt-link to="/our-work/workshops" tabindex="0">
                Workshops
              </nuxt-link>
            </li>
            <li class="navbar-item">
              <nuxt-link to="/our-work/software" tabindex="0">
                Software
              </nuxt-link>
            </li>
            <li class="navbar-item">
              <a href="https://publications.ccv.brown.edu" tabindex="0">
                Publications
              </a>
            </li>
            <li class="navbar-item">
              <nuxt-link to="/our-work/talks" tabindex="0">
                Talks and Conferences
              </nuxt-link>
            </li>
          </ul>
        </li>
        <li tabindex="0" class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-link" to="/help"> Help </nuxt-link>
          <ul class="navbar-dropdown">
            <li class="navbar-item">
              <a href="mailto:support@ccv.brown.edu" tabindex="0">
                Submit a Ticket
              </a>
            </li>
            <li class="navbar-item">
              <a href="https://docs.ccv.brown.edu" tabindex="0">
                Documentation
              </a>
            </li>
            <li class="navbar-item">
              <nuxt-link to="/help"> More Help Options </nuxt-link>
            </li>
          </ul>
        </li>
        <li class="navbar-item">
          <nuxt-link to="/about"> About </nuxt-link>
        </li>
      </ul>
      <ul class="navbar-end" data-testid="navbar-end">
        <li class="navbar-item">
          <a
            href="https://docs.ccv.brown.edu"
            class="d-button is-white has-text-link"
            aria-label="CCV Services' Documentation"
            >Documentation
            <span class="icon">
              <i class="ml-1 mdi mdi-file-document-box" />
            </span>
          </a>
        </li>
        <li class="navbar-item">
          <a
            href="https://medium.com/brown-ccv"
            class="d-button is-white has-text-link"
            aria-label="CCV's Medium Blog"
            >Blog<span class="icon"> <i class="ml-1 mdi mdi-medium" /> </span
          ></a>
        </li>
        <li class="navbar-item">
          <Search />
        </li>
      </ul>
    </div>

    <Search class="navbar-item" />
  </nav>
</template>

<script>
import CCVLogo from '@/components/base/CCVLogo.vue';
import BrownLogo from '@/components/base/BrownLogo.vue';
import Search from '@/components/base/Search.vue';
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  components: {
    CCVLogo,
    BrownLogo,
    Search,
  },
  mixins: [discoBaseMixin],
  data() {
    return {
      expanded: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import 'bulma';

.navbar-burger {
  @include mobile {
    align-self: center;
  }
}

.navbar-start {
  font-size: 1.1em;
}
</style>
