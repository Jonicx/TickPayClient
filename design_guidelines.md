# TickPay Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern event platforms like Eventbrite and StubHub, with a focus on dark aesthetic and artistic visual elements.

## Core Design Elements

### A. Color Palette
**Dark Mode Primary:**
- Background: 15 15% 8% (deep charcoal)
- Surface: 15 12% 12% (elevated dark surface)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 0 0% 70% (muted light gray)

**Brand Colors:**
- Primary Green: 142 76% 36% (vibrant emerald)
- Secondary Gold: 45 93% 58% (warm gold accent)
- Success/Confirmation: 142 76% 36% (same as primary)

### B. Typography
**Fonts:** Inter (primary), Poppins (headings)
- Headings: Poppins, 600-700 weight
- Body: Inter, 400-500 weight
- UI Elements: Inter, 500 weight

### C. Layout System
**Spacing:** Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Consistent use of p-6, m-4, gap-8 for main layouts
- Generous whitespace: py-12, px-6 for sections

### D. Artistic Background Treatment
**Blurred Abstract Shapes:**
- Subtle glowing circles with green/gold gradients
- Position: fixed backgrounds, low opacity (10-20%)
- Blur: backdrop-blur-3xl effects
- Gradients: Green to transparent, gold accent highlights

### E. Component Library

**Navigation:**
- Dark transparent navbar with backdrop blur
- Clean typography with green hover states
- Mobile hamburger with slide-out drawer

**Event Cards:**
- Dark surface with subtle borders
- Hover effects with green accent glow
- Rounded corners (rounded-xl)
- Price tags with gold background

**Buttons:**
- Primary: Green background with white text
- Secondary: Outline with green border
- On images: Blurred background with outline style

**Forms:**
- Dark input fields with green focus states
- Minimal borders, generous padding
- Error states in muted red

**Maps & QR Codes:**
- Contained within rounded cards
- Green accent borders for active states

### F. Mobile Optimization
- Single column layouts on mobile
- Touch-friendly button sizes (min 44px)
- Simplified navigation patterns
- Optimized for Tanzanian mobile users

## Images
**Event Images:** High-quality photos for each event category (concerts, sports, food events, comedy shows, business conferences). Place prominently on event cards and detail pages.

**QR Codes:** Simple black and white QR placeholder images for ticket display.

**No Large Hero Image:** The homepage features artistic background shapes instead of a traditional hero image, maintaining focus on event content.

## Key Design Principles
1. **Minimalistic Information:** Brief, scannable content prioritizing essential details
2. **Dark Artistic Aesthetic:** Sophisticated dark theme with glowing accent elements
3. **Performance-Focused:** Clean layouts optimized for mobile connections
4. **Accessibility:** High contrast ratios, clear typography hierarchy