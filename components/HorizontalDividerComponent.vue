<template>
	<hr :class=[spacing]>
</template>

<script setup>
	const props = defineProps({
		spacing: { 
			type: String,
			required: true
		},
	});
</script>