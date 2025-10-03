<template>
  <main class="Page SiteMap">
		<section class="SinglePage-banner" :style="`background-image: url('/default-collection-landing-bg.jpg')`">
			<h1>Site Map</h1>
		</section>
		<section class="PageContent SiteMap-content">
			<h2>All Pages</h2>
			<ul>
				<li>
					<a href="/">
						<div class="flex align-center flex--nowrap">
							<b class="flex m-0 mr-1">Homepage</b>
							<!-- <i class="flex m-0" style="font-size: var(--f1);">(/)</i> -->
						</div>
					</a>
				</li>
				<li v-for="item in allPages" :key="item._id">
					<template v-if="item.pages">
						<NuxtLink :to="buildUrl(item)">
							<div class="flex align-center flex--nowrap">
								<b class="flex m-0 mr-1">{{ item.title }}</b>
								<!-- <i class="flex m-0" style="font-size: var(--f1);">({{ buildUrl(item) }})</i> -->
							</div>
						</NuxtLink>
						<ul>
							<li v-for="page in item.pages" :key="page._id">
								<NuxtLink :to="buildUrl(page)">
									<div class="flex align-center flex--nowrap">
										<b class="flex m-0 mr-1">{{ page.title }}</b>
										<!-- <i class="flex m-0" style="font-size: var(--f1);">({{ buildUrl(page) }})</i> -->
									</div>
								</NuxtLink>
							</li>
						</ul>
					</template>
					<template v-else>
						<NuxtLink :to="buildUrl(item)">
							<div class="flex align-center flex--nowrap">
								<b class="flex m-0 mr-1">{{ item.title }}</b>
								<!-- <i class="flex m-0" style="font-size: var(--f1);">({{ buildUrl(item) }})</i> -->
							</div>
						</NuxtLink>
					</template>
				</li>
			</ul>
			
		</section>
  </main>
</template>

<script setup>
	import { buildUrl } from '~/utils/buildUrl';
  import { pagesQuery, collectionsQuery } from "~/sanity/queries";

  const { data: pages } = await useSanityQuery(pagesQuery);
  const { data: collections } = await useSanityQuery(collectionsQuery);

	const allPages = computed(() => {
		// Map collections with nested pages
		const mappedCollections = collections.value.map(collection => ({
			...collection,
			pages: pages.value.filter(p => p.collectionType && p.collectionType.slug === collection.slug).sort((a, b) => a.title.localeCompare(b.title))
		}));

		// Get standalone pages (not part of any collection)
		const standalonePages = pages.value.filter(p => !p.collectionType).sort((a, b) => a.title.localeCompare(b.title))

		return [...standalonePages, ...mappedCollections]
	});
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
		background-color: #000;

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


	.SiteMap-content {
		align-items: flex-start;
		max-width: var(--max-width-sm);
	}


</style>