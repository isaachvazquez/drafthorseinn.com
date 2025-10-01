<template>
	<nav class="SiteNavigation" :class="{active: mobileMenu.isActive}" @click="mobileMenu.toggleMenu()">
		<ul class="SiteNavigation-list" v-if="navigation">
			<li class="SiteNavigation-listItem" :class="{active: activeNavItems.includes(`n-${index}`)}" @click.stop.prevent="handleParentNavItemClick(`n-${index}`)" v-for="(navItem, index) in navigation.filter(n => n.active)" :key="index">

				<LinkComponent :link="navItem" useSlot="true" :className="{'has-children' : navItem.children?.length && navItem.children?.some(c => c.active)}">
					<span v-if="navItem.linkType == 'internal'" :class="{'text-ellipsis': navItem.children?.length && navItem.children?.some(c => c.active)}">{{ navItem.overrideLabel || navItem.internalLink.title || 'Untitled' }}</span>
					<span v-if="navItem.linkType == 'external'" :class="{'text-ellipsis': navItem.children?.length && navItem.children?.some(c => c.active)}">{{ navItem.externalLabel || navItem.externalUrl }}</span>

					<button class="UnstyledIconButton" @click.stop.prevent="handleParentNavItemClick(`n-${index}`)" v-if="navItem.children?.length && navItem.children?.some(c => c.active)">
						<svg class="chevron-down-icon"><use href="#chevron-down-icon"></use></svg>
					</button>
				</LinkComponent>

				<div class="Expandable" :class="{active: activeNavItems.includes(`n-${index}`)}" v-if="navItem.children?.length && navItem.children?.some(c => c.active)">
					<ul class="SiteNavigation-sublist Expandable-content">
						<li class="SiteNavigation-sublistItem parent">
							<LinkComponent :link="navItem" />
						</li>

						<li class="SiteNavigation-sublistItem" v-for="child in navItem.children.filter(c => c.active)" :key="`nav-child-${child._key}`">
							<LinkComponent :link="child" />
						</li>
					</ul>
				</div>
			</li>
		</ul>

		<!-- <button class="SiteNavigation-cta Button Button--smallish" @click.stop="modal.openModal({ id: 'main-nav-cta', hasPadding: true })">Book Now!</button> -->
		<div class="SiteNavigation-actionButtons">
			<!-- <template v-for="(actionItem, index) in actionItems" :key="`actionItem-${index}`">
				<LinkComponent :link="actionItem" useSlot="true" className="SiteNavigation-cta Button Button--secondary Button--smallish">
					<svg v-if="actionItem.linkType == 'phone'" class="phone-icon mr-1" style="width: 14px; height: 14px;"><use href="#phone-icon"></use></svg>
					
					<span v-if="actionItem.linkType == 'internal'" :class="{'text-ellipsis': actionItem.children?.length && actionItem.children?.some(c => c.active)}">{{ actionItem.overrideLabel || actionItem.internalLink.title || 'Untitled' }}</span>
					<span v-if="actionItem.linkType == 'external' || actionItem.linkType == 'external'" :class="{'text-ellipsis': actionItem.children?.length && actionItem.children?.some(c => c.active)}">{{ actionItem.externalLabel || actionItem.externalUrl }}</span>
				</LinkComponent>
			</template> -->
			<a class="SiteNavigation-cta Button Button--secondary Button--smallish" href="tel:6083237900" @click.stop>
				<svg class="phone-icon mr-1" style="width: 14px; height: 14px;"><use href="#phone-icon"></use></svg>
				Call
			</a>
			<button class="SiteNavigation-cta Button Button--smallish" @click.stop="modal.openModal({ id: 'main-nav-cta', hasPadding: true })">Book Now</button>
		</div>
	</nav>
</template>

<script setup>
	import { buildUrl } from '~/utils/buildUrl';
	import { navigationQuery } from "~/sanity/queries";
	import { useMobileMenuStore } from '@/stores/mobileMenu';
	import { useModalStore } from '@/stores/modal';
	
	const mobileMenu = useMobileMenuStore();
	const modal = useModalStore();

  
  const { data: navData, pending, error } = await useSanityQuery(navigationQuery);
  console.log({navData});
  const navigation = computed(() => navData.value?.items || []);
  const actionItems = computed(() => navData.value?.actionItems || []);
  console.log({navigation});

	const openAll = ref(false);
	const activeNavItems = ref([]);

	// -------
  // Methods
  // -------
	const handleParentNavItemClick = (navID) => {
		if(activeNavItems.value.includes(navID)) {
			activeNavItems.value = activeNavItems.value.filter(n => n != navID);
		} else {
			activeNavItems.value.push(navID);
		}
	}
</script>

