import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

const SITE_URL = "https://www.yourwebsite.com"; // REPLACE WITH YOUR SITE URL
const SHOP_SLUG = "shop"; // REPLACE WITH YOUR SHOP SLUG

export default defineConfig({
	site: SITE_URL,
	integrations: [
		icon(),
		sitemap({
			filter: (page) => !page.includes("/admin"),
			customSitemaps: [`${SITE_URL}/${SHOP_SLUG}-sitemap.xml`],
			changefreq: "weekly",
			priority: 0.7,
		}),
	],
	image: {
		layout: "constrained",
	},
	build: {
		format: "directory",
	}
});
