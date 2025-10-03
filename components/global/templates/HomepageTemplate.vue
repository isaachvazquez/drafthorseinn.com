<template>
	<!-- <div v-if="config.public.devMode == false" style="padding-top: 100px;">
		<h1 style="background: beige; text-align: center; padding: var(--spacing-sm);
    white-space: nowrap;
    text-align: center;
    font-size: clamp(var(--f1), 8vw, var(--f4)); margin: 0;">[ HOMEPAGE TEMPLATE ]</h1>
	</div> -->
	<main class="Homepage Page">
		<!-- <section class="full">
			<KeenSlider />
		</section> -->
		<section class="HomepageHero parallax" :style="`background-image: url('${homepage.bgImage.asset ? $urlFor(homepage.bgImage.asset).width(1500).height(1000).url() : ''}')`">
			<video
				v-if="homepage.bgVideo && homepage.bgVideo.url"
				:key="homepage.bgVideo.url"
				:src="homepage.bgVideo.url"
				muted
				autoplay
				loop
				playsinline
			/>

			<div class="HomepageHero-copyAndCTA">
				<div class="HomepageTagline">
					<SanityContent :blocks="homepage.tagline" :serializers="serializers" />
				</div>
				<div class="HomepageSubheadline mt-1">
					<SanityContent :blocks="homepage.subheadline" :serializers="serializers" />
				</div>
				
				<div class="HomepageCTAs mt-3" v-if="homepage.ctaButtons">
					<template v-for="(button, index) in homepage.ctaButtons" :key="`homepage-cta-button-${index}`">
						<template v-if="index == 0">
							<LinkComponent :link="button" className="Button" />
						</template>
						<template v-if="index != 0">
							<LinkComponent :link="button" className="Button Button--secondary" />
						</template>
					</template>
				</div>
			</div>

			<!-- <div class="HomepageHero-video">
				<div class="Button Button--video HomepageVideoButton" @click="modal.openModal({ id: 'video', hasPadding: true })">
					<svg class="play-button-icon">
						<use href="#play-button-icon"></use>
					</svg>
				</div>
			</div> -->

		</section>

		<!-- <section class="full" style="margin-top: 0;">
			<BannerSection class="mt-0"/>
		</section> -->

		
		<section class="HomepageContent" v-if="homepage.pageContent && homepage.pageContent.length > 0">
			<ContentBuilder :blocks="homepage.pageContent" />
		</section>


		<!-- <section class="full">
			<KeenSlider />
		</section> -->
		<!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7703.896255426905!2d-91.47587299999999!3d44.24294999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87f9232eaf7577ef%3A0xb436ab7a89af4501!2sDraft%20Horse%20Inn%20and%20Suites!5e1!3m2!1sen!2sus!4v1759242937043!5m2!1sen!2sus" style="display: flex; height: 35vh; margin: var(--spacing-lg) 0; width: 100%; border: 0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> -->

		<!-- <section class="full">
			<SubscribeFormSection />
		</section> -->



	</main>
</template>

