import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isActive: false,
		type: '', // 'video', 'content', 'form', 'confirm'
    modalID: null,
		hasPadding: false,
		showMeta: true,
		modalSize: '', // auto, xs, sm, md, full, full-height
		videoId: '',
		formId: '',
		// primaryMetaAction: () => {},
		// secondaryMetaAction: () => {},
  }),
  actions: {
		openModal({ id, type, plyr, hasPadding, showMeta, primaryMetaAction, secondaryMetaAction }) {
      this.modalID = id;
      this.isActive = true;
			if(hasPadding) this.hasPadding = hasPadding;
			// if(showMeta) this.showMeta = showMeta;
			// if(primaryMetaAction) this.primaryMetaAction = primaryMetaAction;
			// if(secondaryMetaAction) this.secondaryMetaAction = secondaryMetaAction;

			// if(type.includes('video')) {
			// console.log({type});
			// console.log({plyr});
			// if(true) {
			// 	plyr.play();
			// }
    },
    closeModal() {
      this.isActive = false;
      this.modalID = null;
      // this.hasPadding = false;
      // this.showMeta = false;
			// this.primaryMetaAction = () => {};
			// this.secondaryMetaAction = () => {};
    },
  },
});