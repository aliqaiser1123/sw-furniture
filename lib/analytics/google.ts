/**
 * Google Analytics 4, Tag Manager, and Search Console configuration.
 * IDs are loaded from environment variables or the database Settings model.
 * Never hardcode tracking IDs.
 */

export interface GoogleAnalyticsConfig {
  ga4Id?: string;
  gtmId?: string;
  searchConsoleVerification?: string;
}

/**
 * Get GA4 script tag content for injection into <head>.
 * Only renders if GA4_ID is configured.
 */
export function getGA4Script(ga4Id: string): string {
  return `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}', {
  page_path: window.location.pathname,
  anonymize_ip: true,
  cookie_flags: 'SameSite=None;Secure'
});
`.trim();
}

/**
 * Get Google Tag Manager noscript fallback content.
 */
export function getGTMNoScript(gtmId: string): string {
  return `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
}

/**
 * Track a custom GA4 event (client-side).
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (!(window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) return;
  (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", eventName, params ?? {});
}

/**
 * Track a purchase event (for GA4 ecommerce).
 */
export function trackPurchase(params: {
  transactionId: string;
  value: number;
  currency?: string;
  items?: Array<{ id: string; name: string; price: number; quantity: number }>;
}) {
  trackEvent("purchase", {
    transaction_id: params.transactionId,
    value: params.value,
    currency: params.currency ?? "PKR",
  });
}

/**
 * Track a view_item event.
 */
export function trackProductView(params: { id: string; name: string; price: number }) {
  trackEvent("view_item", {
    item_id: params.id,
    item_name: params.name,
    price: params.price,
    currency: "PKR",
  });
}

/**
 * Track add to cart.
 */
export function trackAddToCart(params: { id: string; name: string; price: number; quantity: number }) {
  trackEvent("add_to_cart", {
    item_id: params.id,
    item_name: params.name,
    price: params.price,
    quantity: params.quantity,
    currency: "PKR",
  });
}
