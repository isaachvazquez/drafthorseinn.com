<template>
  <section class="SubscribeFormSection">
		<div class="SubscribeFormSection-content">
			<!-- <h2 class="SubscribeFormSection-heading">Subscribe to our newsletter!</h2> -->
			<h2 class="SubscribeFormSection-heading">Join our online deals club!</h2>
			<p class="SubscribeFormSection-description">Sign up today and get a free gift!</p>
			<div class="flex flex--nowrap align-center justify-between mt-5">
				<input type="email" class="plain-input w100 mr-1" placeholder="Enter your email address">
				<button class="Button Button--autoHeight">Subscribe</button>
			</div>
			<!-- Header, Description, Input, Button, Below Info/Disclaimer/Extra Content -->
		</div>
	</section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.SubscribeFormSection {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: var(--spacing-xl) 0;
		width: 100%;
		min-height: 300px;
		// background-image: url('/https://plus.unsplash.com/premium_photo-1726729259341-afb7d35eb2c4?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		
		// &::before {
		// 	content: '';
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	width: 100%;
		// 	height: 100%;
		// 	background-color: rgba(0,0,0,0.3);
		// }

		&-content {
			position: relative;
			z-index: 1;
			max-width: var(--max-width-md);
		}

		&-heading {
			margin: 0;
			text-align: center;
			font-size: var(--f6);
			text-transform: initial;
			// color: var(--site-ui-text-inverted);
		}

		&-description {
			margin: 0;
			text-align: center;
			font-size: var(--f4);
			font-size: var(--f3);
			// color: var(--site-ui-text-inverted);
		}
	}
</style>