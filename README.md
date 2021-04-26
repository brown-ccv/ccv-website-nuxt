# ccv-website-experimental

> CCV Website Experimental in Nuxt.js

## Build Setup

```bash
# install dependencies
$ npm config set "@fortawesome:registry" https://npm.fontawesome.com/
$ npm config set "//npm.fontawesome.com/:_authToken" <TOKEN>
$ npm install
$ npm run fn-install

# update the content
git submodule update --init

# serve with hot reload at localhost:3000
$ npm run dev
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Testing build set up

```
npm run generate
npm run build
npm run predeploy
npm run serve
```

Main guide used :
* https://github.com/benmayer/nuxt-ssr-firebase-template
With it's corresponding post
* https://ben-mayer.com/blog/building-a-web-app-using-nuxtjs-and-firebase

Other useful
* https://stackoverflow.com/questions/61060666/how-to-deploy-nuxt-ssr-app-to-firebase-through-cloud-functions
* https://dev.to/slushnys/how-to-host-nuxt-js-application-on-firebase-with-a-single-command-1nio
