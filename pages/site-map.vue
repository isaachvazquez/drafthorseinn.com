<template>
  <main class="Page SiteMap">
		<section class="SinglePage-banner" :style="`background-image: url('/default-collection-landing-bg.jpg')`">
			<h1>Site Map</h1>
		</section>
		<section class="PageContent">
			<!-- <hr> -->
			<ul>
				<li v-for="page in pages" :key="page._id" class="">
					<NuxtLink :to="buildUrl(page)">
					<b class="flex m-0">{{ page.title }}</b>
					<i class="flex m-0" style="font-size: var(--f1);">{{ buildUrl(page) }}</i>
					</NuxtLink>
				</li>
			</ul>
		</section>
  </main>
</template>

<script setup>
	import { buildUrl } from '~/utils/buildUrl';
  import { pagesQuery } from "~/sanity/queries";

  const { data: pages } = await useSanityQuery(pagesQuery);
	// TODO: Get all COLLECTION landing pages as well
	// BONUS: Re-order by collection so, each collection 
	// landing will come first followed by all of it's children
</script>

<style lang="scss" scoped>
	.SiteMap {
		padding-top: 0;
	}

	.SinglePage-banner {
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


</style>