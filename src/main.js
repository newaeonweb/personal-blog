import DefaultLayout from '~/layouts/Default.vue';
import 'prismjs/themes/prism-okaidia.css';
import VueScrollTo from 'vue-scrollto';

export default function(Vue, { head }) {
  Vue.component('Layout', DefaultLayout);

  Vue.use(VueScrollTo, {
    container: 'body',
    duration: 500,
    easing: 'ease',
  });

  head.htmlAttrs = { lang: 'en', class: 'h-full' };
  head.bodyAttrs = { class: 'antialiased font-serif' };

  // head.link.push({
  //   rel: 'stylesheet',
  //   href:
  //     'https://fonts.googleapis.com/css?family=Noto+Sans:700|Noto+Serif&display=swap',
  // });
}
