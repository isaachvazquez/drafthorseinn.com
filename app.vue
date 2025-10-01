<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>


<script setup>
	import { onMounted, watch } from 'vue';
	import { useAnnouncementBannerStore } from '@/stores/announcementBanner';
	import { useMobileMenuStore } from '@/stores/mobileMenu';
  const mobileMenu = useMobileMenuStore();
  const announcementBanner = useAnnouncementBannerStore();


	onMounted(() => {
		// Listen for mobileMenu.isActive changes
		watch(
			() => mobileMenu.isActive,
			(newVal) => {
				document.body.classList.toggle('menu-active', newVal)
			},
			{ immediate: true } // optional: applies the class on mount if true
		);
		
		// Listen for announcementBanner.isActive changes
		watch(
			() => announcementBanner.isActive,
			(newVal) => {
				document.body.classList.toggle('banner-active', newVal)
			},
			{ immediate: true } // optional: applies the class on mount if true
		);
	});

  // useHead({
  //   bodyAttrs: {
  //     class: 'site'
  //   }
  // })

	// useHead({
  //   bodyAttrs: {
  //     class: 'site'
  //   },
	// 	title: "The Draft Horse Inn | Hotel in Arcadia, Wisconsin",
	// 	meta: [
	// 		{
	// 			name: "description",
	// 			content: "Stay at The Draft Horse Inn in Arcadia, WI. Cozy rooms, suites, and modern amenities near hunting, fishing, golf & Memorial Park."
	// 		},
	// 		{
	// 			property: "og:title",
	// 			content: "The Draft Horse Inn | Hotel in Arcadia, Wisconsin"
	// 		},
	// 		{
	// 			property: "og:description",
	// 			content: "Comfortable lodging in Arcadia, WI near Memorial Park, golf, hunting, and fishing. Spacious suites and cozy rooms."
	// 		},
	// 		{
	// 			property: "og:image",
	// 			content: "https://drafthorseinn.com/images/hotel-front.jpg"
	// 		}
	// 	],
	// 	script: [
	// 		{
	// 			type: "application/ld+json",
	// 			innerHTML: JSON.stringify({
	// 				"@context": "https://schema.org",
	// 				"@type": "Hotel",
	// 				"name": "The Draft Horse Inn",
	// 				"image": "https://drafthorseinn.com/images/hotel-front.jpg",
	// 				"@id": "https://drafthorseinn.com",
	// 				"url": "https://drafthorseinn.com",
	// 				"telephone": "+1-608-323-7900",
	// 				"address": {
	// 					"@type": "PostalAddress",
	// 					"streetAddress": "1475 Blaschko Ave",
	// 					"addressLocality": "Arcadia",
	// 					"addressRegion": "WI",
	// 					"postalCode": "54612",
	// 					"addressCountry": "US"
	// 				},
	// 				"description": "The Draft Horse Inn in Arcadia, Wisconsin offers cozy rooms, village suites, and modern amenities near hunting, fishing, golf, and Arcadia's Memorial Park.",
	// 				"amenityFeature": [
	// 					{"@type": "LocationFeatureSpecification","name": "Free Wi-Fi","value": true},
	// 					{"@type": "LocationFeatureSpecification","name": "Handicap Accessible Rooms","value": true},
	// 					{"@type": "LocationFeatureSpecification","name": "Village Suites with Kitchens","value": true},
	// 					{"@type": "LocationFeatureSpecification","name": "ANOTHER_AMENITY","value": true},
	// 					{"@type": "LocationFeatureSpecification","name": "ANOTHER_AMENITY","value": true},
	// 					{"@type": "LocationFeatureSpecification","name": "ANOTHER_AMENITY","value": true},
	// 					{"@type": "LocationFeatureSpecification","name": "ANOTHER_AMENITY","value": true},
	// 					{"@type": "LocationFeatureSpecification","name": "ANOTHER_AMENITY","value": true},
	// 					{"@type": "LocationFeatureSpecification","name": "ANOTHER_AMENITY","value": true},
	// 				],
	// 				"geo": {
	// 					"@type": "GeoCoordinates",
	// 					"latitude": 44.243184,
	// 					"longitude": -91.475799
	// 				},
	// 			})
	// 		}
	// 	]
	// })
</script>