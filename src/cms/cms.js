// Netlify CMS Custom Preview Template: https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cms/
import CMS from 'netlify-cms-app'

import BlogPostTemplate from '../templates/page'
import Index from '../templates/index'

CMS.registerPreviewTemplate('index', Index)
CMS.registerPreviewTemplate('blog', BlogPostTemplate)


