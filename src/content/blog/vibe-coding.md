---
title: 'Vibe Coding a Web app'
description: 'Is it really that easy?'
pubDate: 'September 12 2025'
heroImage: '../../assets/vibe-coding.jpg'
tags: ['ai', 'git', 'vibe']
---

I had to try it eventually. The promises were to sweet. Want a new app, but don't want to pay a developer? Want to design and iterate fast? 

Could it really be as easy as that?

### The plan
I have a fairly simple use case. I have a decent little woodshop with a nice collection of tools, which means I'm often the one people go to to borrow a tool, and I don't mind that. I do like to get my tools back though, and it can be easy to forget where tools have gone. I'd like a way to track my tools and if I've lent them out, who I lent it out to.

### Tooling
After doing some attempts with OpenAI's [Codex](https://openai.com/index/openai-codex/), I settled on [Cursor](https://cursor.com/home) as it let me do local dev a lot quicker. 

My source code is all stored in Github, and going to use Github actions to publish the app, which will be a docker image for easy deployment.

### The experience

I wish I still had the initial prompts I used to get the webapp build, but at first it was a very ugly CRUD app. However, it wasn't too difficult to prompt it to make it look better. I will note, while it's fairly easy to get cursor to build an app, I still used a fair bit of technical knowledge in running local docker, etc. 

#### Challenges
Not all was sunshine and roses. I had it a couple times where the ai would go back and forth, adding and removing the same piece of code over and over again, burning my credits! I needed to stop it and give it a new prompt to guide it along. 

## Conclusion
Honestly, I was a bit suprised at how quickly I was able to get something up and running, and it's something that I wouldn't know how to code personally. That said, I did still need to use a decent amount of technical knowledge to guide the AI sometimes to the correct solution.