<template>
  <footer
    class="has-background-light d-footer"
    variant="light"
    data-testid="footer"
    :class="['has-background-' + variant, textColor]"
  >
    <div class="d-footer-content-first">
      <template>
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
    </div>

    <div class="d-footer-content-second">
      <template>
        <section
          style="display: flex; flex-wrap: wrap; justify-content: space-between;"
          class="my-5"
        >
          <ul class="mr-6">
            <li><h2>Services</h2></li>
            <li class="">
              <a href="/services/classroom" tabindex="0">
                Classroom
              </a>
            </li>
            <li class="">
              <a href="/services/computing" tabindex="0">
                Computing
              </a>
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
              <a
                href="/services/consulting/advanced-research-computing"
                tabindex="0"
              >
                Consulting
              </a>
            </li>
          </ul>
          <ul class="mr-6">
            <li><h2>Documentation</h2></li>
            <li class="">
              <a href="https://docs.ccv.brown.edu" tabindex="0">
                Oscar
              </a>
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
              <a href="/services/classroom#jupyterhub" tabindex="0">
                Jupyterhub
              </a>
            </li>
          </ul>
          <ul class="mr-6">
            <li><h2>Our Work</h2></li>
            <li class="">
              <a href="/our-work/workshops" tabindex="0">
                Workshops
              </a>
            </li>
            <li class="">
              <a href="/our-work/software" tabindex="0">
                Software
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
              <h2 class="">
                Help
              </h2>
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
              <h2 class="">
                About
              </h2>
            </li>
            <li class="">
              <a href="/about#mission" tabindex="0">
                Mission
              </a>
            </li>
            <li class="">
              <a href="/about#people" tabindex="0">
                People
              </a>
            </li>
            <li class="">
              <a href="/about#opportunities" tabindex="0">
                Opportunities
              </a>
            </li>
            <li class="">
              <a href="https://events.brown.edu/ccv/month" tabindex="0">
                Events
              </a>
            </li>
            <li class="">
              <a href="/about#facilities-statement" tabindex="0">
                How To Cite CCV
              </a>
            </li>
          </ul>
        </section>
      </template>
    </div>

    <div class="d-footer-content-third">
      <template
        >© 2021 Center for Computation and Visualization, Brown University | 180
        George St, Providence RI 02906</template
      >
    </div>
  </footer>
</template>

<script>
import DIcon from '@/components/base/DIcon';
import CCVLogo from '@/components/base/CCVLogo';
import BrownLogo from '@/components/base/BrownLogo';
import discoBaseMixin from '@/mixins/disco-base-mixin.js';

export default {
  components: {
    CCVLogo,
    BrownLogo,
    DIcon
  },
  mixins: [discoBaseMixin]
};
</script>
