import imageUrlBuilder from '@sanity/image-url';
import { useSanity } from '#imports'; // auto-imported by @nuxtjs/sanity

// Reference: https://github.com/sanity-io/image-url

export default defineNuxtPlugin(() => {
  const { projectId, dataset } = useSanity().config;
  const builder = imageUrlBuilder({ projectId, dataset });

  function urlFor(source) {
		let builderInstance = builder.image(source).auto('format').fit('crop');

		console.log({source});
		// Only apply crop/hotspot if they exist
		// if (source.crop) builderInstance = builderInstance.crop(source.crop);
		// if (source.hotspot) builderInstance = builderInstance.hotspot(source.hotspot);
		
		// 	.crop(source.crop) // optional, usually handled automatically if source has crop
		// 	.hotspot(source.hotspot); // optional, usually handled automatically if source has hotspot

		return builderInstance;
  }

  return {
    provide: {
      urlFor
    }
  }
})
