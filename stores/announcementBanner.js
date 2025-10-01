import { defineStore } from 'pinia';

export const useAnnouncementBannerStore = defineStore('announcementBanner', {
  state: () => ({
    isActive: false
  }),
  actions: {
    toggleBanner() {
      this.isActive = !this.isActive;
    },
    openBanner() {
			console.log('Open Banner');
      this.isActive = true;
    },
    closeBanner(bannerRevisionId) {
			localStorage.setItem("announcementRev", bannerRevisionId);
			console.log('Close Banner');
      this.isActive = false;
    },
  },
});