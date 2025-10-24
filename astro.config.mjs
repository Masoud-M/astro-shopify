import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

import netlify from "@astrojs/netlify";

export default defineConfig({
  output: 'static',

  // update me!
  site: "https://www.yourwebsite.com",

  integrations: [
    icon(),
    sitemap({
      filter: (page) => !page.includes("/admin"),
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],

  adapter: netlify(),
});