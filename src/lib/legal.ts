/**
 * Single source of truth for legal entity and product attribution.
 * Import in footer and legal pages so strings never drift.
 */

export const PRODUCT_NAME = "STR Estimator";
export const LEGAL_NAME = "Fjord & Field Studio LLC";
export const SUPPORT_EMAIL = "support@strestimator.com";

/** Placeholder: replace with actual address before production. */
export const MAILING_ADDRESS = "Company mailing address: __________";

/** Placeholder: confirm governing law before production. */
export const GOVERNING_LAW = "State of Michigan, USA";

export const LEGAL_ATTRIBUTION = `${PRODUCT_NAME} is a product of ${LEGAL_NAME}.`;
export const COPYRIGHT_LINE = `© 2026 ${LEGAL_NAME}. All rights reserved.`;

/** Shown on Terms, Privacy, Refund. Update when you publish changes. */
export const LAST_UPDATED = "February 24, 2026";
