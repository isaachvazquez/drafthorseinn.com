<template>
  <footer class="Footer dark-mode">
    <!-- Footer Bottom -->
    <div class="Footer-top" v-if="footer.navLinks" :style="{ '--footer-links-column-count': footer.navLinks.filter(l => l.active).length }">
      
      <!-- Footer Info -->
      <div class="FooterInfo">
        <!-- <SiteLogo type="secondary" /> -->
        <SiteLogo />

				<SanityContent :blocks="footer.description" :serializers="serializers" />

				<div class="FooterInfo-contact">
					<!-- <LinkComponent v-if="footer.sitePhoneNumber" :link="footer.sitePhoneNumber" useSlot="true">
					</LinkComponent> -->
					<!-- <a :href="`tel:${footer.sitePhoneNumber.replace(/[^\d+]/g, '')}`" :class=[className] @click.stop>
						<svg class="phone-icon mr-1" style="width: 14px; height: 14px;"><use href="#phone-icon"></use></svg>
						<span>{{ footer.sitePhoneNumber }}</span>
					</a> -->
					<a :href="`tel:${'5555555555'.replace(/[^\d+]/g, '')}`" @click.stop>
						<svg class="phone-icon mr-1" style="width: 14px; height: 14px;"><use href="#phone-icon"></use></svg>
						<span>555-555-5555</span>
					</a>
					<a :href="`https://maps.app.goo.gl/AHxhjump7G6P4BFv5`" @click.stop>
						<svg class="map-icon mr-1" style="width: 14px; height: 14px;"><use href="#map-icon"></use></svg>
						<!-- <span>1475 E Blaschko Ave<br><span style="margin-left: 22px;">Arcadia, WI 54612</span></span> -->
						<span>1475 E Blaschko Ave Arcadia, WI 54612</span>
					</a>
					<!-- <a :href="`${link.phone.replace(/[^\d+]/g, '')}`" :class=[className] @click.stop>
						<svg class="phone-icon mr-1" style="width: 14px; height: 14px;"><use href="#phone-icon"></use></svg>
						<span>{{ footer.sitePhoneNumber }}</span>
					</a> -->
					<!-- <LinkComponent v-if="footer.address" :link="footer.address" useSlot="true">
						<svg class="map-icon mr-1" style="width: 14px; height: 14px;"><use href="#map-icon"></use></svg>
					</LinkComponent> -->
				</div>


        <ul class="SocialLinks" v-if="footer.socialLinks">
          <li v-for="link in footer.socialLinks.filter(l => l.active)" :key="`social-link-${link.platform}`">
            <NuxtLink :to="link.url">
							<svg :class="{ [`${link.platform}-icon`]: !!link.platform }">
								<use :href="`#${link.platform}-icon`"></use>
							</svg>
						</NuxtLink>
          </li>
        </ul>

      </div>

      <!-- Footer Nav List -->
			<div class="FooterNavList" v-for="(list, index) in footer.navLinks.filter(l => l.active)" :key="`${index}-${list.heading}`">
				<h4 class="FooterNavList-header">{{ list.heading }}</h4>
				<ul>
					<li v-for="item in list.items" :key="item.title">
						<LinkComponent :link="item" />
					</li>
				</ul>
			</div>
    </div>


    <hr>


    <!-- Footer Bottom -->
    <div class="Footer-bottom">
      <span class="copyright">
        &copy; {{currentYear}} {{companyName}}
      </span>

      <ul v-if="footer.secondaryNavLinks">
				<li v-for="item in footer.secondaryNavLinks.filter(l => l.active)" :key="item.title">
					<template v-if="item.linkType === 'internal' && item.internalLink">
						<NuxtLink :to="buildUrl(item.internalLink)" :target="item.openInNewTab ? '_blank' : '_self'" rel="noopener">
							<!-- {{item.internalLink}} -->
							<span>{{ item.overrideLabel || item.internalLink.title || 'Untitled' }}</span>
						</NuxtLink>
					</template>

					<template v-else-if="item.linkType === 'external'">
						<a :href="item.externalUrl" :target="item.openInNewTab ? '_blank' : '_self'" rel="noopener" @click.stop>
							<span>{{ item.externalLabel || item.externalUrl }}</span>
						</a>
					</template>
				</li>
        <li>
          <NuxtLink to="/site-map">Site Map</NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>


