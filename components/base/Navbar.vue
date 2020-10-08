<template>
  <DNavbar variant="light">
    <template v-slot:brand>
      <a class="navbar-item" href="#" aria-label="Back to Home">
        <BrownLogo class="d-nav-brand" size="m" />
        <CCVLogo size="s" />
      </a>
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
            <a href="#" tabindex="0">
              Classroom
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" tabindex="0">
              Computing
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" tabindex="0">
              File Storage and Transfer
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" tabindex="0">
              Visualization Systems
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" tabindex="0">
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
            <a href="#" tabindex="0">
              Workshops
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" tabindex="0">
              Software
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" tabindex="0">
              Publications
            </a>
          </li>
          <li class="navbar-item">
            <a href="#" tabindex="0">
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
        <div class="buttons">
          <DButton name="search" />
        </div>
      </li>
    </template>
  </DNavbar>
</template>

<script>
import {
  DNavbar,
  DButton,
  CCVLogo,
  BrownLogo
} from '@brown-ccv/disco-vue-components';
export default {
  components: {
    DNavbar,
    DButton,
    CCVLogo,
    BrownLogo
  }
};
</script>
