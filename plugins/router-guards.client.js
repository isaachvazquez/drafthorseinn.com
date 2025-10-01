import { useMobileMenuStore } from '@/stores/mobileMenu';

export default defineNuxtPlugin((nuxtApp) => {
  const router = nuxtApp.$router

  // Global beforeEach guard
  router.beforeEach((to, from, next) => {
		// console.log("Before each:", { to, from })
    next();
  })
	
  // Global afterEach guard
  router.afterEach((to, from, failure) => {
		const mobileMenu = useMobileMenuStore();
		setTimeout(() => {
			mobileMenu.closeMenu();
		}, 200);
    // console.log("After each:", { to, from, failure })
  })
})