<script setup>
  import { settingsQuery, footerQuery } from "~/sanity/queries";
	import LinkComponent from '@/components/LinkComponent.vue';
	import HorizontalDividerComponent from '@/components/HorizontalDividerComponent.vue';

	const { data: settings } = await useSanityQuery(settingsQuery);
	const { data: footer } = await useSanityQuery(footerQuery);
  const { $date } = useNuxtApp()

  const currentYear = ref($date().toFormat('yyyy'));
  const companyName = ref(footer.value.copyright || 'Missing Copyright');


	const serializers = {
		types: {
			divider: HorizontalDividerComponent
		},
    marks: {
      link: LinkComponent,
      underline: "u",
      code: "code",
      "strike-through": "s",
    },
  }
</script>



<style lang="scss" scoped>
  .Footer {
		position: relative;
    container: footer / inline-size;
    padding: var(--site-wrapper-spacing);
    // padding: var(--site-wrapper-spacing);
    // align-items: center;
    // justify-content: center;
    // min-height: 300px;
    border-top: 1px solid var(--site-ui-border);
		background-color: var(--site-ui-bg);
    // background-color: var(--site-ui-bg-inverted);

    // background-image: url('/oak-outline.png');
		// background-position: center;
		// background-size: cover;
		// background-repeat: no-repeat;

		&.dark-mode {
			color: #fff; // this is only for the logo
		}

    // h2 {
    //   color: var(--site-ui-text-inverted);
    // }

    hr {
      // background-color: var(--site-ui-border-inverted);
      // background-color: var(--site-ui-border-inverted);
    }
  }

  .Footer-top {
		// --footer-links-column-count: 3;
    display: grid;
    grid-template-columns: 1fr repeat(var(--footer-links-column-count), minmax(10ch, auto));
    // grid-template-columns: 1fr repeat(3, minmax(10ch, auto));
    // grid-template-columns: 1fr repeat(1, minmax(10ch, auto));

    grid-gap: var(--spacing-md);

    font-size: 16px;

    @container (max-width: 800px) {
      grid-template-columns: 1fr;
    }
  }

  .FooterInfo {
    // background-color: teal;
    max-width: var(--max-width-xs);
		padding-right: var(--spacing-md);

    p {
      // color: var(--site-ui-text-inverted);
      color: var(--site-ui-text);
      font-size: var(--f3);
    }
  }

	.FooterInfo-contact {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		svg {
			color: var(--site-ui-text);
		}
	}

  .SocialLinks {
    margin: 0;
    margin-top: var(--spacing-md);
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    // justify-content: space-between;

    li {
			line-height: 1;
      font-size: var(--f2);
      margin-right: var(--spacing-xs);
      // margin-right: var(--spacing-sm);
    }

		a {
			display: flex;

			&:hover {
				svg { 
					// color: red;
					opacity: 0.8;
				}
			}
		}

		svg {
			width: 14px;
			height: 14px;
			color: var(--site-ui-text);
			opacity: 1;
			transition: color 0.2s ease, opacity 0.2s ease;
		}

		// .facebook-icon {
		// 	width: 18px;
		// 	height: 18px;
		// }

		.youtube-icon {
			// width: max-content;
			// height: 20px;
		}

		// .linkedin-icon {
		// 	width: 21px;
		// 	height: 21px;
		// }
  }

  .FooterNavList {
    // background-color: rgba(0,0,0,0.2);

    .FooterNavList-header {
      margin: 0;
      margin-bottom: var(--spacing-xs);

      // font-size: var(--f3);
      font-size: clamp(var(--f3), 8vw, var(--f4));
      text-transform: initial;
      line-height: 1;
      // color: var(--site-ui-text-inverted);
      color: var(--site-ui-text);
    }
    
    ul {
      margin: 0;
      padding: 0;
      padding-left: 1px; // There was a weird visual alignment going on
      list-style: none;
    }

    li {
      font-size: var(--f2);

			:deep() {
				a {
					text-decoration: none;
					color: var(--site-ui-text);
	
					&:hover {
						text-decoration: underline;
					}
				}
			}
    }
  }
  
  .Footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--f1);

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;

      li {
        margin-left: var(--spacing-xs);
        font-size: var(--f1);

        &:first-child {
          margin-left: 0;
        }

        a {
          color: var(--site-ui-text);
        }
      }
    }

    .copyright {
      // color: var(--site-ui-text-light);
    }

    @container (max-width: 800px) {
      flex-direction: column;
      align-items: flex-start;


      & .copyright {
        margin-bottom: var(--spacing-sm);
      }

      & ul {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        & li {
          text-align: left;
          margin-left: 0;
          margin-bottom: var(--spacing-xs);
        }
      }
    }
  }
</style>