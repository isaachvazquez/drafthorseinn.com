import { DateTime } from 'luxon';

export default defineNuxtPlugin((nuxtApp) => {
	const date = (input) => {
		if (!input) return DateTime.now();
		if (typeof input === 'string') return DateTime.fromISO(input);
		if (typeof input === 'number') return DateTime.fromMillis(input);
		return DateTime.invalid('Invalid input');
	}

	nuxtApp.provide('date', date);
});
