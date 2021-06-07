<template>
  <client-only>
    <div ref="lunr" class="lunr-search">
      <input
        id="lunr-search"
        v-model="searchText"
        type="text"
        class="input"
        :placeholder="placeholderText"
        aria-label="Search"
        aria-haspopup="true"
        :aria-expanded="showResults"
        autocomplete="off"
        spellcheck="false"
        @keyup.esc="closeResults"
      />

      <div
        v-show="showResults"
        ref="results"
        class="lunr-results dropdown-content mt-2 p-2 has-text-left"
        tabIndex="-1"
        role="menu"
        aria-labelledby="lunr-search"
      >
        <div v-if="statusMsg" class="lunr-status">
          {{ statusMsg }}
        </div>
        <template v-for="(result, index) in filteredSearchResults">
          <hr
            v-if="index !== 0"
            :key="`search-divider-${result.ref}`"
            class="dropdown-divider"
          />
          <nuxt-link
            v-if="result.href.startsWith('/')"
            :key="`search-result-${result.ref}`"
            :to="result.href"
            role="menuitem"
            class="lunr-result dropdown-item is-size-6 pr-3"
            :tab-index="100 + index"
            @click.native="closeResults"
            @keyup.native.esc="closeResults"
          >
            {{ result.name }}
          </nuxt-link>
          <a
            v-else
            :key="`search-result-${result.ref}`"
            :href="result.href"
            role="menuitem"
            class="lunr-result dropdown-item is-size-6 pr-3"
            :tab-index="100 + index"
            @click="closeResults"
            @keyup.esc="closeResults"
          >
            {{ result.name }}
          </a>
        </template>
      </div>
    </div>
  </client-only>
</template>

<script>
// component adapted form https://github.com/nuxt-community/lunr-module/blob/master/lib/search.vue
const statusMessages = {
  fetching: 'Fetching search index',
  loading: 'Loading search index',
  searching: 'Searching...',
  noresults: 'No results found',
};

export default {
  data() {
    return {
      placeholderText: 'Search...',
      statusMsg: '',
      searchMeta: undefined,
      searchText: '',
      searchResults: [],
      resultsVisible: false,
    };
  },
  async fetch() {
    this.setStatus('fetching');
    const searchIndex = await fetch('/_nuxt/search-index/en.json');
    const searchJson = await searchIndex.json();

    this.setStatus('loading');
    this.searchMeta = searchJson.metas || undefined;
    this.searchIndex = this.$lunr.Index.load(searchJson);

    this.clearStatus();
  },
  computed: {
    showResults() {
      if (this.statusMsg) return true;
      if (this.resultsVisible) return true;
      return false;
    },
    filteredSearchResults() {
      return this.searchResults.length > 10
        ? this.searchResults.slice(0, 10)
        : this.searchResults;
    },
  },
  fetchOnServer: false,
  watch: {
    searchText(val) {
      if (!val) {
        this.closeResults();
        return;
      }

      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => this.search(val), 200);
    },
    showResults(val) {
      if (val) {
        this.addBodyListener();
      } else {
        this.removeBodyListener();
      }
    },
  },
  methods: {
    addBodyListener() {
      document.body.addEventListener('mousedown', this.bodyListener);
    },
    removeBodyListener() {
      document.body.removeEventListener('mousedown', this.bodyListener);
    },
    bodyListener(event) {
      if (this.$refs.lunr && !this.$refs.lunr.contains(event.target)) {
        this.closeResults();
      }
    },
    closeResults() {
      this.searchText = '';
      this.resultsVisible = false;
      this.removeBodyListener();
      clearTimeout(this.searchTimeout);
      this.clearStatus();
    },
    openResults() {
      this.resultsVisible = true;
    },
    search(txt) {
      if (!this.searchIndex) {
        return;
      }

      this.setStatus('searching');

      this.searchResults = this.searchIndex.search(txt).map((r) => {
        return { ref: r.ref, ...this.getResultMeta(r) };
      });

      if (!this.searchResults || !this.searchResults.length) {
        this.setStatus('noresults');
      } else {
        this.clearStatus();
      }

      this.openResults();
    },
    clearStatus() {
      this.statusMsg = '';
    },
    setStatus(id) {
      this.statusMsg = statusMessages[id];
    },
    getResultMeta({ ref }) {
      if (!this.searchMeta || !this.searchMeta[ref]) {
        return;
      }

      return this.searchMeta[ref];
    },
  },
};
</script>
<style lang="scss" scoped>
@import 'bulma';
.lunr-search {
  position: relative;
  display: inline-block;

  @include mobile {
    width: 93vw;
  }
}

.lunr-results {
  display: block;
  position: absolute;
  right: 0;
  width: 20rem;
  z-index: 100;

  @include mobile {
    width: 93vw;
  }
}

.lunr-result {
  width: 100%;
  display: inline-block;
  white-space: normal !important;
}

.lunr-status {
  font-style: italic;
}
</style>
