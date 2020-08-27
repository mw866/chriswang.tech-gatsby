---
title:  " Deploy Nyancat Server to Google Cloud using containers in 5 mins"
date:   2018-10-02 23:00:00
tags: [docker, container, telnet, google-cloud]
excerpt: I was looking for a TCP-based application for testing  Cloudflare Spectrum

---

I was looking for a TCP-based application for testing  [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/)

1. stateless

2. well known but not HTTP

3. most importantly, fun!

That's when I found [[klange](https://github.com/klange)/nyancat](https://github.com/klange/nyancat) and it's a perfect use of a Docker container!

I've uploaded my forked Docker version onto the Docker Hub: https://hub.docker.com/r/mw866/nyancat-server/ Feel free to deploy it to your Docker environment with `docker pull mw866/nyancat-server`.

While the README should be quite self-explanatory, Google Cloud really makes this process painless. Just run the following command using Google Cloud's `gcloud` CLI tool.

```
gcloud beta compute --project=<project_name> instances create-with-container cwang-nyancat-us --zone=<zone_name> --machine-type=<machine_type> --subnet=default --private-network-ip=<private_network_ip> --network-tier=PREMIUM --metadata=google-logging-enabled=true --maintenance-policy=MIGRATE --service-account=<service_account> --scopes= --tags=telnet --image=cos-stable-69-10895-62-0 --image-project=cos-cloud --boot-disk-size=10GB --boot-disk-type=pd-standard --boot-disk-device-name=nyancat --container-image=mw866/nyancat-server --container-restart-policy=always

```

/Chris