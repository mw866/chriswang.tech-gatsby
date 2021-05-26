---
title: Some Thoughts on Building a Chat App
date: 2021-05-26T11:56:39.832Z
path: /thoughts-on-chat-app
tags:
  - javascript
  - api
  - cloud
  - saas
  - chat
excerpt: Recently, I got a chance to build a simple chat and server chat app
  using Sendbird Chat API. Here are a few thoughts I had from reflecting on this
  rather technical project.
---
Recently, I got a chance to build a simple chat and server chat app using [Sendbird Chat API](https://sendbird.com/docs/chat/v3/platform-api/guides/messages#2-send-a-message).

The source code and demo are available at [mw866/chat-server](https://github.com/mw866/chat-server) and  [mw866/chat-client](https://github.com/mw866/chat-client).

Here are a few thoughts I had from reflecting on this rather technical project.

# API SaaS is Cloud 3.0

Excuse me if this sounds like some bubbly dot-com lingo. If IaaS like AWS is Cloud1.0 and SaaS like Salesforce is Cloud2.0, then API SaaS like Twilio (2000) is probably Cloud3.0. In Cloud3.0, APIs, instead of machines, become the building blocks for innovations. We are now seeing high-growth API startups that focus on payment, search, chat, messaging, shipment tracking. 
The developers no longer need to justify to procurement the upfront purchase of software licenses. With API SaaS, the devs and product managers can experiment quickly and scale up and down depending on the customer responses. 
The popularity of API SaaS is driven by a shift in modern product management. After all, the developers just chose the right tools for the tasks.

# Some ecosystems are better suited for the cloud
When I deployed [my first Django (Python) app](https://github.com/mw866/squawker-django) on Heroku in 2016, I had to learn to create `Procfile` and `runtime.txt`. And that's after I fixed the Python dependencies and runtime using `virtualenv`.
This time I went for Heroku with Node. Thanks to Heroku's support for [npm's life cycle scripts](https://docs.npmjs.com/cli/v7/using-npm/scripts), the setup frictionless. I just needed to configure the `build` and `start` scripts, which are already done during local development.
Compared to some of the package managers  I touched before, Javascript's approach to package management feel so right in the age when code is expected to be portable on mobile clients, in containers, and on myriads of cloud services (IaaS, PaaS, SaaS, serverless). Of course, I don't mean that Maven or Pip can't do the same thing. It's just that the Javascript ecosystem appears to be more thoughtful of the modern deployment environment. 

# What else?

I'll add them here when more thoughts come to my mind.


