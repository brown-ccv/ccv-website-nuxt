<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :class="'has-background-light'"
  >
    <div class="navbar-brand">
      <template>
        <nuxt-link class="navbar-item" to="/" aria-label="Back to Home">
          <BrownLogo class="d-nav-brand" size="m" />
          <CCVLogo size="s" />
        </nuxt-link>
      </template>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        :aria-expanded="expanded"
        data-target="navbar-main"
        @click="expand"
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
    >
      <ul class="navbar-start" data-testid="navbar-start">
        <template>
          <li class="navbar-item has-dropdown is-hoverable">
            <nuxt-link
              class="navbar-link"
              :to="{
                name: 'main',
                params: {
                  main: 'services'
                }
              }"
            >
              Services
            </nuxt-link>
            <ul class="navbar-dropdown">
              <li class="navbar-item">
                <a href="/services/classroom" tabindex="0">
                  Classroom
                </a>
              </li>
              <li class="navbar-item">
                <a href="/services/computing" tabindex="0">
                  Computing
                </a>
              </li>
              <li class="navbar-item">
                <a href="/services/file-storage-and-transfer" tabindex="0">
                  File Storage and Transfer
                </a>
              </li>
              <li class="navbar-item">
                <a href="/services/visualization" tabindex="0">
                  Visualization Systems
                </a>
              </li>
              <li class="navbar-item">
                <a
                  href="/services/consulting/advanced-research-computing"
                  tabindex="0"
                >
                  Consulting
                </a>
              </li>
            </ul>
          </li>
          <li tabindex="0" class="navbar-item has-dropdown is-hoverable">
            <nuxt-link
              class="navbar-link"
              :to="{
                name: 'main',
                params: {
                  main: 'our-work'
                }
              }"
            >
              Our Work
            </nuxt-link>
            <ul class="navbar-dropdown">
              <li class="navbar-item">
                <a href="/our-work/workshops" tabindex="0">
                  Workshops
                </a>
              </li>
              <li class="navbar-item">
                <a href="/our-work/software" tabindex="0">
                  Software
                </a>
              </li>
              <li class="navbar-item">
                <a href="https://publications.ccv.brown.edu" tabindex="0">
                  Publications
                </a>
              </li>
              <li class="navbar-item">
                <a href="/our-work/talks" tabindex="0">
                  Talks and Conferences
                </a>
              </li>
            </ul>
          </li>
          <li tabindex="0" class="navbar-item has-dropdown is-hoverable">
            <nuxt-link
              class="navbar-link"
              :to="{
                name: 'main',
                params: {
                  main: 'help'
                }
              }"
            >
              Help
            </nuxt-link>
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
                <nuxt-link
                  :to="{
                    name: 'main',
                    params: {
                      main: 'help'
                    }
                  }"
                >
                  More Help Options
                </nuxt-link>
              </li>
            </ul>
          </li>
          <li class="navbar-item">
            <nuxt-link
              :to="{
                name: 'main',
                params: {
                  main: 'about'
                }
              }"
            >
              About
            </nuxt-link>
          </li>
        </template>
      </ul>
      <ul class="navbar-end" data-testid="navbar-end">
        <template>
          <li class="navbar-item">
            <a
              href="https://docs.ccv.brown.edu"
              class="d-button is-white has-text-link"
              aria-label="CCV Services' Documentation"
              >Documentation<fa class="ml-1" :icon="['fal', 'external-link']"
            /></a>
          </li>
          <li class="navbar-item">
            <a
              href="https://medium.com/brown-ccv"
              class="d-button is-white has-text-link"
              aria-label="CCV's Medium Blog"
              >Blog<fa class="ml-1" :icon="['fab', 'medium']"
            /></a>
          </li>
          <li class="navbar-item">
            <DButton variant="white" name="search" />
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import DButton from '@/components/base/DButton';
import CCVLogo from '@/components/base/CCVLogo';
import BrownLogo from '@/components/base/BrownLogo';
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  components: {
    DButton,
    CCVLogo,
    BrownLogo
  },
  mixins: [discoBaseMixin],
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
    }
  }
};
</script>
