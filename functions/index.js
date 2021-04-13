const functions = require('firebase-functions');
const { Nuxt } = require('nuxt-start');

const config = {
  dev: false,
  debug: false
};

const nuxt = new Nuxt(config);

exports.ssrapp = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res);
});
