<template>
	<!-- NOTE: You need to keep '.keen-slider' for the plugin to identify the slider html element. Maybe figure out how to remove later -->
  <div ref="sliderRef" class="Slider keen-slider" :class="{created: sliderCreated, dragging: isDragging}">
    <div class="Slide" v-for="(slide, index) in slides" :key="`slider-slide-${slide.id}`" :style="`background-image: url('${slide.imageUrl}')`">
			<span style="font-size: 8px;">{{index + 1}}</span>
			<h3>{{slide.label}}</h3>
			<p>{{slide.text}}</p>
			<!-- <p>Here is some text inside the slide</p> -->
		</div>
    <!-- <div class="Slide Slide2">
			<button style="position: relative; z-index: 9;" @click.stop.prevent="console.log('Heyyyy Gurrrrllllll')">Do Me!!</button>
		</div>
    <div class="Slide Slide3">3</div>
    <div class="Slide Slide4">4</div>
    <div class="Slide Slide5">5</div>
    <div class="Slide Slide6">6</div> -->
  </div>


	<!-- Buttons -->
	<!-- <div class="Slider-content">
		<p :class="{fadeIn: nextSlideIsVisible}">{{slides[currentSlideIndex].text}}</p>
	</div> -->
	<div class="slider-buttons">
		<button class="Button Button--smallish Button--textOnly" @click="prev()">&larr;</button>
		<button class="Button Button--smallish Button--textOnly" @click="next()">&rarr;</button>
		<button class="Button Button--smallish Button--secondary ml-auto" @click="goToIndex(4)">Go to Index</button>
	</div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import KeenSlider from 'keen-slider';
	import 'keen-slider/keen-slider.min.css';


	// Define Props here so you can pass in a "slides" array to loop over and render as well as options for the slider

	const isDragging = ref(false);
	const sliderCreated = ref(false);
	const sliderRef = ref(null);
	let sliderInstance = null;
	const currentSlideIndex = ref(0);
	const nextSlideIsVisible = ref(true);
	
	const slides = ref([
		{
			id: 0,
			label: 'Slide 1',
			text: 'Slide 1 Text',
			imageUrl: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866',
		},
		{
			id: 1,
			label: 'Use proven Methods',
			text: 'Lead meetings, brainstorm new ideas, and plan your day with exclusive templates, workbooks, and planners from reMarkable Methods.',
			imageUrl: 'https://images.unsplash.com/photo-1637750586228-179a1a7aef84',
		},
		{
			id: 2,
			label: 'Never lose your notes',
			text: 'Access work from wherever you are, keep it all up to date, and get unlimited cloud storage with a Connect subscription. Try it free for 100 days.',
			imageUrl: 'https://plus.unsplash.com/premium_photo-1667339685757-f4bc7e642a2c',
		},
		{
			id: 3,
			label: 'Slide 4',
			text: 'Slide 4 Text',
			imageUrl: 'https://images.unsplash.com/photo-1527049979667-990f1d0d8e7f',
		},
		{
			id: 4,
			label: 'Slide 5',
			text: 'Slide 5 Text',
			imageUrl: 'https://images.unsplash.com/photo-1637775297509-19767f6fc225',
		},
	])


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


	onMounted(() => {
		sliderInstance = new KeenSlider(sliderRef.value, {
			// Keen Slider Documenation: https://keen-slider.io/docs
			// Options:
			mode: "snap", 
			selector: '.Slide',
			// container: '', // The HTML element, that is defined as the container/viewport for the slides.
			loop: true, // Infinite loop
			slides: {
				origin: "center", // Centers the slides if you're viewing more than 1 slide in frame at a time (via perView)
				perView: 2, // How many slides are visible per view (default is 1)
				spacing: 8, // Spacing (in px) between each slide (default is 0)
			},

			// 
			breakpoints: {
				'(max-width: 640px)': {
					// loop: false,
					slides: {
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
	});
</script>

<style lang="scss" scoped>
	.Slider {
		margin: 0 auto;
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
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-end;


			background: rgba(0,0,0,0.2);
			background-color: #333;
			padding: var(--spacing-md);
			width: 100%;
			height: 300px;
			max-height: 100vh;
			border-radius: 24px;
			cursor: grab;

			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;

			&:nth-child(even) {
				background-color: #333;
			}
			
			&:nth-child(odd) {
				// background-color: #f3f3f3;
			}

			span {
				font-size: var(--f1);
				color: var(--site-ui-text-light);
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
