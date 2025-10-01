<template>

	<AnnouncementBanner />

	<!-- Header -->
  <Header />

	<!-- Content -->
  <!-- <main class="layout-inner" :class="{'menu-active' : mobileMenu.isActive}"> -->
    <slot />
  <!-- </main> -->

  <Footer />

	<!-- MODAL -->
  <Modal />

	<!-- VectorIcons -->
  <VectorIcons />
</template>


<script setup>
	import { onMounted } from 'vue';
	import { useMobileMenuStore } from '@/stores/mobileMenu';
  const mobileMenu = useMobileMenuStore();
	// const config = useRuntimeConfig();

	// // because it’s prefixed with NUXT_PUBLIC_, it lives under config.public
	// const devMode = config.public.devMode; // cast to boolean if needed

	// console.log('Dev Mode?', devMode);

	const body = ref(null);


	function setScrollClasses() {
		const scrollPosition = getScrollPosition();

		body.value.dataset.scroll = scrollPosition;

		if (scrollPosition == 0) {
			body.value.classList.add('top-o-the-page');
			body.value.classList.remove('page-scrolled');
		} else
		if (scrollPosition > 0) {
			body.value.classList.add('page-scrolled');
			body.value.classList.remove('top-o-the-page');
		}
	}

	/**
	* @method getScrollPosition
	* Description: Return current scroll position
	* Reference: http://www.dyn-web.com/javascript/scroll-distance/
	*
	* @return {Number} y - current scroll position
	*/
	function getScrollPosition() {
		var doc = document,
				w = window;
		var x, y, docEl;

		if (typeof w.pageYOffset === 'number') {
			// x = w.pageXOffset;
			y = w.pageYOffset;
		} else {
			docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat') ? doc.documentElement : doc.body;
			// x = docEl.scrollLeft;
			y = docEl.scrollTop;
		}

		return y;
	}

	onMounted(() => {
		body.value = document.querySelector('body');
		window.onscroll = function(event) {
			setScrollClasses(); 
		}
	});



</script>


<style lang="scss" scoped>
  main {
    min-height: 30vh;
  }


	@media(max-width: 800px) {
		.layout-inner {
			transition: filter 0.3s ease;
			
			&.menu-active {
				filter: blur(5px);
				// &::before {
	
				// }
			}
		}
	}
</style>