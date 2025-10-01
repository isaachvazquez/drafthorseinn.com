// nuxt.config.js
export default {
  compatibilityDate: "2024-11-01",
  ssr: true,
  nitro: { preset: 'netlify' },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
	// Turning Typescript BS off
	typescript: {
		shim: false,   // don’t inject shims
		strict: false, // don’t force type checking
		typeCheck: false // fully disable type checking
	},
  css: ["~/assets/css/main.scss"],
  routeRules: process.env.NUXT_DEPLOY_MODE == 'SSG'
    ? { '/**': { prerender: true } } // prerender all pages for SSG
    : { '/**': { prerender: false } }, // disable prerender, so SSR for all pages
  // modules: ["@nuxtjs/sanity", "@nuxt/fonts", 'nuxt-keen-slider', '@pinia/nuxt'],
  modules: ["@nuxtjs/sanity", "@nuxt/fonts", '@pinia/nuxt'],
  plugins: ['~/plugins/sanity-image-builder.js'],
  sanity: {
    projectId: process.env.NUXT_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_SANITY_DATASET,
    useCdn: process.env.NUXT_SANITY_FETCH_PUBLISHED_CONTENT || true, // Set to 'false' for draft mode, and 'true' for published content
    apiVersion: process.env.NUXT_SANITY_API_VERSION || "2025-04-01",
    token: process.env.NUXT_SANITY_API_READ_TOKEN, // Only needed for private datasets
    // perspective: 'previewDrafts',
    visualEditing: process.env.NUXT_DEPLOY_MODE == 'SSG' ? 
      {
        token: process.env.NUXT_SANITY_API_READ_TOKEN,
        studioUrl: process.env.NUXT_SANITY_STUDIO_URL,
        zIndex: 777,
      } : false,
  },
	runtimeConfig: {
		public: {
			devMode: process.env.NUXT_DEV_MODE || false
		}
	}
}
