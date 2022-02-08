<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :class="'has-background-light'"
  >
    <div class="navbar-brand">
      <nuxt-link
        class="navbar-item"
        to="/"
        aria-label="Back to Home"
        @click.native="handleClick"
      >
        <BrownLogo class="d-nav-brand pr-3" size="s" />
        <CCVLogo size="s" />
      </nuxt-link>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        :aria-expanded="expanded"
        :class="{ 'is-active': expanded }"
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
    >
      <div class="navbar-start" data-testid="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <nuxt-link
            class="navbar-link"
            to="/services"
            @click.native="handleClick"
          >
            Services
          </nuxt-link>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <nuxt-link
                to="/services/classroom"
                tabindex="0"
                @click.native="handleClick"
              >
                Classroom
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/services/computing"
                tabindex="0"
                @click.native="handleClick"
              >
                Computing
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/services/file-storage-and-transfer"
                tabindex="0"
                @click.native="handleClick"
              >
                File Storage and Transfer
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link to="/rates" tabindex="0" @click.native="handleClick">
                Rates
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/services/visualization"
                tabindex="0"
                @click.native="handleClick"
              >
                Visualization Systems
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/services/consulting"
                tabindex="0"
                @click.native="handleClick"
              >
                Consulting
              </nuxt-link>
            </div>
          </div>
        </div>
        <div tabindex="0" class="navbar-item has-dropdown is-hoverable">
          <nuxt-link
            class="navbar-link"
            to="/our-work"
            @click.native="handleClick"
          >
            Our Work
          </nuxt-link>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <nuxt-link
                to="/our-work/collaborations"
                tabindex="0"
                @click.native="handleClick"
              >
                Collaborations
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/our-work/software"
                tabindex="0"
                @click.native="handleClick"
              >
                Software
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/our-work/workshops-and-talks"
                tabindex="0"
                @click.native="handleClick"
              >
                Workshops and Talks
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <a
                href="https://publications.ccv.brown.edu"
                tabindex="0"
                @click.native="handleClick"
              >
                Publications
              </a>
            </div>
          </div>
        </div>
        <div tabindex="0" class="navbar-item has-dropdown is-hoverable">
          <nuxt-link class="navbar-link" to="/help" @click.native="handleClick">
            Help
          </nuxt-link>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <a
                href="mailto:support@ccv.brown.edu"
                tabindex="0"
                @click.native="handleClick"
              >
                Submit a Ticket
              </a>
            </div>
            <div class="navbar-item">
              <a
                href="https://docs.ccv.brown.edu"
                tabindex="0"
                @click.native="handleClick"
              >
                Documentation
              </a>
            </div>
            <div class="navbar-item">
              <nuxt-link to="/help" @click.native="handleClick">
                More Help Options
              </nuxt-link>
            </div>
          </div>
        </div>
        <div tabindex="0" class="navbar-item has-dropdown is-hoverable">
          <nuxt-link
            class="navbar-link"
            to="/about"
            @click.native="handleClick"
          >
            About
          </nuxt-link>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <nuxt-link
                to="/about#oit"
                tabindex="0"
                @click.native="handleClick"
              >
                Office of Information Techology
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/about#mission"
                tabindex="0"
                @click.native="handleClick"
              >
                Mission
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/about#our-teams"
                tabindex="0"
                @click.native="handleClick"
              >
                Our Teams
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/about#people"
                tabindex="0"
                @click.native="handleClick"
              >
                People
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/about#opportunities"
                tabindex="0"
                @click.native="handleClick"
              >
                Opportunities
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/about#facilities-statement"
                tabindex="0"
                @click.native="handleClick"
              >
                Facilities Statement
              </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link
                to="/about#diversity-statement"
                tabindex="0"
                @click.native="handleClick"
              >
                Diversity Statement
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar-end" data-testid="navbar-end">
        <div class="navbar-item">
          <a
            href="https://docs.ccv.brown.edu"
            class="d-button is-white has-text-link"
            aria-label="CCV Services' Documentation"
            >Docs
            <span class="mx-0 icon"><i class="mdi mdi-file-document" /></span>
          </a>
        </div>
        <div class="navbar-item">
          <a
            href="https://medium.com/brown-ccv"
            class="d-button is-white has-text-link"
            aria-label="CCV's Medium Blog"
            >Blog <span class="mx-0 icon"><i class="mdi mdi-notebook" /></span
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
  mixins: [discoBaseMixin],
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    handleClick() {
      // collapse the hamburger bar and un-focus the navbar
      this.expanded = false;
      document.activeElement.blur();
    },
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
