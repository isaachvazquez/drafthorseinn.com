<template>
	<div class="BeforeAndAfterSlider landscap" :class="{interacted: sliderValue != 50}">
		<!-- <img src="https://images.unsplash.com/photo-1580757468214-c73f7062a5cb" alt="" class="before">
		<img src="https://images.unsplash.com/photo-1566389437851-a35bddb62402" alt="" class="after" :style="{ clipPath: `inset(0 0 0 ${sliderValue}%)` }"> -->
		<img src="https://images.squarespace-cdn.com/content/v1/64b1764db21fab25b0bf924c/7a7c7dc7-dad7-477c-accf-f8861da99804/IMG_6562.jpeg?format=1500w" alt="" class="before">
		<img src="https://images.squarespace-cdn.com/content/v1/64b1764db21fab25b0bf924c/06f83339-a258-4b28-92f5-fc97a6ab1d69/IMG_6579.jpeg?format=1500w" alt="" class="after" :style="{ clipPath: `inset(0 0 0 ${sliderValue}%)` }">
		<input type="range" min="0" max="100" v-model="sliderValue">
		<button class="BeforeAndAfterSlider-button" :class="{active: sliderValue != 50}" @click="sliderValue = 50">Reset</button>
		<div class="BeforeAndAfterSlider-labels">

		</div>
	</div>
</template>

<script setup>
  import { ref } from 'vue';

  const sliderValue = ref(50); // Initial value
</script>

<style lang="scss" scoped>
	.BeforeAndAfterSlider {
		position: relative;
		// margin: 0 auto;
		width: 100%;
		// max-width: 600px;
		// max-height: 400px;
		max-height: 80vh;
		// aspect-ratio: w / h;
		aspect-ratio: 1 / 1;
		
		border-radius: var(--site-ui-border-radius-lg);
		background-color: beige;
		overflow: hidden;

		&.portrait {
			aspect-ratio: 3 / 4;
			max-height: 80vh;
		}
		
		&.landscape {
			aspect-ratio: 16 / 9;
			// max-width: 
		}

		&::before {
			content: 'Drag the image to see Before/After';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			z-index: 2;
			transform: translate(-50%, -50%);
			font-family: 'Italiana';
			font-size: var(--f3);
			color: var(--site-ui-text-inverted);
			background-color: rgba(0,0,0,0.3);
			pointer-events: none;

			opacity: 1;
			transition: opacity 0.5s ease;
		}

		&.interacted::before {
			opacity: 0;
		}
		
		// &::before {
		// 	content: 'Before';
		// 	position: absolute;
		// 	top: var(--spacing-sm);
		// 	left: var(--spacing-sm);
		// 	width: max-content;
		// 	padding: var(--spacing-xs);
		// 	// height: 100%;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	z-index: 2;
		// 	// transform: translate(-50%, -50%);
		// 	font-family: 'Italiana';
		// 	font-size: var(--f3);
		// 	color: var(--site-ui-text-inverted);
		// 	background-color: rgba(0,0,0,0.5);
		// 	pointer-events: none;

		// 	opacity: 1;
		// 	transition: opacity 0.5s ease;
		// }
		
		// &::after {
		// 	content: 'After';
		// 	position: absolute;
		// 	top: var(--spacing-sm);
		// 	right: var(--spacing-sm);
		// 	width: max-content;
		// 	padding: var(--spacing-xs);
		// 	// height: 100%;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	z-index: 2;
		// 	// transform: translate(-50%, -50%);
		// 	font-family: 'Italiana';
		// 	font-size: var(--f3);
		// 	color: var(--site-ui-text-inverted);
		// 	background-color: rgba(0,0,0,0.5);
		// 	pointer-events: none;

		// 	opacity: 1;
		// 	transition: opacity 0.5s ease;
		// }

		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			object-fit: cover;

			&.after { 
				clip-path: inset(0 50% 0 0);
				// Faster transition while user is interacting
				// to give "smoothness", but not feel "laggy"
				transition: clip-path 0s ease;
			}
		}

		// Only want to have this transition when user hits "reset",
		// but not while user is interacting
		&:not(.interacted) img.after {
			transition: clip-path 0.3s ease;
		}

		&-button {
			position: absolute;
			top: var(--spacing-xs);
			right: var(--spacing-xs);
			z-index: 3;

			display: flex;
			align-items: center;
			justify-content: center;

			padding: 8px;
			font-family: 'Italiana';
			font-size: var(--f2);
			line-height: 1;
			color: var(--site-ui-text-inverted);
			border: 0;
			background: none;
			background-color: rgba(0,0,0,0.3);
			border-radius: var(--site-ui-border-radius-lg);
			outline: none;
			opacity: 0;
			transition: opacity 0.5s ease;
			cursor: pointer;

			&.active {
				opacity: 1;
			}
		}
	}

	input[type="range"] {
		touch-action: none;
		-webkit-appearance: none; /* remove default style in Chrome/Safari */
		appearance: none;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		margin: 0;
		padding: 0;
		border: 0;
		border-radius: 0;
		width: 100%;
		height: 100%;
		background: transparent;
		opacity: 0;
		cursor: grab;
		
		&:active {
			accent-color: #4CAF50;
			cursor: grabbing;
		}
	}
</style>