import DefaultLayout from '~/layouts/Default.vue';
// import 'prismjs/themes/prism-okaidia.css';
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

  head.link.push({
    rel: 'stylesheet',
    href:
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/themes/prism-okaidia.min.css',
  });
}
