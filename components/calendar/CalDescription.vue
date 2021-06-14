<template>
  <div class="desc-size overflow-wrap scroll">
    <span v-html="handledDesc"></span>
  </div>
</template>

<script>
export default {
  name: 'Description',
  props: {
    /**
     * The HTML of the event description.
     */
    desc: { type: String, required: true },
    /**
     * The URL to more info on the event.
     */
    url: String
  },
  computed: {
    /**
     * Parses and formats the description. If the raw description contains a Zoom link, then the method
     * returns just that link. Otherwise, trims the description and appends a link to more information.
     * @returns {string} The formatted description.
     */
    handledDesc() {
      if (!this.desc) return '';
      if (this.desc.includes('is inviting you to a scheduled Zoom meeting.')) {
        const zoomLink = this.desc.match(
          'https://brown.zoom.us/[a-zA-Z0-9/@:%._+~#?&/=]*'
        )[0];
        return (
          '<p>' +
          '<p>' +
          'Zoom link: <br><br>' +
          "<a href='" +
          zoomLink +
          "'>" +
          zoomLink +
          '</a>' +
          '</p>'
        );
      } else {
        return (
          this.trimDesc(this.desc) +
          " <a href='" +
          this.url +
          "' target='_blank'>More info</a>"
        );
      }
    }
  },
  methods: {
    /**
     * Trims the description to a reasonable (fairly arbitrary) length.
     */
    trimDesc(fullDesc) {
      const maxLength = 270;
      if (fullDesc.length > maxLength) {
        let trimmedDesc = fullDesc.substr(0, maxLength);
        // If the description contains multiple paragraphs, then trim
        // to a shorter length.
        if (trimmedDesc.includes('</p>')) {
          trimmedDesc = fullDesc.substr(0, 200);
        }
        // Make sure the trimmed description doesn't cut off any words.
        return fullDesc.substr(
          0,
          Math.min(trimmedDesc.length, trimmedDesc.lastIndexOf(' '))
        ) + '...';
      } else {
        return fullDesc;
      }
    }
  }
};
</script>

<style scoped>
.desc-size {
  width: 100%;
  height: 80%;
  padding-right: 0.5em;
  margin: 0;
}
.overflow-wrap {
  overflow-wrap: break-word;
}
</style>
