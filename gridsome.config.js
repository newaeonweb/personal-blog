class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  siteName: 'Barba Dev Senior Front-end Developer',
  siteDescription: 'Personal blog by Barba Dev',
  siteUrl: 'https://barbadev.netlify.com',
  titleTemplate: `%s | Barbadev`,
  icon: 'src/favicon.ico',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [['@gridsome/remark-prismjs']],
    },
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/**/*.md',
        typeName: 'Post',
        route: '/articles/:slug',
        refs: {
          tags: {
            typeName: 'Tag',
            route: '/tag/:id',
            create: true,
          },
          author: {
            typeName: 'Author',
            route: '/author/:id',
            create: true,
          },
        },
      },
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-142926399-1',
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
      },
    },
    {
      use: 'gridsome-plugin-rss',
      options: {
        contentTypeName: 'Post',
        feedOptions: {
          title: 'Barba Dev Senior Front-end Developer',
          feed_url: 'https://barbadev.netlify.com/feed.xml',
          site_url: 'https://barbadev.netlify.com',
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: 'https://barbadev.netlify.com/' + node.slug,
          author: node.author,
          date: node.date,
        }),
        output: {
          dir: './static',
          name: 'feed.xml',
        },
      },
    },
  ],

  chainWebpack: config => {
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(
          ...[
            require('postcss-import'),
            require('postcss-nested'),
            require('tailwindcss'),
          ]
        );

        if (process.env.NODE_ENV === 'production') {
          options.plugins.push(
            ...[
              require('@fullhuman/postcss-purgecss')({
                content: ['src/assets/**/*.css', 'src/**/*.vue', 'src/**/*.js'],
                extractors: [
                  {
                    extractor: TailwindExtractor,
                    extensions: ['css', 'vue', 'js'],
                  },
                ],
                whitelistPatterns: [/shiki/],
              }),
            ]
          );
        }

        return options;
      });
  },
};
