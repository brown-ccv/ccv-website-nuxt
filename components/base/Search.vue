<template>
  <client-only>
    <div ref="lunr" class="lunr-search">
      <input
        id="lunr-search"
        v-model="searchText"
        type="text"
        class="lunr-input"
        :placeholder="placeholderText"
        aria-label="Search"
        aria-haspopup="true"
        :aria-expanded="showResults"
        autocomplete="off"
        spellcheck="false"
        @keyup.enter="keyEnter"
        @keyup.up="keyUp"
        @keyup.down="keyDown"
      />

      <ul
        v-show="showResults"
        ref="results"
        class="lunr-results"
        tabIndex="-1"
        aria-labelledby="lunr-search"
        @keyup.enter="keyEnter"
        @keydown.up.stop.prevent
        @keydown.down.stop.prevent
        @keyup.up.stop.prevent="keyUp"
        @keyup.down.stop.prevent="keyDown"
      >
        <li v-if="statusMsg" class="lunr-status">
          {{ statusMsg }}
        </li>
        <li
          v-for="(result, index) in searchResults"
          :key="`search-${result.ref}`"
          class="lunr-result"
          :tabIndex="100 + index"
          @click.prevent="closeResults"
        >
          <nuxt-link
            v-if="result.href.startsWith('/')"
            :to="result.href"
            role="menuitem"
          >
            {{ result.name }}
          </nuxt-link>
          <a v-else :href="result.href" role="menuitem">
            {{ result.name }}
          </a>
        </li>
      </ul>
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
      language: 'en',
      placeholderText: 'Search...',
      statusMsg: '',
      searchMeta: undefined,
      searchText: '',
      searchResults: [],
      resultsVisible: false,
    };
  },
  async fetch() {
    console.log('fetching index');
    this.setStatus('fetching');
    const searchJson = await fetch('/_nuxt/search-index/en.json').then(
      (res) => {
        if (res.status === 200) {
          return res.json();
        }
      }
    );

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
        this.resultsVisible = false;
      }
    },
    closeResults() {
      this.searchText = '';
      this.resultsVisible = false;
      this.removeBodyListener();
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

      this.searchResults = this.searchIndex
        .search(txt)
        .map((r) => this.getResultMeta(r));
      console.log(this.searchResults);

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
    keyEnter() {
      const el = this.$refs.results.querySelector(':focus');
      if (el) {
        el.querySelector('a').click();
        this.closeResults();
      }
    },
    keyUp() {
      if (!this.showResults) {
        return;
      }

      const el = this.$refs.results.querySelector(':focus');
      if (!el) {
        this.$refs.results.querySelector(':last-child').focus();
      } else if (el.previousSibling && el.previousSibling.focus) {
        el.previousSibling.focus();
      }
    },
    keyDown() {
      if (!this.showResults) {
        return;
      }

      const el = this.$refs.results.querySelector(':focus');
      if (!el) {
        this.$refs.results.querySelector(':first-child').focus();
      } else if (el.nextSibling) {
        el.nextSibling.focus();
      }
    },
  },
};
</script>
<style>
.lunr-search {
  position: relative;
  display: inline-block;
  font-size: 1rem;
}

.lunr-input {
  display: inline-block;
  border: 1px solid #eee;
  border-radius: 5px;
  line-height: 2rem;
  padding: 0 0.5em 0 2em;
  outline: none;
  transition: all 0.2s ease;
  background-size: 1rem;
}

.lunr-input:focus {
  border-color: #ddd;
}

.lunr-results {
  display: block;
  position: absolute;
  width: 20rem;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 0.5rem 0px 0px;
  padding: 0.3rem;
  list-style-type: none;
  font-size: 1.1em;
}

.lunr-result {
  cursor: pointer;
  line-height: 1.6em;
}

.lunr-result:hover,
.lunr-result:focus {
  background-color: #eee;
}

.lunr-result a {
  position: relative;
  display: inline-block;
  width: 100%;
}

.lunr-result .text-right {
  position: absolute;
  right: 0;
}

.lunr-status {
  font-style: italic;
}
</style>
