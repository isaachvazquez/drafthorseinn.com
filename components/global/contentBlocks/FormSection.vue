<template>
  <section :class="['BlockFormSection']">
		<div class="BlockFormSection-container" :class="[{'has-content': block.formSectionContent}, layoutClass]">
			<!-- <h2 class="BlockFormSection-heading" v-if="block.form.formHeading">{{block.form.formHeading}}</h2>
			<p class="BlockFormSection-description" v-if="block.form.formDescription">{{block.form.formDescription}}</p> -->

			<!-- FORM OBJECT
			{{block}}
			<hr>
			{{block.form}} -->


			<div class="BlockFormSection-content" v-if="block.formSectionContent">
				<!-- FORM SECTION CONTENT
				<br> -->
				<SanityContent :blocks="block.formSectionContent" :serializers="serializers" />
			</div>


			<template v-if="block.form">
				<form @submit.prevent="handleSubmit" v-if="!submitted">
					<div class="Form">
						<div class="FormField" :class="[field.layout, { missingRequired: emptyRequiredFields.includes(camelCaseAndUnique(field, index)) }]" v-for="(field, index) in block.form.fields" :key="field.id">
							<!-- {{field.type}} -->

							<!-- Text / Email / Tel (Phone) -->
							<template v-if="['text','email','tel'].includes(field.type)">
								<label :for="field.id">
									{{ field.label }}<span v-if="field.required">*</span>
								</label>
								<h5 class="FormField-description" v-if="field.description">{{field.description}}</h5>
								<input
									v-model="form[camelCaseAndUnique(field, index)]"
									:id="field.id"
									:type="field.type"
									:required="field.required"
									:minlength="field.type == 'tel' ? 9 : 0"
									:maxlength="field.type == 'tel' ? 14 : 9999"
									:placeholder="field.placeholder ? field.placeholder : ''"
									@input="(e) => formatInput(e, field, index)"
								/>
							</template>

							<!-- Message -->
							<template v-if="field.type === 'message'">
								<label :for="field.id">
									{{ field.label }}<span v-if="field.required">*</span>
								</label>
								<h5 class="FormField-description" v-if="field.description">{{field.description}}</h5>
								<textarea
									v-model="form[camelCaseAndUnique(field, index)]"
									:id="field.id"
									:required="field.required"
									:placeholder="field.placeholder ? field.placeholder : ''"
								></textarea>
							</template>

							<!-- Select -->
							<template v-if="field.type === 'select'">
								<label :for="field.id">
									{{ field.label }}<span v-if="field.required">*</span>
								</label>
								<h5 class="FormField-description" v-if="field.description">{{field.description}}</h5>
								<select v-model="form[camelCaseAndUnique(field, index)]" :id="field.id" :required="field.required">
									<option value="" disabled selected v-if="field.placeholder">{{field.placeholder}}</option>
									<option v-for="opt in field.options" :key="opt.value" :value="opt.value">
										{{ opt.label }}
									</option>
								</select>
							</template>

							<!-- Multi-select -->
							<template v-if="field.type === 'multi-select'">
								<label :for="field.id">
									{{ field.label }}<span v-if="field.required">*</span>
								</label>
								<h5 class="FormField-description" v-if="field.description">{{field.description}}</h5>
								<select v-model="form[camelCaseAndUnique(field, index)]" multiple :id="field.id">
									<option v-for="opt in field.options" :key="opt.value" :value="opt.value">
										{{ opt.label }}
									</option>
								</select>
							</template>

							<!-- Radio -->
							<template v-if="field.type === 'radio'">
								<label>{{ field.label }}<span v-if="field.required">*</span></label>
								<h5 class="FormField-description" v-if="field.description">{{field.description}}</h5>
								<div class="flex flex--column">
									<label v-for="opt in field.options" :key="opt.value">
										<input
											class="radio-input"
											type="radio"
											:name="field.label"
											:value="opt.value"
											v-model="form[camelCaseAndUnique(field, index)]"
											:required="field.required"
										/>
										{{ opt.label }}
									</label>
								</div>
							</template>

							<!-- Checkbox -->
							<template v-if="field.type === 'checkbox'">
								<label>{{ field.label }}<span v-if="field.required">*</span></label>
								<h5 class="FormField-description" v-if="field.description">{{field.description}}</h5>
								<div class="flex flex--column">
									<label v-for="opt in field.options" :key="opt.value">
										<input class="checkbox-input" type="checkbox" :value="opt.value" v-model="form[camelCaseAndUnique(field, index)]" />
										{{ opt.label }}
									</label>
								</div>
							</template>
						</div>
					</div>

					<button class="Button mt-2" type="submit" :disabled="loading || hasAnEmptyRequiredField">{{ block.form.submitButtonLabel || 'Submit' }}</button>

					<div v-if="hasAnEmptyRequiredField" class="ts-HelpText text-center">
						Missing {{emptyRequiredFields.length}} required {{ emptyRequiredFields.length == 1 ? 'field' : 'fields'}}
						<!-- Please fill out these required fields -->
						<!-- <ul v-if="false">
							<li v-for="(field, index) in emptyRequiredFields" :key="`empty-field-${field}`">
								{{field}}
								{{getLabelFromModifiedField(field, index)}}
							</li>
						</ul> -->
					</div>
				</form>
				
				<!-- Success / Error messages -->
				<p v-if="submitted && statusMessage">{{statusMessage}}</p>
			</template>

			<!-- {{form}} -->
		</div>
  </section>
