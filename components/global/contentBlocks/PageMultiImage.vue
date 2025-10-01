<template>
	<template v-if="block.displayType == 'grid'">
		<div class="PageMultiImage -grid" :style="{'--image-grid-columns': block.columns}">
			<template v-for="item in block.images" :key="item._id">
				<div class="PageMultiImage-item" :style="`background-image: url('${item.image ? $urlFor(item.image).width(800).height(800).url() : ''}')`">
					<!-- {{item.link}} -->
					<template v-if="item.link && (item.link.internalLink || item.link.externalUrl || item.link.phone || item.link.email)">
						<!-- LINK -->
						<LinkComponent :link="item.link" useSlot="true" className="PageMultiImage-content">
							<span class="mb-1">{{item.title || 'Untitled'}}</span>
							<p>{{item.description}}</p>
						</LinkComponent>
					</template>
					<template v-else>
						<div class="PageMultiImage-content">
							<span class="mb-1">{{item.title || 'Untitled'}}</span>
							<p>{{item.description}}</p>
						</div>
					</template>
				</div>
			</template>
		</div>
	</template>


	<template v-if="block.displayType == 'slider'">
		<!-- NOTE: You need to keep '.keen-slider' for the plugin to identify the slider html element. Maybe figure out how to remove later -->
		<div ref="sliderRef" class="Slider keen-slider -slider" :class="{created: sliderCreated, dragging: isDragging}" :style="{'--image-aspect-ratio': getAspectRatio(block.imageAspectRatio)}">
			<div class="Slide PageMultiImage-item" v-for="slide in slides" :key="`slider-slide-${slide.id}`" :style="`background-image: url('${slide.image ? $urlFor(slide.image).width(800).height(800).url() : ''}')`">
				<h3>{{slide.label}}</h3>
				<p>{{slide.text}}</p>
			</div>
		</div>


		<!-- Buttons -->
		<div class="Slider-content" v-if="slides.length > 0">
			<p :class="{fadeIn: nextSlideIsVisible}">{{slides[currentSlideIndex].text}}</p>
		</div>


		<div class="slider-buttons mb-5">
			<button class="Button Button--smallish Button--textOnly" @click="prev()">&larr;</button>
			<button class="Button Button--smallish Button--textOnly" @click="next()">&rarr;</button>
			<!-- <button class="Button Button--smallish Button--secondary ml-auto" @click="goToIndex(4)">Go to Index</button> -->
		</div>
	</template>
</template>

<script setup>
	import { ref, onMounted, nextTick } from 'vue';
	import KeenSlider from 'keen-slider';
	import 'keen-slider/keen-slider.min.css';


	// Define Props here so you can pass in a "slides" array to loop over and render as well as options for the slider
  const props = defineProps({
    block: {
      type: Object,
      required: true,
    },
  });

	const isDragging = ref(false);
	const sliderCreated = ref(false);
	const sliderRef = ref(null);
	let sliderInstance = null;
	const currentSlideIndex = ref(0);
	const nextSlideIsVisible = ref(true);
	const slides = ref([]);


	// Functions
	const prev = () => {
		// nextSlideIsVisible.value = false;
		sliderInstance.prev();
	}

	const next = () => {
		// nextSlideIsVisible.value = false;
		console.log({sliderInstance});
		sliderInstance.next();
	}
	
	const goToIndex = (index) => {
		sliderInstance.moveToIdx(index);
	}

	const getAspectRatio = (aspectRatioId) => {
		switch (aspectRatioId) {
			case 'square':
				return '1 / 1';
			case 'landscape':
				return '2 / 1';
			case 'landscape-tall':
				return '4 / 3';
			case 'portrait':
				return '1 / 2';
			case 'auto':
				return 'auto';
			default:
				return '1 / 1'; // or some default value
		}
	}



	onMounted(async () => {
		if(props.block.displayType == 'grid') {

		}

		if(props.block.displayType == 'slider') {
			props.block.images.forEach((slide, index) => {
				console.log({slide});
				slides.value.push({
					// ...slide,
					id: `slide-${index}`,
					label: slide.title,
					text: slide.description,
					image: slide.image
				});
			});

			// Wait for DOM
    	await nextTick();

			console.log(sliderRef.value);

			sliderInstance = new KeenSlider(sliderRef.value, {
				// Keen Slider Documenation: https://keen-slider.io/docs
				// Options:
				mode: "snap", 
				selector: '.Slide',
				// container: '', // The HTML element, that is defined as the container/viewport for the slides.
				loop: true, // Infinite loop
				slides: {
					origin: 'center', // Centers the slides if you're viewing more than 1 slide in frame at a time (via perView)
					perView: 2, // How many slides are visible per view (default is 1)
					spacing: 8, // Spacing (in px) between each slide (default is 0)
				},
	
				// 
				breakpoints: {
					'(max-width: 640px)': {
						// loop: false,
						slides: {
							origin: 'center',
							perView: 1,
							spacing: 8
						}
					},
				},
	
				// Event Handlers
				created() { sliderCreated.value = true; },
				destroyed() { sliderCreated.value = false; },
				animationStarted() { nextSlideIsVisible.value = false; },
				slideChanged(slider) { currentSlideIndex.value = slider.track.details.rel; },
				animationStopped() { console.log('animationStopped')},
				animationEnded() { nextSlideIsVisible.value = true; },
				dragged() { nextSlideIsVisible.value = false; },
				dragStarted() { isDragging.value = true; },
				dragChecked() { },
				dragEnded() { isDragging.value = false; },
			})
		}

	});
	
