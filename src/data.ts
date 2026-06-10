import { StoryAnalysis } from "./types";

export const PRESET_STORIES = [
  {
    title: "Vows in Positano",
    short: "Marriage on the Amalfi cliffs under an evening star.",
    text: "We stood on a jagged limestone cliff in Positano, with the turquoise Tyrrhenian Sea screaming in absolute brilliance beneath us. As the sun melted into warm orange gold, we exchanged raw, hand-written vows. A tiny, luminous silver evening star appeared right above the horizon, whispering that our time together was written in the cosmos. It was warm, silent, and perfect."
  },
  {
    title: "Triumph over Adversity",
    short: "Surviving Stage III battle, emerging into clean sunlight.",
    text: "For eighteen months, my life was a battle of sterile white rooms, silver needles, and raw survival after a stage III breast cancer diagnosis. I fought for my daughter, for my breath, for another morning. On the final morning of my clear scan, I walked out into the wild woods. The bright golden sun hitting my face was the warmest shield in the world. I am unbroken, scarred, and beautifully alive."
  },
  {
    title: "My Grandmother's Wisdom",
    short: "Honoring a lost matriarch's legacy of quiet quietude.",
    text: "My grandmother spent sixty years cultivating a silent sanctuary in her wild rose garden. She had heavy, calloused hands that spoke of absolute resilience and an ancient, slow wisdom. Before she passed, she whispered: 'The quietest river runs the deepest, child.' I carry her heavy silver ring on a neckchain; she is gone, yet her quiet compass still anchors my chaotic city life."
  },
  {
    title: "The Quiet Sanctuary",
    short: "A deep meditative silence found on a mountain zenith.",
    text: "I spent three weeks in a secluded stone sanctuary in the high Japanese Alps, searching for complete silence. One midnight, sitting on the frosty basalt peak, the clouds parted to reveal a pristine, moonlit lake of pale jade. There was no wind, no sound, and no past. My mind became completely transparent. A pure breath of cold crystal air became my absolute sanctuary."
  }
];

