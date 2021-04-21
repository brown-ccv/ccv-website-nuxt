process.env.DEBUG = 'nuxt:*';

const functions = require('firebase-functions');
const { loadNuxt } = require('nuxt');

let isReady = false;

let nuxt = loadNuxt('start');

async function handleRequest(req, res) {
  try {
    if (!isReady) {
      nuxt = await nuxt;
      isReady = true;
    }
    console.log(req.path);
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=7200');
    await nuxt.render(req, res);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

exports.ssrapp = functions.https.onRequest(handleRequest);
