---
title: 'Static Site on Cloudflare Workers with Astro'
description: 'The infra talk'
pubDate: 'August 18 2025'
heroImage: '../../assets/cloudflare-workers.png'
---

I suppose the best place to start this blog is how it's running, as that's a project in itself. (Albeit, an easy one)

For those who don't yet know, Cloudflare Workers can be used as the CI/CD tool for static site generators such as Asto, Hugo, etc. 

To setup this blog (Yes, the one you're reading now!), I started out with the basic Astro template. Basically, created a new git repository and then ran the following to initialize a new blog: 

```bash
npm create astro@latest
```

After choosing to use the blog template, you get a nice little site template created. 

Too add it to Cloudflare Workers, you need to run a couple commands in the root of the folder. (Shamelessly stolen from [Astro's website](https://docs.astro.build/en/guides/deploy/cloudflare/))

```bash 
npm install wrangler@latest --save-dev
````
This installs the wrangler cli.

Then needed to create an ignore file in `public/.assetsignore`
With the contents:
```
_worker.js
_routes.json
```
Then, create a file in the root of the project called `wrangler.jsonc`
```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-astro-app",
  // Update to today's date
  "compatibility_date": "2025-03-25",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page" // If you have a custom `src/pages/404.astro` page
  }
}
```
Then, login to cloudflare, select your domain, and choose `Workers and Pages`. Select the option to importa a repository. 
Add your github account, and choose a repository to connect to. Set a project name, and then a build command of `npx astro build` and then click create and deploy!