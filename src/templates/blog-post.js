import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Disqus from 'disqus-react';
import Bio from '../components/Bio'
import { rhythm, scale } from '../utils/typography'
import Tags from "../components/Tags";
import Img from 'gatsby-image'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
      const disqusShortname = 'vojtechruzicka';
      const disqusConfig = {
          url: "http://vojtechruzicka.com"+post.frontmatter.path,
          identifier: post.frontmatter.path,
          title: post.frontmatter.title,
      };
      var disqus = null;
      if(typeof window !== 'undefined') {
          disqus = <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig}/>
      }

    return (
      <div>
          <Helmet title={`${post.frontmatter.title} | ${siteTitle}`}>

          </Helmet>
        <h1>{post.frontmatter.title}</h1>

        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <Img sizes={post.frontmatter.featuredImage.childImageSharp.sizes} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <span>Tagged with: </span>
        <Tags tags={post.frontmatter.tags} />
        <Bio />
        {disqus}
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        featuredImage {
            childImageSharp{
                sizes(maxWidth: 1000) {
                    ...GatsbyImageSharpSizes_tracedSVG
                }
            }
        }
      }
    }
  }
`
