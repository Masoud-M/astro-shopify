  <h3 align="center">Advanced Astro Starter Kit - Headless Shopify + Decap CMS</h3>

  <p align="center">
    This advanced kit includes a pre-configured Astro setup with headless Shopify integration using Storefront Web Components, along with five pages filled with CodeStitch components. Everything is ready to go right from the start, featuring a modern e-commerce solution with LESS preprocessing and a blog powered by Decap CMS. This kit leverages powerful Astro features including Content Collections, View Transitions and more.
    <br/>
    <br/>
    <a href="https://intermediate-astro-kit-decap-cms.netlify.app" target="_blank">View Live Result</a>
  </p>

  <p align="center">
    Created and maintained by <a href="https://github.com/BuckyBuck135" target="_blank">BuckyBuck135</a>
  </p>

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#gettingStarted)
- [Connecting to Shopify](#connectingToShopify)
  - [Shopify Partners Program](#shopifyPartners)
  - [Setup Steps](#shopifySetup)
- [Shopify Integration Reference](#shopifyIntegrationReference)
  - [Understanding Storefront Web Components](#understandingComponents)
  - [How This Kit Works](#howItWorks)
  - [Key Components Reference](#keyComponents)
  - [Collections](#collections)
  - [Cart & Checkout](#cartCheckout)
  - [Filters, Sorting & Pagination](#filtersSortingPagination)
  - [Customizing Components](#customizingComponents)
  - [Troubleshooting](#troubleshooting)
- [Project Structure](#projectStructure)
  - [Project Tree](#projectTree)
  - [Root Files and Folders](#rootFilesAndFolders)
- [Customizing the Project](#customizingTheProject)
  - [Configuring Decap CMS](#configuringDecapCms)
  - [Styling Decap preview pane](#stylingdecappreview)
  - [Removing Decap CMS](#removingDecapCms)
  - [Astro Content Collections](#AstroContentCollections)
- [Deployment](#deployment)
- [Helpful Resources](#helpfulResources)
- [Acknowledgments](#acknowledgments)

<a name="overview"></a>

## Overview

This advanced kit combines a pre-configured <a href="https://www.astro.build">Astro</a> environment with headless Shopify integration using <a href="https://shopify.dev/docs/api/storefront-web-components">Storefront Web Components</a>. Built for developers who need a modern e-commerce solution with full frontend control, this kit leverages Shopify's robust backend for product management, inventory, payment processing and checkout, while giving you complete freedom over the frontend experience.

The kit also includes a [Decap CMS integration](https://decapcms.org/), allowing your clients to manage content like blog posts or photo galleries independently. Five starter pages built with <a href="https://codestitch.app/">CodeStitch's vanilla component library</a> are included, making it easy to swap sections and customize the design.

This kit gets e-commerce projects off the ground quickly, with deployment possible in minutes. We recommend Netlify as a host.

<a name="prerequisites"></a>

## Prerequisites

This is an advanced kit. You should have:

- **Required:** Solid understanding of HTML, CSS, and JavaScript
- **Required:** Basic familiarity with Astro (components, layouts, routing)
- **Recommended:** Understanding of React-style components and props
- **Recommended:** Basic Shopify concepts (products, variants, collections)

Much of the complex integration work has been done for you, but familiarity with these technologies will help you customize and extend the kit.

<!-- <a name="isShopifyRightForYou"></a>

[NOTE: this is a WIP, not even sure we should add it to be honest]
## 🛒 Is Shopify Right For You?

Before diving in, consider which e-commerce platform best fits your project needs. Here's a comparison of headless e-commerce solutions:

<a name="shopifyHeadless"></a>

### Shopify (Headless)

**Best for:** Feature-rich stores with 20+ products, clients who need Collections for product organization, inventory management, and plans to scale.

**Pricing:**
- **Starter Plan:** $5/month - Basic e-commerce with buy buttons and checkout links. 5% commission fee on card transactions.
- **Basic Plan:** $39/month - Includes Collections, custom domains, discount codes, and full Storefront API access. 1.5% commission fee on card transactions.

**Pros:**
- Complete commerce platform with robust backend
- Excellent documentation and large ecosystem
- Collections for organizing products
- Built-in payment processing (Shopify Payments)
- App store with thousands of integrations
- Professional fulfillment services
- Scalable infrastructure

**Cons:**
- Monthly subscription fees plus transaction fees (unless using Shopify Payments)
- More complex setup compared to lightweight alternatives
- Can be overkill for simple product catalogs

**Choose Shopify when:** Your client wants to manage their products on the Shopify backend, needs Collections to organize their catalog, requires advanced inventory management, or has plans to scale their e-commerce operations.

<a name="snipcart"></a>

### Snipcart

**Best for:** JAMstack and static site projects, developers wanting lightweight cart solutions with maximum frontend flexibility.

**Pricing:** 2% of monthly transactions ($10 minimum fee)

**Pros:**
- All features included in pricing (abandoned cart recovery, inventory management)
- Developer-friendly with excellent documentation
- Lightweight and flexible frontend
- Perfect for static sites and JAMstack architectures
- No marketplace fees or paid extensions

**Cons:**
- Less robust backend features compared to Shopify
- No visual admin interface for non-technical clients
- Limited built-in analytics and reporting

**Choose Snipcart when:** You're building a static or JAMstack site with a simple product catalog and want maximum control over the frontend experience.

<a name="foxycart"></a>

### FoxyCart

**Best for:** Simple stores with basic cart needs and specific FoxyCart integration requirements.

**Pricing:** Variable pricing with some features requiring paid add-ons ($50/month for abandoned cart features via CartHook)

**Pros:**
- Similar headless flexibility to Snipcart
- Works well for simple stores

**Cons:**
- Smaller community and less documentation
- Additional costs for advanced features
- Less popular than alternatives

**Choose FoxyCart when:** You have specific FoxyCart integration requirements or existing FoxyCart infrastructure.

---

**Bottom Line:** This kit uses Shopify because it provides the best balance of features, scalability, and developer experience for building professional e-commerce sites. The Storefront Web Components make integration seamless, and clients benefit from Shopify's robust backend and fulfillment services. -->

<a name="gettingStarted"></a>

## 🧑‍🚀 Getting Started

### Installation

1. At the top right of the GitHub Repository, click the green _Use this template_ button,
   then click _Create a new repository_.
2. Follow the instructions to create a new repository, using this repo as a template.
3. When created, clone the repository to your local machine.
4. Run `npm install` to install all dependencies.
5. Run `npm run dev` to start the project and spin up a development server on `localhost:4321`

> **Don't need a CMS?** If you don't need content management for this project, you can easily [remove Decap CMS](#removingDecapCms).

[NOTE: add steps for npx command when available]

### Initial Configuration

- update `src/_data/client.json` with information about your project and client.

- update `src/styles/root.less` with your theme colors. 




<a name="connectingToShopify"></a>

## 🔌 Connecting to Shopify

This section provides a comprehensive guide to integrating Shopify with your Astro project using Storefront Web Components.

<a name="shopifyPartners"></a>

### Shopify Partners Program (Recommended)

Before starting e-commerce work, we recommend setting up a [Shopify Partners](https://www.shopify.com/partners) account to manage all your clients in one place. This can be done free of charge, and you can even earn money by referring clients to use Shopify and handing over stores.

**Benefits:**
- Manage multiple client stores from one dashboard
- Create unlimited development stores for testing
- Earn commissions when clients upgrade to paid plans
- Access to partner resources and support

**Getting Started with Partners:**

1. **Sign up for Shopify Partners** - Visit [shopify.com/partners](https://www.shopify.com/partners) and create a free account

2. **Create a development store** - Follow [this Shopify guide](https://help.shopify.com/en/partners/dashboard/managing-stores/development-stores) to create a development store for your client

3. **Earn commissions** - When you transfer the store to your client, you'll earn a [referral commission](https://help.shopify.com/en/partners/how-to-earn#development-store-referrals) when they subscribe to a paid plan

**Note:** If you're building for a single client or already have a Shopify store, you can skip the Partners program and use a standard Shopify account.

<a name="shopifySetup"></a>

### Setup Steps

1. **Create or access your Shopify store**
   - If using Shopify Partners: Create a development store from your Partners dashboard
   - Or sign up at [Shopify](https://www.shopify.com/) if using a standard account
   - Development stores are free during development (plan selection happens at client handoff)

2. **Install the Headless app**
   - Navigate to the [Headless app](https://apps.shopify.com/headless) in the Shopify App Store
   - Click "Add app" to install it on your store
   - This app provides the Storefront API access needed for headless commerce

3. **Generate your Storefront API access token**
   - In your Shopify admin, go to the Headless app
   - Navigate to the **Storefront API** tab
   - Click **Manage** to view your public access token
   - Copy the **Public access token** (this is safe to use in client-side code)

4. **Locate your Store Domain Name**
  - In your Shopify admin, go to **Settings**
  - Click on **Domains**, then copy your full domain name, including `https:`

5. **Configure your kit**
   - Open `src/data/shopify.ts` in your project
   - Update the following fields:
   ```typescript
   export const PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = "your-token-here" // obtained in step 3
   export const PUBLIC_SHOPIFY_STORE_DOMAIN = "https://your-store.myshopify.com/" // obtained in step 4
   export const PUBLIC_SHOPIFY_STORE_COUNTRY = "US"
   export const PUBLIC_SHOPIFY_STORE_LANGUAGE = "en"
   ```

6. **Verify the connection**
   - Run `npm run dev`
   - Navigate to `/shop` on your local development server
   - You should see your Shopify products loading

<a name="shopifyIntegrationReference"></a>

## 📚 Shopify Integration Reference

This comprehensive reference covers all aspects of working with Shopify's Storefront Web Components in your Astro project.

<a name="understandingComponents"></a>

### 🧩 Understanding Storefront Web Components

Storefront Web Components are ready-to-use custom HTML elements that let you integrate Shopify functionality into any website by simply embedding HTML code. No GraphQL queries or complex API calls required.

**Key Benefits:**
- **Declarative HTML:** Just add custom HTML elements to your pages
- **Automatic data fetching:** Components fetch data from Shopify automatically
- **Built-in cart & checkout:** Cart and checkout functionality works out of the box
- **No build-time requirements:** Data is fetched at runtime, no static generation needed
- **Type-safe:** Full TypeScript support

**Resources:**
- **Playground:** [Try components interactively](https://webcomponents.shopify.dev/playground?view=editor)
- **Reference Docs:** [Complete component documentation](https://shopify.dev/docs/api/storefront-web-components)

<a name="howItWorks"></a>

### ⚙️ How This Kit Works

Understanding the data flow helps you customize and extend the kit effectively:

1. **Store Provider Wrapper**
   - The `ShopifyStoreProvider.astro` component wraps your app with a `<shopify-store>` element
   - This provides store context (domain, access token, country, language) to all child components
   - Located in your layout or page files

2. **Runtime Data Fetching**
   - Unlike traditional headless setups, no GraphQL queries are needed at build time
   - Web Components fetch data from Shopify when the page loads
   - This means products are always up-to-date without rebuilding

3. **Product Listings**
   - The `/shop` page uses `<shopify-list-context>` to query and render multiple products
   - Supports pagination, filtering, and sorting
   - Uses a `<template>` element to define how each product card should look

4. **Product Detail Pages**
   - Dynamic routes (`/shop/[slug].astro`) use `<shopify-context>` to load individual products
   - Supports variant selection, add to cart, and buy now functionality
   - Includes loading placeholders for better UX

5. **Cart System**
   - Built-in Shopify cart components handle cart state
   - Checkout redirects to Shopify's secure checkout
   - No custom backend required

<a name="keyComponents"></a>

### 📦 Key Components Reference

Here are the core Storefront Web Components used in this kit, with examples from the codebase:

#### Store Provider

The foundation - wraps your entire app to provide store context:

```html
<shopify-store
  store-domain="https://your-store.myshopify.com/"
  public-access-token="your-token"
  country="US"
  language="en">
  <!-- Your app content -->
</shopify-store>
```

**Used in:** `src/components/shopify/ShopifyStoreProvider.astro`

#### Product Listings

Query and render multiple products with `<shopify-list-context>`:

```html
<shopify-list-context
  type="product"
  query="products"
  first="9"
  sort-key="TITLE">
  <template>
    <article class="product-card">
      <shopify-media
        layout="constrained"
        width="280"
        height="350"
        query="product.selectedOrFirstAvailableVariant.image">
      </shopify-media>

      <h3><shopify-data query="product.title"></shopify-data></h3>

      <shopify-money query="product.selectedOrFirstAvailableVariant.price">
      </shopify-money>
    </article>
  </template>
</shopify-list-context>
```

**Attributes:**
- `type`: "product" or "collection"
- `query`: The Shopify query (e.g., "products", "collections")
- `first`: Number of items to load
- `sort-key`: "TITLE", "PRICE", "CREATED_AT", etc.

**Used in:** `src/pages/shop/index.astro`

#### Product Details

Load a single product with `<shopify-context>`:

```html
<shopify-context type="product" handle="product-handle">
  <template>
    <div class="product-details">
      <h1><shopify-data query="product.title"></shopify-data></h1>

      <shopify-media
        layout="constrained"
        width="390"
        height="490"
        query="product.selectedOrFirstAvailableVariant.image">
      </shopify-media>

      <shopify-variant-selector></shopify-variant-selector>

      <button onclick="getElementById('cart').addLine(event).showModal();"
              shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
        Add to cart
      </button>
    </div>
  </template>
</shopify-context>
```

**Attributes:**
- `type`: "product" or "collection"
- `handle`: The product handle (slug) from Shopify

**Used in:** `src/layouts/ProductDetailsLayout.astro`

#### Data Display Components

**`<shopify-data>`** - Display any product/collection data:
```html
<shopify-data query="product.title"></shopify-data>
<shopify-data query="product.vendor"></shopify-data>
<shopify-data query="product.description"></shopify-data>
```

**`<shopify-money>`** - Display formatted prices:
```html
<shopify-money query="product.selectedOrFirstAvailableVariant.price"></shopify-money>
<shopify-money query="product.selectedOrFirstAvailableVariant.compareAtPrice"></shopify-money>
```

**`<shopify-media>`** - Optimized images:
```html
<shopify-media
  layout="constrained"
  width="280"
  height="350"
  query="product.images">
</shopify-media>
```

**`<shopify-variant-selector>`** - Product options (size, color, etc.):
```html
<shopify-variant-selector></shopify-variant-selector>
```

<a name="collections"></a>

### 🛍️ Collections

Collections are product groupings that help organize your store and make it easier to browse.

**What are Collections?**
- Groups of products organized by category, type, season, etc.
- Can be manually curated or automatically generated based on rules
- Help customers find related products
- Essential for stores with 20+ products

**Plan Requirements:**
- **Collections are available on Basic Plan ($39/month) and above**
- Not available on Starter Plan ($5/month)

**Creating Collections in Shopify:**
1. Log into your Shopify admin
2. Go to **Products > Collections**
3. Click **Create collection**
4. Choose manual (select products) or automated (define rules)
5. Add products and save

**Using Collections in Your Kit:**

Query collections in `<shopify-list-context>`:
```html
<shopify-list-context
  type="collection"
  query="collections"
  first="10">
  <template>
    <div class="collection-card">
      <h3><shopify-data query="collection.title"></shopify-data></h3>
      <shopify-data query="collection.description"></shopify-data>
    </div>
  </template>
</shopify-list-context>
```

Query products in a specific collection:
```html
<shopify-list-context
  type="product"
  query="collection(handle: 'summer-collection').products"
  first="12">
  <template>
    <!-- Product card markup -->
  </template>
</shopify-list-context>
```

<a name="cartCheckout"></a>

### 🛒 Cart & Checkout

This kit includes built-in cart functionality powered by Shopify's Web Components.

**How It Works:**
1. Customer adds product to cart
2. Cart drawer slides open showing cart contents
3. Customer can update quantities or remove items
4. Clicking "Checkout" redirects to Shopify's secure checkout
5. Shopify handles payment processing and order fulfillment

**Adding Items to Cart:**

From `src/components/shopify/ShopifyAddToCartBtn.astro`:
```html
<button onclick="getElementById('cart').addLine(event).showModal();"
        shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
  Add to cart
</button>
```

**Buy Now (Skip Cart):**
```html
<button onclick="document.querySelector('shopify-store').buyNow(event)"
        shopify-attr--disabled="!product.selectedOrFirstAvailableVariant.availableForSale">
  Buy now
</button>
```

**Cart Component:**

The `ShopifyCart.astro` component uses `<shopify-cart-modal>` to display the cart:
```html
<shopify-cart-modal id="cart">
  <template>
    <!-- Cart UI markup -->
  </template>
</shopify-cart-modal>
```

**Cart Toggle Button:**

From `ShopifyCartToggleBtn.astro`:
```html
<button onclick="getElementById('cart').showModal()">
  Cart (<shopify-data query="cart.totalQuantity"></shopify-data>)
</button>
```

<a name="filtersSortingPagination"></a>

### 🔍 Filters, Sorting & Pagination

Manage large product catalogs with built-in filtering, sorting, and pagination.

#### Filters

**Requirements:**
- Shopify **Search & Discovery** app (free, built-in)
- Configure filters in your Shopify admin

**Setup:**
1. In Shopify admin, go to **Online Store > Preferences**
2. Find **Search & Discovery** app
3. Enable filters (price, availability, vendor, tags, product type, etc.)

**Using Filters:**

From `src/components/shopify/ShopifyFilterWrapper.astro`:
```html
<shopify-filters>
  <template>
    <button shopify-filter-option>
      <shopify-data query="option.label"></shopify-data>
    </button>
  </template>
</shopify-filters>
```

#### Sorting

From `src/components/shopify/ShopifySorting.astro`:
```html
<shopify-list-context sort-key="PRICE">
  <!-- Products sorted by price -->
</shopify-list-context>
```

**Available sort keys:**
- `TITLE` - Alphabetically by title
- `PRICE` - Low to high price
- `CREATED_AT` - Newest first
- `BEST_SELLING` - Most popular

#### Pagination

From `src/components/shopify/ShopifyPagination.astro`:
```html
<shopify-pagination>
  <button shopify-previous-page>Previous</button>
  <button shopify-next-page>Next</button>
</shopify-pagination>
```

Configure items per page in `<shopify-list-context>`:
```html
<shopify-list-context first="12">
  <!-- Shows 12 products per page -->
</shopify-list-context>
```

<a name="customizingComponents"></a>

### 🎨 Customizing Components

This kit's Shopify components can be customized with CSS and JavaScript.

#### Styling Components

**Standard CSS:**

Most components accept standard CSS classes:
```html
<shopify-media class="product-image"></shopify-media>
```

```css
.product-image img {
  border-radius: 8px;
  transition: transform 0.3s;
}

.product-image img:hover {
  transform: scale(1.05);
}
```

**Shadow DOM Parts:**

Some components use Shadow DOM. Style them with `::part()`:

```css
/* Style variant selector buttons */
shopify-variant-selector::part(radio) {
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
}
```

#### Sold Out Products

This kit includes styling for unavailable products. From `src/pages/shop/index.astro`:

```html
<article shopify-attr--disabled="!product.availableForSale">
  <!-- Product card -->
</article>
```

```css
.cs-item:is([disabled]) {
  cursor: not-allowed;
  position: relative;
}

.cs-item:is([disabled])::before {
  background-color: rgba(255, 255, 255, 0.5);
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
}

.cs-item:is([disabled])::after {
  content: "Sold out";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.125rem;
  font-weight: 700;
  z-index: 2;
}
```

#### Customizing Cart Behavior

Modify cart actions in your components:

```javascript
// Add item and show cart
document.getElementById('cart').addLine(event).showModal();

// Update quantity
document.getElementById('cart').updateLine({ id: lineId, quantity: newQuantity });

// Remove item
document.getElementById('cart').removeLine(lineId);
```

#### Custom Loading States

Add placeholder content while Shopify data loads:

```html
<shopify-context type="product" handle={productHandle}>
  <template>
    <!-- Actual content -->
  </template>

  <!-- Shown while loading -->
  <div class="placeholder">
    <div class="skeleton-box"></div>
  </div>
</shopify-context>
```

<a name="troubleshooting"></a>

### 🔧 Troubleshooting

Common issues and solutions:

#### Authentication Errors (401)

**Problem:** "401 Unauthorized" or "Invalid access token"

**Solutions:**
- Verify your access token is correct in `src/data/shopify.ts`
- Ensure the Headless app is installed on your Shopify store
- Check that you're using the **public** access token (not private)
- Verify your store URL is correct (format: `https://your-store.myshopify.com/`)

#### No Products Showing

**Problem:** Product list is empty

**Solutions:**
- Add products to your Shopify store (they must be published to the "Headless" channel)
- Check that products are available in your selected country
- Verify your Storefront API access scopes include `unauthenticated_read_product_listings`
- Open browser console and check for error messages

#### Filters Not Working

**Problem:** Filter buttons don't appear or don't filter products

**Solutions:**
- Install the **Search & Discovery** app from Shopify admin
- Configure which filters to enable (price, vendor, tags, etc.)
- Filters are only available with adequate product metadata
- Basic Plan or higher required for some filter types

#### Empty Cart or Cart Not Working

**Problem:** Cart appears empty after adding items

**Solutions:**
- Ensure products have images (Shopify requires images for cart items)
- Check browser console for JavaScript errors
- Verify the `<shopify-store>` wrapper is in place
- Clear browser cache and cookies

#### Images Not Loading

**Problem:** Product images don't display

**Solutions:**
- Verify products have images uploaded in Shopify admin
- Check the `query` attribute on `<shopify-media>` components
- Ensure images are published to the Headless channel
- Check network tab for 404 errors

#### Web Components Not Defined

**Problem:** "Custom element not defined" errors

**Solutions:**
- Ensure the Storefront Web Components script is loaded
- Check that `<shopify-store>` wraps your components
- Wait for the page to fully load before accessing components
- Verify you're not blocking third-party scripts

**Still need help?** Check the [official Shopify Developer docs](https://shopify.dev/docs/api/storefront-web-components) or visit the [Shopify Community forums](https://community.shopify.com/).

<a name="features"></a>



<a name="projectStructure"></a>

## Project Structure

Astro leverages an opinionated folder layout for your project. Every Astro project root should include the following directories and files:

- `src/*` - Your project source code (components, pages, styles, etc.)
- `public/*` - Your non-code, unprocessed assets (fonts, icons, etc.)
- `package.json` - A project manifest.
- `astro.config.mjs` - An Astro configuration file. (recommended)
- `tsconfig.json` - A TypeScript configuration file. (recommended)

<a name="projectTree"></a>

### Project Tree

```
.
├── public/
│   ├── admin/
|   |   └── config.yml
|   |—— assets/
|   |   |—— favicons/
|   |   |—— fonts/
|   |   |—— images/
|   |   └── svgs/
|   |—— _redirects
|   |—— robots.txt
├── src/
|   ├── assets/
|   |   └—— images/
|   |       └── blog/
|   ├── components/
|   ├── content/
|   |   |—— config.ts
|   |   └── blog/
│   ├── _data/
│   │   ├── client.json
│   │   └── navData.json
│   ├── icons/
│   ├── layouts/
│   │   └── BaseLayout.astro
|   ├── js/
│   │   ├── nav.js
|   |   └── utils.js
│   ├── pages/
|   |   └── blog/
|   |   └── projects/
|   └── styles/
├── astro.config.mjs
├── postcss.config.cjs
├── package-lock.json
├── package.json
└── tsconfig.json
```

<a name="rootFilesAndFolders"></a>

### Root Files and Folders

#### `public/*`

The `public/` directory is for files and assets in your project that do not need to be processed during Astro’s build process. The files in this folder will be copied into the build folder untouched, and then your site will be built.

This behavior makes `public/` ideal for common assets like images and fonts, or special files such as`_redirects` and `robots.txt`.

- \_redirects - To configure redirects. Read more on <a href="https://docs.netlify.com/routing/redirects/">Netlify</a>
- content/ - Data to render pages from, such as the blog.
- robots.txt - Instructions for site crawlers. Learn more, and generate your own, <a href="https://en.ryte.com/free-tools/robots-txt-generator/">here</a>

You can place CSS and JavaScript in your public/ directory, but be aware that those files will not be bundled or optimized in your final build.

##### `public/admin`

This folder contains `config/yml`, which is where Decap CMS configuration options lives. [More information about options in Decap docs](https://decapcms.org/docs/configuration-options/)

#### `src/*`

The `src/` folder is where most of your project source code lives. This includes:

- Pages
- Layouts
- Astro components
- UI framework components (React, etc.)
- Styles (CSS, Sass)
- Markdown

Astro processes, optimizes, and bundles your src/ files to create the final website that is shipped to the browser. Unlike the static public/ directory, your src/ files are built and handled for you by Astro.

##### `src/assets`

Contains all assets you want optimized by Astro (such as assets used in `<Picture />` components for example) must be placed in `src`.

`public/assets/images/blog` is where the images uploaded on the CMS will be stored.

##### `src/components`

Components are reusable units of code for your HTML pages. These could be Astro components, or UI framework components like React or Vue. It is common to group and organize all of your project components together in this folder.

##### `src/content`

The src/content/ directory is reserved to store content collections organised in folders (e.g. `src/content/blog`) containing `.md` files, and an optional `config.ts` collections configuration file. No other files are allowed inside this folder.

##### `src/data`

This directory contains data files that are accessible within any template throughout the project.

- `client.js` holds some information you may wish to define for a client. It's important to fill this file out with the correct information for your client, as many HTML meta tags, the sitemap, and robots.txt all use data from this file.

- `navData.json` holds data to create the navigation of your site. See more information in the [navigation via navData.json section](#navigationViaFrontMatter)

##### `src/icons`

SVGs used by the <Icon /> component **must** be placed in this folder.

##### `src/layouts`

Layouts are Astro components that define the UI structure shared by one or more pages. The `BaseLayout.astro` file acts as a giant wrapper for each individual page, where the content is injected through the `<slot /> `component.

##### `src/js`

Contains helper functions.

##### `src/pages`

Pages are a special kind of component used to create new pages on your site. A page can be an Astro component, or a Markdown file that represents some page of content for your site.

##### `src/styles`

It is a common convention to store your CSS, Less or Sass files in a `src/styles` directory.

#### `package.json` and `package-lock.json`

The project's manifest. Standard NodeJS package files, containing the dependencies needed for the project to work.

#### `node_modules/*`

Created after you run `npm install`. This directory contains the code for all the dependencies that power this kit. It comes as standard with any NodeJS-powered project, much like the `package.json` and `package-lock.json` files. You can safely ignore this directory in your day-to-day work.

#### `dist/`

Created after running `npm build`. This will hold the final build of your site.

#### `astro.config.mjs`

An Astro configuration file. It's already set up for you, but you can extend it with integrations to use, build options, server options, and more.

#### `tsconfig.json`

A TypeScript configuration file. Optional. Includes TypeScript configuration options for your Astro project. Some features (like npm package imports) aren’t fully supported in the editor without a tsconfig.json file.

<a name="customizingTheProject"></a>

## Customizing the Project

This kit includes Decap CMS for blog content management. This section covers CMS configuration and customization options.

<a name="configuringDecapCms"></a>

### Configuring Decap CMS

In `public/admin/`, you'll find a `config.yml` file which contains the configuration for the blog. While this project is set up to work with a blog out of the box, you are welcome to make changes using
<a href="https://decapcms.org/docs/add-to-your-site/#configuration">Decap CMS'</a> documentation.

Blog content lives in `/src/content/blog` in the form of markdown files, with a front matter similar to that of the pages. MDX files can also be used if you want to include JSX components. The title, description, and tags are defined in the frontmatter of the markdown. The permalink will be the same as the file name.

Files uploaded through the dashboard's media library will be stored in `src/assets/images/blog` so that they can be accessed and optimised by Astro components if you wish.

You can access the blog via navigating to the `/admin` path on the deployed site and entering your decapbridge admin credentials. All blog content can be easily created, updated and deleted via this admin panel, and is the very system that your clients can use to manage their website without your involvement.

Everything on the blog should be fairly intuitive, but feel free to experiment with using this panel first. With this kit, you can add _featured_ to the comma-separated list of tags to have them show up as so in the frontend.

<a name="stylingdecappreview"></a>

### Styling the Decap preview pane

This template includes custom styles for the Decap CMS preview pane, so that blog posts in the admin dashboard look similar to the live site.

**How it works:**

- The preview styles are defined in `public/admin/decap-preview-styles.css`.
- The CMS preview script in `src/pages/admin.astro`:
  - pulls the props from the collection
  - creates the DOM elements
  - registers these elements and styles for the preview panel to use

**How to update or customize:**

- Edit `public/admin/decap-preview-styles.css` and the preview pane script in `src/pages/admin.astro` to match your site's branding or layout changes.
- Use Decap's documentation on [customizing the preview pane](https://decapcms.org/docs/customization/)

**Notes**

- The style sheet must be a CSS file
- The style sheet does not support nested CSS.

#### Adding local backend

If you want to be able to access the Decap dashboard in order to make content changes, you need to enable some local backend settings.

1. in `public/admin/config.yml`
   Add the local_backend setting

```diff
+ local_backend: true
```

2. in `package.json`
   We need to be able to run a local decap server in parallel to our astro dev. In order to do so, we need to:

a. install some packages and update the scripts. Run:
`npm install npm-run-all --save-dev`
`npm install decap-server`

b. update the scripts

```diff
"scripts": {
"astro": "astro dev",
+ "decap": "npx decap-server",
+ "dev": "npm-run-all --parallel astro decap",
},
```

Now, when `npm run dev` is run, a proxy server for the CMS is spun up on `localhost:8081`. That can often mean you run into errors if `localhost:8080` is already taken, so look out for that. You can locally access the blog via navigating to the `/admin` path (e.g. `http://localhost:4321/admin`). While running the local dev server, you won't need to login to access the admin dashboard.

<a name="removingDecapCms"></a>

### Removing Decap CMS

If you don't need a CMS for your project, you can easily remove Decap CMS using the included removal script.

#### When to Remove Decap CMS

- Building a static site with no content management needs
- Want to use local Content Collections without Decap
- Prefer a different CMS solution
- Simplifying the project for a specific use case

#### How to Remove

Run the removal script:

```bash
npm run remove-decap
```

The script will:
1. Ask for confirmation before proceeding
2. Ask if you want to remove blog content and configuration
   - Choose **yes** to completely remove blog functionality
   - Choose **no** to keep blog files for local Content Collections (without Decap)

#### Safety & Recovery

- **Files are moved, not deleted** - Everything goes to `scripts/deleted/`
- **Easy to restore** - Copy files back from `scripts/deleted/` if needed
- **Commit first** - Always commit changes before running the script

<a name="astroContentCollections"></a>

### Astro content collections

In `/src/content`, you will see a `config.ts` file. This is where you can configure [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/). This step is **not necessary** to run the blog with Decap CMS, but it will supercharge your Astro pages and content. Collections help to

- organize your documents,
- validate your frontmatter,
- provide automatic TypeScript type-safety for all of your content,
- use Astro's `<Image />` and `<Picture />` components with user-uplaoded images via the CMS.

This template already has Content Collections configured for immediate use of the blog content, but you could use them to power up the Portfolio or Gallery for example.

Content Collections can also be used on content that is not created via the CMS.


## Deployment

### Choosing a Shopify Plan for Your Client

When handing off the store to your client, they'll need to choose a Shopify plan. Here's what to recommend:

**Starter Plan ($5/month)**
- Basic e-commerce functionality with buy buttons and checkout links
- Best for: Simple stores with few products, limited budget
- **Transaction fees:** 5% per transaction (when not using Shopify Payments)
- **Limitations:** No Collections, no discount codes, no custom domains

**Basic Plan ($39/month)** ⭐ Recommended
- Full e-commerce platform with all essential features
- Best for: Most clients with 20+ products who want to grow
- **Transaction fees:** 1.5% per transaction (when not using Shopify Payments)
- **Includes:**
  - **Collections** - Organize products by category for better navigation
  - **Discount codes** - Run promotions and sales
  - **Custom domains** - Professional branding with client's own domain
  - **Unlimited products** - No restrictions on catalog size
  - **Gift cards** - Sell gift cards to customers
  - **Advanced reports** - Track sales and customer behavior

**Recommendation:** For most professional e-commerce sites, the Basic Plan is the better choice. The lower transaction fees often offset the higher monthly cost, and clients benefit from essential features like Collections and discount codes that improve the shopping experience.

> [!IMPORTANT]
> This kit now uses decapbridge.com for its authentication solution. If you still use Netlify Identity, please refer to [the Netlify Identity branch](https://github.com/CodeStitchOfficial/Intermediate-Astro-Decap-CMS/tree/deprecated---using-Netlify-Identity)

0. **Before** you deploy, ensure the astro.config.mjs, client.json, robots.txt, \_redirects have been filled out, and that any kit placeholders have been swapped out.

> [!TIP]
> If you are updating your kit from Netlify Identity to decapbridge.com:
>
> 1. Login to your Netlify account
> 2. Navigate to Projects/Your-Site
> 3. Navigate to Project Configuration/Identity and delete the Netlify Identity instance. This will delete your users as well. They will have to be re-created in decapbridge later.
> 4. In /src/pages/admin.astro, delete the Netlify Identity script

### On decapbridge.com:

1. Make sure that your repo is on Github and your site is deployed (doesn’t have to be Netlify) before moving on to the next step.
2. Navigate to https://decapbridge.com/ and create an account. It’s free.
3. Navigate to the dashboard and Create New Site. You see this screen:

![decapbridge.com dashboard](public/assets/readme-images/decapbridge-dashboard.png)

Fill in the 3 input fields:

- Github repository: it has to be in a `user-or-org/repository-name` format. e.g. `BuckyBuck135/testing-decapbridge`
- Github access token.
  To create a personal access token in GitHub, follow these steps:

  1. Log into your Github account.
  2. Click on your profile picture (top right) (not the repository profile), and click the “Settings” link.
  3. Scroll down and click the “Developer Settings” link.
  4. Click the GitHub “Personal access tokens” link and choose `fine-grained tokens`
  5. Click the “Generate new token” button and provide your password again if required.
  6. Provide a name for the GitHub personal access token in the “Note” field.
  7. Set the access token’s “expiration” timeout to “No expiration.”
  8. Set the “Repository access” to the desired repository only.
  9. Set the “Permissions / Repository permissions” to **read-write access** for this repository's **Contents** and **Pull requests. (**This is needed by DecapCMS to read your markdown, and write new content via Pull Requests.)
  10. Click “Generate token.”, double check the permissions and click the Generate Token button
  11. **Make sure to copy your GitHub Personal Access Token now as you will not be able to see this again.**

      ![The Permissions settings](public/assets/readme-images/github-permissions.png)

  12. Double check your permissions before generating the token. It must have read and write access to Contents and Pull Requests.

- Decap CMS URL: provide the (deployed) URL of the Decap CMS dashboard. e.g [`https://testing-decapbridge.netlify.app/admin/#/`](https://testing-decapbridge.netlify.app/admin/#/)

### On your CS Decap kit:

1. In `/public/admin/config.yml`, edit the `backend` Decap config to paste in the snippet provided by the [DecapBridge.com](http://DecapBridge.com) dashboard. It should look something like this:

```yaml
# Use DecapBridge auth (required)
backend:
  name: git-gateway
  repo: BuckyBuck135/testing-decapbridge # provided by decapbridge
  branch: main
  identity_url: https://auth.decapbridge.com/sites/5605bbe7-08f2-4ce5-bce2-7d97def08bed # provided by decapbridge
  gateway_url: https://gateway.decapbridge.com # provided by decapbridge

  # Quickly see who did what (optional)
  commit_messages:
    create: Create {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    update: Update {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    delete: Delete {{collection}} “{{slug}}” - {{author-name}} <{{author-login}}> via DecapBridge
    uploadMedia: Upload “{{path}}” - {{author-name}} <{{author-login}}> via DecapBridge
    deleteMedia: Delete “{{path}}” - {{author-name}} <{{author-login}}> via DecapBridge
    openAuthoring: Message {{message}} - {{author-name}} <{{author-login}}> via DecapBridge

# Better Decap + Bridge logo (optional)
logo_url: https://decapbridge.com/decapcms-with-bridge.svg

# Add site links in DecapCMS (optional)
site_url: https://testing-decapbridge.netlify.app
```

2. Push changes to the repo and test the authentication system. As the admin of the site, your login credentials to access the Decap dashboard are the same as your decapbridge.com credentials.
3. Invite your client from your decapbridge dashboard. This will create a decapbridge collaborator account for them. From there, they will be able to access their Decap dashboard, reset their password etc.

<a name="helpfulResources"></a>

## Helpful Resources

If you need to brush up on the fundamentals:

1. [Astro's Documentation](https://docs.astro.build/en/getting-started/)
2. [Astro Crash Course in 20 Minutes!](https://www.youtube.com/watch?v=zrPVTf761OI)
3. [Storefront Web Components Playground](https://webcomponents.shopify.dev/playground?view=editor)
4. [Decap CMS Documentation](https://decapcms.org/docs/intro/)

<a name="acknowledgments"></a>

## Acknowledgments

The author would like to acknowledge:

- [Decapbridge.com] - Powers the interactions between Decap and the Github repo. Visit [Decapbridge Discord](<(https://discord.com/channels/1257728522361901219/1257728681380417600)>) and their [open-sources repos](https://github.com/decapbridge) for more information and support.



Happy coding!