export const UX_STRATEGY = {
  brandContext: {
    title: "TENLUMA Brand Paradigm",
    tagline: "Where Your Words Become Jewelry",
    positioning: `TENLUMA operates at the absolute apex of digital craft, intentionally rejecting traditional 'ecommerce' metrics (such as click-to-cart ratios, countdown timers, and discount banners) in favor of the 'Emotional Transmutation' sequence. It redefines the luxury jewelry acquisition journey as an intimate, active digital consultation where personal narrative, raw writing, and emotional intelligence dictate the final physical jewelry piece.`
  },
  empathyMapping: [
    {
      phase: "Initial Consultation",
      thinking: "Can an algorithm truly understand the weight of my loss/love?",
      feeling: "Vulnerable, hopeful, selective of appropriate vocabulary.",
      gain: "Unprecedented validation of a personal milestone turned into structured, permanent fine art."
    },
    {
      phase: "Form Generation",
      thinking: "Will the physical bracelet look cohesive or chaotic?",
      feeling: "Aesthetic awe, curiosity, intellectual stimulation.",
      gain: "Seeing memories physically crystallized as physical, weighted vertical beads."
    }
  ],
  informationArchitecture: {
    siteHierarchy: [
      { page: "Maison Entry (Hero)", details: "Brand statement, floating signature vertical bracelet, raw text input arena, how it works storytelling index." },
      { page: "The Distillate (AI Stage)", details: "Emotional analysis, core adjectives extraction, atmospheric palette matching, and visual mood translation." },
      { page: "The Concepts (Triptych View)", details: "Three distinct, curated vertical designs with poetic translations (strictly no shopping grids, no pricing)." },
      { page: "Selected Mastery (Spec Sheet)", details: "Macro vertical CAD render, material detail, craftsmanship notes, gold-gilded Private Atelier booking module." }
    ],
    consultationFlow: "User Narrative → Emotional Distillation Index → Bracelet Triptych Generation → Selected Mastery Detail → Private Concierge Call."
  },
  userFlow: {
    steps: [
      { name: "01. Story Embarkation", desc: "User inputs raw story; gets immediate visual atmosphere transition." },
      { name: "02. Distillation Engine", desc: "AI extracts key emotions, defining materials matching the psychological weight." },
      { name: "03. Concept Triptych", desc: "Three custom-designed vertical bracelets are rendered alongside editorial prose." },
      { name: "04. Selection & Custom", desc: "User chooses the dominant concept, revealing macro-level crafting notes." },
      { name: "05. Atelier Booking", desc: "Direct handoff to private human concierge for final hand-drawn CAD, sizing, and quotation." }
    ]
  },
  wireframeLayouts: {
    desktop: {
      grid: "12-Column Premium Editorial Grid. Spacing: 96px margins, 32px gutters.",
      sections: "Luxury Header (Logo centered, quiet consult CTA right) | Hero Segment (Left column: Canela Editorial typography, story input. Right column: Floating interactive vertical bracelet structure spotlighted under a dark, reflective glow) | Bottom Footer: Quiet brand credentials."
    },
    mobile: {
      grid: "Single-Column Luxury Stack. Margins: 24px, Gutters: 16px.",
      sections: "Sticky header with compact TENLUMA lettermark | Center-stage floating vertical bracelet | Smooth bottom story container with swipe-aware sheet for preset narratives."
    }
  },
  designSystem: {
    palette: [
      { name: "Deep Obsidian Black", value: "#0B0B0B", role: "Primary background Canvas to absorb lighting reflections." },
      { name: "Graphite Charcoal", value: "#171717", role: "Structural elements, panels, and card backdrops." },
      { name: "Champagne Gold", value: "#C8A26A", role: "Warm luxury accent, high-light nodes, and celestial borders." },
      { name: "Refined Silver", value: "#F4F4F2", role: "Metallic jewelry highlights and text readability layers." },
      { name: "Warm Ivory", value: "#E8E3DB", role: "Primary editorial typography, elegant, soft, high contrast." }
    ],
    typography: {
      headline: { font: "Cormorant Garamond / Editorial New", styles: "Light, tracking-wide, generous line spacing, regal scale" },
      body: { font: "Inter / Neue Haas Grotesk", styles: "Regular, tracking-normal, spacious letter-spacing, readability weight" }
    }
  },
  figmaArchitecture: {
    structure: [
      { name: "_Atoms/Spacers", details: "Strict 8px, 16px, 24px, 48px, 96px, 144px vertical auto-layout tokens." },
      { name: "_Molecules/AtelierBead", details: "Polymorphic component with variants for Shape (bead, solitaire, emerald), Finish (Polished, Satin, Hammered, Distressed) and state (Idle, Hover, Selected)." },
      { name: "Organisms/StoryInputBlock", details: "Premium text bounding container with integrated luxury indicator metrics and preset prompts." },
      { name: "Templates/TriptychDeck", details: "Rigid horizontal auto-layout frameless container supporting staggered entrance transitions." }
    ]
  },
  motionGuidelines: {
    principles: [
      { name: "Atmospheric Entrance", spec: "Opacity transitions scaled over 1200ms with custom cubic-bezier (0.16, 1, 0.3, 1) for a subtle, liquid emergence." },
      { name: "Jewelry Light Spotlight", spec: "A perpetual 30-second linear rotate gradient overlay imitating soft natural sunlight shifting across noble metals." },
      { name: "Bead Sizing & Hover", spec: "Subtle vertical expansion (+1.05x scale) on individual beads under custom spring dynamics to highlight craftsmanship detail." }
    ]
  },
  developerHandoff: {
    specifications: [
      { name: "Bead Render Method", spec: "Inline SVGs to prevent pixelation on 4K retina displays, powered by absolute positioning and customizable CSS drop-shadow filters (0px 8px 32px var(--amber-glow))." },
      { name: "JSON Payload Structure", spec: "Raw JSON response schemas mapped directly from Gemini AI endpoint into React state nodes, preventing hydration mismatches." },
      { name: "Asset Strategy", spec: "No external image assets to ensure sub-100ms loading speeds. Pure CSS, WebGL-like radial gradients, and inline SVGs." }
    ]
  }
};
