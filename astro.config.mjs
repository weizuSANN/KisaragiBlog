// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { visit } from 'unist-util-visit';
import tailwindcss from '@tailwindcss/vite';

function remarkEmbeds() {
  return (tree) => {
    // console.log('Remark plugin running...');
    visit(tree, 'paragraph', (node, index, parent) => {
      const text = node.children
        .map(c => c.value || c.url || '')
        .join('')
        .trim();
      
      if (!text) return;
      // console.log('Checking text:', text);

      // YouTube
      const ytMatch = text.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
      if (ytMatch && text === ytMatch[0]) {
        const id = ytMatch[1].split('&')[0];
        const htmlNode = {
          type: 'html',
          value: `<div class="embed-container youtube-embed"><iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
        };
        parent.children.splice(index, 1, htmlNode);
        return;
      }
      
      // Twitter / X
      const twMatch = text.match(/(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/);
      if (twMatch && text === twMatch[0]) {
        // Normalize URL to twitter.com for better script compatibility
        const twitterUrl = text.replace('x.com', 'twitter.com');
        const htmlNode = {
          type: 'html',
          value: `<div class="twitter-embed"><blockquote class="twitter-tweet" data-dnt="true"><a href="${twitterUrl}">ツイートを読み込み中... (X/Twitter)</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>`
        };
        parent.children.splice(index, 1, htmlNode);
        return;
      }
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://weizuSANN.github.io',
  base: '/KisaragiBlog',
  integrations: [mdx(), sitemap()],

  markdown: {
    remarkPlugins: [remarkEmbeds],
  },

  fonts: [],

  vite: {
    plugins: [tailwindcss()],
  },
});