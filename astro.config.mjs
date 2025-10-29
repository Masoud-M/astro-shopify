import { defineConfig } from "astro/config";
import icon from "astro-icon";

import netlify from "@astrojs/netlify";

export default defineConfig({
	site: "https://www.yourwebsite.com",
	integrations: [icon()],
	adapter: netlify(),
});
