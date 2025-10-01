<template>
	<!-- Handle All Other Types of Links -->
	<!-- {{className}} -->
	<template v-if="link">
		<template v-if="link.linkType === 'internal' && link.internalLink">
			<!-- <h2>INTERNAL LINK</h2> -->
			<NuxtLink :class=[className] :to="buildUrl(link.internalLink)" :target="link.openInNewTab ? '_blank' : '_self'" rel="noopener">
				<template v-if="link.fromBlockContent || useSlot">
					<slot></slot>
				</template>
				<template v-else>
					<span v-if="link.overrideLabel || link.internalLink.title">{{ link.overrideLabel || link.internalLink.title }}</span>
				</template>
			</NuxtLink>
		</template>

		<template v-else-if="link.linkType === 'external'">
			<!-- <h2>EXTERNAL LINK</h2> -->
			<a :class=[className] :href="link.externalUrl" :target="link.openInNewTab ? '_blank' : '_self'" rel="noopener" @click.stop>
				<template v-if="link.fromBlockContent || useSlot">
					<slot></slot>
				</template>
				<template v-else>
					<span v-if="link.externalLabel">{{ link.externalLabel }}</span>
				</template>
			</a>
		</template>

		<template v-else-if="link.linkType === 'phone'">
			<!-- <h2>PHONE</h2> -->
			<a :href="`tel:${link.phone.replace(/[^\d+]/g, '')}`" :class=[className] @click.stop>
				<template v-if="link.fromBlockContent || useSlot">
					<span v-if="link.overrideLabel">{{ link.overrideLabel }}</span>
    			<slot v-else></slot>
				</template>
				<template v-else>
					<span v-if="link.overrideLabel || link.phone">{{ link.overrideLabel || link.phone }}</span>
				</template>
			</a>
		</template>
		
		<template v-else-if="link.linkType === 'email'">
			<!-- <h2>EMAIL</h2> -->
			<a :href="`mailto:${link.email}`" :class=[className] @click.stop>
				<template v-if="link.fromBlockContent || useSlot">
					<span v-if="link.overrideLabel">{{ link.overrideLabel }}</span>
    			<slot v-else></slot>
				</template>
				<template v-else>
					<span v-if="link.overrideLabel || link.email">{{ link.overrideLabel || link.email }}</span>
				</template>
			</a>
		</template>
		
		
		<template v-else-if="link.linkType === 'modal'">
			<!-- <h2>MODAL</h2> -->
			<button :class=[className] @click.stop="modal.openModal({ id: link.modal.id, hasPadding: true })">
				<template v-if="link.fromBlockContent || useSlot">
					<span v-if="link.overrideLabel">{{ link.overrideLabel }}</span>
    			<slot v-else></slot>
				</template>
				<template v-else>
					<span v-if="link.overrideLabel || link.modal.title">{{ link.overrideLabel || link.modal.title }}</span>
				</template>
			</button>
		</template>



	</template>
</template>

<script setup>
	import { buildUrl } from '~/utils/buildUrl';
	import { useModalStore } from '@/stores/modal';
	

	const modal = useModalStore();
	const NuxtLink = resolveComponent('NuxtLink');

	const props = defineProps({
		link: {
			type: Object,
			required: false
		},
		className: {
			type: String,
			default: '',
		},
		useSlot: {
			type: Boolean,
			required: false,
			default: false
		}
	});
</script>