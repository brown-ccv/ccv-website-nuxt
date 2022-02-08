import fs from 'fs';
import path from 'path';

import * as cheerio from 'cheerio';
import lunr from 'lunr';
import fetch from 'node-fetch';

// adapted from https://github.com/nuxt-community/lunr-module/blob/master/lib/module.js
// turns the documents into a search index
const createSearchIndex = (documents) => {
  let lunrBuilder;
  lunr((builder) => (lunrBuilder = builder));

  lunrBuilder.ref('id');
  for (const field of ['title', 'body']) {
    lunrBuilder.field(field);
  }

  for (const document of documents) {
    lunrBuilder.add(document);
  }

  const searchIndex = lunrBuilder.build();
  return searchIndex.toJSON();
};

// adapted from https://github.com/nuxt-community/lunr-module/blob/master/lib/module.js
// adds a search index to the generated website
const createSearchIndexAssets = (generator, documents, metas) => {
  const searchJson = createSearchIndex(documents);
  searchJson.metas = metas;

  const jsonString = JSON.stringify(searchJson);

  const indexPath = path.join(
    generator.nuxt.options.generate.dir,
    '_nuxt',
    'search-index'
  );

  if (!fs.existsSync(indexPath)) {
    fs.mkdirSync(indexPath);
  }
  fs.writeFileSync(path.join(indexPath, 'en.json'), jsonString);
};

// adapted from https://github.com/nuxt-community/lunr-module/blob/master/lib/module.js
// adds a search index to the built website
const createSearchIndexAssetsBuild = (compilation, documents, metas) => {
  const searchJson = createSearchIndex(documents);
  searchJson.metas = metas;

  const jsonString = JSON.stringify(searchJson);

  compilation.assets['search-index/en.json'] = {
    source: () => jsonString,
    size: () => jsonString.length,
  };
};

// turn a ccv website route into a title for search results
const routeToTitle = (route) => {
  return route
    .slice(1)
    .split('/')
    .map((s) =>
      s
        .split('-')
        .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
        .join(' ')
    )
    .join(' - ');
};

// walk the links in a docs website recursively
const scrapeDocs = async (url, docs, baseUrl) => {
  const resp = await fetch(url);
  const body = await resp.text();
  docs[url] = body;
  const $ = cheerio.load(body);
  const links = $('a');
  const subPages = [];
  $(links).each((i, link) => {
    const href = $(link).attr('href');
    if (href === '/') return;

    let fullUrl = baseUrl + href;

    // truncate just to url path
    const hashInd = fullUrl.indexOf('#');
    if (hashInd >= 0) {
      fullUrl = fullUrl.slice(0, hashInd);
    }

    // remove a trailing /
    if (fullUrl.endsWith('/')) {
      fullUrl = fullUrl.slice(0, -1);
    }

    // sub-page
    if (fullUrl.startsWith(url) && !docs[fullUrl]) {
      subPages.push(fullUrl);
    }
  });

  for (const subPage of subPages) {
    await scrapeDocs(subPage, docs, baseUrl);
  }

  return docs;
};

// adapted from https://github.com/BLE-LTER/Lunr-Index-and-Search-for-Static-Sites/blob/master/build_index.js
// scrapes the relevant info from the html to get the title and body data
const htmlToDocument = (html) => {
  const $ = cheerio.load(html);
  let title = $('title').text();
  if (typeof title === 'undefined') title = '';
  let description = $('meta[name=description]').attr('content');
  if (typeof description === 'undefined') description = 'description';
  let body = $('body').text();
  if (typeof body === 'undefined') body = 'body';
  return {
    title,
    description,
    body,
  };
};

// run the hook
// set up the documents and metas, on page generation add each doc to the index, also scrape the docs
export default (nuxt) => {
  let documentIndex = 1;
  const metas = {};
  const documents = [];

  const addDocument = ({ title, body, route }) => {
    documents.push({
      id: documentIndex,
      body,
      title,
    });
    metas[documentIndex] = { name: title, href: route };
    documentIndex++;
  };

  nuxt.hook('generate:page', ({ route, html }) => {
    if (route === '/') return;
    const title = routeToTitle(route);
    const doc = htmlToDocument(html);
    addDocument({ ...doc, title, route });
  });

  nuxt.hook('generate:done', (generator) => {
    createSearchIndexAssets(generator, documents, metas);
  });

  // scrape the docs websites only if generating
  nuxt.hook('generate:before', async () => {
    const docsBaseUrl = 'https://docs.ccv.brown.edu';
    const docsUrls = [
      '/oscar',
      '/stronghold',
      '/jupyterhub',
      '/globus',
      '/visualization',
    ];

    await Promise.allSettled(
      docsUrls.map(async (url) => {
        // eslint-disable-next-line no-console
        console.log(`scraping docs from ${url}`);
        const docsDocs = {};
        await scrapeDocs(docsBaseUrl + url, docsDocs, docsBaseUrl);
        for (const [key, value] of Object.entries(docsDocs)) {
          const doc = htmlToDocument(value);
          addDocument({ ...doc, route: key });
        }
        // eslint-disable-next-line no-console
        console.log(`completed scraping: ${url}`);
      })
    );
  });

  // won't have any indexed content from the site, but sets up for dev mode
  const webpackPlugin = (compilation) => {
    if (documents.length === 0) {
      // add some fake results
      addDocument({
        title: 'Test one two three four five six seven eight nine ten',
        route: '/services',
        body: 'We are testing an internal link',
      });
      addDocument({
        title: 'Somewhere over the rainbow',
        route: 'https://docs.ccv.brown.edu/oscar',
        body: 'We are testing an external link',
      });
    }
    createSearchIndexAssetsBuild(compilation, documents, metas);
  };

  nuxt.options.build.plugins.push({
    apply(compiler) {
      compiler.hooks.emit.tap('LunrModulePlugin', webpackPlugin);
    },
  });
};
