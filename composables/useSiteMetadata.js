export function useSiteMetadata({ siteTitle, pageTitle, pageDescription, shareTitle, shareDescription, ogImage, favicon, businessSchema }) {
	useSeoMeta({
		title: pageTitle,
		description: pageDescription,
		ogTitle: shareTitle || pageTitle || '',
		ogDescription: shareDescription || pageDescription || '',
		twitterTitle: shareTitle || pageTitle || '',
		twitterDescription: shareDescription || pageDescription || '',
		twitterCard: "summary",
		ogImage: ogImage && ogImage.asset ? ogImage.asset.url : '/og-image.png',
	});

	const headConfig = {
		htmlAttrs: {
			lang: "en",
		},
		bodyAttrs: {
			class: "site",
		},
		link: [
			{
				rel: "icon",
				type: favicon && favicon.asset ? favicon.asset.mimeType : "image/png",
				href: favicon && favicon.asset ? favicon.asset.url : "/favicon.png",
			},
		],
	};

	// Add schema only if provided
	if (businessSchema && businessSchema.businessType) {
		
		// Set the base Schema Object
		const schemaObject = {
			"@context": "https://schema.org",
			"@type": businessSchema.businessType || '',
			"name": businessSchema.businessName || '',
			"image": ogImage?.url || '/og-image.png',
			"@id": businessSchema.businessUrl || '',
			"url": businessSchema.businessUrl || '',
			"telephone": businessSchema.phone || '',
			"address": {
				"@type": "PostalAddress",
				"streetAddress": businessSchema.address?.streetAddress || '',
				"addressLocality": businessSchema.address?.locality || '',
				"addressRegion": businessSchema.address?.state || '',
				"postalCode": businessSchema.address?.zip || '',
				"addressCountry": businessSchema.address?.country || ''
			},
			"description": businessSchema.businessDescription || '',
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": businessSchema.geo?.latitude || '',
				"longitude": businessSchema.geo?.longitude || ''
			},
		};

		// Get Amenities (if applicable)
		if(businessSchema.amenities) {
			const amenityFeatures = businessSchema.amenities.map(a => ({
				"@type": "LocationFeatureSpecification",
				"name": a.name,
				"value": a.value,
			}));

			schemaObject['amenityFeature'] = amenityFeatures;
		}

		
		// Put headConfig object together (and stringify)
		headConfig.script = [{
			type: "application/ld+json",
			innerHTML: JSON.stringify(schemaObject),
		}];
	}

	useHead(headConfig);
}