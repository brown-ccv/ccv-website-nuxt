<template>
  <DFooter class="has-background-ligth" variant="light">
    <template #first>
      <section
        style="display: flex; justify-content: space-between; flex-wrap: wrap; "
      >
        <div style="display: flex;">
          <BrownLogo class="pr-4" size="s" /><CCVLogo size="xs" />
        </div>
        <div style="display: flex;">
          <DIcon name="instagram" class="pr-4" />
          <DIcon class="pr-4" name="email-full-1" />
          <DIcon class="pr-4" name="calendar" />
          <DIcon class="pr-4" name="chatboxes-line" />
        </div>
      </section>
    </template>
    <template #second>
      <section
        style="display: flex; flex-wrap: wrap; justify-content: space-between;"
        class="my-5"
      >
        <ul class="mr-6">
          <li><h2>Services</h2></li>
          <li class="">
            <a href="#" tabindex="0">
              Classroom
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Computing
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              File Storage and Transfer
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Visualization Systems
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Consulting
            </a>
          </li>
        </ul>
        <ul class="mr-6">
          <li><h2>Documentation</h2></li>
          <li class="">
            <a href="#" tabindex="0">
              Oscar
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Stronghold
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Globus
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Jupyterhub
            </a>
          </li>
        </ul>
        <ul class="mr-6">
          <li><h2>Our Work</h2></li>
          <li class="">
            <a href="#" tabindex="0">
              Workshops
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Software
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Publications
            </a>
          </li>
        </ul>
        <ul class="mr-6">
          <li>
            <h2 class="">
              Help
            </h2>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Submit a Ticket
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Discourse
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Slack
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Office Hours
            </a>
          </li>
        </ul>
        <ul class="mr-6">
          <li>
            <h2 class="">
              About
            </h2>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Mission
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              People
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Opportunities
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              Events
            </a>
          </li>
          <li class="">
            <a href="#" tabindex="0">
              How To Cite CCV
            </a>
          </li>
        </ul>
      </section>
    </template>
    <template #third
      >© 2020 Center for Computation and Visualization, Brown University | 180
      George St, Providence RI 02906</template
    >
  </DFooter>
</template>

<script>
import {
  DFooter,
  CCVLogo,
  BrownLogo,
  DIcon
} from '@brown-ccv/disco-vue-components';
export default {
  components: {
    DFooter,
    CCVLogo,
    BrownLogo,
    DIcon
  }
};
</script>
