// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", 
          integrity:"sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" ,crossorigin:""},
          {src: "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"},
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', integrity:"sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=", crossorigin:"" },
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css' }
      ],
    }
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt3-leaflet",
    "@nuxtjs/color-mode",
    '@formkit/nuxt'
  ],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true
  },
  colorMode: { classSuffix: "" },
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition:0,
    viewer: true
  },
  ssr: false,
  // publicRuntimeConfig: {
  //   	baseUrl: process.env.BASE_URL
  // },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },
  css: ["~/assets/css/main.css"],
});
