const functions = require('firebase-functions');
const { loadNuxt } = require('nuxt');

process.env.DEBUG = 'nuxt:*';
process.env.GITHUB_USER = functions.config().gh.user;
process.env.GITHUB_TOKEN = functions.config().gh.token;

console.log(`GITHUB USER: ${process.env.GITHUB_USER}`);

let isReady = false;

let nuxt = loadNuxt('start');

let dynamicRoutes = ['/_ghapi/status', '/_workday/opportunities']

async function handleRequest(req, res) {
  try {
    if (!isReady) {
      nuxt = await nuxt;
      isReady = true;
    }
    console.log(req.path);
    res.set('Cache-Control', 'public, max-age=3600, s-maxage=7200');
    if(dynamicRoutes.includes(req.path)){ 
      await nuxt.server.app.handle(req, res);
    }
    else{
      console.log('Redirect to 404 page');
      res.set('X-Cascade', 'PASS')
      res.status(404).redirect('/404.html')
    }

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

exports.ssrapp = functions.https.onRequest(handleRequest);