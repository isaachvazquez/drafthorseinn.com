import { defineQuery } from 'groq'


const seoFields = `
	seoPageTitle,
	seoPageDescription,
	seoShareTitle,
	seoShareDescription,
	seoImage{
		asset->{
			_id,
			mimeType,
			url
		},
		alt
	}
`;

const linkFields = `
	linkType,
	phone,
	email,
	openInNewTab,
	overrideLabel,
	externalLabel,
	externalUrl,
	internalLink->{
		_type,
		_id,
		title,
		"slug": slug.current,
		"collectionType": collectionType->{
			_id,
			title,
			"slug": slug.current,
			"coverImage": coverImage{
				asset->{
					_id,
					url
				},
				crop,
				hotspot,
				alt
			},
		}
	},
`;
const linkReference = `
	link {
		${linkFields}
	}
`;

const linkReferenceForBlockContent = `
  _type == "link" => {
    ...,
    link {
      ${linkFields}
      "fromBlockContent": true
    }
  }
`;

export const collectionsQuery = defineQuery(`*[_type == "collections"]{
  _id,
  title,
  "slug": slug.current,
  template,
	"coverImage": coverImage{
		asset->{
			_id,
			url
		},
		alt,
		crop,
		hotspot
	},
}`);

export const collectionQuery = defineQuery(`*[_type == "collections" && slug.current == $slug][0]{
  _id,
	_type,
  title,
  "slug": slug.current,
  template,
	"coverImage": coverImage{
		asset->{
			_id,
			url
		},
		crop,
		hotspot,
		alt,
	},
  pageContent[] {
    ...,
		_type == "pageTextBlock" => {
			"textBlock": textBlock[]{
				...,
				"markDefs": markDefs[]{
					...,
					${linkReferenceForBlockContent}
				}
			}
		},

		_type == "pageImage" => {
			...,
			image{
				asset->{
					_id,
					url
				},
				crop,
				hotspot,
				alt
			}
		},

		_type == "pageMultiImage" => {
			displayType,
			imageAspectRatio,
			columns,
			sliderType,
			sliderSpeed,
			sliderStyle,
			sliderColor {
				hex,
				rgb,
				hsl
			},
			images[]{
				...,
				title,
				description,
				${linkReference},
				image{
					asset->{
						_id,
						url,
					},
					crop,
					hotspot,
					alt
				}
			}
		},

		_type == "callToAction" => {
			...,
			content[]{
				...,
				markDefs[]{
					...,
					${linkReferenceForBlockContent}
				}
			},
			image{
				asset->{
					_id,
					url
				},
				crop,
				hotspot,
				alt
			},
			${linkReference}
		},
		_type == "pageFaqList" => {
			"faq": faq->{
				...,
				title,
				items[]{
					...,
					question,
					answer[]{
						...,
						markDefs[]{
							...,
							${linkReferenceForBlockContent}
						}
					}
				}
			}
		},
		_type == "formSection" => {
			...,
			formSectionContent[]{
				...,
				markDefs[]{
					...,
					${linkReferenceForBlockContent}
				}
			},
			"form": form->{
				title,
				formHeading,
				formDescription,
				submitButtonLabel,
				"recipient": recipient->{email, formspreeLink},
				fields[]{
					id,
					label,
					description,
					placeholder,
					type,
					layout,
					required,
					options[]{
						label,
						value
					}
				}
			}
		},
  },
  // Grab all related pages
  "pages": *[_type == "page" && collectionType._ref == ^._id]{
    _id,
		_type,
    title,
    "slug": slug.current,
		collectionType->{
      _id,
      title,
      "slug": slug.current,
			"coverImage": coverImage{
				asset->{
					_id,
					url
				},
				crop,
				hotspot,
				alt
			},
    },
    template,
		excerpt,
		"author": author->{
			_id,
			firstName,
			lastName,
			bio,
			"profileImage": profileImage{
				asset->{
					_id,
					url
				},
				alt
			}
		},
		"coverImage": coverImage{
			asset->{
				_id,
				url
			},
			crop,
			hotspot,
			alt
		},
  },

	// SEO fields
	${seoFields}
}`);




// NOTE: KEEP FOR WHEN YOU WANT TO DO PAGINATION OR RELATED ENTRIES
// export const postsQuery = defineQuery(`*[_type == "post"] | order(date desc, _updatedAt desc) {
//   ...,
//   "author": author->{
//     _id,
//     firstName,
//     lastName,
//     bio,
//     "profileImage": profileImage{
//       asset->{
//         _id,
//         url
//       },
//       alt
//     }
//   }
// }`)



