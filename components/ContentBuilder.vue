
<template>
	<!--
	Imports components named "<block._type>" in PascalCase.
	Ex: if block._type == 'myBlock', then the matching component 
	needs to be MyBlock.vue in the @/components/global/ directory
	or if it lives inside a directory within global, you have to 
	prepend that directory (in PascalCase) to the block type (mapped
	to PascalCase also)
	-->
	<!-- <div v-for="(block, index) in blocks" :key="`${index}-${block._key}`">
		{{block._type}}
		{{mapBlockTypeToComponent(block._type)}}
	</div> -->
  <component v-for="block in blocks" :key="block._key" :is="resolveComponent(mapBlockTypeToComponent(block._type)) || 'div'" :block="block"></component>
</template>


<script setup>
	import { resolveComponent } from 'vue';

	defineProps({
		blocks: {
			type: Array,
			required: false,
		},
	});

	function mapBlockTypeToComponent(type) {
		// console.log({type});
		return 'ContentBlocks' + type.charAt(0).toUpperCase() + type.slice(1)
	}
</script>