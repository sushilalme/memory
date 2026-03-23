export function trackEvent(eventName, payload = {}) {
  // Placeholder hook: integrate GA, Segment, Mixpanel, or internal analytics here.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[analytics]', eventName, payload);
  }
}