<style lang="scss">
	.banner-active .SiteNavigation.active {
		height: calc(100vh - var(--announcement-banner-height));
	}

	.SiteNavigation {
		display: flex;
		align-items: center;
		justify-content: space-between;

		&-actionButtons {
			display: flex;
			align-items: center;


			margin-left: var(--spacing-sm);

			@media(max-width: 800px) {
				flex-direction: column;
				justify-content: center;
				// margin-top: var(--spacing-md);
				// margin-left: auto;

				margin-top: auto;
				margin-left: auto;
				margin-right: auto;
			}
		}

		&-cta {
			margin-left: var(--spacing-sm);

			&:first-child {
				margin-left: 0;
			}

			@media(max-width: 800px) {
				margin-top: var(--spacing-sm);

				margin-left: 0;
				margin-right: 0;
			}
		}
		
		
		@media(max-width: 960px) {
			.SiteNavigation-list {

				.SiteNavigation-listItem {

					a { padding: var(--spacing-xs); }
				}
			}
		}


		// Mobile Styles
		@media(max-width: 800px) {
			flex-direction: column;
			align-items: flex-start;
			// align-items: center;
			// text-align: center;
			justify-content: flex-start;
			padding: var(--site-wrapper-spacing);
			padding-top: calc(var(--site-wrapper-spacing) + var(--spacing-xl));
			position: fixed;
			width: 100%;
			height: 100vh;
			overflow: auto;
			// background-image: linear-gradient(to bottom, black, transparent);
			background-image: linear-gradient(to bottom, black 8%, rgba(0,0,0,0.8) 40%, transparent 100%);
			background-image: linear-gradient(to bottom, black 8%, rgba(0,0,0,0.2) 100%);
			left: 0;
			top: 0;
			z-index: -1;
			transform: translate(0, -100%); // The transform is just so it doesn't flickr when scaling down to mobile
			visibility: hidden;
			opacity: 0;
			transition: visibility 0s 0.3s, opacity 0.3s ease;

			> * {
				transition: transform 0.3s ease, opacity 0.3s ease;
			}


			&.active {
				transform: translate(0, 0); // The transform is just so it doesn't flickr when scaling down to mobile
				visibility: visible;
				opacity: 1;
				transition-delay: 0s;
			}

			.SiteNavigation-list {
				flex-direction: column;
				// display: grid;
				// grid-template-columns: repeat(2, 1fr);
				// grid-gap: var(--spacing-sm);
				margin: 0;
				padding: 0;
				width: 100%;
				// height: 100%;
				max-height: calc(100% - var(--spacing-xl));
				overflow: auto;

				.SiteNavigation-listItem {
					margin-bottom: var(--spacing-md);
					margin-bottom: var(--spacing-sm);
					padding: 0;
					font-size: var(--f5);
					font-size: var(--f4);

					&.active {
						a {
							svg {
								transform: rotate(180deg);
							}
						}
					}

					> a { 
						// display: none;
						color: var(--site-ui-text-inverted);
						justify-content: space-between;
						padding: 0;

						&.has-children {
							pointer-events: none; // Disable on Mobile since you have the ".parent" listItem displaying on mobile
						}
					}
				}
			}
		}
	}

	.SiteNavigation-list {
		display: flex;
		margin: 0;
		list-style: none;

		.SiteNavigation-listItem {
			// display: flex;
			// align-items: center;
			position: relative;
			line-height: 1;
			cursor: pointer;

			&:first-child { 
				// a { padding-left: 0; }

				// .SiteNavigation-sublist { left: 0; }
			}

			&:last-child { 
				// background: tomato;
				// a { padding-right: 0; }

				.SiteNavigation-sublist { left: auto; right: 0; }
			}

			&:hover {
				.Expandable {
					opacity: 1;
					visibility: visible;
					transform: translate(0, var(--spacing-xs));
					transform: translate(0, 0);
					transition-delay: 0s;
				}
				// .SiteNavigation-sublist {
				// 	opacity: 1;
				// 	visibility: visible;
				// 	transform: translate(0, var(--spacing-xs));
				// 	transition-delay: 0s;
				// }
			}

			a {
				display: flex;
				align-items: center;
				padding: var(--spacing-sm);
				line-height: 1.2;
				text-decoration: none;
				color: var(--site-ui-text);
				color: var(--site-ui-text-inverted);
				// transition: background-color 0.3s ease, color 0.3s ease;
				border-radius: var(--site-ui-border-radius-md);

				&:hover {
					text-decoration: none;
					// color: var(--site-ui-text-inverted);
					// background-color: var(--site-ui-bg-inverted);
				}

				&.router-link-active {
					// font-weight: var(--fw6);
					// background-color: var(--site-ui-border);
					// color: var(--site-ui-text);

					@media(max-width: 800px) {
						// background-color: transparent;
						color: var(--site-ui-text-inverted);
					}
				}
			}

			span {
				display: block;
				@media(max-width: 800px) {
					padding-right: 50px; // buffer for the ellipsis content
				}
			}

			.UnstyledIconButton {
				position: relative;
				margin-left: var(--spacing-xs);

				@media(max-width: 800px) {
					width: 44px;
					height: 44px;

					&::before {
						content: '';
						position: absolute;
						top: 0;
						right: 100%;
						display: flex;
						width: 50px;
						height: 100%;
						// background-color: blue;
						// opacity: 0.5;
					}
				}


				svg {
					display: flex;
					transition: transform 0.3s ease;
					cursor: pointer;
					color: var(--site-ui-text-inverted);
					// border: 2px dashed;
				}
			}

			.Expandable {
				opacity: 0;
				transform: translate(0, 8px);
				visibility: hidden;

				transition: grid-template-rows 0.2s, visibility 0s 0.3s, transform 0.3s ease, opacity 0.3s ease;

				@media (max-width: 800px) {
					transform: translate(0, 0) !important;
					visibility: visible;
					opacity: 1;
				}
			}

			.SiteNavigation-sublist {
				display: flex;
				flex-direction: column;

				position: absolute;
				// bottom: calc(var(--spacing-xs) * -1);
				top: 100%;
				left: var(--spacing-sm); // This should be the same as the padding on the .SN-listItem
				left: 0;
				// right: var(--spacing-sm); // This should be the same as the padding on the .SN-listItem
				// transform: translate(0, calc(var(--spacing-xs) + 8px));
				margin: 0;
				padding: var(--spacing-sm) var(--spacing-md);

				list-style: none;
				border-radius: var(--site-ui-border-radius-md);
				background-color: var(--site-ui-bg-light);
				// background-color: var(--site-ui-bg-inverted);
				box-shadow: var(--site-ui-shadow-2xl);
				width: max-content;
				
				// opacity: 0;
				// visibility: hidden;

				// transition: visibility 0s 0.3s, transform 0.3s ease, opacity 0.3s ease;

				&::before {
					content: '';
					display: flex;
					position: absolute;
					top: 0;
					left: 0;
					transform: translateY(-100%);
					width: 100%;
					height: var(--spacing-xs);
					// background: beige;
				}

				// Mobile Sublist Styles
				@media (max-width: 800px) {
					position: relative;
					top: 0;
					left: 0;
					padding: var(--spacing-xs);
					padding: 0;

					transform: translate(0, 0) !important;
					visibility: visible;
					opacity: 1;

					// FOR EXPANDABLE FUNCTIONALITY
					overflow: hidden;
					// FOR EXPANDABLE FUNCTIONALITY

					background-color: transparent;
					box-shadow: none;

					a { 
						// color: var(--site-ui-text-inverted) !important;
						color: var(--site-ui-text-inverted);
						font-size: var(--f2);
						font-size: var(--f3);
					}

					.SiteNavigation-sublistItem {
						margin-left: var(--spacing-sm);
					}
				}

				.SiteNavigation-sublistItem {
					// color: tomato;
					line-height: 1;

					a {
						position: relative;
						padding-left: 0;
						padding-right: 0;
						width: max-content;
						color: var(--site-ui-text);

						@media(max-width: 800px) {
							color: var(--site-ui-text-inverted);
						}

						span {
							z-index: 1;
						}

						&::before {
							content: '';
							display: flex;
							position: absolute;
							top: 100%;
							left: 0;
							transform: translate(0, -4px);
							transform: translate(0, calc((-1 * var(--spacing-sm)) + 4px));
							width: 0;
							z-index: 0;
							height: 2px;
							background-color: var(--site-ui-text);
							border-radius: 100px;
							// background-color: var(--site-ui-text-light);
							// background-color: var(--site-ui-border);
							transition: width 0.2s ease;

							@media(max-width: 960px) {
								// background-color: var(--site-ui-text-inverted);
								// background-color: var(--site-ui-border);
								transform: translate(0, calc((-1 * var(--spacing-xs)) + 4px));
							}

							@media(max-width: 800px) {
								// background-color: var(--site-ui-text-inverted);
								// background-color: var(--site-ui-border);
								// transform: translate(0, calc((-1 * var(--spacing-xs)) + 4px));
							}
						}

						// color: var(--site-ui-text-inverted);
						// padding: var(--spacing-xs);
						&:hover {
							// background: rgba(0,0,0,0.5);
							// color: var(--site-ui-text-inverted);
							// z-index: 1;
							// color: tomato;

							&::before {
								width: 100%;
							}
						}
					}

					&.parent {
						display: none;

						@media(max-width: 800px) {
							display: flex;
							font-weight: bold;

						}
					}
				}
			}

		}
	}
</style>