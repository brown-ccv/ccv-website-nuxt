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
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      id="navbar-main"
      class="navbar-menu"
      :class="{ 'is-active': expanded }"
      @click="expanded = !expanded"
    >
      <div class="navbar-start" data-testid="navbar-start">
        <div @mouseover="toggleDropdown(true)" @mouseleave="toggleDropdown(false)" class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-link" to="/services"> Services </nuxt-link>
          <div class="navbar-dropdown" :style="{display: showDropdown ? 'block' : 'none' }">
            <div class="navbar-item">
              <nuxt-link to="/services/classroom" tabindex="0">
                Classroom
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link to="/services/computing" tabindex="0">
                Computing
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link to="/services/file-storage-and-transfer" tabindex="0">
                File Storage and Transfer
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link to="/services/visualization" tabindex="0">
                Visualization Systems
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/services/consulting/advanced-research-computing"
                tabindex="0"
              >
                Consulting
              </nuxt-link>
            </div>
          </div>
        </div>
        <div tabindex="0" @mouseover="toggleDropdown(true)" @mouseleave="toggleDropdown(false)" class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-link" to="/our-work"> Our Work </nuxt-link>
          <div class="navbar-dropdown" :style="{display: showDropdown ? 'block' : 'none' }">
            <div class="navbar-item">
              <nuxt-link to="/our-work/software" tabindex="0">
                Software
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <a href="https://publications.ccv.brown.edu" tabindex="0">
                Publications
              </a>
            </div>
            <div class="navbar-item">
              <nuxt-link to="/our-work/workshops-and-talks" tabindex="0">
                Workshops and Talks
              </nuxt-link>
            </div>
          </div>
        </div>
        <div tabindex="0" @mouseover="toggleDropdown(true)" @mouseleave="toggleDropdown(false)" class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-link" to="/help"> Help </nuxt-link>
          <div class="navbar-dropdown" :style="{display: showDropdown ? 'block' : 'none' }">
            <div class="navbar-item">
              <a href="mailto:support@ccv.brown.edu" tabindex="0">
                Submit a Ticket
              </a>
            </div>
            <div class="navbar-item">
              <a href="https://docs.ccv.brown.edu" tabindex="0">
                Documentation
              </a>
            </div>
            <div class="navbar-item">
              <nuxt-link to="/help"> More Help Options </nuxt-link>
            </div>
          </div>
        </div>
        <div class="navbar-item">
          <nuxt-link to="/about"> About </nuxt-link>
        </div>
      </div>
      <div class="navbar-end" data-testid="navbar-end">
        <div class="navbar-item">
          <a
            href="https://docs.ccv.brown.edu"
            class="d-button is-white has-text-link"
            aria-label="CCV Services' Documentation"
            >Docs
            <span class="icon">
              <i class="ml-1 mdi mdi-file-document-box" />
            </span>
          </a>
        </div>
        <div class="navbar-item">
          <a
            href="https://medium.com/brown-ccv"
            class="d-button is-white has-text-link"
            aria-label="CCV's Medium Blog"
            >Blog<span class="icon"> <i class="ml-1 mdi mdi-medium" /> </span
          ></a>
        </div>
      </div>
    </div>
    <div class="navbar-item">
      <Search />
    </div>
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
  watch: {
    $route() {
      this.routeChange = true;
      this.showDropdown = false;
    }
  },
  methods: {
    toggleDropdown(payload) {
      if (this.showDropdown !== payload) this.routeChange = false;
      if (!this.routeChange) {
        this.showDropdown = payload;
      }
    },
  },
  mixins: [discoBaseMixin],
  data() {
    return {
      expanded: false,
      routeChange: false,
      showDropdown: false
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar-burger {
  @include mobile {
    align-self: center;
  }
}

.navbar-start {
  font-size: 1.1em;
}
</style>
