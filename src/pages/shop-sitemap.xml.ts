import type { APIRoute } from "astro";
import { getAllProductHandles } from "src/lib/shopify-api";

export const GET: APIRoute = async () => {
  const handles = await getAllProductHandles();
  const baseUrl = import.meta.env.SITE;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
