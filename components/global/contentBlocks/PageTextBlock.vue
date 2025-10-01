<template>
	<!-- Text Block -->
	<!-- <h1>HELLO</h1> -->

	<!-- {{block}} -->
	<div class="PageTextBlock">
		<SanityContent :blocks="block.textBlock" :serializers="serializers" />
	</div>
</template>

<script setup>
	import ImageComponent from '@/components/ImageComponent.vue';
  import LinkComponent from '@/components/LinkComponent.vue';
  import HorizontalDividerComponent from '@/components/HorizontalDividerComponent.vue';

  const props = defineProps({
    block: {
      type: Object,
      required: true,
    },
  });

	const serializers = {
		types: {
			image: ImageComponent,
			divider: HorizontalDividerComponent
		},
    marks: {
      link: LinkComponent,
      underline: "u",
      code: "code",
      "strike-through": "s",
    },
  }
</script>

<style lang="scss" scoped>
  .PageTextBlock {
		max-width: var(--max-width-md);
		max-width: var(--max-width-sm);


		// :deep() {
		// 	h1, h2, h3, h4, h5, h6 {
		// 		margin-top: 0;
		// 		margin-bottom: var(--spacing-sm);
		// 		line-height: 1.2;
		// 	}

		// 	h1 { font-size: clamp(var(--f5), 8vw, var(--f9)); }
		// 	h2 { font-size: clamp(var(--f5), 8vw, var(--f8)); }
		// 	h3 { font-size: clamp(var(--f4), 8vw, var(--f7)); }
		// 	h4 { font-size: clamp(var(--f4), 8vw, var(--f6)); }
		// 	h5 { font-size: clamp(var(--f3), 8vw, var(--f5)); }
		// 	h6 { font-size: clamp(var(--f3), 8vw, var(--f4)); }
		// }
    
		a,
		a:not([class]),
		a[class=""],
		a[class] {
			text-decoration: underline !important;
			color: tomato;

			&:hover {
				text-decoration: none;
			}
		}
  }
</style>