<template>
	<TemplatesHomepageTemplate :homepage="homepage" :settings="settings"  />
</template>


<script setup>
	import { 
		settingsQuery,
		homepageQuery
	} from "~/sanity/queries";

	const { data: homepage } = await useSanityQuery(homepageQuery);
	const { data: settings } = await useSanityQuery(settingsQuery);

	const pageTitle = homepage?.value?.seoPageTitle || homepage?.value?.title || settings.value.siteTitle;
	const pageDescription = homepage?.value?.seoPageDescription || settings.value.siteDescription;
	const shareTitle = homepage?.value?.seoShareTitle || homepage?.value?.seoPageTitle || homepage?.value?.title || settings.value.siteTitle;
	const shareDescription = homepage?.value?.seoShareDescription || homepage?.value?.seoPageDescription || settings.value.siteDescription;
	const ogImage = homepage?.value?.seoImage || settings.value.ogImage || '/og-image.png';
	const favicon = settings.value.favicon || '/favicon.png';
	const businessSchema = settings.value.businessSchema;

	console.log({ogImage});
	console.log({favicon});

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
	
</style>