<template>
  <main v-if="document" class="Page SinglePage">
		<section class="SinglePage-banner" :style="`background-image: url('${document.coverImage ? $urlFor(document.coverImage).width(1500).height(500).url() : '/default-collection-landing-bg.jpg'}')`">
			<!-- <h1 v-if="document.title">{{ document.title }}</h1> -->
			<h1 v-if="document.heading">{{ document.heading }}</h1>
			<h1 v-else>{{ document.title }}</h1>
			<!-- <p>{{ document.subheading }}</p> -->
		</section>
		<section class="SinglePageContent full">
			<ContentBuilder :blocks="document.pageContent" v-if="document.pageContent && document.pageContent.length > 0" />
		</section>
  </main>
</template>

<script setup>
	const props = defineProps({
    document: {
      type: Object,
      required: true,
    },
  });

</script>

<style lang="scss" scoped>
	.SinglePage {
		padding-top: 0;
	}

	.SinglePage-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--site-wrapper-spacing);
		min-height: 35vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.3);
		}

		h1 {
			position: relative;
			z-index: 1;
			color: #fff;
		}
	}

	.SinglePageContent {
		container: page-content / inline-size;
		margin: 0 auto;
		padding-bottom: var(--spacing-lg);
		// --------------------------------------
		// FYI: You need all of this to make the 
		// "break-out" QuoteSection Styles work
		// --------------------------------------
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;

		// width: var(--max-width-md);
		// max-width: 100%;
		// --------------------------------------

		h1 {
			width: 100%;
			max-width: var(--max-width-sm);
			text-align: left;
		}

		// > * {
		// 	max-width: var(--max-width-sm);
		// }

		// @media(max-width: 800px) {
		// 	> * {
		// 		padding-left: var(--site-wrapper-spacing);
		// 		padding-right: var(--site-wrapper-spacing);
		// 	}
		// }
	}
</style>