// NOTE: KEEP FOR WHEN YOU WANT TO DO PAGINATION OR RELATED ENTRIES
// export const somePostsQuery = defineQuery(`
//   *[_type == "post" && slug.current != $skip][0...$limit] | order(date desc, _updatedAt desc) {
//     ...
//   }
// `)



export const pagesQuery = defineQuery(`*[_type == "page"] | order(date desc, _updatedAt desc) {
  ...,
	_id,
	title,
	"slug": slug.current,
	collectionType->{
		_id,
		title,
		"slug": slug.current,
		"coverImage": coverImage{
			asset->{
				_id,
				url
			},
			crop,
			hotspot,
			alt
		},
	},
	"coverImage": coverImage{
		asset->{
			_id,
			url
		},
		crop,
		hotspot,
		alt
	},
}`)


export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
		_id,
		title,
		"slug": slug.current,
		collectionType->{
			_id,
			title,
			"slug": slug.current,
			"coverImage": coverImage{
				asset->{
					_id,
					url
				},
				crop,
				hotspot,
				alt
			},
		},
		template,
		date,
		author->{
			_id,
			firstName,
			lastName,
			"slug": slug.current
		},
		"coverImage": coverImage{
			asset->{
				_id,
				url
			},
			crop,
			hotspot,
			alt
		},
		excerpt,
		heading,
		subheading,
		
		// Main content
		pageContent[]{
			...,
			_type == "pageTextBlock" => {
				"textBlock": textBlock[]{
					...,
					"markDefs": markDefs[]{
						...,
						${linkReferenceForBlockContent}
					}
				}
			},

			_type == "pageImage" => {
				...,
				image{
					asset->{
						_id,
						url
					},
					crop,
					hotspot,
					alt
				}
			},

			_type == "pageMultiImage" => {
				displayType,
				imageAspectRatio,
				columns,
				sliderType,
				sliderSpeed,
				sliderStyle,
				sliderColor {
					hex,
					rgb,
					hsl
				},
				images[]{
					...,
					title,
					description,
					${linkReference},
					image{
						asset->{
							_id,
							url,
						},
						crop,
						hotspot,
						alt
					}
				}
			},

			_type == "callToAction" => {
				...,
				content[]{
					...,
					markDefs[]{
						...,
						${linkReferenceForBlockContent}
					}
				},
				image{
					asset->{
						_id,
						url
					},
					crop,
					hotspot,
					alt
				},
				${linkReference}
			},
			_type == "pageFaqList" => {
				"faq": faq->{
					...,
					title,
					items[]{
						...,
						question,
						answer[]{
							...,
							markDefs[]{
								...,
								${linkReferenceForBlockContent}
							}
						}
					}
				}
      },
			_type == "formSection" => {
				...,
				formSectionContent[]{
					...,
					markDefs[]{
						...,
						${linkReferenceForBlockContent}
					}
				},
				"form": form->{
					title,
					formHeading,
					formDescription,
					submitButtonLabel,
					"recipient": recipient->{email, formspreeLink},
					fields[]{
						id,
						label,
						description,
						placeholder,
						type,
						layout,
						required,
						options[]{
							label,
							value
						}
					}
				}
      },
		},

		// Aside content (optional)
		secondaryContent[]{
			_type,
			_key,
			
			_type == "pageTextBlock" => {
				"textBlock": textBlock[]{
					...,
					"markDefs": markDefs[]{
						...,
						${linkReferenceForBlockContent}
					}
				}
			},

			_type == "pageImage" => {
				...,
				image{
					asset->{
						_id,
						url
					},
					crop,
					hotspot,
					alt
				}
			},

			_type == "callToAction" => {
				...,
				content[]{
					...,
					markDefs[]{
						...,
						${linkReferenceForBlockContent}
					}
				},
				image{
					asset->{
						_id,
						url
					},
					crop,
					hotspot,
					alt
				},
				${linkReference}
			},

			_type in ["infoSection", "formSection"] => {
				...
			}
		},

		// SEO fields
		${seoFields}
	}
`);

export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0]{
    title,
		items[]{
			active,
      ...${linkReference},
      children[]{
				active,
        ...${linkReference},
        children[]{
					active,
          ...${linkReference},
        }
      }
    },
		actionItems[]{
			${linkFields}
		}
  }
`);

