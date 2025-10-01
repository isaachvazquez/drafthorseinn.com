<template>
	<main v-if="document" class="Page CollectionLandingPage">
		<section class="CollectionLandingPage-banner" :style="`background-image: url('${document.coverImage ? $urlFor(document.coverImage).width(1500).height(500).url() : '/default-collection-landing-bg.jpg'}')`">
		<!-- <section class="CollectionLandingPage-banner"> -->
			<!-- $urlFor(document.coverImage).height(100).width(300).url() -->
			<!-- <img v-if="document.coverImage" class="Cover-image" :src="$urlFor(document.coverImage).height(100).width(300).url()" /> -->

			<!-- <h1 v-if="document.title">{{ document.title }}</h1> -->
			<h1 v-if="document.heading">{{ document.heading }}</h1>
			<h1 v-else>{{ document.title }}</h1>
			<!-- <p>{{ document.subheading }}</p> -->
		</section>
		<!-- <h1 style="background: beige; text-align: center; padding: var(--spacing-sm);
    white-space: nowrap;
    text-align: center;
    font-size: clamp(var(--f1), 8vw, var(--f4)); margin: 0;">[ COLLECTION LANDING PAGE TEMPLATE ]</h1> -->
		<!-- Entries -->
		<!-- <section>
			<div class="Entries">
				<article class="Entry" v-for="page in document.pages" :key="page._id">
					<nuxt-link :to="buildUrl(page)">
						<h3>{{ page.title }}</h3>
						<div class="Author" v-if="page.author">
							<img v-if="page.author.profileImage" class="Author-image" :src="$urlFor(page.author.profileImage).width(50).height(50).url()" />
							<span>by {{page.author.firstName}} {{page.author.lastName}}</span>
						</div>
						<div>
							<time v-if="page.date" :dateTime="page.date">
								{{ $date(page.date).toRelative() }}
							</time>
						</div>
						<img v-if="page.coverImage" class="Cover-image" :src="$urlFor(page.coverImage).width(50).height(50).url()" />
						<p>{{ page.excerpt }}</p>
						<ContentBuilder :blocks="page.pageContent" v-if="page.pageContent && page.pageContent.length > 0" />
					</nuxt-link>
				</article>
			</div>
		</section> -->

		<!-- Collection Page Content -->
		<section class="CollectionLandingPageContent">
			<ContentBuilder :blocks="document.pageContent" v-if="document.pageContent && document.pageContent.length > 0" />
		</section>
  </main>
</template>

<script setup>
	import { buildUrl } from '~/utils/buildUrl';

	const props = defineProps({
    document: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
	.CollectionLandingPage {
		padding-top: 0;
	}

	.CollectionLandingPage-banner {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--site-wrapper-spacing);
		min-height: 35vh;
		// background-color: var(--site-ui-primary-color);
		// background-image: url('/default-collection-landing-bg.jpg');
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

	.CollectionLandingPageContent {
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
		max-width: var(--max-width-xl);
		// max-width: var(--max-width-md);
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
		// 	:deep() {
		// 		> * {
		// 			padding-left: var(--site-wrapper-spacing);
		// 			padding-right: var(--site-wrapper-spacing);
		// 		}

		// 	}
		// }
	}

	.Entries {
		display: grid;
		grid-template-columns: repeat(2, minmax(20ch, 1fr));
		grid-gap: var(--spacing-sm);
		padding: var(--sapcing-sm);
	}

	.Entry {
		padding: var(--spacing-xs);
		background-color: beige;
	}

	.Author {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: flex-start;
	}

	.Author-image {
		margin-right: var(--spacing-xs);
		border-radius: 100px;
		width: 32px;
		height: 32px;
		border: 2px solid var(--site-ui-border);
	}
</style>