</script>

<style lang="scss" scoped>
  .PageMultiImage {
		--image-grid-columns: 3;

		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
		margin: var(--spacing-lg) auto;


		&.-grid {
			display: grid;
			grid-template-columns: repeat(var(--image-grid-columns), 1fr);
			grid-gap: var(--spacing-sm);
			max-width: var(--max-width-md);

			@media(max-width: 800px) {
				grid-template-columns: repeat(2, 1fr);
			}
			
			@media(max-width: 480px) {
				grid-template-columns: 1fr;

			}

			img {
				max-width: 100%;
			}

			.PageMultiImage-item {
				--image-aspect-ratio: 1 / 1;
				position: relative;
				display: flex;
				background-color: beige;
				// background-color: salmon;

				aspect-ratio: var(--image-aspect-ratio);

				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;
				border-radius: var(--site-ui-border-radius-md);

				// transition: background-size 0.3s ease;

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					z-index: 1;
					width: 100%;
					height: 100%;
					background-color: rgba(0,0,0,0.5);
					border-radius: var(--site-ui-border-radius-md);
					transition: background-color 0.3s ease;
				}

				&:hover {
					// background-size: 150%;

					// > * {
					// 	opacity: 0;
					// }

					&::before {
						// background-color: transparent;
						background-color: rgba(0,0,0,0.2);
					}
				}

				// > * {
				// 	opacity: 1;
				// 	transition: opacity 0.3s ease;
				// }


				:deep() {
					.PageMultiImage-content {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						justify-content: flex-end;
						padding: var(--spacing-sm);
						padding: var(--spacing-md);
						width: 100%;
						height: 100%;
						// background: salmon;
						text-decoration: none;
					}
				}

				span {
					position: relative;
					font-size: var(--f4);
					font-weight: var(--fw6);
					font-family: var(--heading);
					text-align: center;
					line-height: 1;
					color: var(--site-ui-text-inverted);
				}

				p {
					position: relative;
					margin: 0;
					font-size: var(--f2);
					font-weight: var(--fw5);
					font-family: var(--sans);
					text-align: center;
					line-height: 1;
					color: var(--site-ui-text-inverted);
				}

				> * {
					z-index: 1;
				}
			}
		}
		
		&.-slider {
			background: salmon;
		}
  }

	.Slider {
		--image-aspect-ratio: 1 / 1;
		margin: 0 auto;
		margin-top: var(--spacing-lg);
		// max-width: var(--max-width-lg);
		opacity: 0;
		transition: opacity 0.3s 0.5s ease;

		// PLAYING AROUND: USE this for a cool Homepage Hero Design Approach
		// NOTE: This caused a horizontal overflow
		// transform: skew(15deg) rotate(-6deg) scale(1.5);
		// PLAYING AROUND

		// This sort of hides the jerkiness of the load/setup
		&.created { opacity: 1; }


		.Slide {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-end;


			// background: rgba(0,0,0,0.2);
			// background-color: #333;
			padding: var(--spacing-md);
			width: 100%;
			// height: 300px;
			max-height: 100vh;
			border-radius: 24px;
			cursor: grab;
			aspect-ratio: var(--image-aspect-ratio);

			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
			border-radius: var(--site-ui-border-radius-md);

			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
				width: 100%;
				height: 100%;
				background: rgba(0,0,0,0.3);
				border-radius: var(--site-ui-border-radius-md);
			}

			&:nth-child(even) {
				background-color: #333;
			}
			
			&:nth-child(odd) {
				// background-color: #f3f3f3;
			}

			> * {
				z-index: 1;
			}



			span {
				font-size: var(--f1);
				color: var(--site-ui-text-light);
			}

			img {
				max-width: 300px;
			}

			h3 {
				position: relative;
				left: -3px;
				margin: 0;
				font-size: 24px;
				font-size: 40px;
				font-weight: var(--fw5);
				line-height: 1;
				color: var(--site-ui-text-inverted);
				color: var(--site-ui-text-inverted);
			}

			p {
				margin: 0;
				font-size: var(--f2);
				color: var(--site-ui-text-inverted);
			}
		}
		
		&.dragging {
			.Slide { cursor: grabbing; }
		}
	}

	.Slider-content p {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;

		opacity: 0;

		&.fadeIn {
			opacity: 1;
			transition: opacity 0.5s ease;
		}
	}

	.slider-buttons {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 0 auto;
		max-width: var(--max-width-lg);
	}
</style>