</template>

<script setup>
	import { ref } from 'vue';
	import ImageComponent from '@/components/ImageComponent.vue';
	import LinkComponent from '@/components/LinkComponent.vue';
	import HorizontalDividerComponent from '@/components/HorizontalDividerComponent.vue';

	const props = defineProps({
		block: {
			type: Object,
			required: true
		}
	});

	const serializers = {
		types: {
			image: ImageComponent,
			divider: HorizontalDividerComponent
		},
    marks: {
      link: LinkComponent,
      underline: "u",
      code: "code",
      "strike-through": "s",
    },
  }

	const form = ref({});
	const statusMessage = ref('');
	const attemptedASubmission = ref(false);
	const loading = ref(false);
	const submitted = ref(false);

	const formatInput = (e, field, index) => {
		let value = e.target.value;

		// Handle Phone (tel) inputs (forcing xxx-xxx-xxxx format)
		if(field.type == 'tel') {
			value = value.replace(/\D/g, '').substring(0, 10);
			if (value.length > 6) {
				value = `${value.slice(0,3)}-${value.slice(3,6)}-${value.slice(6)}`;
			} else if (value.length > 3) {
				value = `${value.slice(0,3)}-${value.slice(3)}`;
			}
			e.target.value = value;
		}

		// Handle Other Inputs here later
		// Note: A cool idea would be "character limits" min OR max
		// Or "select up to N options", etc
		// if(field.type == '') {

		// }

		form.value[camelCaseAndUnique(field, index)] = value;
	}

	const hasAnEmptyRequiredField = computed(() => {
		return Object.entries(form.value).some(([key, value]) => {
			if (!key.includes('*')) return false;

			if (value == null) return true; // undefined or null
			if (typeof value === 'string') return value.trim() === '';
			if (Array.isArray(value)) return value.length === 0;

			return false; // other types are considered 'filled'
		});
	});

	const emptyRequiredFields = computed(() => {
		return Object.entries(form.value)
			.filter(([key, value]) => {
				if (!key.includes("*")) return false;

				if (value == null) return true;              // undefined or null
				if (typeof value === "string") return value.trim() === "";
				if (Array.isArray(value)) return value.length === 0;

				return false;
			})
			.map(([key]) => key);
	});

	// const getLabelFromModifiedField = (fieldID, index) => {
	// 	const matchingFieldObject = props.block.form.fields.filter(f => {
	// 		const modifiedFieldID = f.label.replace(/[^a-zA-Z0-9 ]+/g, '').split(' ').map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
	// 		return fieldID.includes(modifiedFieldID);
	// 	});


	// 	console.log({matchingFieldObject});
	// 	console.log({index});
	// 	console.log({fieldID});
	// 	// console.log({matchingFieldObject});
	// 	console.log(matchingFieldObject[index])
	// 	if(matchingFieldObject && matchingFieldObject[index] && matchingFieldObject[index].label) {
	// 		// return matchingFieldObject[index].label;
	// 		return matchingFieldObject[index];
	// 	} else {
	// 		return `Label Not Found for (${fieldID})`;
	// 	}
	// }

	const findIndexes = (arr, search) => {
		return arr.reduce((indexes, item, i) => {
			if (item.label == search) indexes.push(i);
			return indexes;
		}, []);
	}

	const camelCaseAndUnique = (field, index) => {
		const fieldLabel = field.label ? field.label : 'Untitled';
		const isRequired = field.required;
		let result = '';

		result = fieldLabel
			.replace(/[^a-zA-Z0-9 ]+/g, '') // remove special characters
			.split(' ')
			.map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join('');

		const indexesOfThisFieldInstanceInFormFields = findIndexes(props.block.form.fields, fieldLabel);
		const countOfCurrentIndex = indexesOfThisFieldInstanceInFormFields ? indexesOfThisFieldInstanceInFormFields.findIndex(i => i == index) + 1 : '';

		// Check for duplicates
		if(indexesOfThisFieldInstanceInFormFields.length > 1) result += countOfCurrentIndex;

		// Add an '*' if required (so you )
		if(isRequired) result += '*';

		return result;
	}

	// Initialize form values immediately
	if (props.block.form && props.block.form.fields) {
		props.block.form.fields.forEach((field, index) => {
			form.value[camelCaseAndUnique(field, index)] = field.type === 'multi-select' || field.type === 'checkbox' ? [] : ''
		})
	}

	const handleSubmit = async () => {
		loading.value = true;
		attemptedASubmission.value = true;


		// Append the field data to the data that will be sent to formSpree endpoint
		const data = new FormData();

		props.block.form.fields.forEach((field, index) => {
			const fieldID = camelCaseAndUnique(field, index);
			const value = form.value[fieldID];

			if (value === undefined || value === null) return;
			if (Array.isArray(value)) {
				// Append each selected value separately
				value.forEach(v => data.append(fieldID, v));
			} else {
				data.append(fieldID, value);
			}
		});
		
		// NOTE: You can literally make this a field in the schema, 
		// so the user can customize the email subject line for EACH form type submission!!!!
		console.log(form.value);
		console.log(Object.keys(form.value));
		const userEmailKey = Object.keys(form.value).find(key => key.includes('email'));
		console.log({userEmailKey});
		console.log(form.value[userEmailKey]);
		if(userEmailKey) {
			const userEmail = form.value[userEmailKey];
			data.append('_subject', `${props.block.form.title} submission from ${userEmail}`);
			data.append('_replyto', userEmail); // When you hit "reply" it sets this as the primary value
		} else {
			data.append('_subject', `${props.block.form.title} submission`);
		}

		// data.append('_cc', settings.supportEmail); // When you hit "reply" it sets this as the CC value

		try {
			const response = await fetch(props.block.form.recipient.formspreeLink, {
				method: 'POST',
				body: data,
				headers: {
					Accept: 'application/json'
				}
			});

			if (response.ok) {
				statusMessage.value = 'Thanks for your submission!'

				// Reset the form data
				props.block.form.fields.forEach((field, index) => {
					form.value[camelCaseAndUnique(field, index)] = field.type === 'multi-select' || field.type === 'checkbox' ? [] : ''
				});
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
			submitted.value = true;

			setTimeout(() => {
				loading.value = false;
			}, 1500);
		}
	}

	const layoutClass = computed(() => {
    if(!props.block.layout) return 'no-class';
    return props.block.layout;
  });
</script>

<style lang="scss" scoped>
	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin: 0 auto;
		// max-width: 400px;
		// max-width: 480px;
		width: 100%;
		max-width: var(--max-width-sm);

		padding: var(--spacing-md);
		background-color: var(--site-ui-bg-light);
		border-radius: var(--site-ui-border-radius-lg);
	}

	.BlockFormSection {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: var(--spacing-xl) 0;
		width: 100%;
		min-height: 300px;

		@container page-content (max-width: 600px) {
			
		}

		&-container {
			display: grid;
			grid-template-columns: 1fr;
			// grid-gap: var(--spacing-xl);
			// grid-gap: var(--spacing-sm);
			grid-gap: var(--spacing-md);
			width: 100%;

			position: relative;
			z-index: 1;
			max-width: var(--max-width-md);

			&.has-content {
				grid-template-columns: auto minmax(50%, 1fr);

				@media(max-width: 640px) {
					grid-template-columns: 1fr;
				}
			}

			&.right {
				.BlockFormSection-content { order: 1; }
				form { order: 2; }
			}
			
			&.left {
				form { order: 1; }
				.BlockFormSection-content { order: 2; }
			}

			@media(max-width: 800px) {
				grid-gap: var(--spacing-md);
			}
			
			@media(max-width: 640px) {
				grid-template-columns: 1fr;
			}

			@container page-content (max-width: 400px) {
				// background-color: tomato;
				grid-template-columns: 1fr !important;
			}
		}

		&-content {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;

			:deep() {
				a:not([class]),
				a[class=""] {
					// color: blue;
					text-decoration: underline;
				}
			}

			@container page-content (max-width: 400px) {
				// background-color: tomato;
				// width: 480px;
				// max-width: 100%;
				margin: 0 auto;
				// text-align: left;
			}
			
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
			margin-bottom: var(--spacing-lg);
			text-align: center;
			font-size: var(--f4);
			font-size: var(--f3);
			// color: var(--site-ui-text-inverted);
		}
  }

	.Form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-sm);

		@media(max-width: 640px) {
			grid-template-columns: 1fr;
		}
	}

	.FormField {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;

		width: 100%;

		&.full {
			grid-column: 1 / -1;
		}

		// &.missingRequired {
		// 	input, textarea, select {
		// 		border: 1px solid tomato;
		// 	}
		// }

		// input:valid {
		// 	border: 1px solid green;
		// }
		
		// input:invalid {
		// 	border: 1px solid red;
		// }

		&-description {
			margin: 0;
			text-transform: initial;
			font-size: var(--f1);
			font-weight: var(--fw5);
			font-style: italic;
		}

		select {
			margin: 0;
			line-height: 1.2;
		}

		input, textarea {
			width: 100%;
			// max-width: 400px;
		}

		textarea {
			min-height: calc(2 * var(--spacing-lg));
			resize: vertical;
		}

		input[type="radio"],
		input[type="checkbox"] {
			height: auto;
			width: auto;
		}
	}
</style>
