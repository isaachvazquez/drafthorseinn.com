<!-- components/FormspreeForm.vue -->
<template>
	{{form}}
</template>

<script setup>
	import { ref } from 'vue'

	const form = ref({
		email: '',
		message: '',
		message2: '',
		select: '',
		// multiSelect: []
	});

	setTimeout(() => {
		form.value['multiSelect'] = [];
	}, 3000);

	const statusMessage = ref('');
	const loading = ref(false);

	const handleSubmit = async () => {
		loading.value = true;
		statusMessage.value = '';

		const data = new FormData();
		data.append('email', form.value.email);
		data.append('message', form.value.message);
		data.append('message2', form.value.message2);
		data.append('select', form.value.select);
		data.append('multiSelect', form.value.multiSelect);
		// data.append('_subject', '🫶 SUCK IT BIG BOI!!! 🫐');

		// NOTE: You can literally make this a field in the schema, 
		// so the user can customize the email subject line for EACH form type submission!!!!
		data.append('_subject', `<FORMNAME> submission from ${form.value.email}`);
		data.append('_replyto', form.value.email); // When you hit "reply" it sets this as the primary value
		data.append('_cc', `support@hopsquadapp.com`); // When you hit "reply" it sets this as the CC value
		// data.append('_bcc', `team@hopsquadapp.com`); // CURRENTLY NOT WORKING
		// data.append('_template', `table`); // CURRENTLY NOT WORKING
		// data.append('_next', `/success`);

		// 	# Additional Useful Hidden Fields
		// 		_subject - The Subject Line
		// 		_replyto — specify which email the reply will go to
		// 		_cc / _bcc — add CC or BCC recipients
		// 		_next — redirect URL after submission (box, plain, or table)
		// 		_template — change email template style

		try {
			// const response = await fetch('https://formspree.io/f/mwpqwory', {
			const response = await fetch('https://formspree.io/f/xvgqvand', {
				method: 'POST',
				body: data,
				headers: {
					Accept: 'application/json'
				}
			})

			if (response.ok) {
				statusMessage.value = 'Thanks for your submission!'

				// Reset the form data
				form.value.email = '';
				form.value.message = '';
				form.value.message2 = '';
				form.value.select = '';
				form.value.multiSelect = [];
			} else {

				const result = await response.json()
				if (result.errors) {
					statusMessage.value = result.errors.map(error => error.message).join(', ')
				} else {
					statusMessage.value = 'Oops! There was a problem submitting your form.'
				}
			}
		} catch (error) {
			statusMessage.value = 'Oops! There was a problem submitting your form.';
		} finally {
			loading.value = false;
		}
	}
</script>

<style scoped>
	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin: 0 auto;
		max-width: 400px;
	}
</style>
