export function buildUrl(doc) {
	if (!doc?.slug) return '/';

	// Helper to normalize any slug string
	const normalize = (s) => {
		if (!s) return '';
		
		// Remove leading/trailing slashes and replace multiple consecutive slashes
		return '/' + s.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
	}

	switch (doc._type) {
		case 'page':
			// If this page belongs to a collection
			if (doc.collectionType?.slug) {
				return normalize(`${doc.collectionType.slug}/${doc.slug}`)
			}
			// Otherwise just a regular page
			return normalize(doc.slug)

		case 'collections':
			// Landing page for the collection
			return normalize(doc.slug)

		default:
			// Fallback for anything else
			return normalize(doc.slug)
	}
}
