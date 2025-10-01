<template>
	<!-- <section> -->
		<div class="FaqList">
			<!-- {{block}} -->
			<h2 class="FaqList-title" v-if="block.faq.title">{{block.faq.title}}</h2>

			<template v-if="block.faq.items">
				<template v-for="(item, index) in block.faq.items" :key="`list-item-${index}-${item._id}`">
					<!-- Button -->
					<div class="button ExpandableButton" @click="toggleExpandable(`${block.faq.title ? block.faq.title : block.faq._id}-faq-${index}`)" :class="{active: activeItems.includes(`${block.faq.title ? block.faq.title : block.faq._id}-faq-${index}`)}">
						<span>{{item.question}}</span>

						<svg class="chevron-down-icon">
							<use href="#chevron-down-icon"></use>
						</svg>
					</div>
					
					<!-- Expandable List -->
					<div class="Expandable -show-previe" :class="{active: activeItems.includes(`${block.faq.title ? block.faq.title : block.faq._id}-faq-${index}`)}">
						<div class="Expandable-content">
							<div class="Expandable-optionalContentWrapper" v-if="item.answer">
								<SanityContent :blocks="item.answer" :serializers="serializers" />
							</div>
						</div>
					</div>
				</template>
			</template>
		</div>
	<!-- </section> -->


</template>

<script setup>
	import { ref } from 'vue';
	import ImageComponent from '@/components/ImageComponent.vue';
	import LinkComponent from '@/components/LinkComponent.vue';

	const props = defineProps({
		block: {
			type: Object,
			required: true
		}
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
  };


	const activeItems = ref([]);

	const toggleExpandable = (itemID) => {
		if(activeItems.value.includes(itemID)) {
			const itemToRemoveIndex = activeItems.value.findIndex(i => i == itemID);
			activeItems.value.splice(itemToRemoveIndex, 1);
		} else {
			activeItems.value.push(itemID);
		}
	}
</script>

<style lang="scss" scoped>
	.FaqList {
		margin: var(--spacing-lg) auto;
		max-width: var(--max-width-sm);
		// max-width: var(--max-width-lg);
		// width: max-content;
		// background: #efe;

		&-title {
			text-align: center;
		}
	}

	.ExpandableButton {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-sm) 0;
		width: 100%;

		font-size: var(--f4);
		// background: var(--site-ui-border);
		// border-bottom: 1px solid var(--site-ui-border);
		// border-radius: var(--site-ui-border-radius-lg);
		// border-top-right-radius: var(--site-ui-border-radius-lg);
		// border-top-left-radius: var(--site-ui-border-radius-lg);
		cursor: pointer;

		&.active {
			// border-bottom-right-radius: 0;
			// border-bottom-left-radius: 0;
			// border: 0;

			svg {
				transform: rotate(180deg);
			}
		}

		span {
			padding-right: var(--spacing-md);
		}

		svg {
			transform: rotate(0);
			transition: transform 0.3s ease;
			color: var(--site-ui-text);
		}
	}

	.Expandable {
		// background-color: var(--site-ui-border);
		// margin-bottom: var(--spacing-sm);
		border-bottom: 1px solid var(--site-ui-border);
		// border-radius: var(--site-ui-border-radius-lg);
		// border-bottom-right-radius: var(--site-ui-border-radius-lg);
		// border-bottom-left-radius: var(--site-ui-border-radius-lg);

		&:last-child {
			border-bottom: 0;
		}

		&-content :first-child {
			margin-top: 0;
			// background: tomato;
		}

		&-optionalContentWrapper {
			padding: 0 var(--spacing-xs);

			// Because you're using SanityContent
			:deep() {
				a {
					text-decoration: underline;
				}
			}
		}

		// &-content > * {
		// 	padding: 0 var(--spacing-xs);
		// }

		&.active {
			// border-top-right-radius: 0;
			// border-top-left-radius: 0;
			// border-bottom: 1px solid var(--site-ui-border);
		}
	}
</style>