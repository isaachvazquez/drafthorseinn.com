<template>
	<!-- <div style="padding-top: 200px;"></div> -->
	<!-- DYNAMICALLY RENDER A TEMPLATE HERE BASED ON THE page.collectionType AND page.template. -->
	<component v-if="document && document.template" :is="resolveComponent(`Templates${document.template}`)" :document="document"></component>
	<div v-else class="flex align-center justify-center" style="height: 200px; background: tomato; color: #333;">
		No Document Found matching "{{slugToQuery}}" ({{collectionSlug}})
	</div>
	<!-- {{slugToQuery}}
	{{collectionSlug}}
	{{document}} -->
	<!-- <div v-if="document.pageContent">
		{{document.pageContent}}
	</div> -->

  <!-- <main v-if="post" class="Page">
		<section>
			<h2>{{ post.title }}</h2>
			<div class="Author">
				<img class="Author-image" :src="$urlFor(post.author.profileImage).width(50).height(50).url()" />
				<span>by {{post.author.firstName}} {{post.author.lastName}}</span>
			</div>
			<img class="" :src="$urlFor(post.coverImage).width(1000).height(300).url()" />
			<SanityImage v-if="post.coverImage?.asset?._ref" :alt="post.coverImage?.alt || ''" :asset-id="post.coverImage.asset._ref" auto="" format />
			<ContentBuilder :blocks="post.postContent" v-if="post.postContent && post.postContent.length > 0" />
		</section>
  </main> -->
	<!-- <aside v-if="recentPosts"></aside> -->
</template>


<script setup>
	import { settingsQuery, collectionsQuery, pageQuery } from '~/sanity/queries'

	const { data: settings } = await useSanityQuery(settingsQuery);

	// Get respective collection/routes
	const routeSlug = useRoute().params.slug;
	const collectionSlug = useRoute().params.collection; // first part from the route
	const slugArray = Array.isArray(routeSlug) ? routeSlug : [routeSlug];

	// Fetch all collection slugs
	const { data: collectionsRef } = await useSanityQuery(collectionsQuery);
	const collectionSlugs = (collectionsRef.value || []).map(c => c.slug);

	// Determine which slug to query for the page
	let slugToQuery;
	let document;

	// This is a collection entry → use only the last segment of the route
	if (collectionSlug && collectionSlugs.includes(collectionSlug)) {
		slugToQuery = slugArray[slugArray.length - 1];
	
	// Normal page → use full route
	} else {
		slugToQuery = `/${collectionSlug}/${slugArray.join('/')}`;
	}

	// Fetch the page document
	const { data: page } = await useSanityQuery(pageQuery, { slug: slugToQuery });

	if (page) {
		document = page.value;
	}

	console.log({document});


	const pageTitle = document?.seoPageTitle || document?.title || settings.value.siteTitle;
	const pageDescription = document?.seoPageDescription || settings.value.siteDescription;
	const shareTitle = document?.seoShareTitle || document?.seoPageTitle || document?.title || settings.value.siteTitle;
	const shareDescription = document?.seoShareDescription || document?.seoPageDescription || settings.value.siteDescription;
	const ogImage = document?.seoImage || settings.value.ogImage || '/og-image.png';
	const favicon = settings.value.favicon || '/favicon.png';
	const businessSchema = settings.value.businessSchema;

  useSiteMetadata({
		pageTitle,
		pageDescription,
		shareTitle,
		shareDescription,
		ogImage,
		favicon,
		businessSchema,
  });


	// Handle 404's
	// if (!document.value) navigateTo('/404');

	console.log({document});


	// import { postQuery, somePostsQuery } from "~/sanity/queries";

  // const { data: post } = await useSanityQuery(postQuery, {
  //   slug: useRoute().params.slug,
  // });

  // const { data: recentPosts } = await useSanityQuery(
  //   somePostsQuery,
  //   {
  //     skip: useRoute().params.slug,
  //     limit: 2,
  //   }
  // );
</script>

<style lang="scss" scoped>
	.Page {
		h1 {
			font-size: clamp(var(--f6), 8vw, var(--f10));
		}
	}
</style>