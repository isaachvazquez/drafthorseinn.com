<template>
  <section :class="['BlockCTA', layoutClass, {'overlap background': block.style && block.style == 'overlapping'}]">
    <div class="BlockCTA-image" v-if="block.image">
      <img :src="$urlFor(block.image).width(1000).height(1000).url()" />
    </div>
    <div class="BlockCTA-content">
      <h2 class="BlockCTA-heading">{{ block.heading }}</h2>
      <p class="BlockCTA-subheading" v-if="block.subheading">{{ block.subheading }}</p>
			<div class="BlockCTA-body">
				<SanityContent :blocks="block.content" :serializers="serializers" />
			</div>

      <!-- <LinkComponent v-if="block.buttonText" :link="block.link" useSlot="true" className="Button BlockCTA-butto">HELLO{{ block.buttonText }}</LinkComponent> -->
      <LinkComponent :link="block.link" className="Button BlockCTA-butto" />
    </div>
  </section>
</template>

<script setup>
  import { computed } from 'vue';
	import ImageComponent from '@/components/ImageComponent.vue';
	import LinkComponent from '@/components/LinkComponent.vue';

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

  const layoutClass = computed(() => {
    if(!props.block.layout) return 'no-class';
    return props.block.layout;
  });
</script>

<style lang="scss" scoped>
  .BlockCTA {
		
		--block-bg-color: #fff;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    // grid-template-rows: repeat(8, auto);
    grid-template-rows: repeat(2, auto);
    grid-gap: var(--spacing-sm);
    
    // background-color: var(--site-ui-bg);
    background-color: transparent;
    border-radius: 16px;
    // padding: var(--spacing-sm);
		padding: 0;
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
		max-width: var(--max-width-xl);

		&.right {
      .BlockCTA-content { grid-column: 1 / 5; }
      .BlockCTA-image { grid-column: 5 / -1; }
    }

		&.overlap {
			.BlockCTA-image { grid-column: 1 / 6; }
			.BlockCTA-content { grid-column: 4 / -1; }

			&.right {
      	.BlockCTA-image { grid-column: 4 / -1; }
				.BlockCTA-content { grid-column: 1 / 6; }
			}
		}

		&.background {
			.BlockCTA-content {
				padding: var(--spacing-lg);
				background-color: var(--block-bg-color);
				// background-color: beige;
				border-radius: 16px;
      	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
			}
		}

		@media(max-width: 800px) {
			grid-template-columns: var(--spacing-xs) repeat(6, 1fr) var(--spacing-xs);
			grid-row-gap: var(--spacing-md);

			.BlockCTA-image, 
			.BlockCTA-content {
				grid-column: 1 / -1;
			}
			
			.BlockCTA-image {
				grid-row: 1;
				aspect-ratio: 2 / 1;

				img {
					transform: translateY(-20%);
				}
			}

			.BlockCTA-content {
				grid-row: 2;
				top: auto;
				transform: translate(0, 0);
				padding: var(--spacing-xs);
			}

			&.right {
				.BlockCTA-image, 
				.BlockCTA-content {
					grid-column: 1 / -1;
				}
			}

			&.overlap {
				.BlockCTA-image { grid-column: 1 / -1; }
				.BlockCTA-content { 
					grid-column: 1 / -1;
					left: 50%;
					width: calc(100% - (2 * var(--spacing-sm)));
					transform: translate(-50%, -100px);
					padding: var(--spacing-md);
					padding: var(--spacing-sm);
				}
			}
			
			&.background {

			}
		}

		@media(max-width: 480px) {
			.BlockCTA-image {
				aspect-ratio: 1 / 1;

				img {
					transform: translateY(0);
				}
			}

			.BlockCTA-heading {
				// font-weight: var(--fw6);
			}
		}

    &-image {
			grid-column: 1 / 5;
			grid-row: 1;
      border-radius: 16px;
      overflow: hidden;

      img {
        width: 100%;
        // height: calc(100% + 200px);
        // height: calc(100% + 200px);
        height: auto;
        border-radius: inherit;
      }
    }

    &-content {
			grid-column: 5 / -1;
			grid-row: 1;
			z-index: 1;
      position: relative;
      // top: 15%;
      // top: 50%;
      // flex: 1;
      // width: calc(100% + 100px);
      height: max-content;
      // transform: translate(-100px, -50%);
			top: 50%;
      transform: translate(0, -50%);

      // background: #fff;
      padding: 0 var(--spacing-lg);

			@media (max-width: 600px) {
				grid-column: 1 / -1;
				width: 100%;
				transform: translate(0, -50%);
			}
    }

    &-heading {
      margin: 0;
      margin-bottom: var(--spacing-xs);
      
      color: #1e1e1e;
			// font-size: clamp(var(--f4), 8vw, var(--f10));
			font-size: clamp(var(--f4), 8vw, var(--f9));
      font-weight: var(--fw5);
      line-height: 1;
    }

    &-subheading {
      margin: 0;
      color: #b2542c;
      // color: var(--primary-color);
      color: var(--site-ui-text-light);
      font-size: var(--f1);
      font-weight: var(--fw6);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      letter-spacing: 0.08em;
      line-height: 1;
    }


    &-body {
			margin-top: var(--spacing-md);
			margin-bottom: var(--spacing-md);
			color: #333;
			line-height: 1.6;
			font-size: var(--f3);
			// font-size: var(--f4);
    }
  }

</style>
