# Shesham Wood Furniture — Future Roadmap

While Version 1.0 delivers a robust, enterprise-grade foundation, the platform is designed for continuous evolution. Below is the roadmap for future enhancements.

## Phase 2: Enhanced Artificial Intelligence (Q4 2026)
- **Room Designer V2**: Integrate Stable Diffusion API to allow users to generate high-fidelity interior design mockups using uploaded photos of their empty rooms.
- **Visual Vector Search**: Implement CLIP or Google Vision embeddings so users can search the catalog using images (e.g., "find furniture that looks like this Pinterest photo").
- **Predictive Analytics**: Use machine learning to forecast inventory depletion and automatically generate reorder alerts.

## Phase 3: Global Expansion (Q1 2027)
- **Multi-Currency & i18n**: Support localized currencies (USD, EUR, AED) and languages (Arabic, Urdu) using Next.js native internationalization routing.
- **Advanced Shipping Integration**: Connect real-time logistics APIs (FedEx, DHL, TCS) to calculate live shipping rates at checkout.
- **Tax Calculation Engine**: Integrate Stripe Tax or Avalara for automated global tax compliance.

## Phase 4: Omnichannel & Loyalty (Q2 2027)
- **B2B Wholesale Portal**: Create a separate portal for interior designers and wholesale buyers with tiered pricing and bulk ordering workflows.
- **Loyalty Program**: Implement a points-based reward system integrated into the Checkout flow.
- **Augmented Reality (AR)**: Provide `.usdz` and `.gltf` 3D models for iOS/Android AR Quick Look, allowing customers to project furniture into their physical space.

## Technical Debt & Maintenance
- **Testing**: Implement end-to-end testing with Cypress or Playwright.
- **Monitoring**: Migrate from basic API health checks to full OpenTelemetry tracing across the Next.js edge network.
