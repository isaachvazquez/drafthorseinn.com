<template>
	<div class="AnnouncementBanner" v-if="announcementBannerContent.active">
		<!-- 
		// announcementBannerContent.active
		// announcementBannerContent.content
		// announcementBannerContent.cta
		-->
		<SanityContent :blocks="announcementBannerContent.content" :serializers="serializers" />
		<button class="Button Button--small ml-2" @click.stop="announcementBanner.closeBanner(announcementBannerContent._rev)">dismiss</button>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue';
	import { announcementBannerQuery } from "~/sanity/queries";
	import { useAnnouncementBannerStore } from '@/stores/announcementBanner';
	import LinkComponent from '@/components/LinkComponent.vue';
	import HorizontalDividerComponent from '@/components/HorizontalDividerComponent.vue';
	
	const announcementBanner = useAnnouncementBannerStore();
	const { data: announcementBannerContent } = await useSanityQuery(announcementBannerQuery);

	const serializers = {
		types: {
			divider: HorizontalDividerComponent
		},
    marks: {
			link: LinkComponent,
      underline: "u",
      code: "code",
      "strike-through": "s",
    },
  }





	

	onMounted(() => {
		// DISMISSAL FUNCTIONALITY
		const dismissedRev = localStorage.getItem('announcementRev');

		if (announcementBannerContent.value && announcementBannerContent.value._rev !== dismissedRev) {
			announcementBanner.openBanner();
		}
	});


</script>

<style lang="scss">
	.banner-active {

		.AnnouncementBanner {
			transform: translateY(0);
		}
	}

	.AnnouncementBanner {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 7;

		transform: translateY(-100%);

		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: var(--site-wrapper-spacing);
		padding-right: var(--site-wrapper-spacing);

		width: 100%;
		height: var(--announcement-banner-height);
		// background: #d39726;
		background: var(--announcement-banner-bg);
		color: #fff;


		transition: transform 0.3s ease;

		p {
			margin: 0;
			color: #fff;
			font-size: var(--f1);
		}
	}
</style>