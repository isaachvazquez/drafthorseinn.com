<template>
  <div ref="marqueeSliderRef" class="MarqueeSlider keen-slider" :class="{created: sliderCreated, dragging: isDragging}">
    <div class="MarqueeSlide" v-for="(slide, i) in slides" :key="i">
      {{ slide }}
    </div>

		<button class="MarqueeSlider-button UnstyledIconButton" @click="isRunning = !isRunning">
			<svg v-if="isRunning" class="pause-icon" style="width: 24px; height: 24px;">
				<use href="#pause-icon"></use>
			</svg>
			
			<svg v-else class="play-icon" style="width: 24px; height: 24px;">
				<use href="#play-icon"></use>
			</svg>
		</button>
  </div>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import KeenSlider from 'keen-slider';
	import 'keen-slider/keen-slider.min.css';


	const isRunning = ref(true);
	const isDragging = ref(false);
	const sliderCreated = ref(false);
	const marqueeSliderRef = ref(null);
	let sliderInstance = null;
	// const slides = ref(['Design', 'User Experience', 'Websites', 'Content', 'SEO']);
	const slides = ref(['Social Proof1', 'Social Proof2', 'Social Proof3', 'Social Proof4']);


	// Functions
	const prev = () => {
		sliderInstance.prev();
	}

	const next = () => {
		console.log({sliderInstance});
		sliderInstance.next();
	}
	
	const goToIndex = (index) => {
		sliderInstance.moveToIdx(3);
	}
	

	onMounted(() => {
		sliderInstance = new KeenSlider(marqueeSliderRef.value, {
			loop: true,
			mode: 'free',
			selector: '.MarqueeSlide',
			slides: {
				perView: 3,
			},
			defaultAnimation: {
				duration: 6000,
				// duration: 8000,
				easing: (t) => t,
			},

			// Event Handlers
			created(slider) {
				console.log('marquee slider created')
				sliderCreated.value = true;
				slider.next();
				isRunning.value = true;
			},
			destroyed() { sliderCreated.value = false; /*console.log('slider destroyed')*/ },
			// slideChanged() { console.log('slide changed')},
			// animationStarted() { console.log('animationStarted')},
			// animationStopped() { console.log('animationStopped')},
			animationEnded(slider) { 
				// console.log('animationEnded');
				if(isRunning.value) {
					slider.next();
					isRunning.value = true;
				}
			},
			detailsChanged(slider) { 
				// console.log('details changed');
				slider.next();
				isRunning.value = true;
			},
			// dragged() { console.log('dragged')},
			dragStarted() { isDragging.value = true; /*console.log('dragStarted')*/ },
			// dragChecked() { console.log('dragChecked') },
			dragEnded() { isDragging.value = false; /*console.log('dragEnded')*/ },
		});
	});
</script>

<style lang="scss" scoped>
	.MarqueeSlider {
		opacity: 0;
		transition: opacity 0.3s ease;

		// PLAYING AROUND: USE this for a cool Homepage Hero Design Approach
		// NOTE: This caused a horizontal overflow
		// transform: skew(15deg) rotate(-6deg) scale(1.5);
		// PLAYING AROUND

		// This sort of hides the jerkiness of the load/setup
		&.created { opacity: 1; }

		&.isDragging .MarqueeSlide {
			cursor: grabbing;
		}
	}

	.MarqueeSlide {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: var(--f10);
		font-size: var(--f7);
		height: 200px;
		background: transform;
		cursor: grab;
	}

	.MarqueeSlider-button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.MarqueeSlider:hover .MarqueeSlider-button {
		opacity: 1;
	}
</style>
