<template>
  <div class="text-gray-700 flex flex-wrap text-center max-w-4xl mx-auto p-4 md:p-8 text-sm py-3">
    <div class="w-full px-1">
      <p>
        Built with
        <a
          class="text-blue-700 border-b border-transparent hover:border-black transition-border-color hover:text-black transition-color"
          href="https://gridsome.org"
          target="_blank"
        >Gridsome</a>,
        <a
          href="https://tailwindcss.com/"
          class="text-blue-700 border-b border-transparent hover:border-black transition-border-color hover:text-black transition-color"
          target="_blank"
        >Tailwind CSS</a>, listening:
        <a
          class="text-blue-700 border-b border-transparent hover:border-black transition-border-color hover:text-black transition-color"
          href="https://open.spotify.com/artist/6kACVPfCOnqzgfEF5ryl0x?autoplay=true&v=A"
          target="_blank"
        >Jhonny Cash</a> &amp;
        <a
          class="text-blue-700 border-b border-transparent hover:border-black transition-border-color hover:text-black transition-color"
          href="https://open.spotify.com/artist/2dyeCWctcFRt3Pha76ONgb?autoplay=true&v=A"
          target="_blank"
        >Hank Willians Jr</a>.
      </p>
    </div>
    <div class="w-full">
      <nav class="mt-1">
        <ul class="flex-row">
          <li class="px-2 inline border-r">
            <a
              href="/sitemap.xml"
              class="border-b border-transparent hover:border-black transition-border-color"
            >Sitemap</a>
          </li>
          <li class="px-2 inline">
            <a
              href="/feed.xml"
              class="border-b border-transparent hover:border-black transition-border-color"
            >RSS Feed</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>
