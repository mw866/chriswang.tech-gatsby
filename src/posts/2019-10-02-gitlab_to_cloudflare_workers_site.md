---
title:  "Add Cloudflare Workers Site to GitLab Pages"
date:   2019-10-02 09:00:00
tags: [gitlab, web, jekyll, cloudflare, cloudflare-workers]
excerpt: It's surprisingly easy to publish my existing GitLab page to Workers site...
path: /workers-site
---

It's surprisingly easy to publish my existing GitLab page to Workers site.

## Step 1: Test locally 

Just follow the tutorial [Start from an Existing Worker](https://developers.cloudflare.com/workers/sites/start-from-worker/)

## Step 2: Update `.gitlab-ci.yml`

### 2a Pick a ruby base image that has `npm`. 

Wrangler Workers site uses webpack. You will need `npm` for it to work

### 2b. Install Wrangler
In this case, I just use the precompiled binary at [Github Releases](https://github.com/cloudflare/wrangler/releases)

### 2c Configure Environment Variables in CI settigns

```
CF_API_KEY=superlongapikey 
CF_EMAIL=testuser@example.com 
```

See [Environment Variables](https://github.com/cloudflare/wrangler#using-environment-variables)

### `.gitlab-ci.yml` End reuslt

```
# requiring the environment of Ruby 2.3.x
image: timbru31/ruby-node:2.3

# add bundle cache to 'vendor' for speeding up builds
cache:
  paths: 
    - vendor/

before_script:
  - bundle install --path vendor


# the 'pages' job will deploy and build your site to the 'public' path
pages:
  stage: deploy
  script:
    - bundle exec jekyll build -d public/
    - wget https://github.com/cloudflare/wrangler/releases/download/v1.4.0/wrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz
    - tar xvzf wrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz 
    - wrangler-v1.4.0-x86_64-unknown-linux-musl/wrangler publish
  artifacts:
    paths:
      - public
  only:
    - master # this job will affect only the 'master' branch

# 
# https://github.com/jekyll/jekyll/issues/4268#issuecomment-377681274
variables:
  LC_ALL: "C.UTF-8"
  LANG: "en_US.UTF-8"
  LANGUAGE: "en_US.UTF-8"
```

## Step 3: git push!

Check the GitLab CI job log

```
Running with gitlab-runner 12.3.0 (a8a019e0)
  on docker-auto-scale fa6cab46
Using Docker executor with image timbru31/ruby-node:2.3 ...
Pulling docker image timbru31/ruby-node:2.3 ...
Using docker image sha256:1373e82c39364cec1d6d8b1ac92d877c5adfb38066396b13b0cf4e65d7313304 for timbru31/ruby-node:2.3 ...
Running on runner-fa6cab46-project-7998729-concurrent-0 via runner-fa6cab46-srm-1570008812-ed443b3a...
Fetching changes...
Initialized empty Git repository in /builds/mw866/chriswang.tech/.git/
Created fresh repository.
From https://gitlab.com/mw866/chriswang.tech
 * [new branch]      gitlab     -> origin/gitlab
 * [new branch]      master     -> origin/master
Checking out 015b4fb3 as master...

Skipping Git submodules setup
Checking cache for default...
Downloading cache.zip from https://storage.googleapis.com/gitlab-com-runners-cache/project/7998729/default 
Successfully extracted cache
$ bundle install --path vendor
Fetching gem metadata from https://rubygems.org/..........
Fetching gem metadata from https://rubygems.org/.
Resolving dependencies...
Using public_suffix 4.0.1
Using addressable 2.7.0
Using bundler 1.17.3
Using colorator 1.1.0
Using concurrent-ruby 1.1.5
Using eventmachine 1.2.7
Using http_parser.rb 0.6.0
Using em-websocket 0.5.1
Using ffi 1.11.1
Using ethon 0.12.0
Using forwardable-extended 2.6.0
Using mercenary 0.3.6
Using mini_portile2 2.4.0
Using nokogiri 1.10.4
Using parallel 1.17.0
Using rainbow 3.0.0
Using typhoeus 1.3.1
Using yell 2.2.0
Using html-proofer 3.13.0
Using i18n 0.9.5
Using rb-fsevent 0.10.3
Using rb-inotify 0.10.0
Using sass-listen 4.0.0
Using sass 3.7.4
Using jekyll-sass-converter 1.5.2
Fetching listen 3.2.0
Installing listen 3.2.0
Using jekyll-watch 2.2.1
Using kramdown 1.17.0
Using liquid 4.0.3
Using pathutil 0.16.2
Fetching rouge 3.11.1
Installing rouge 3.11.1
Using safe_yaml 1.0.5
Using jekyll 3.8.6
Using jekyll-paginate 1.1.0
Using jekyll-seo-tag 2.6.1
Bundle complete! 4 Gemfile dependencies, 35 gems now installed.
Bundled gems are installed into `./vendor`
$ bundle exec jekyll build -d public/
Configuration file: /builds/mw866/chriswang.tech/_config.yml
            Source: /builds/mw866/chriswang.tech
       Destination: public/
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 0.459 seconds.
 Auto-regeneration: disabled. Use --watch to enable.
$ wget https://github.com/cloudflare/wrangler/releases/download/v1.4.0/wrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz
--2019-10-02 09:35:37--  https://github.com/cloudflare/wrangler/releases/download/v1.4.0/wrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz
Resolving github.com (github.com)... 140.82.113.4
Connecting to github.com (github.com)|140.82.113.4|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://github-production-release-asset-2e65be.s3.amazonaws.com/175043545/07d9d500-e0f0-11e9-9844-d794107bcf7a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20191002%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191002T093537Z&X-Amz-Expires=300&X-Amz-Signature=9aeaae6f3201a5d50fa05502f5d57c996205966142d0cde4664b4af128f82964&X-Amz-SignedHeaders=host&actor_id=0&response-content-disposition=attachment%3B%20filename%3Dwrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz&response-content-type=application%2Foctet-stream [following]
--2019-10-02 09:35:37--  https://github-production-release-asset-2e65be.s3.amazonaws.com/175043545/07d9d500-e0f0-11e9-9844-d794107bcf7a?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20191002%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191002T093537Z&X-Amz-Expires=300&X-Amz-Signature=9aeaae6f3201a5d50fa05502f5d57c996205966142d0cde4664b4af128f82964&X-Amz-SignedHeaders=host&actor_id=0&response-content-disposition=attachment%3B%20filename%3Dwrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz&response-content-type=application%2Foctet-stream
Resolving github-production-release-asset-2e65be.s3.amazonaws.com (github-production-release-asset-2e65be.s3.amazonaws.com)... 52.217.36.172
Connecting to github-production-release-asset-2e65be.s3.amazonaws.com (github-production-release-asset-2e65be.s3.amazonaws.com)|52.217.36.172|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 5891583 (5.6M) [application/octet-stream]
Saving to: ‘wrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz’

     0K .......... .......... .......... .......... ..........  0% 3.07M 2s
    50K .......... .......... .......... .......... ..........  1% 3.96M 2s
   100K .......... .......... .......... .......... ..........  2% 3.69M 2s
   150K .......... .......... .......... .......... ..........  3%  248M 1s
   200K .......... .......... .......... .......... ..........  4%  245M 1s
   250K .......... .......... .......... .......... ..........  5% 3.52M 1s
   300K .......... .......... .......... .......... ..........  6%  105M 1s
   350K .......... .......... .......... .......... ..........  6% 3.42M 1s
   400K .......... .......... .......... .......... ..........  7%  236M 1s
   450K .......... .......... .......... .......... ..........  8%  291M 1s
   500K .......... .......... .......... .......... ..........  9%  271M 1s
   550K .......... .......... .......... .......... .......... 10%  289M 1s
   600K .......... .......... .......... .......... .......... 11%  227M 1s
   650K .......... .......... .......... .......... .......... 12%  277M 1s
   700K .......... .......... .......... .......... .......... 13% 4.06M 1s
   750K .......... .......... .......... .......... .......... 13% 49.6M 1s
   800K .......... .......... .......... .......... .......... 14% 86.9M 0s
   850K .......... .......... .......... .......... .......... 15%  313M 0s
   900K .......... .......... .......... .......... .......... 16%  290M 0s
   950K .......... .......... .......... .......... .......... 17%  217M 0s
  1000K .......... .......... .......... .......... .......... 18%  202M 0s
  1050K .......... .......... .......... .......... .......... 19%  244M 0s
  1100K .......... .......... .......... .......... .......... 19%  290M 0s
  1150K .......... .......... .......... .......... .......... 20%  288M 0s
  1200K .......... .......... .......... .......... .......... 21%  238M 0s
  1250K .......... .......... .......... .......... .......... 22%  268M 0s
  1300K .......... .......... .......... .......... .......... 23%  297M 0s
  1350K .......... .......... .......... .......... .......... 24%  281M 0s
  1400K .......... .......... .......... .......... .......... 25% 5.09M 0s
  1450K .......... .......... .......... .......... .......... 26% 12.7M 0s
  1500K .......... .......... .......... .......... .......... 26%  184M 0s
  1550K .......... .......... .......... .......... .......... 27% 55.1M 0s
  1600K .......... .......... .......... .......... .......... 28%  210M 0s
  1650K .......... .......... .......... .......... .......... 29%  236M 0s
  1700K .......... .......... .......... .......... .......... 30%  153M 0s
  1750K .......... .......... .......... .......... .......... 31%  237M 0s
  1800K .......... .......... .......... .......... .......... 32%  266M 0s
  1850K .......... .......... .......... .......... .......... 33%  273M 0s
  1900K .......... .......... .......... .......... .......... 33%  316M 0s
  1950K .......... .......... .......... .......... .......... 34%  312M 0s
  2000K .......... .......... .......... .......... .......... 35%  302M 0s
  2050K .......... .......... .......... .......... .......... 36%  251M 0s
  2100K .......... .......... .......... .......... .......... 37%  319M 0s
  2150K .......... .......... .......... .......... .......... 38%  326M 0s
  2200K .......... .......... .......... .......... .......... 39%  294M 0s
  2250K .......... .......... .......... .......... .......... 39%  263M 0s
  2300K .......... .......... .......... .......... .......... 40%  310M 0s
  2350K .......... .......... .......... .......... .......... 41% 20.6M 0s
  2400K .......... .......... .......... .......... .......... 42% 40.5M 0s
  2450K .......... .......... .......... .......... .......... 43%  274M 0s
  2500K .......... .......... .......... .......... .......... 44% 62.1M 0s
  2550K .......... .......... .......... .......... .......... 45%  174M 0s
  2600K .......... .......... .......... .......... .......... 46%  341M 0s
  2650K .......... .......... .......... .......... .......... 46%  258M 0s
  2700K .......... .......... .......... .......... .......... 47%  351M 0s
  2750K .......... .......... .......... .......... .......... 48%  233M 0s
  2800K .......... .......... .......... .......... .......... 49%  247M 0s
  2850K .......... .......... .......... .......... .......... 50%  316M 0s
  2900K .......... .......... .......... .......... .......... 51%  356M 0s
  2950K .......... .......... .......... .......... .......... 52%  274M 0s
  3000K .......... .......... .......... .......... .......... 53%  348M 0s
  3050K .......... .......... .......... .......... .......... 53% 16.1M 0s
  3100K .......... .......... .......... .......... .......... 54%  117M 0s
  3150K .......... .......... .......... .......... .......... 55%  300M 0s
  3200K .......... .......... .......... .......... .......... 56%  279M 0s
  3250K .......... .......... .......... .......... .......... 57%  283M 0s
  3300K .......... .......... .......... .......... .......... 58%  309M 0s
  3350K .......... .......... .......... .......... .......... 59%  300M 0s
  3400K .......... .......... .......... .......... .......... 59%  280M 0s
  3450K .......... .......... .......... .......... .......... 60%  257M 0s
  3500K .......... .......... .......... .......... .......... 61%  304M 0s
  3550K .......... .......... .......... .......... .......... 62%  300M 0s
  3600K .......... .......... .......... .......... .......... 63%  302M 0s
  3650K .......... .......... .......... .......... .......... 64%  270M 0s
  3700K .......... .......... .......... .......... .......... 65%  307M 0s
  3750K .......... .......... .......... .......... .......... 66%  286M 0s
  3800K .......... .......... .......... .......... .......... 66% 22.4M 0s
  3850K .......... .......... .......... .......... .......... 67% 24.8M 0s
  3900K .......... .......... .......... .......... .......... 68%  291M 0s
  3950K .......... .......... .......... .......... .......... 69%  341M 0s
  4000K .......... .......... .......... .......... .......... 70%  346M 0s
  4050K .......... .......... .......... .......... .......... 71%  269M 0s
  4100K .......... .......... .......... .......... .......... 72%  334M 0s
  4150K .......... .......... .......... .......... .......... 72%  358M 0s
  4200K .......... .......... .......... .......... .......... 73%  305M 0s
  4250K .......... .......... .......... .......... .......... 74%  273M 0s
  4300K .......... .......... .......... .......... .......... 75%  336M 0s
  4350K .......... .......... .......... .......... .......... 76%  326M 0s
  4400K .......... .......... .......... .......... .......... 77%  344M 0s
  4450K .......... .......... .......... .......... .......... 78%  322M 0s
  4500K .......... .......... .......... .......... .......... 79% 57.7M 0s
  4550K .......... .......... .......... .......... .......... 79% 19.1M 0s
  4600K .......... .......... .......... .......... .......... 80% 77.1M 0s
  4650K .......... .......... .......... .......... .......... 81%  192M 0s
  4700K .......... .......... .......... .......... .......... 82%  327M 0s
  4750K .......... .......... .......... .......... .......... 83%  347M 0s
  4800K .......... .......... .......... .......... .......... 84%  325M 0s
  4850K .......... .......... .......... .......... .......... 85%  304M 0s
  4900K .......... .......... .......... .......... .......... 86%  356M 0s
  4950K .......... .......... .......... .......... .......... 86%  302M 0s
  5000K .......... .......... .......... .......... .......... 87%  349M 0s
  5050K .......... .......... .......... .......... .......... 88%  289M 0s
  5100K .......... .......... .......... .......... .......... 89%  340M 0s
  5150K .......... .......... .......... .......... .......... 90%  324M 0s
  5200K .......... .......... .......... .......... .......... 91%  363M 0s
  5250K .......... .......... .......... .......... .......... 92%  322M 0s
  5300K .......... .......... .......... .......... .......... 92% 57.7M 0s
  5350K .......... .......... .......... .......... .......... 93% 19.1M 0s
  5400K .......... .......... .......... .......... .......... 94%  181M 0s
  5450K .......... .......... .......... .......... .......... 95%  294M 0s
  5500K .......... .......... .......... .......... .......... 96%  363M 0s
  5550K .......... .......... .......... .......... .......... 97%  313M 0s
  5600K .......... .......... .......... .......... .......... 98%  343M 0s
  5650K .......... .......... .......... .......... .......... 99%  306M 0s
  5700K .......... .......... .......... .......... .......... 99%  361M 0s
  5750K ...                                                   100% 6674G=0.1s

2019-10-02 09:35:37 (42.2 MB/s) - ‘wrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz’ saved [5891583/5891583]

$ tar xvzf wrangler-v1.4.0-x86_64-unknown-linux-musl.tar.gz
wrangler-v1.4.0-x86_64-unknown-linux-musl/
wrangler-v1.4.0-x86_64-unknown-linux-musl/LICENSE-APACHE
wrangler-v1.4.0-x86_64-unknown-linux-musl/LICENSE-MIT
wrangler-v1.4.0-x86_64-unknown-linux-musl/wrangler
wrangler-v1.4.0-x86_64-unknown-linux-musl/README.md
$ wrangler-v1.4.0-x86_64-unknown-linux-musl/wrangler publish
 Using namespace for Workers Site "__workers-chriswang-tech-workers_sites_assets"
 Uploading...
 Success
added 2 packages from 2 contributors and audited 2 packages in 0.747s
found 0 vulnerabilities

⬇️ Installing wranglerjs...
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN wrangler-js@0.1.11 No description
npm WARN wrangler-js@0.1.11 No repository field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.9 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.9: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})

added 323 packages from 199 contributors and audited 4226 packages in 10.948s
found 0 vulnerabilities

⬇️ Installing wasm-pack...
 Built successfully, built project size is 11 KiB.
 Successfully published your script to workers.chriswang.tech/*
Creating cache default...
vendor/: found 4596 matching files                 
Uploading cache.zip to https://storage.googleapis.com/gitlab-com-runners-cache/project/7998729/default 
Created cache
Uploading artifacts...
public: found 83 matching files                    
Uploading artifacts to coordinator... ok            id=309666254 responseStatus=201 Created token=Pyc6zLN8
Job succeeded
```


__Voilà!__
