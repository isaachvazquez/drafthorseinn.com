<template>
  <section :class="['BlockInfoSection']">
    <!-- Image -->
		<div class="BlockInfoSection-image" v-if="block.images">
      <div ref="infoSectionSliderRef" class="Slider keen-slider" :class="{created: sliderCreated, dragging: isDragging}">
        <div class="Slide Slide1" v-for="image in block.images" :key="image._key">
          <img :src="$urlFor(image).width(800).height(700).url()"/>
        </div>
      </div>
      <div class="BlockInfoSection-sliderButtons">
        <button class="Button Button--textOnly mr-1" @click="prev()">&larr;</button>
        <button class="Button Button--textOnly" @click="next()">&rarr;</button>
      </div>
    </div>

    <!-- Content -->
    <div class="BlockInfoSection-content">
      <h2 class="BlockInfoSection-heading">{{ block.heading }}</h2>
      <p class="BlockInfoSection-subheading" v-if="block.subheading">{{ block.subheading }}</p>
			<div class="BlockInfoSection-body">
				<SanityContent :blocks="block.content" :serializers="serializers" />
			</div>
    </div>
  </section>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
	import ImageComponent from '@/components/ImageComponent.vue';
	import LinkComponent from '@/components/LinkComponent';
	import KeenSlider from 'keen-slider';
	import 'keen-slider/keen-slider.min.css';

  const props = defineProps({
    block: {
      type: Object,
      required: true,
    },
  });

	const serializers = {
		types: {
			image: ImageComponent
		},
    marks: {
      link: LinkComponent,
      underline: "u",
      code: "code",
      "strike-through": "s",
    },
  }


	const isDragging = ref(false);
	const sliderCreated = ref(false);
	const infoSectionSliderRef = ref(null);
	let sliderInstance = null;

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
		sliderInstance = new KeenSlider(infoSectionSliderRef.value, {
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
		})
	});
</script>

<style lang="scss" scoped>
  .BlockInfoSection {
    display: grid;
    grid-template-columns: 1fr 30ch;
    // grid-gap: var(--spacing-sm);
    
    background-color: var(--site-ui-bg);
    border-radius: 16px;
		padding: 0;
    // padding: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);

    &-image {
      position: relative;
      border-radius: 16px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
      }
    }

    .Slider {
      object-fit: cover;
      height: 100%;
      width: 100%;

      opacity: 0;

      // This sort of hides the jerkiness of the load/setup
      &.created { opacity: 1; }

      &.dragging {
        .Slide { cursor: grabbing; }
      }

      .Slide {
        cursor: grab;
      }
    }

    &-sliderButtons {
			display: flex;
			align-items: center;
			justify-content: center;
      position: absolute;
      // bottom: var(--spacing-md);
			bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
			width: 100%;
			background: linear-gradient(to bottom, transparent, black);

			button,
			.Button {
				color: #fff;
			}
    }

    &-content {
      position: relative;
      flex: 1;
      background: #fff;
      padding: 2rem;
      border-radius: 16px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      // width: calc(100% + 100px);
      // transform: translate(-100px, 0);
      // height: 75%;
      // height: max-content;
    }

    &-heading {
      margin: 0;
      margin-bottom: var(--spacing-xs);
      font-size: 2rem;
      font-weight: var(--fw5);
      color: #1e1e1e;
      line-height: 1;
    }

    &-subheading {
      margin: 0;
      color: #b2542c;
      color: var(--primary-color);
      font-size: var(--f1);
      font-weight: var(--fw6);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      letter-spacing: 0.08em;
      line-height: 1;
    }

    &-body {
      margin-top: var(--spacing-sm);
      color: #333;
      line-height: 1.6;
      // margin-bottom: 1.5rem;
      font-size: var(--f3);
    }

    &.right {

      .BlockInfoSection-content {
        order: 1; /* Appears second to last visually */
        transform: translate(0, 0);
      }

      .BlockInfoSection-image {
        order: 2; /* Appears first visually */
      }
    }


    @container (max-width: 600px) {
      grid-template-columns: 1fr;

      &-image {
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
				aspect-ratio: 16 / 9;

        img {
          // height: 160px;
        }
      }
      
      &-content {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
      }
    }
  }
</style>