/**
 * Meta Pixel (Facebook Pixel) configuration.
 * Pixel ID is loaded from environment variables or admin settings.
 * Never hardcode your Pixel ID.
 */

/**
 * Initialize Meta Pixel script content.
 */
export function getMetaPixelScript(pixelId: string): string {
  return `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
`.trim();
}

type FBQ = (...args: unknown[]) => void;

/**
 * Track a Meta Pixel standard event (client-side only).
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  const win = window as typeof window & { fbq?: FBQ };
  if (!win.fbq) return;
  win.fbq("track", eventName, params ?? {});
}

/**
 * Track a purchase conversion for Meta.
 */
export function trackMetaPurchase(params: {
  value: number;
  currency?: string;
  contentIds?: string[];
  contentType?: string;
}) {
  trackMetaEvent("Purchase", {
    value: params.value,
    currency: params.currency ?? "PKR",
    content_ids: params.contentIds?.join(",") ?? "",
    content_type: params.contentType ?? "product",
  });
}

/**
 * Track Add to Cart event for Meta.
 */
export function trackMetaAddToCart(params: {
  contentId: string;
  contentName: string;
  value: number;
}) {
  trackMetaEvent("AddToCart", {
    content_id: params.contentId,
    content_name: params.contentName,
    value: params.value,
    currency: "PKR",
  });
}

/**
 * Track ViewContent event for Meta.
 */
export function trackMetaViewContent(params: { contentId: string; contentName: string }) {
  trackMetaEvent("ViewContent", {
    content_id: params.contentId,
    content_name: params.contentName,
  });
}
