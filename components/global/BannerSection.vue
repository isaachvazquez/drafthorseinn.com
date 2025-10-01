<template>
	<div class="BannerSection">
		<div class="BannerSection-item">Item Uno</div>
		<div class="BannerSection-item">Item Dos</div>
		<div class="BannerSection-item">Super Long ASK Item Three</div>
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.BannerSection {
		display: flex;
		align-items: center;
		justify-content: center;
		justify-content: space-around;

		// margin: var(--spacing-xl) 0;
		margin: 0;
		padding: var(--spacing-xl) var(--site-wrapper-spacing);
		// background-color: var(--site-ui-bg-inverted);
		background-color: var(--primary-color);
		color: #fff;
		
		@media(max-width: 800px) {
			flex-direction: column;
		}
	}

	.BannerSection-item {
		line-height: 1.2;
		// margin-left: var(--spacing-xl);
		font-size: var(--f5);

		&:first-child {
			margin-left: 0;
		}

		@media(max-width: 800px) {
			margin-left: 0;
			margin-bottom: var(--spacing-md);

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>