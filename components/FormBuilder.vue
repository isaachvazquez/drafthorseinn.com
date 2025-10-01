<template>
  <form @submit.prevent="handleSubmit">
    <!-- Loop through fields -->
    <div v-for="(field, index) in formSchema.fields" :key="index">
      <label v-if="field.label">
        {{ field.label }}
      </label>

      <!-- Text / Email / Phone -->
			<template v-if="['text', 'email', 'phone'].includes(field.type)">
      	<input v-model="formData[field.name]" :type="field.type === 'phone' ? 'tel' : field.type" :placeholder="field.placeholder" :required="field.required"/>
			</template>

      <!-- Message -->
			<template v-if="field.type === 'message'">
      	<textarea v-model="formData[field.name]" :placeholder="field.placeholder" :required="field.required" rows="4" />
			</template>

      <!-- Select -->
			<template v-if="field.type === 'select'">
				<select v-model="formData[field.name]" :required="field.required">
					<option disabled value="">Select an option</option>
					<option v-for="(option, idx) in field.options" :key="idx" :value="option.value">
						{{ option.label }}
					</option>
				</select>
			</template>

      <!-- Multi-select -->
			<template v-if="field.type === 'multi-select'">
				<select v-model="formData[field.name]" multiple :required="field.required">
					<option v-for="(option, idx) in field.options" :key="idx" :value="option.value">
						{{ option.label }}
					</option>
				</select>
			</template>
    </div>

    <!-- Submit button -->
    <button type="submit">
      {{ formSchema.submitLabel || 'Submit' }}
    </button>

    <!-- Success / Error messages -->
    <p v-if="status === 'success'">
      Thanks! Your message has been sent.
    </p>
    <p v-if="status === 'error'">
      Oops, something went wrong. Please try again.
    </p>
  </form>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
	import { useSanityClient } from '@/sanity' // your Sanity client setup

	const props = defineProps({
		formTitle: { type: String, required: true }
	})
  //   formSchema: {
  //     type: Object,
  //     required: true
  //   }

	// const props = defineProps({
  // });

	const formSchema = ref(null);
	const form = ref({});
	const formData = ref({});
  const status = ref('');
	const loading = ref(false);

	// Fetch form schema from Sanity
	const fetchForm = async () => {
		const query = `*[_type == "formSchema" && title == $formTitle][0]{
			title,
			submitButtonLabel,
			"recipient": recipient->{email, formspreeLink},
			fields[]{
				name,
				label,
				id,
				type,
				layout,
				required,
				options[]{
					label,
					value
				}
			}
		}`
		formSchema.value = await useSanityClient().fetch(query, { formTitle: props.formTitle })

		// Initialize form values
		if (formSchema.value?.fields) {
			formSchema.value.fields.forEach(f => {
				form.value[f.name] = f.type === 'multi-select' || f.type === 'checkbox' ? [] : ''
			})
		}
	}

	onMounted(fetchForm)

  // // Initialize formData keys
  // formSchema.fields.forEach((field, index) => {
  //   // formData.value[`${field.name}-index`] = field.type === 'multi-select' ? [] : '';
  //   formData.value[`${field.fieldId}`] = field.type === 'multi-select' ? [] : '';
  // });

  // const handleSubmit = async () => {
	// 	loading.value = true;
	// 	statusMessage.value = '';

	// 	const data = new FormData()


	// 	formSchema.fields.forEach((field, index) => {
	// 		// formData.value[`${field.name}-index`] = field.type === 'multi-select' ? [] : '';
	// 		data.append(field.name, formData.value[field.name])
	// 	});
	// 	for (const field of formData.value) {
	// 		// const value = formData.value[field.name];
	// 	}


  //   try {
	// 		const response = await fetch(`https://formspree.io/f/${formSchema.formId}`, {
	// 			method: 'POST',
	// 			body: data,
	// 			headers: {
	// 				Accept: 'application/json'
	// 			}
	// 		})

  //     if (response.ok) {
  //       status.value = 'Thanks for your submission!';
  //       formData.value = {};


	// 			// Reset Form Values
	// 			formSchema.fields.forEach(field => {
	// 				formData.value[field.name] = field.type === 'multi-select' ? [] : '';
	// 			});
  //     } else {
  //       status.value = 'Oops! There was a problem submitting your form.';
  //     }
  //   } catch (err) {
  //     status.value = 'Oops! There was a problem submitting your form.';
  //   } finally {
	// 		loading.value = false;
	// 	}
  // }
</script>
