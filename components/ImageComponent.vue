<template>
  <figure v-if="asset?._ref">
    <img :src="$urlFor(asset).url()" :alt="alt || ''" loading="lazy" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup>
	const props = defineProps({
		asset: { 
			type: Object,
			required: true
		},
		alt: {
			type: String,
			required: true
		},
		caption: { 
			type: String,
			required: true
		},
	});
</script>

<style lang="scss" scoped>
	figure {
		margin: 0;
		padding: 0;

		img {
			width: 100%;
			object-fit: cover;
		}
	}

	figcaption {
		margin-top: var(--spacing-xs);
		text-align: center;
		font-size: var(--f1);
		font-style: italic;
	}
</style>