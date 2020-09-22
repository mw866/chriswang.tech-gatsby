---
title: Raspberry Pi and Multi-arch Docker Images
date: 2020-09-22T15:13:17.087Z
path: raspberry-pi-and-multi-arch-docker-images
tags:
  - arm
  - docker
  - raspberry-pi
  - containers
excerpt: " [Here is the link to the image and
  documentaion](https://hub.docker.com/r/mw866/cloudflared)"
---
I recently started to build a Raspberry Pi cluster for self-hosted container workloads using [the latest Model 4B 8GB](https://www.raspberrypi.org/blog/8gb-raspberry-pi-4-on-sale-now-at-75/).

Though many official Docker images support the ARM architecture used by Raspberry Pi. Many others do not. One example that lacks ARM support is my favorite image [cloudflare/cloudflared](https://hub.docker.com/r/cloudflare/cloudflared). After some digging, I'm delighted to have discovered the recent [merged PR](https://github.com/cloudflare/cloudflared/pull/184) that introduces the support for multi-architecture images and binaries.

Using a new tool called [Docker buildx](https://docs.docker.com/buildx/working-with-buildx/), I managed to build multi-platform (including `arm`) Docker images on my MacBook Pro powered by QEMU emulation.

[Here is the link to my images and documentation](https://hub.docker.com/r/mw866/cloudflared)

Now you can have your "pi" and eat it too!