import DefaultLayout from '~/layouts/Default.vue';
import 'prismjs/themes/prism-okaidia.css';

export default function(Vue, { head }) {
  Vue.component('Layout', DefaultLayout);

  head.htmlAttrs = { lang: 'en', class: 'h-full' };
  head.bodyAttrs = { class: 'antialiased font-serif' };

  head.link.push({
    rel: 'stylesheet',
    href:
      'https://fonts.googleapis.com/css?family=Noto+Sans:700|Noto+Serif&display=swap',
  });
}
