<template>
	<!-- Global Modal -->
  <div class="Modal" :class="{active: modal.isActive == true, 'no-padding': !modal.hasPadding}" @click.stop="modal.closeModal()" @keydown.esc="modal.closeModal()">
    <div class="Modal-content -full" @click.stop>
      <!-- Main Content -->

			
      <!-- <div class="Modal-mainContent"> -->

				<!-- <template v-if="">
					<ContentBuilder :blocks="document.pageContent" v-if="document.pageContent && document.pageContent.length > 0" />
				</template> -->


				<!-- <template v-if="">
					<video
						v-if="homepage.bgVideo && homepage.bgVideo.url"
						:key="homepage.bgVideo.url"
						:src="homepage.bgVideo.url"
						muted
						autoplay
						loop
						playsinline
					/>
				</template> -->

				<!-- <template v-if="modal.isActive"> -->
					<div class="plyr__video-embed" id="player" :key="modal.isActive">
						<iframe
							src="https://www.youtube.com/embed/GJDkdEzcSPw?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
							allowfullscreen
							allowtransparency
							muted
							allow="autoplay"
							width="600"
						></iframe>
					</div>
				<!-- </template> -->

				<!-- <div class="plyr__video-embed" id="player">
					<iframe
						src="https://player.vimeo.com/video/76979871?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
						allowfullscreen
						allowtransparency
						allow="autoplay"
					></iframe>
				</div> -->
      <!-- </div> -->



      <!-- Optional Meta Content -->
      <!-- <div class="Modal-metaContent -align-right" v-if="modal.showMeta && false"> -->
      <div class="Modal-metaContent -align-right">
        <button class="Button Button--full Button--smallish Button--secondary mr-1">Reset</button>
        <button class="Button Button--full Button--smallish" @click="modal.closeModal()">Done</button>
        <!-- <button class="Button Button--full Button--smallish Button--secondary mr-1" @click="modal.secondaryMetaAction()">Reset</button>
        <button class="Button Button--full Button--smallish" @click="modal.primaryMetaAction()">Done</button> -->
      </div>

			
    </div>
  </div>
</template>

<script setup>
	import { onMounted, onUnmounted } from 'vue';
	import { useModalStore } from '@/stores/modal';
	import 'plyr/dist/plyr.css'

	
	const modal = useModalStore();
	
	
	const handleEscape = (e) => {
		if (e.key === "Escape") {
			modal.closeModal();
		}
	}


	onMounted(async () => {
		const Plyr = (await import('plyr')).default;
		const player = new Plyr('#player');
		console.log({player});

		// Handle Global Closing of Modal
		// onMounted(() => {
			window.addEventListener('keydown', handleEscape);
		// });
	});

	onUnmounted(() => {
		window.removeEventListener('keydown', handleEscape);
	});
</script>

<style lang="scss" scoped>
	.plyr--video {
		min-width: 300px;
	}
</style>