---
title: Building a Personal Website
date: 2017-02-01 11:12:00
path: /personal-website
tags:
  - web
  - v1
  - wordpress
  - github-pages
  - aws
  - bluehost
  - jeklyll
  - git
excerpt: Like many people, I started building this website to establish a web
  presence. A personal website is also a great way learn the modern web
  technology.
---
Like many people, I started building this website to establish a web presence.
A personal website is also a great way to learn the modern web technology.

## My first big tech decision: What technology solution to use?

Being a solutions engineer myself, I take this questions about technology solutions seriously. I found lots of detail about each of the solutions. However, nobody seems to have thought about comparing them in a tabular form, which I strongly prefer.

So I created my comparison table below.

| Examples                 | **Wordpress.com**                        | **Github Pages**                                                                       | **AWS EC2**                                        | **Bluehost**                                         |
| ------------------------ | ---------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| Type                     | SaaS                                     | PaaS                                                                                   | IaaS                                               | VPS                                                  |
| Underlying Technology    | LAMP                                     | Jekyll + Git                                                                           | Virtual Machines + Other features                  | Physical Host (Shared or Dedicated) + Other features |
| Starting Price (Jan '17) | ~$5 per month                            | Free                                                                                   | ~$5 per month                                      | ~$5 per month                                        |
| Pros                     | Easy to use even for non-technical users | Superb performance and security due to the lack of backend (or simplicity or whatever) | Scalability; Highly valuable skills to learn about | What people have been doing all this while           |
| Cons                     | Slower performance due to the backend    | Static content only;  Technical know-how is needed                                     | Even more technical know-how is needed             | Lack of flexibility and scalability                  |
| Good for                 | Non-techies                              | Techies who like free stuff and GitHub                                                 | Techies who  love to run infrastructure as pets    | Techies who like deterministic pricing               |

## Why I went with GitHub Pages in the End

As an engineer, I would love to run a cluster of AWS EC2 instances in a VPS with ELB and Route 53. However, I decided to go with GitHub Pages for the following specific reasons:

* **To start small**: While I want to have this website a technical project, I don't expect the website to become so complex and so popular in the near future. the elegant solution that gives results with minimal effort is highly valued.
* **To minimize Total (Time + Money) Cost of Ownership**: Since I plan to run this website with minimal effort and budget in the long run, the solution that is both free and infra-free is preferred.
* **To get around the Great Chinese Firewall**: Believe it or not, many common international blogging services e.g. Blogger, Wordress.com are blocked by the Chinese Firewall.

## The bottom line

The modern web has become extremely technically sophisticated. Likely any other technologies, the best personal website hosting solution is the one solves the specific painpoint of the user. And Github Pages happens to be the one for me.

/Chris