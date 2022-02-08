<template>
  <footer
    class="has-background-light d-footer footer px-0"
    variant="light"
    data-testid="footer"
    :class="['has-background-' + variant, textColor]"
  >
    <section
      class="
        d-footer-content-first
        is-flex is-justify-content-space-between is-flex-wrap-wrap
      "
    >
      <div class="is-flex is-align-content-center">
        <BrownLogo class="pr-4" size="xs" />
        <CCVLogo size="xs" />
      </div>
      <div style="display: flex">
        <span class="icon">
          <i class="pr-4 mdi mdi-instagram" />
        </span>
        <span class="icon">
          <i class="pr-4 mdi mdi-email-outline" />
        </span>
        <span class="icon">
          <i class="pr-4 mdi mdi-calendar" />
        </span>
        <span class="icon">
          <i class="pr-4 mdi mdi-comment-processing-outline" />
        </span>
      </div>
    </section>

    <section
      style="display: flex; flex-wrap: wrap; justify-content: space-between"
      class="my-5 d-footer-content-second"
    >
      <ul class="mr-6">
        <li><h2>Services</h2></li>
        <li class="">
          <a href="/services/classroom" tabindex="0"> Classroom </a>
        </li>
        <li class="">
          <a href="/services/computing" tabindex="0"> Computing </a>
        </li>
        <li class="">
          <a href="/services/file-storage-and-transfer" tabindex="0">
            File Storage and Transfer
          </a>
        </li>
        <li class="">
          <a href="/services/visualization" tabindex="0">
            Visualization Systems
          </a>
        </li>
        <li class="">
          <a href="/services/consulting" tabindex="0"> Consulting </a>
        </li>
      </ul>
      <ul class="mr-6">
        <li><h2>Documentation</h2></li>
        <li class="">
          <a href="https://docs.ccv.brown.edu" tabindex="0"> Oscar </a>
        </li>
        <li class="">
          <a
            href="/services/computing#data-risk-level-3-computing-(stronghold)"
            tabindex="0"
          >
            Stronghold
          </a>
        </li>
        <li class="">
          <a href="/services/file-storage-and-transfer#globus" tabindex="0">
            Globus
          </a>
        </li>
        <li class="">
          <a href="/services/classroom#jupyterhub" tabindex="0"> Jupyterhub </a>
        </li>
      </ul>
      <ul class="mr-6">
        <li><h2>Our Work</h2></li>
        <li class="">
          <a href="/our-work/collaborations" tabindex="0"> Collaborations </a>
        </li>
        <li class="">
          <a href="/our-work/software" tabindex="0"> Software </a>
        </li>
        <li class="">
          <a href="/our-work/workshops-and-talks" tabindex="0">
            Workshops and Talks
          </a>
        </li>
        <li class="">
          <a href="https://publications.ccv.brown.edu" tabindex="0">
            Publications
          </a>
        </li>
      </ul>
      <ul class="mr-6">
        <li>
          <h2 class="">Help</h2>
        </li>
        <li class="">
          <a href="mailto:support@ccv.brown.edu" tabindex="0">
            Submit a Ticket
          </a>
        </li>
        <li class="">
          <a
            href="https://ask.cyberinfrastructure.org/c/brown-research-computing/37"
            tabindex="0"
          >
            Discourse
          </a>
        </li>
        <li class="">
          <a href="https://ccv-share.slack.com/signup#/" tabindex="0">
            Slack
          </a>
        </li>
        <li class="">
          <a href="https://events.brown.edu/ccv/month" tabindex="0">
            Office Hours
          </a>
        </li>
      </ul>
      <ul class="mr-6">
        <li>
          <h2 class="">About</h2>
        </li>
        <li class="">
          <a href="/about#office-of-information-technology" tabindex="0"> Office of Information Technology </a>
        </li>
        <li class="">
          <a href="/about#mission" tabindex="0"> Mission </a>
        </li>
        <li class="">
          <a href="/about#people" tabindex="0"> People </a>
        </li>
        <li class="">
          <a href="/about#opportunities" tabindex="0"> Opportunities </a>
        </li>
        <li class="">
          <a href="https://events.brown.edu/ccv/month" tabindex="0"> Events </a>
        </li>
        <li class="">
          <a href="/about#facilities-statement" tabindex="0">
            How To Cite CCV
          </a>
        </li>
      </ul>
    </section>

    <div class="d-footer-content-third">
      © 2021 Center for Computation and Visualization, Brown University | 180
      George St, Providence RI 02906
    </div>
  </footer>
</template>

<script>
import CCVLogo from '@/components/base/CCVLogo.vue';
import BrownLogo from '@/components/base/BrownLogo.vue';
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  components: {
    CCVLogo,
    BrownLogo,
  },
  mixins: [discoBaseMixin],
};
</script>

<style lang="scss" scoped>
.d-footer {
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-areas:
    '. first .'
    '. second .'
    '. third .';
}
.d-footer-content-first {
  grid-area: first;
}
.d-footer-content-second {
  grid-area: second;
}
.d-footer-content-third {
  display: grid;
  justify-content: center;
  grid-area: third;
}
</style>
