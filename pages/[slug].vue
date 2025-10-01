<template>
	<!-- DYNAMICALLY RENDER A TEMPLATE HERE BASED ON THE page.collectionType AND page.template. -->
	<component v-if="document && document.template" :is="resolveComponent(`Templates${document.template}`)" :document="document"></component>

</template>


<script setup>
  import { settingsQuery, pageQuery, collectionQuery } from "~/sanity/queries";

	const { data: settings } = await useSanityQuery(settingsQuery);

	const slug = useRoute().params.slug;
	const { data: collection } = await useSanityQuery(collectionQuery, { slug });
	let documentType;
	let document;

	if (collection.value && collection.value.slug == slug) {
		// console.log('FOUND A COLLECTION');
		documentType = "collection";
		document = collection.value;
		console.log({document});
	} else {
		// console.log('NO COLLECTION FOUND, LOOKING FOR A PAGE');
		const { data: page } = await useSanityQuery(pageQuery, { slug });

		// Handle 404's
		if (!page.value) navigateTo('/404');

		if (page) {
			documentType = "page";
			document = page.value;
		}
	}

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
</script>

<style lang="scss" scoped>
	.Page {
		h1 {
			font-size: clamp(var(--f6), 8vw, var(--f10));
		}
	}
</style>