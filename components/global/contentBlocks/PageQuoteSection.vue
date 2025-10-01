<template>
  <section class="QuoteSection full">
		<div ref="quoteSectionSliderRef" class="QuoteSection-slider keen-slider" :class="{created: sliderCreated, dragging: isDragging, single: slides.length == 1, hasBgImage: block.bgImage }" :style="`background-image: url('${block.bgImage ? $urlFor(block.bgImage).width(1500).url() : ''}')`">
			<template v-if="block.bgImage">
				<div class="Slide Slide1" v-for="(slide, index) in slides" :key="`${block._id}-slide-${index}`">
					<div class="QuoteSection-content">
						<h2 class="QuoteSection-copy">{{slide.quote}}</h2>
						<p class="QuoteSection-subCopy">{{slide.attribution}}</p>

						<LinkComponent :link="slide.cta" className="Button mt-2" />
					</div>
				</div>
			</template>
			<template v-else>
				<div class="Slide Slide1" v-for="(slide, index) in slides" :key="`${block._id}-slide-${index}`" :style="`background-image: url('${slide.image ? $urlFor(slide.image).width(1500).url() : ''}')`">
					<div class="QuoteSection-content">
						<h2 class="QuoteSection-copy">{{slide.quote}}</h2>
						<p class="QuoteSection-subCopy">{{slide.attribution}}</p>

						<LinkComponent :link="slide.cta" className="Button mt-2" />
					</div>
				</div>
			</template>
		</div>

		<div class="QuoteSection-sliderButtons" v-if="slides.length > 1">
			<button class="Button Button--textOnly mr-1" @click="prev()">&larr;</button>
			<button class="Button Button--textOnly" @click="next()">&rarr;</button>
		</div>
	</section>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import KeenSlider from 'keen-slider';
	import 'keen-slider/keen-slider.min.css';

  const props = defineProps({
    block: {
      type: Object,
      required: true,
    },
  });


	const isDragging = ref(false);
	const sliderCreated = ref(false);
	const quoteSectionSliderRef = ref(null);
	let sliderInstance = null;
	const slides = ref([]);

	slides.value = props.block.slides;

	// Functions
	const prev = () => {
		sliderInstance.prev();
	}

	const next = () => {
		console.log({sliderInstance});
		sliderInstance.next();
	}

	onMounted(() => {
		sliderInstance = new KeenSlider(quoteSectionSliderRef.value, {
			mode: "snap",
			selector: '.Slide',
			loop: true, // Infinite loop
			slides: {
				origin: "center", // Centers the slides if you're viewing more than 1 slide in frame at a time (via perView)
				perView: 1, // How many slides are visible per view (default is 1)
				spacing: 0, // Spacing (in px) between each slide (default is 0)
			},

			// Event Handlers
			created() { sliderCreated.value = true; console.log('slider created')},
			destroyed() { sliderCreated.value = false; console.log('slider destroyed')},
			slideChanged() { console.log('slide changed')},
			animationStarted() { console.log('animationStarted')},
			animationStopped() { console.log('animationStopped')},
			animationEnded() { console.log('animationEnded')},
			dragged() { console.log('dragged')},
			dragStarted() { isDragging.value = true; console.log('dragStarted')},
			dragChecked() { console.log('dragChecked')},
			dragEnded() { isDragging.value = false; console.log('dragEnded')},
		});
	});
</script>

<style lang="scss" scoped>
	.QuoteSection {
		position: relative;
		width: 100vw;
    margin-left: -50vw;
    margin-right: -50vw;


		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		// min-height: 300px;
		
		// &::before {
		// 	content: '';
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 100%;
		// 	height: 100%;
		// 	background-color: rgba(0,0,0,0.5);
		// }

		&-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			position: relative;
			z-index: 1;
			margin: 0 auto;
			max-width: var(--max-width-md);
		}

		&-copy {
			margin: 0;
			text-align: center;
			// font-size: var(--f6);
			font-size: clamp(var(--f3), 8vw, var(--f10));
			font-size: clamp(var(--f3), 8vw, var(--f6));
			font-weight: var(--fw6);
			text-transform: initial;
			color: var(--site-ui-text-inverted);
		}

		&-subCopy {
			margin: 0;
			margin-top: var(--spacing-sm);
			text-align: center;
			font-style: italic;
			font-size: var(--f4);
			// font-size: var(--f3);
			color: var(--site-ui-text-inverted);
		}

		@container quote-section (max-width: 800px) {
      &-copy {
				font-size: var(--f4);
			}
      
			&-subCopy {
				font-size: var(--f2);
			}
		}

		@container quote-section (max-width: 600px) {
      &-copy {
				max-width: 32ch;
				font-size: var(--f3);
			}
      
			&-subCopy {
				font-size: var(--f2);
			}
		}
	}

	.QuoteSection-slider {
		object-fit: cover;
		height: 100%;
		width: 100%;
		min-height: 300px;
		min-height: 50vh;

		opacity: 0;

		// This sort of hides the jerkiness of the load/setup
		&.created { opacity: 1; }

		&.hasBgImage {
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;

			// .Slide {
			// 	background-image: none !important;
			// }
		}

		&.dragging {
			.Slide { cursor: grabbing; }
		}

		&.single {
			.Slide {
				user-select: text;
				cursor: auto;
			}
		}

		.Slide {
			cursor: grab;
		}
	}

	.Slide {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-xl) var(--site-wrapper-spacing);
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,0.3);
		}
	}

	.QuoteSection-sliderButtons {
		position: absolute;
		bottom: var(--spacing-xs);
		left: 50%;
		transform: translate(-50%, 0);

		button {
			font-family: Italiana;
			font-size: var(--f6);
			font-weight: var(--fw3);
			color: var(--site-ui-text-inverted);
		}
	}
</style>