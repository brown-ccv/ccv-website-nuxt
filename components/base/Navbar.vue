<template>
  <DNavbar variant="light">
    <template v-slot:brand>
      <nuxt-link class="navbar-item" to="/" aria-label="Back to Home">
        <BrownLogo class="d-nav-brand" size="m" />
        <CCVLogo size="s" />
      </nuxt-link>
    </template>
    <template v-slot:start>
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
    <template v-slot:end>
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
  </DNavbar>
</template>

<script>
import DNavbar from '@/components/disco-vue-components/d-navbar';
import DButton from '@/components/disco-vue-components/d-button';
import CCVLogo from '@/components/disco-vue-components/logos/CCVLogo';
import BrownLogo from '@/components/disco-vue-components/logos/BrownLogo';

export default {
  components: {
    DNavbar,
    DButton,
    CCVLogo,
    BrownLogo
  }
};
</script>
