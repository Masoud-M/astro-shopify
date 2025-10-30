import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";

const SITE_URL = "https://www.yourwebsite.com"; // REPLACE WITH YOUR SITE URL
const SHOP_SLUG = "shop"; // REPLACE WITH YOUR SHOP SLUG

export default defineConfig({
	site: SITE_URL,
	integrations: [
		icon(),
		sitemap({
			filter: (page) => !page.includes(`/${SHOP_SLUG}/`) || page === `${SITE_URL}/${SHOP_SLUG}/`,
			customSitemaps: [`${SITE_URL}/${SHOP_SLUG}-sitemap.xml`],
		}),
	],
	adapter: netlify(),
});
