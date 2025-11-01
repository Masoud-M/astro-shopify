// https://YOUR_SITE_NAME.netlify.app/.netlify/functions/shopify-webhook would be the URL you'd use in your Shopify webhook

import CryptoJS from "crypto-js";

let lastTriggered = 0; // simple in-memory throttle (resets on redeploy)

function verifyShopifyWebhook(reqBody, hmacHeader, secret) {
    if (!hmacHeader || !secret) return false;

    const digest = CryptoJS.HmacSHA256(reqBody, secret).toString(CryptoJS.enc.Base64);

    return CryptoJS.timingSafeEqual(
        CryptoJS.enc.Utf8.parse(digest),
        CryptoJS.enc.Utf8.parse(hmacHeader)
    );
}

export default async (req) => {
    try {
        // Read the raw body text (important for signature verification)
        const rawBody = await req.text();

        // Verify the webhook signature
        const hmacHeader = req.headers.get("x-shopify-hmac-sha256");
        const secret = process.env.SECRET_SHOPIFY_ACCESS_TOKEN;

        const verified = verifyShopifyWebhook(rawBody, hmacHeader, secret);
        if (!verified) {
            console.warn("Invalid Shopify signature");
            return new Response("Unauthorized", { status: 401 });
        }

        // Parse the JSON payload
        const body = JSON.parse(rawBody);
        const topic = req.headers.get("x-shopify-topic"); // e.g. products/create, products/update

        console.log(`Received Shopify webhook: ${topic}`);

        // Only trigger rebuild for product changes
        if (topic && topic.startsWith("products/")) {
            const now = Date.now();
            const cooldown = (process.env.SECRET_REBUILD_COOLDOWN || 3600) * 1000; // default 1hr

            if (now - lastTriggered < cooldown) {
                console.log("Skipping rebuild — throttled");
                return new Response("Throttled", { status: 200 });
            }

            lastTriggered = now;

            // Trigger Netlify build hook
            const buildHookUrl = process.env.SECRET_NETLIFY_BUILD_HOOK_URL;
            const res = await fetch(buildHookUrl, { method: "POST" });

            if (!res.ok) {
                console.error("Failed to trigger Netlify rebuild:", res.statusText);
                return new Response("Build hook failed", { status: 500 });
            }

            console.log("Netlify rebuild triggered successfully!");
        }

        return new Response("OK", { status: 200 });
    } catch (error) {
        console.error("Webhook error:", error);
        return new Response("Server Error", { status: 500 });
    }
};
