# ccv-website-experimental

> CCV Website Experimental in Nuxt.js

## Dev Setup

```bash
# install dependencies
$ npm install

# initialize the content submodule
git submodule update --init

# update the content to point to HEAD of remote tracking branch
# this is optional, there is a post-merge hook that calls this,
# but you can trigger on demand to make sure content is up-to-date
git submodule update --remote

# serve with hot reload at localhost:3000
$ npm run dev
```

Add a .env file with the below keys (token needs read access to ccv-status repo) for the status banner to work (will gracefully degrade in dev mode if not available):
```
GITHUB_USER=
GITHUB_TOKEN=
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Testing build set up

```
npm run fn-install # if needed
npm run local-deploy
```

May need to set up github credentials with functions env:
```
firebase functions:config:set gh.token="THE API KEY" gh.user="THE CLIENT ID"
```

Main guide used :
* https://github.com/benmayer/nuxt-ssr-firebase-template
With it's corresponding post
* https://ben-mayer.com/blog/building-a-web-app-using-nuxtjs-and-firebase

Other useful
* https://stackoverflow.com/questions/61060666/how-to-deploy-nuxt-ssr-app-to-firebase-through-cloud-functions
* https://dev.to/slushnys/how-to-host-nuxt-js-application-on-firebase-with-a-single-command-1nio


## Notes

* 2021-05-26 (MCM): sass-loader stuck at 10 and webpack at 4 due to nuxt
