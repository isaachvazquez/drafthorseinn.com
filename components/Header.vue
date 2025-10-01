<template>
  <header class="Header" :class="{'menu-active': mobileMenu.isActive}">
    <NuxtLink to="/" class="HeaderLogo">
      <SiteLogo />
    </NuxtLink>

    <Navigation />

		<button class="MenuButton UnstyledIconButton" :class="{active: mobileMenu.isActive}" @click.stop="mobileMenu.toggleMenu()"></button>
  </header>
</template>


<script setup>
  import { settingsQuery } from "~/sanity/queries";
	import { useMobileMenuStore } from '@/stores/mobileMenu';

  const mobileMenu = useMobileMenuStore();
  const { data: settings } = await useSanityQuery(settingsQuery);
</script>


<style lang="scss" scoped>
	.page-scrolled .Header {
		background-color: var(--site-ui-bg);
		box-shadow: 0 2px 16px rgba(0,0,0,0.1);

		:deep() {

			a, svg {
				color: var(--site-ui-text);
			}

			@media(max-width: 800px) {
				a, svg {
					color: var(--site-ui-text-inverted);
				}

				.logo,
				.MenuButton,
				.Button--secondary,
				.Button--secondary svg {
					color: var(--site-ui-text);
				}
			}
		}
	}
	
	.menu-active .Header {
		background-color: var(--site-ui-bg);
		box-shadow: 0 2px 16px rgba(0,0,0,0.1);

		:deep() {
			@media(max-width: 800px) {
				.logo,
				.MenuButton {
					color: #fff;
				}
			}
		}
	}
	
	// .top-o-the-page .Header {
	// 	background-color: transparent;

	// 	:deep() {

	// 		a, svg {
	// 			color: var(--site-ui-text) !important;
	// 		}
	// 	}
	// }

	.Header {
		position: fixed;
		z-index: 7;
		width: 100%;
		height: var(--header-height);
		// padding: var(--spacing-xs) var(--site-wrapper-spacing);
		padding-left: var(--site-wrapper-spacing);
		padding-right: var(--site-wrapper-spacing);
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: transparent;
		transform: translateY(0);
		transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

		&.menu-active {
			.HeaderLogo {
				@media(max-width: 800px) {
					color: var(--site-ui-text-inverted);
				}
			}
		}
	}

	.HeaderLogo {
		--site-logo-pre-scroll-color: #fff;
		z-index: 8;
		display: flex;
		line-height: 1;
		color: var(--site-ui-text);
		color: var(--site-logo-pre-scroll-color);
		transition: color 0.3s ease;
	}

	.MenuButton {
		display: none;
		position: relative;
		width: 40px;
		height: 40px;
		z-index: 8;
		color: #fff;


		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%) rotate(0);
			width: 28px;
			height: 2px;
			background-color: var(--site-ui-text);
			background-color: currentColor;
			border-radius: 100px;
			border-radius: 1px;
			transition: transform 0.2s ease, background-color 0.3s ease;
			transform-origin: center;
		}

		&::before {
			transform: translate(-50%, calc(-50% + 4px)) rotate(0);
			animation-name: lineTop;
			animation: rotateTopToZero 0.2s ease forwards, moveBackToTop 0.2s ease 0.2s forwards;
		}
		
		&::after {
			transform: translate(-50%, calc(-50% - 4px)) rotate(0);
			animation-name: lineBottom;
			animation: rotateBottomToZero 0.2s ease forwards, moveBackToBottom 0.2s ease 0.2s forwards;
		}

		@media(max-width: 800px) {
			display: inline-flex;
		}

		&.active {

			&::before,
			&::after {
				background-color: var(--site-ui-text-inverted);
			}

			&::before {
				animation: moveTopToCenter 0.2s ease forwards, rotateTop 0.2s ease 0.2s forwards;
			}

			&::after {
				animation: moveBottomToCenter 0.2s ease forwards, rotateBottom 0.2s ease 0.2s forwards;
			}
		}
	}


	@keyframes moveTopToCenter {
		0%   { transform: translate(-50%, calc(-50% + 4px)) rotate(0); }
		100% { transform: translate(-50%, -50%) rotate(0); }
	}

	@keyframes moveBottomToCenter {
		0%   { transform: translate(-50%, calc(-50% - 4px)) rotate(0); }
		100% { transform: translate(-50%, -50%) rotate(0); }
	}

	@keyframes rotateTop {
		from { transform: translate(-50%, -50%) rotate(0); }
		to   { transform: translate(-50%, -50%) rotate(45deg); }
	}

	@keyframes rotateBottom {
		from { transform: translate(-50%, -50%) rotate(0); }
		to   { transform: translate(-50%, -50%) rotate(-45deg); }
	}
	

	// Reverse Animations
	@keyframes moveBackToTop {
		from { transform: translate(-50%, -50%) rotate(0); }
		to   { transform: translate(-50%, calc(-50% + 4px)) rotate(0); }
	}

	@keyframes moveBackToBottom {
		from { transform: translate(-50%, -50%) rotate(0); }
		to   { transform: translate(-50%, calc(-50% - 4px)) rotate(0); }
	}

	@keyframes rotateTopToZero {
		from   { transform: translate(-50%, -50%) rotate(45deg); }
		to { transform: translate(-50%, -50%) rotate(0); }
	}

	@keyframes rotateBottomToZero {
		from   { transform: translate(-50%, -50%) rotate(-45deg); }
		to { transform: translate(-50%, -50%) rotate(0); }
	}
</style>