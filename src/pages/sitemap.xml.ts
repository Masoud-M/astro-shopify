import type { APIRoute } from "astro";
import { getAllProductHandles } from "@lib/shopify-api";

import { site } from "astro:config/client";
console.log("Site config:", site);

export const GET: APIRoute = async () => {
	const handles = await getAllProductHandles();

	const baseUrl = site;

	const staticPages = [
		{ url: "/", changefreq: "daily", priority: "1.0" },
		{ url: "/about/", changefreq: "monthly", priority: "0.8" },
		{ url: "/blog/", changefreq: "weekly", priority: "0.8" },
		{ url: "/contact/", changefreq: "monthly", priority: "0.7" },
		{ url: "/projects/", changefreq: "monthly", priority: "0.7" },
		{ url: "/reviews/", changefreq: "monthly", priority: "0.7" },
		{ url: "/shop/", changefreq: "daily", priority: "0.9" },
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join("\n")}
${handles
	.map(
		(handle) => `  <url>
    <loc>${baseUrl}/shop/${handle}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join("\n")}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};

export const prerender = true;
