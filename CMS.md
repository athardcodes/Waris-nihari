# CMS-ready structure

The static site now uses `data/menu.json` as the first CMS boundary. A CMS adapter can replace the `fetch('data/menu.json')` calls in `script.js` without changing the page components.

## Menu item fields
- `id`: stable slug used by product detail URLs
- `name`: staff-editable dish name
- `category`: filtering category
- `shortDescription`: card copy
- `description`: full product detail copy
- `price`: numeric value or `null` until verified
- `available`: inventory toggle
- `featured`: homepage/featured toggle
- `image`: approved image URL
- `imageNote`: provenance or replacement note
- `spiceLevel`: editable customer-facing field
- `allergens`: editable customer-facing field
- `addOns`: future option records

## Checkout integration boundary
The checkout page intentionally validates the customer fields but does not submit data, charge a card, or claim an order. Before enabling it, connect:

1. A server-side order endpoint.
2. A PCI-compliant payment provider.
3. Verified prices, branch, hours, delivery zones, and fulfillment rules.
4. Confirmation email/SMS/WhatsApp templates.
5. Server-side validation and order persistence.

## Images
Current image URLs are real editorial food photographs used as clearly labeled placeholders. They must be replaced with approved Waris Nihari photography before launch; the UI never presents them as restaurant-owned images.