export const footerQuery = defineQuery(`
  *[_type == "footer"][0]{
		copyright,
		description[]{
			...,
			markDefs[]{
				...,
				${linkReferenceForBlockContent}
			}
		},
		navLinks[]{
			active,
			heading,
			items[]{
				active,
				...${linkReference}
			}
		},
		secondaryNavLinks[]{
			active,
			...${linkReference}
		},
		socialLinks[]{
			active,
			platform,
			url
		},
	}
`);

export const settingsQuery = defineQuery(`
	*[_type == "settings"][0]{
		siteTitle,
		siteDescription,
		ogImage{
			asset->{
				_id,
				mimeType,
				url
			}
		},
		favicon{
			asset->{
				_id,
				mimeType,
				url
			}
		},
		businessSchema{
			businessName,
			businessUrl,
			businessType,
			businessDescription,
			phone,
			email,
			address{
				streetAddress,
				locality,
				state,
				zip,
				country
			},
			geo{
				latitude,
				longitude
			},
			amenities[]{
				name,
				value
			}
		}
	}
`);


export const announcementBannerQuery = defineQuery(`
	*[_type == "announcementBanner"][0]{
		_id,
		_rev,
		...,
		content[]{
			...,
			markDefs[]{
				...,
				_type == "link" => {
					...,
					link {
						${linkFields}
					}
				}
			}
		},
		cta{
			${linkFields}
		}
	}
`);


// NOTE: the alt, title, description, and tags are from the 'sanity-plugin-media' plugin, 
// and have unique handles to access
export const homepageQuery = defineQuery(`
  *[_type == "homepage"][0]{
    title,
    "bgImage": {
      "_type": bgImage._type,
      "asset": bgImage.asset,
      "alt": bgImage.asset->altText,
      "title": bgImage.asset->title,
      "description": bgImage.asset->description,
      "tags": bgImage.asset->tags,
      "crop": bgImage.crop,
      "hotspot": bgImage.hotspot
    },
		"bgVideo": {
			"_type": bgVideo->_type,
			"url": bgVideo.asset->url,
			"mimeType": bgVideo.asset->mimeType
		},
    description[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          "link": {
            ...,
            ${linkReferenceForBlockContent}
          }
        },
      }
    },
    tagline,
    subheadline,
    ctaButtons[]{
      ${linkFields}
    },
    "pageContent": pageContent[]{
      ...,
			_type == "pageTextBlock" => {
				"textBlock": textBlock[]{
					...,
					"markDefs": markDefs[]{
						...,
						${linkReferenceForBlockContent}
					}
				}
			},
      _type == "callToAction" => {
				_key,
				heading,
				subheading,
				layout,
				content[]{
					...,
					markDefs[]{
						...,
						${linkReferenceForBlockContent}
					}
				},
				image{
					asset->{
						_id,
						url
					},
					crop,
					hotspot,
					alt
				},
				${linkReference}
			},
			_type == "formSection" => {
				...,
				formSectionContent[]{
					...,
					markDefs[]{
						...,
						${linkReferenceForBlockContent}
					}
				},
				"form": form->{
					title,
					formHeading,
					formDescription,
					submitButtonLabel,
					"recipient": recipient->{email, formspreeLink},
					fields[]{
						id,
						label,
						description,
						placeholder,
						type,
						layout,
						required,
						options[]{
							label,
							value
						}
					}
				}
				
      },
			_type == "pageFaqList" => {
				"faq": faq->{
					...,
					title,
					items[]{
						...,
						question,
						answer[]{
							...,
							markDefs[]{
								...,
								${linkReferenceForBlockContent}
							}
						}
					}
				}
      },
			_type == "pageQuoteSection" => {
				_id,
				slides[]{
					quote,
					attribution,
					"image": image{
						asset->{
							_id,
							url
						},
						crop,
  					hotspot
					},
					"cta": cta{
						${linkFields}
					}
				},
				"bgImage": bgImage{
					asset->{
						_id,
						url
					},
					crop,
					hotspot
				},
			},
      _type == "infoSection" => {
        ...,
        content[]{
          ...,
          markDefs[]{
            ...,
            _type == "link" => {
              "link": {
                ...,
                ${linkReferenceForBlockContent}
              }
            },
          }
        }
      },
    },

    // SEO fields
		${seoFields}
  }
`)
