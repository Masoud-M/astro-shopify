import { PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN, PUBLIC_SHOPIFY_STORE_DOMAIN } from "@data/shopify.ts";

/**
 * Fetches all product handles from Shopify Storefront API
 * Used at build time to generate sitemap entries
 */
export async function getAllProductHandles(): Promise<string[]> {
	const handles: string[] = [];
	let hasNextPage = true;
	let cursor: string | null = null;

	const apiUrl = `${PUBLIC_SHOPIFY_STORE_DOMAIN}api/2025-10/graphql.json`;

	while (hasNextPage) {
		const query = `
      query GetProducts($cursor: String) {
        products(first: 250, after: $cursor) {
          edges {
            node {
              handle
            }
            cursor
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `;

		const variables = { cursor };

		try {
			const response = await fetch(apiUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Shopify-Storefront-Access-Token": PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
				},
				body: JSON.stringify({ query, variables }),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error(`Shopify API error: ${response.status} ${response.statusText}`, errorText);
				throw new Error(`Shopify API request failed: ${response.status}`);
			}

			const data = await response.json();

			if (data.errors) {
				console.error("GraphQL errors:", JSON.stringify(data.errors, null, 2));
				throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
			}

			const products = data.data?.products;
			if (!products) {
				console.error("No products data in response");
				break;
			}

			products.edges.forEach((edge: any) => {
				if (edge.node?.handle) {
					handles.push(edge.node.handle);
				}
			});

			hasNextPage = products.pageInfo.hasNextPage;

			if (hasNextPage && products.edges.length > 0) {
				cursor = products.edges[products.edges.length - 1].cursor;
			}
		} catch (error) {
			console.error("Error fetching products from Shopify:", error);
			break;
		}
	}

	return handles;
}
