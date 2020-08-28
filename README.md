# chriswang.tech

A newer version of personal blog https://chriswang.tech, built with Jamstack.

## Getting started

### Develop

After cloning this repo, run the following
```
npm i -g gatsby-cli
cd <repo_dir>
npm install
gatsby develop
```

### Publish

Open https://chriswang.tech/admin

## Components

The Jamstack deployment consists of the following components. 

* Site generator: Gatsby
* Source of trusth: Github
* CMS: Netlify CMS
* Build and Deployment: Netlify
* Security: Cloudflare

See below for more.

### Gatsby

Based on [hello-friend/](https://www.gatsbyjs.com/starters/panr/gatsby-starter-hello-friend/) template.
See `gatsby-config.js` for the Gatsby plugins.

### Netlify

Build and deployment. Decoupled from Netlify CMS.

[Deploying Gatsby to Netlify](https://www.gatsbyjs.com/docs/deploying-to-netlify/)  

### Netlify CMS

A user-frendly editor that talks to the source of truth (Github).

Decoupled from Netlify

Available at https://chriswang.tech/admin

[Netlify CMS Netlify Starter](https://github.com/netlify-templates/gatsby-starter-netlify-cms)

[Customize Netlify CMS](https://www.netlifycms.org/docs/customization/)

[Gatsby's Netlify Plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cms/)
)

#### Issue:  No Auth Provider Found

```  No Auth Provider Found
Make sure you've configured the API credentials for Github from the Access part of your Netlify site dashboard.
```


Solutions:
https://docs.netlify.com/visitor-access/oauth-provider-tokens/#setup-and-settings

#### Issue: Broken image link

The name of the [public_folder](https://www.netlifycms.org/docs/configuration-options/#public-folder) option in the Netlify CMS config `src/admin/config.yml` is  misleading. "Public" does not mean the pah in the `/public` directory

Solution:
Change `src/admin/config.yml` from

```
public_folder: ./static
```

to

```
public_folder: ../images
```
#### Issue: Some posts missing in the collection

Solution:
Change the extension from `.markdown` to `.md`.

### GitHub i.e. this repository.

Source of truth that contains both code and content.
