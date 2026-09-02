// Single source of truth for contact CTAs.
// Every "Book a demo" CTA lands on the contact page (no mailto: CTAs); the page itself
// carries the support address. Swap CONTACT_HREF for a booking URL when the business has one.
const base = import.meta.env.BASE_URL;

export const CONTACT_EMAIL = 'support@eight-wire.com';
export const CONTACT_HREF = `${base}contact-us/`;
export const BOOK_DEMO_HREF = CONTACT_HREF;
export const BOOK_DEMO_LABEL = 'Book a demo';
