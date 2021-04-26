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
    res.set('Cache-Control', 'public, max-age=3600, s-maxage=7200');
    await nuxt.server.app.handle(req, res, (out) => console.log(out));
    // const pathParts = req.path.split('/');
    // console.log(pathParts);
    // if (pathParts.length > 1 && pathParts[1] === '_content' && req.method === 'POST') {
    //   // req.method = 'GET'
    //   // req.query = { ...req.body }
    //   // let params = req.body;
    //   // req.query
    //   // req.params = req.body
    //   console.log(req.method);
    //   await contentHandler.handle(req, res);
    // } else {
    //   await nuxt.server.app.handle(req, res, (out) => console.log(out));
    // }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

exports.ssrapp = functions.https.onRequest(handleRequest);
