import { PUBLIC_SHOPIFY_STORE_DOMAIN, PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN } from "@data/shopify";

// The simple GraphQL query to get the product list
const PRODUCTS_QUERY = `
    query ProductList {
        products(first: 250) {
            edges {
                node {
                    handle
                    title
                    descriptionHtml
                    priceRange {
                        minVariantPrice {
                            amount
                        }
                    }
                    # Add other fields needed for the product page (e.g., images)
                }
            }
        }
    }
`;

/**
 * Fetches all products from the Shopify Storefront API at build time.
 * This function is intended to be called by getStaticPaths() in an Astro page.
 * @returns {Array} An array of simplified product objects.
 */
export async function getAllProducts() {
    const DOMAIN = PUBLIC_SHOPIFY_STORE_DOMAIN;
    const API_TOKEN = PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    const API_ENDPOINT = `${DOMAIN}api/2024-07/graphql.json`;

    if (!API_ENDPOINT || !API_TOKEN) {
        console.error("Shopify API tokens are missing. Check your shopify.ts file.");
        return [];
    }

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': API_TOKEN,
            },
            body: JSON.stringify({ query: PRODUCTS_QUERY }),
            // Important: Node's fetch often requires a "cache" setting for revalidation
            cache: 'force-cache',
        });

        if (!response.ok) {
            console.error(`Shopify API responded with status ${response.status}`);
            return [];
        }

        const jsonResponse = await response.json();

        const totalEdges = jsonResponse?.data?.products?.edges?.length || 0;

        // Map and simplify the data structure
        return jsonResponse.data.products.edges.map(edge => ({
            ...edge.node,
            slug: edge.node.handle,
        }));

    } catch (e) {
        console.error("Error fetching Shopify products in Astro:", e);
        return [];
    }
}