<script setup>
	import { onMounted } from 'vue';
	import { buildUrl } from '~/utils/buildUrl';
	import { useModalStore } from '@/stores/modal';
	import ImageComponent from '@/components/ImageComponent.vue';
	import LinkComponent from '@/components/LinkComponent.vue';
	import HorizontalDividerComponent from '@/components/HorizontalDividerComponent.vue';
	
	const modal = useModalStore();

	const props = defineProps({
    homepage: {
      type: Object,
      required: true,
    },
    settings: {
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

	const parallaxSections = ref([]);


	function isInViewport(el) {
		const rect = el.getBoundingClientRect();
		return rect.bottom > 0 && rect.top < window.innerHeight;
	}

	function handleParallax() {
		// Turn Parallax OFF for mobile
		if (window.innerWidth <= 768) return;

		parallaxSections.value.forEach(section => {
			if (isInViewport(section)) {
				const speed = 0.5;
				const offset = window.scrollY - section.offsetTop;
				section.style.backgroundPositionY = offset * speed + "px";
			}
		});
	}

	onMounted(() => {
		parallaxSections.value = document.querySelectorAll('.parallax');
		window.addEventListener('scroll', handleParallax);
		window.addEventListener('resize', handleParallax);
		handleParallax(); // initial call
	});
</script>

<style lang="scss" scoped>
	.Homepage {
		// padding-top: calc(2 * var(--spacing-xl));
		padding-top: 0;
		container: homepage / inline-size;
		// background-image: url('/golf-morning.jpg');
		// background-position: top;
		// background-size: auto;
		// background-repeat: no-repeat;
	}

	.HomepageHero {
		position: relative;
		display: grid;
		// grid-template-columns: minmax(50ch, auto) 1fr;
		// grid-template-columns: auto 1fr;
		grid-template-columns: 1fr;
		gap: var(--spacing-lg);
		align-items: center;
		// display: flex;
		
		// align-items: center;
		// justify-content: center;

		// align-items: flex-start;

		// padding: 0 var(--site-wrapper-spacing);
		padding-top: var(--spacing-xl);

		min-height: 80vh;
		// min-height: 75vh;

		// max-width: none;

		// background-image: url('https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUybzhza2pnemx3ZmdveW1vMnZuMjZ5N3hvcnhwMG9pN3A4ZGlzbHRpeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUA7b4arnbo3THfzi0/source.gif');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;


		// This is so the image starts at the top then
		// scrolls through the center as you scroll past it
		&.parallax {
			background-position: top;
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.3);
		}

		video {
			position: absolute;
			top: 0;
			left: 0;
			/* top: 50%; */
			/* left: 50%; */
			/* transform: translate(-50%, -50%); */
			width: 100%;
			height: 100%;
			object-fit: cover;
			/* border-radius: 16px;*/
		}

		@media(max-width: 800px) {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);

			.HomepageHero-copyAndCTA {
				// order: 2;
				// order: 2;
				justify-content: flex-start;
			}
			
			.HomepageHero-video {
				// order: 1;
				justify-content: flex-end;
			}
		}
	}

	.HomepageHero-copyAndCTA {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		align-items: center;
		justify-content: center;
	}

	.HomepageCTAs {
		display: flex;
		gap: var(--spacing-sm);

		.Button {
			width: max-content;
		}

		@media(max-width: 640px) {
			display: grid;
			grid-template-columns: 1fr;

			:deep() {
				.Button {
					min-width: 140px;
					// max-width: max-content;
	
					span {
						text-align: center;
						flex: 1;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}

			}
		}
	}
	
	.HomepageHero-video {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// background-color: beige;

		.HomepageVideoButton {
			// position: absolute;
			// top: 50%;
			// right: 25%;
			// transform: translate(-50%, -50%);
			transition: transform 0.3s ease;

			svg {
				color: var(--site-ui-text-inverted);
				transform: translate(2px, 1px);
				// transform: translate(2px, 1px) scale(1);
				// transition: transform 0.3s ease;
			}

			&:hover {
				// background: blue;
				transform: scale(1.2);

				svg {
					// color: blue;
					// transform: translate(2px, 1px) scale(1.5);
					// transform-origin: center;
				}
			}
		}
	}

	.HomepageContent {
		container: homepage-content / inline-size;
		margin: 0 auto;
		padding-bottom: var(--spacing-lg);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: var(--max-width-md);
		max-width: var(--max-width-lg);
		max-width: var(--max-width-xl);

		// background-image: url('/bg-topo.jpg');
		// background-position: top;
		// background-size: auto;
		// background-repeat: no-repeat;

		> :first-child { margin-top: 0; }
		> :last-child  { margin-bottom: 0; }

		:deep() {
			.FaqList {
				width: 100%;
			}
		}
	}

	.HomepageTagline {
		// Using * since it's a rich text editor, and using <SanityContent /> to render
		// So that it accounts for all html (ex: p, span, etc)
		* {

			font-family: 'Italiana';
			font-family: 'Italiana';
			font-size: 60px;
			// font-size: var(--f8);
			// letter-spacing: -0.04em;
			// letter-spacing: -0.0em;
			// text-transform: uppercase;
			text-align: center;
			// word-spacing: -0.5ch;
			line-height: 1.4;

			color: var(--site-ui-text);
			color: var(--site-ui-text-inverted);
			max-width: var(--max-width-sm);
			font-weight: var(--fw8);
			font-size: clamp(var(--f7), 8vw, var(--f10));
			// font-size: clamp(var(--f6), 8vw, var(--f12));
			// max-width: var(--max-width-md);
			// max-width: var(--max-width-lg);
		}

		// The :deep() is only needed because you're rendering inside the <SanityContent /> Component
		:deep(p) {
			color: var(--site-ui-border);
			color: var(--site-ui-text-light);
			color: var(--site-ui-text-inverted);
			margin: 0;
			line-height: 1;
			// letter-spacing: -0.04em;
			text-transform: none;
			font-weight: var(--fw6);
			// font-weight: var(--fw5);

			@media(max-width: 640px) {
				// font-size: var(--f6);
			}
		}

		:deep(strong) {
			color: var(--site-ui-text);
			color: var(--site-ui-text-inverted);
			font-weight: var(--fw8);

			// FOR THE SOLID BACKGROUND
			// background-color: var(--primary-color);
			// color: var(--site-ui-text-inverted);
			// padding: 4px 8px;

			@media(max-width: 640px) {
				// font-size: var(--f6);
			}
		}
		

	}
	
	.HomepageSubheadline {
		// Using * since it's a rich text editor, and using <SanityContent /> to render
		// So that it accounts for all html (ex: p, span, etc)
		* {
			margin: 0;
			font-family: 'Inter';
			font-size: var(--f4);
			font-weight: var(--fw5);
			text-align: center;
			// letter-spacing: -0.04em;
			// word-spacing: -0.5ch;
			// line-height: 1.4;
			color: var(--site-ui-text);
			color: var(--site-ui-text-inverted);
			max-width: var(--max-width-sm);
		}

		:deep(p) {
			line-height: 1.4;
		}

		// The :deep() is only needed because you're rendering inside the <SanityContent /> Component
		// :deep(strong) {
		// 	color: var(--primary-color);
		// 	font-weight: var(--fw5);
		// }

		// :deep(p) {
		// 	margin: 0;
		// 	line-height: 1;
		// }
	}


	.cube {
    display: flex;
    margin: 0 auto;
		width: 25vw;
    height: 25vw;
		cursor: pointer;
		transition: transform 0.3s ease;


		&:hover {
			// color: blue;
			// stroke: beige;
			transform: scale(1.1);
			
		}

		path, rect {
			transition: fill 0.3s ease;
		}

		path {
			&:hover {
				fill: var(--primary-color);
			}
			
		}
		rect {
			// fill: #efe;
			
			&:hover {
				fill: var(--primary-color);
			}
		}
	}
</style>