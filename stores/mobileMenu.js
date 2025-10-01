import { defineStore } from 'pinia';

export const useMobileMenuStore = defineStore('mobileMenu', {
  state: () => ({
    isActive: false
  }),
  actions: {
    toggleMenu() {
			// console.log('Toggle Menu');
      this.isActive = !this.isActive;
    },
    openMenu() {
			console.log('Open Menu');
      this.isActive = true;
    },
    closeMenu() {
			console.log('Close Menu');
      this.isActive = false;
    },
  },
});