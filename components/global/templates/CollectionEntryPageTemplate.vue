<template>
	<!-- Collection Entry Page Template -->
	<main v-if="document" class="Page CollectionEntryPage">
		<!-- <h1 style="background: beige; text-align: center; padding: var(--spacing-sm);
    white-space: nowrap;
    text-align: center;
    font-size: clamp(var(--f1), 8vw, var(--f4)); margin: 0;">[ COLLECTION ENTRY PAGE TEMPLATE ]</h1> -->
		
		
		<section class="CollectionEntryPage-banner" :style="`background-image: url('${document.coverImage ? $urlFor(document.coverImage).width(1500).height(500).url() : '/default-collection-landing-bg.jpg'}')`">
			<!-- <img v-if="document.coverImage" class="Cover-image" :src="$urlFor(document.coverImage).width(100).height(100).url()" /> -->
			<!-- <h1 v-if="document.title">{{ document.title }}</h1> -->
			<h1 v-if="document.heading">{{ document.heading }}</h1>
			<h1 v-else>{{ document.title }}</h1>
			<!-- <p>{{ document.subheading }}</p> -->
		</section>

		<section class="EntryPageContent">
			<!-- <img v-if="document.coverImage" class="Cover-image" :src="$urlFor(document.coverImage).width(100).height(100).url()" />
			<h1 v-if="document.title">{{ document.title }}</h1> -->
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
	.CollectionEntryPage {
		padding-top: 0;
	}

	.CollectionEntryPage-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: calc(var(--header-height) + var(--spacing-lg)) var(--site-wrapper-spacing) var(--spacing-lg);
		min-height: 35vh;
		// background-color: var(--site-ui-primary-color);
		// background-image: url('/default-collection-landing-bg.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		background-color: #000; // Makes for a cleaner look while loading

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
			max-width: var(--max-width-md);
			text-align: center;
		}
	}


	.EntryPageContent {
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