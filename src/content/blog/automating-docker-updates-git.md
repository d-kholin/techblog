---
title: 'Managing updates on Docker with GitOps'
description: 'What do you mean, breaking changes?'
pubDate: 'January 19 2026'
heroImage: '../../assets/renovate.jpg'
---

Updates can be a pain. There are usually 2 option. First, don't update things. They work fine, so why change it? While this can be tempting and easy, the amount of security vulnerabilities that are found regularly for really common software forces one to update regularly if you want to hope to protect your digital good. 

Ok, what about the second option? In the homelab community, running something like watchtower is fairily common. If you aren't familiar with it, WatchTower automatically updates your docker images. The only problem is breaking changes....it's kindof known for pushing those. This creates much more of a headache compared to a properly scheduled maintenance window and update schedule.

So what is one to do? Both of these seem to have pretty glaring downsides.

Enter [GitOps](https://www.gitops.tech/).

For context, I currently use [Portainer](https://www.portainer.io/) to run my docker environments. I have a main portainer instance, and I have portainer agents on other machines as well that tie into the main instance to give me a single place to manage all my docker workloads. 

One of the things you can do with portainer when setting up a stack is using a git repository for the docker compose file, rather than using the web editor. The web editor is great for quickly spinning things up, but management over time is difficult, and updates require either manually pulling the image (If you are using :latest, tsk tsk), or updating the version number manually and redeploying (Tedius, ugh). By using a git backend, we can now manage our infrastructure with code, rather than a thousand clicks in a web gui. Better, but still have the issue of needing to update the version numbers manually. 

This is where we'll use [Renovate](https://github.com/apps/renovate). Renovate will watch our git repo, and when one of our docker images has an update, it'll automatically open a pull request with the updated version number. If we merge that pull request, portainer will pull the update and redeploy the image with the newer version. 

Regarding breaking changes, the Pull requests will usually (though not always, depends on the image) have the release notes baked right in, so you can take a quick look to see if there are any breaking changes in the release notes. If it doesn't, it has a link to the new tagged image so we can check before merging. 

As we only need to accept the PR, we can easily do this from a mobile phone, and don't need pull out of computer and do something nerdy for us to update ActualBudget for that sweet new feature, or patch that new CVE that just got announced for Vaultwarden.

Beauty! So how do we do this?

First, we need a git repo. I used Github rather than hosting my own git on the same infrastructure managed by git. So, create a Github account if you don't already have one and setup a new repository.

You can add Renovate to your Github account by adding the [Renovate App](https://github.com/apps/renovate) to your Github account, and then choosing the repositories you want it to run on. After selecting your repository, it should start running. You should see a new issue created called the Dependency Dashboard, where it'll list all the dependencies it's found and is monitoring. Throw in some docker compose files and if you can, use an outdated version tag. Shortly after doing so, you should see a PR come through updating that silly old version to the new, shiny one! Merge the PR, and voila!

Next step, setup your stacks in portainer to point to a git repo, and off you go! If you are using a private repo in Github, you'll need to create an access token in Github, and in Portainer enable authentication on the git repo when creating the new stack, and add in your username and token. 

*If you already have stacks in portainer you don't want to loose...*

Been there, had to do that. Little spooky to do, but not that bad. 

First, make sure you have a proper backup. 

Second, make note of the name of the stack in portainer. 

Third.....remove the stack from portainer. Spooky, I know, but this doesn't actually delete the volumes.

Fourth, make a new stack, and call it by the exact same name. Point to git, and point to the docker compose file you want to use, and create. This will map to the same docker volumes as before, and you should now be migrated to gitops!