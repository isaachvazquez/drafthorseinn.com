<template>
	<figure class="PageImage" v-if="block.image">
		<img :src="$urlFor(block.image).width(1000).height(1000).url()" :class="[block.type]" />
		<figcaption v-if="block.caption">{{block.caption}}</figcaption>
	</figure>
</template>

<script setup>
  const props = defineProps({
    block: {
      type: Object,
      required: true,
    },
  });
</script>

<style lang="scss" scoped>
  .PageImage {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: var(--spacing-lg) auto;
  }
</style>