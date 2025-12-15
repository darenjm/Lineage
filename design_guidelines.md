# Design Guidelines: Lineage by Legacy

## Design Approach
**System-Based with Healthcare Refinement**
- Primary inspiration: Stripe's clarity + healthcare portal trust signals
- Clean, professional aesthetic appropriate for B2B medical institutions
- Emphasis on data presentation, transparency, and institutional credibility

## Typography
**Font Stack:**
- Primary: Inter (400, 600 weights via Google Fonts)
- Headings: text-2xl to text-4xl, font-semibold to font-bold
- Body: text-base to text-lg, font-normal
- Table/Data: text-sm for dense information
- Maintain strict hierarchy: H1 (3xl/4xl) → H2 (2xl) → Body (lg/base) → Small (sm)

## Layout System
**Spacing Primitives:**
- Core units: 4, 6, 8, 12 (p-4, p-6, p-8, p-12)
- Section padding: py-12 to py-16 for standard sections
- Component gaps: space-y-4 to space-y-6
- Max widths: max-w-3xl (hero), max-w-4xl (content sections), max-w-md (forms)

## Component Library

**Header/Navigation:**
- Clean, minimal header with logo left, navigation right
- CTA button in header ("Request Access")
- Sticky positioning on scroll with subtle shadow
- Trust indicator in top bar: "CLIA-Certified | Institutional Use Only"

**Hero Section:**
- Large, professional medical imagery (modern lab environment, professional consultation setting)
- Centered text overlay with semi-transparent backdrop
- H1 + supporting paragraph + primary CTA
- Subtle badge/indicator: "Trusted by 50+ Fertility Clinics"
- Height: 85vh with proper content centering

**Feature Grid:**
- 2-column grid (sm:grid-cols-2) with 4 key benefits
- Card-based with subtle shadows and rounded corners (rounded-xl)
- Icon + title + brief description format
- Consistent card padding (p-6)

**Inventory Table:**
- Full-width responsive table with horizontal scroll on mobile
- Striped rows for readability (alternating bg-gray-50)
- Sticky header on scroll
- Clear column headers with data type indicators
- "View Full Profile" link for each donor row
- Filter controls above table: Blood Type, CMV Status, Tier dropdowns

**Pricing Section:**
- 3-column grid showcasing tier options (Full Profile, Standard, Limited)
- Card-based presentation with clear feature lists
- Pricing structure with "Request Quote" CTAs
- Volume discount callout box

**Consultation Form:**
- Single-column centered layout (max-w-md)
- Generous form field spacing (space-y-4)
- Clear labels above inputs
- Input styling: border-gray-300, rounded-lg, p-3
- Full-width submit button
- Privacy/security assurance text below form
- Expected response time indicator: "Response within 1-2 business days"

**Footer:**
- 3-column layout: Company Info | Quick Links | Contact
- Social proof: "Part of Legacy Network"
- Contact: lineage@givelegacy.com, phone number
- Legal links: Privacy Policy, Terms of Service
- Newsletter signup integration

## Images

**Hero Image:**
- Professional medical/lab environment photograph
- Modern fertility clinic setting or consultation scene
- High-quality, bright, trust-inspiring imagery
- Subtle overlay gradient for text legibility

**Section Supporting Images:**
- Lab/quality assurance imagery for "Why Lineage" section
- Professional headshot or team photo near footer
- Clinical setting imagery to reinforce medical credibility

## Accessibility & Forms
- All form inputs with visible labels and focus states
- Focus rings: ring-2 ring-blue-500
- Adequate color contrast for all text (WCAG AA minimum)
- Table responsive design with clear mobile fallback
- Clear error states for form validation (border-red-500, text-red-600)

## Trust Signals
- CLIA certification badge in header
- Client logos section: "Trusted by leading fertility clinics"
- Security/compliance indicators: "HIPAA Compliant Data Handling"
- Testimonial from institutional partner (single, prominent quote)

## Interaction Patterns
- Minimal animations—subtle hover states only
- Table row hover: bg-gray-100
- Card hover: slight shadow increase (shadow-md to shadow-lg)
- CTA buttons: solid state, subtle hover darkening
- Form focus states: border color change to blue-500

## Mobile Responsiveness
- Single column stack on mobile for all multi-column layouts
- Table horizontal scroll with scroll indicator
- Touch-friendly button sizes (min-h-12)
- Reduced padding on mobile: p-4 instead of p-6