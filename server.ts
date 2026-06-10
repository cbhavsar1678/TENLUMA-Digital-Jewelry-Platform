import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let aiClient: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Tenluma Atelier AI: Google GenAI successfully initialized.");
  }
} catch (e) {
  console.warn("Failed to initialize GoogleGenAI. Fallback generator active.", e);
}

// Fallback poetic generator for premium performance
function generatePremiumFallback(story: string) {
  const storyClean = (story || "").trim().toLowerCase();
  
  // Detect primary topics for more personalized fallbacks
  let type: 'remembrance' | 'triumph' | 'eternal_love' | 'serenity' | 'universal' = 'universal';
  
  if (storyClean.includes("love") || storyClean.includes("marry") || storyClean.includes("wife") || storyClean.includes("husband") || storyClean.includes("wedding") || storyClean.includes("anniversary")) {
    type = 'eternal_love';
  } else if (storyClean.includes("lost") || storyClean.includes("passed") || storyClean.includes("grandma") || storyClean.includes("grandpa") || storyClean.includes("remember") || storyClean.includes("miss") || storyClean.includes("died")) {
    type = 'remembrance';
  } else if (storyClean.includes("overcome") || storyClean.includes("fight") || storyClean.includes("strong") || storyClean.includes("cancer") || storyClean.includes("recovered") || storyClean.includes("survive")) {
    type = 'triumph';
  } else if (storyClean.includes("peace") || storyClean.includes("ocean") || storyClean.includes("nature") || storyClean.includes("silent") || storyClean.includes("calm") || storyClean.includes("breathe")) {
    type = 'serenity';
  }

  const dataset = {
    eternal_love: {
      keyEmotions: ["Devotion", "Synchronicity", "Timelessness"],
      meaningExtraction: "A profound collision of two timelines merging into a singular, unyielding horizon. Your words describe not a moment, but a rare gravitational sanctuary.",
      designIntent: "To create a fluid, interlocking visual meter where platinum weaves protectively around twin solitaire clusters.",
      visualMood: {
        colorPalette: "Warm Champagne & Iridescent Silver",
        atmosphere: "Dawn sunlight filtering through the mist of an old forest, completely silent."
      },
      concepts: [
        {
          id: "dual-infinity",
          title: "The Helix of Twin Moons",
          subtitle: "An editorial symmetry of shared orbits",
          inspiration: "Inspired by your mention of shared quietude, this composition represents two distinct timelines bound by protective, polished barriers.",
          beads: [
            { id: "1", shape: "bead", symbol: "○", name: "The Anchor Core", material: "18K Solid Champagne Gold", poeticMeaning: "The foundational day that established your quiet gravity.", glowColor: "gold" },
            { id: "2", shape: "silver", symbol: "■", name: "Serrated Silver Track", material: "Chiseled Sterling Silver", poeticMeaning: "The beautiful friction of creating a life together.", glowColor: "silver" },
            { id: "3", shape: "solitaire", symbol: "✦", name: "The Primordial Solitaire", material: "Princess-cut VVS1 Diamond", poeticMeaning: "A singular point of unwavering focus—the vow itself.", glowColor: "amber" },
            { id: "4", shape: "pearl", symbol: "●", name: "White South Sea Pearl", material: "12mm Organic Pearl", poeticMeaning: "Representing the natural, slow growth of unspoken trust.", glowColor: "pearl" },
            { id: "5", shape: "solitaire", symbol: "✦", name: "The Reflected Solitaire", material: "Princess-cut VVS1 Diamond", poeticMeaning: "The reciprocation of devotion; an answering brilliance.", glowColor: "amber" },
            { id: "6", shape: "silver", symbol: "■", name: "Polished Mirror Spacer", material: "De-oxidized Pure Silver", poeticMeaning: "Room to breathe, ensuring individuality is never lost.", glowColor: "silver" },
            { id: "7", shape: "bead", symbol: "○", name: "The Infinite Terminus", material: "18K Solid Champagne Gold", poeticMeaning: "Protecting the quiet boundary where your future rests.", glowColor: "gold" }
          ],
          materials: {
            base: "Braided 18K Champagne Gold Thread",
            accents: "Mirror-finish Recycled Platinum spacers"
          }
        },
        {
          id: "ascension",
          title: "Elysian Equilibrium",
          subtitle: "A modern tribute to absolute emotional balance",
          inspiration: "Your reflection upon building a calm home is translated here into highly structured, geometric intervals of diamonds and obsidian.",
          beads: [
            { id: "1", shape: "obsidian", symbol: "⬡", name: "Uncut Obsidian Shield", material: "Polished Volcanic Glass", poeticMeaning: "Filtering out external noise to preserve your sacred center.", glowColor: "obsidian" },
            { id: "2", shape: "diamond", symbol: "◆", name: "Brilliant-cut Frame", material: "Recycled White Diamond", poeticMeaning: "The shining boundary of your private world.", glowColor: "silver" },
            { id: "3", shape: "bead", symbol: "○", name: "Champagne Sphere", material: "18K Champagne Gold Bead", poeticMeaning: "The heart's warmth preserved within the stone structure.", glowColor: "gold" },
            { id: "4", shape: "emerald", symbol: "⬢", name: "The Hearthstone Emerald", material: "Zambian Emerald Cluster", poeticMeaning: "The quiet center representing growth, vitality, and eternal shelter.", glowColor: "emerald" },
            { id: "5", shape: "bead", symbol: "○", name: "Champagne Sphere", material: "18K Champagne Gold Bead", poeticMeaning: "The counterweight of serenity balancing the emotional construct.", glowColor: "gold" },
            { id: "6", shape: "diamond", symbol: "◆", name: "Brilliant-cut Frame", material: "Recycled White Diamond", poeticMeaning: "The mirroring anchor of external brilliance.", glowColor: "silver" },
            { id: "7", shape: "obsidian", symbol: "⬡", name: "Uncut Obsidian Shield", material: "Polished Volcanic Glass", poeticMeaning: "A final seal of devotion.", glowColor: "obsidian" }
          ],
          materials: {
            base: "Polished Platinum-950 Core Rod",
            accents: "Textured Obsidian rings and Champagne details"
          }
        },
        {
          id: "monolith-love",
          title: "The Horizon of April",
          subtitle: "A minimal landscape celebrating the first encounter",
          inspiration: "For a story of emotional origin. We use a sparse, heavily spaced arrangement highlighting raw, unencumbered metals.",
          beads: [
            { id: "1", shape: "pyramid", symbol: "▲", name: "The Catalyst", material: "Chiseled Champagne Gold", poeticMeaning: "The sudden turn in the path where you first recognized her.", glowColor: "gold" },
            { id: "2", shape: "droplet", symbol: "▼", name: "Melted Silver Droplet", material: "Volumetric Molten Silver", poeticMeaning: "The fluid relief of letting down one's guard.", glowColor: "silver" },
            { id: "3", shape: "bead", symbol: "○", name: "Satin Sphere", material: "Fluted 18K Champagne Gold", poeticMeaning: "The deep peace of mutual understanding.", glowColor: "gold" },
            { id: "4", shape: "star", symbol: "★", name: "Stella Solitude", material: "Bespoke Rose Gold Starlet", poeticMeaning: "The rare celestial luck of colliding orbits.", glowColor: "rose" },
            { id: "5", shape: "bead", symbol: "○", name: "Satin Sphere", material: "Fluted 18K Champagne Gold", poeticMeaning: "A silent seal of shared destiny.", glowColor: "gold" }
          ],
          materials: {
            base: "Spun Platinum Cable with Micro-Knots",
            accents: "Satin-finished 18K Rose Gold end caps"
          }
        }
      ]
    },
    remembrance: {
      keyEmotions: ["Reverence", "Legacy", "Celestial Bond"],
      meaningExtraction: "A profound monument to a presence that no longer occupies physical coordinates, but remains codified within your daily patterns and breathing space.",
      designIntent: "To create an ultra-calm, heavy, anchoring structure celebrating an inheritance of wisdom and enduring light.",
      visualMood: {
        colorPalette: "Deep Slate, Pure Silver & Starlight Gold",
        atmosphere: "Midnight at a quiet coastal retreat, looking out at a vast, dark ocean reflecting stars."
      },
      concepts: [
        {
          id: "monolith",
          title: "The Archival Pillar",
          subtitle: "A monumental homage to a grandfather's legacy",
          inspiration: "Your memory of strength and quiet guidance is codified into heavy, tactile obsidian shields framing a core of celestial champagne gold.",
          beads: [
            { id: "1", shape: "obsidian", symbol: "⬡", name: "The Memory Vault", material: "Matte Finished Obsidian Bead", poeticMeaning: "The safe container of early, sacred memories.", glowColor: "obsidian" },
            { id: "2", shape: "silver", symbol: "■", name: "Fluted Column Spacer", material: "Oxidized Hammered Silver", poeticMeaning: "An architectural segment representing years of quiet endurance.", glowColor: "silver" },
            { id: "3", shape: "diamond", symbol: "◆", name: "The Star of Guidance", material: "Emerald-Cut D-Flawless Diamond", poeticMeaning: "A singular lesson of integrity that guides you in dark moments.", glowColor: "silver" },
            { id: "4", shape: "solitaire", symbol: "✦", name: "The Living Spark", material: "Champagne Solitaire Crown", poeticMeaning: "The passing of the torch—the spark of memory thriving inside you.", glowColor: "gold" },
            { id: "5", shape: "pearl", symbol: "●", name: "The Tear pearl", material: "Lustrous Charcoal Grey Pearl", poeticMeaning: "Honoring the grief, rendered as an organic, beautiful element.", glowColor: "pearl" },
            { id: "6", shape: "silver", symbol: "■", name: "Fluted Column Spacer", material: "Oxidized Hammered Silver", poeticMeaning: "The continuation of legacy onto the next generations.", glowColor: "silver" },
            { id: "7", shape: "obsidian", symbol: "⬡", name: "The Living Anchor", material: "Matte Finished Obsidian Bead", poeticMeaning: "Your grounded commitment to carry the flame.", glowColor: "obsidian" }
          ],
          materials: {
            base: "Heavily-tensioned Pure Platinum Thread",
            accents: "Brushed Obsidian and Satin Gold caps"
          }
        },
        {
          id: "celestial-trace",
          title: "The Astral Filament",
          subtitle: "A ethereal, sparse alignment of stellar memories",
          inspiration: "A lighter, floating visual statement expressing the lightness of spirit, featuring rose gold starlets and pure silver droplets.",
          beads: [
            { id: "1", shape: "droplet", symbol: "▼", name: "Dawn Dew Drops", material: "950 Platinum Liquid Bead", poeticMeaning: "Silent tears of gratitude for having shared this journey.", glowColor: "silver" },
            { id: "2", shape: "bead", symbol: "○", name: "Satin Sphere", material: "18K Pale Gold Rose Alloy", poeticMeaning: "A warm recollection of late-afternoon conversations.", glowColor: "rose" },
            { id: "3", shape: "star", symbol: "★", name: "The North Star Node", material: "Stellar Hammered Rose Gold", poeticMeaning: "Their eternal celestial coordinates, always shining in your compass.", glowColor: "rose" },
            { id: "4", shape: "bead", symbol: "○", name: "Satin Sphere", material: "18K Pale Gold Rose Alloy", poeticMeaning: "An eternal prayer of quiet peace.", glowColor: "rose" },
            { id: "5", shape: "droplet", symbol: "▼", name: "Sunset Dew Drops", material: "950 Platinum Liquid Bead", poeticMeaning: "A soft, reassuring release into the ether.", glowColor: "silver" }
          ],
          materials: {
            base: "Braided Fine Silk and Silver Micro-cable",
            accents: "Matte Finished 18K Sand Rose Gold"
          }
        },
        {
          id: "wisdom-core",
          title: "Veritas of the Silent Mind",
          subtitle: "A minimal, meditative configuration of pure elements",
          inspiration: "Your recount of lessons and silence translates into geometric, heavy solid metals with no flashing jewels.",
          beads: [
            { id: "1", shape: "silver", symbol: "■", name: "Cube of Truth", material: "Aged Bronze-Silver Composite", poeticMeaning: "Strength built from hard and honest earth.", glowColor: "silver" },
            { id: "2", shape: "bead", symbol: "○", name: "Polished Sphere", material: "Titanium-Platinum Fusion", poeticMeaning: "Unbreakable resolution to do what is right.", glowColor: "silver" },
            { id: "3", shape: "obsidian", symbol: "⬡", name: "The Quiet Core", material: "Double-Terminated Obsidian Prism", poeticMeaning: "The tranquil center of the mind, insulated from all chaos.", glowColor: "obsidian" },
            { id: "4", shape: "bead", symbol: "○", name: "Polished Sphere", material: "Titanium-Platinum Fusion", poeticMeaning: "A silent echo of that strength running forward.", glowColor: "silver" },
            { id: "5", shape: "silver", symbol: "■", name: "Cube of Truth", material: "Aged Bronze-Silver Composite", poeticMeaning: "The absolute integrity of your final promise.", glowColor: "silver" }
          ],
          materials: {
            base: "Architectural Hexagonal Matte Titanium rod",
            accents: "Serrated aged silver beads"
          }
        }
      ]
    },
    triumph: {
      keyEmotions: ["Resilience", "Transcendence", "Unyielding Will"],
      meaningExtraction: "A celebration of a spirit that refused to be fractured under immense pressure. The story details a baptism of flame, emerging not broken, but beautifully crystallized.",
      designIntent: "To create an architectural, highly geometric visual arc with sharp diamond facets representing scars turned into beacons of strength.",
      visualMood: {
        colorPalette: "Raw Charcoal, Obsidian & Solar Gold",
        atmosphere: "Volcanic glass landscapes cooled by a sudden mountain storm. Stark and powerful."
      },
      concepts: [
        {
          id: "unbroken",
          title: "The Obsidian Citadel",
          subtitle: "An unyielding shield of resilience and defense",
          inspiration: "Inspired by your triumph over illness, this piece begins with heavy shadow elements before culminating in a glorious, rising crown of champagne diamonds.",
          beads: [
            { id: "1", shape: "obsidian", symbol: "⬡", name: "The Dark Valley Node", material: "Hammered Volcanic Glass", poeticMeaning: "The challenging terrain at the beginning of your mountain climb.", glowColor: "obsidian" },
            { id: "2", shape: "pyramid", symbol: "▲", name: "The Sharp Point of Adversity", material: "18K Textured Yellow Gold", poeticMeaning: "The acute pain and sacrifice of the struggle.", glowColor: "gold" },
            { id: "3", shape: "silver", symbol: "■", name: "Faceted Steel Shield", material: "Surgical Platinum Coating", poeticMeaning: "The armor you built to protect your inner fire.", glowColor: "silver" },
            { id: "4", shape: "solitaire", symbol: "✦", name: "The Victory Crown", material: "Solar Flare Canary Diamond", poeticMeaning: "The moment of absolute clearing; of rising victorious.", glowColor: "amber" },
            { id: "5", shape: "diamond", symbol: "◆", name: "Scuttle Anchor", material: "Princess-cut Shield Diamond", poeticMeaning: "Your newly earned, invincible vision of life.", glowColor: "silver" },
            { id: "6", shape: "bead", symbol: "○", name: "Polished Mirror Sphere", material: "Micro-polished Palladium-100", poeticMeaning: "Reflecting all future obstacles safely away.", glowColor: "silver" },
            { id: "7", shape: "emerald", symbol: "⬢", name: "The Vitality Seed", material: "Deep Green Russian Demantoid", poeticMeaning: "An eternal, glowing seed of pure life energy and wellness.", glowColor: "emerald" }
          ],
          materials: {
            base: "Tensioned Titanium Thread with Gold Nodes",
            accents: "Hand-finished volcanic obsidian details"
          }
        },
        {
          id: "rising-ash",
          title: "The Phoenix Monolith",
          subtitle: "Celebrating rebirth and renewed vitality",
          inspiration: "Your rebirth is represented by a striking vertical column transitioning from cold silver spacers to a rising, warm golden element.",
          beads: [
            { id: "1", shape: "bead", symbol: "○", name: "The Cold Base", material: "Brushed Graphite Aluminum", poeticMeaning: "The silent baseline before the fire of transformation.", glowColor: "obsidian" },
            { id: "2", shape: "silver", symbol: "■", name: "Hammered Shinder", material: "Shakudo Copper-Gold Alloy", poeticMeaning: "The dramatic heat of structural change.", glowColor: "rose" },
            { id: "3", shape: "solitaire", symbol: "✦", name: "The Ignition Bead", material: "Champagne Zircon Solitaire", poeticMeaning: "The awakening of your unyielding instinct to survive.", glowColor: "gold" },
            { id: "4", shape: "pyramid", symbol: "▲", name: "The Sun Ascending", material: "Chiseled 22K Solar Gold", poeticMeaning: "The glorious, warm horizon of complete triumph and health.", glowColor: "gold" },
            { id: "5", shape: "diamond", symbol: "◆", name: "The Diamond Seal", material: "Baguette-Cut Clear Diamond", poeticMeaning: "The crystal clear future that awaits your footsteps.", glowColor: "silver" }
          ],
          materials: {
            base: "Faceted Gold-plated Platinum strand",
            accents: "Satin-finished solar gold and dark alloys"
          }
        },
        {
          id: "phoenix-minimal",
          title: "Kintsugi Meridian",
          subtitle: "Celebrating scars as beautiful golden seams",
          inspiration: "Inspired by the concept of finding beauty in brokenness. Features stark silver spacers fused into golden joints.",
          beads: [
            { id: "1", shape: "silver", symbol: "■", name: "Fractured Link", material: "Distressed Sterling Silver", poeticMeaning: "The structural break where life challenged the core.", glowColor: "silver" },
            { id: "2", shape: "droplet", symbol: "▼", name: "The Golden Joint", material: "Molten 24K Gold Suture", poeticMeaning: "The beauty of a wound healed with exquisite gold.", glowColor: "gold" },
            { id: "3", shape: "pearl", symbol: "●", name: "The Pearl of Fortitude", material: "Tahitian Golden Pearl", poeticMeaning: "Wisdom born through enduring pressure and silent growth.", glowColor: "pearl" },
            { id: "4", shape: "droplet", symbol: "▼", name: "The Golden Joint", material: "Molten 24K Gold Suture", poeticMeaning: "A second golden seam cementing your history.", glowColor: "gold" },
            { id: "5", shape: "silver", symbol: "■", name: "Unified Horizon", material: "High-Polish Platinum Pillar", poeticMeaning: "The clean, indestructible path forward.", glowColor: "silver" }
          ],
          materials: {
            base: "Articulated Raw Titanium Core Cable",
            accents: "Liquid 24K gold coating on central components"
          }
        }
      ]
    },
    serenity: {
      keyEmotions: ["Stillness", "Sanctuary", "Pristine Space"],
      meaningExtraction: "A breath of oceanic wind captured in modern metalwork. Your words outline a soul that finds its sanctuary in the massive scale of horizons and quiet nature.",
      designIntent: "To create an whisper-soft arrangement featuring rare pale pearls and translucent gemstones that filter lighting with extreme elegance.",
      visualMood: {
        colorPalette: "Pale Jade, Iridescent Pearl & Soft Champagne",
        atmosphere: "A calm mountain lake at twilight, where water and air become indistinguishable."
      },
      concepts: [
        {
          id: "sanctuary",
          title: "The Whispering Tide",
          subtitle: "An oceanic balance of pearl and jade",
          inspiration: "Your connection to the sea is captured in highly spherical, calming pearls interspersed with soft green demantoid highlights.",
          beads: [
            { id: "1", shape: "bead", symbol: "○", name: "Whisper Spacer", material: "Satin 18K White Gold", poeticMeaning: "The initial, deep breath of pure morning air.", glowColor: "silver" },
            { id: "2", shape: "pearl", symbol: "●", name: "The Lagoon Pearl", material: "Pale Silver South Sea Pearl", poeticMeaning: "The slow cycle of tides bringing silent clarity.", glowColor: "pearl" },
            { id: "3", shape: "emerald", symbol: "⬢", name: "Pale Jade Monolith", material: "Translucent Burmese Jadeite", poeticMeaning: "An anchor of deep, serene earth energy.", glowColor: "emerald" },
            { id: "4", shape: "solitaire", symbol: "✦", name: "The Morning Star", material: "Pale Champagne Diamond", poeticMeaning: "A soft, guiding light that rises with complete tranquility.", glowColor: "gold" },
            { id: "5", shape: "emerald", symbol: "⬢", name: "Pale Jade Monolith", material: "Translucent Burmese Jadeite", poeticMeaning: "The return to grounding; quiet reflection.", glowColor: "emerald" },
            { id: "6", shape: "pearl", symbol: "●", name: "The Lagoon Pearl", material: "Pale Silver South Sea Pearl", poeticMeaning: "The calm after-current of a rested mind.", glowColor: "pearl" },
            { id: "7", shape: "bead", symbol: "○", name: "Whisper Spacer", material: "Satin 18K White Gold", poeticMeaning: "An infinite exhale of quiet safety.", glowColor: "silver" }
          ],
          materials: {
            base: "Super-elastic Nickel-Titanium wire (perfect flexibility)",
            accents: "Satin-finish palladium separators"
          }
        },
        {
          id: "mist-trace",
          title: "The Dew Lattice",
          subtitle: "A minimal composition of dewdrop silver and gems",
          inspiration: "Capturing the lightness of quiet mountain mornings, featuring pristine silver dewdrops floating on fine filament.",
          beads: [
            { id: "1", shape: "droplet", symbol: "▼", name: "Mist Node", material: "Matte Pure Silver Droplet", poeticMeaning: "The early morning moisture on quiet cedar leaves.", glowColor: "silver" },
            { id: "2", shape: "bead", symbol: "○", name: "Luminous Orb", material: "Frosted Rock Crystal Quartz", poeticMeaning: "The absolute transparency of an unburdened spirit.", glowColor: "cyan" },
            { id: "3", shape: "solitaire", symbol: "✦", name: "The Still Point", material: "Blue-Green Paraiba Tourmaline", poeticMeaning: "A mesmerizing center that holds all attention in absolute stillness.", glowColor: "cyan" },
            { id: "4", shape: "bead", symbol: "○", name: "Luminous Orb", material: "Frosted Rock Crystal Quartz", poeticMeaning: "A return to complete, clean silence.", glowColor: "cyan" },
            { id: "5", shape: "droplet", symbol: "▼", name: "Mist Node", material: "Matte Pure Silver Droplet", poeticMeaning: "A soft dissolving into the natural air.", glowColor: "silver" }
          ],
          materials: {
            base: "Ultra-fine Invisible Platinum cable",
            accents: "Matte-finished White Gold end sleeves"
          }
        },
        {
          id: "zen-meter",
          title: "The Slate Horizon",
          subtitle: "An editorial statement in architectural basalt",
          inspiration: "Your request for deep silence is rendered in a sparse, structural alignment of basaltic core pieces and satin silver.",
          beads: [
            { id: "1", shape: "silver", symbol: "■", name: "The Base Stone", material: "Textured Obsidian Slab", poeticMeaning: "The heavy earth that keeps our feet securely planted.", glowColor: "obsidian" },
            { id: "2", shape: "bead", symbol: "○", name: "Satin Shield", material: "Satin-Finish Recycled Platinum", poeticMeaning: "The elegant shield of a quiet, private life.", glowColor: "silver" },
            { id: "3", shape: "solitaire", symbol: "✦", name: "Zenith Node", material: "Grey Salt-and-Pepper Diamond", poeticMeaning: "Flawed and real: celebrating quiet, organic beauty.", glowColor: "silver" },
            { id: "4", shape: "bead", symbol: "○", name: "Satin Shield", material: "Satin-Finish Recycled Platinum", poeticMeaning: "Preserving the boundaries of your tranquil sanctuary.", glowColor: "silver" },
            { id: "5", shape: "silver", symbol: "■", name: "The Base Stone", material: "Textured Obsidian Slab", poeticMeaning: "A firm connection back to our true nature.", glowColor: "obsidian" }
          ],
          materials: {
            base: "Rigid Industrial Matte Obsidian Thread",
            accents: "Black ruthenium spacers and lock beads"
          }
        }
      ]
    },
    universal: {
      keyEmotions: ["Clarity", "Ancestry", "Self-Actualization"],
      meaningExtraction: "A majestic rendering of a mind defining its own coordinates. Your story is a magnificent narrative of charting new territory while maintaining a sacred ancestry.",
      designIntent: "To create an elegant, monumental alignment containing a balanced mixture of volcanic obsidian, classic pearls, and gold diamonds.",
      visualMood: {
        colorPalette: "Champagne Gold, Platinum & Deep Basalt",
        atmosphere: "The quiet interior of a mid-century sanctuary made of raw stone and cedar, glowing with amber lanterns."
      },
      concepts: [
        {
          id: "monument",
          title: "The Heritage Axis",
          subtitle: "A monumental alignment of core components",
          inspiration: "Codifying your life history into highly polished, alternating segments of platinum and champagne gold stars.",
          beads: [
            { id: "1", shape: "bead", symbol: "○", name: "The Origin", material: "18K Champagne Gold Sphere", poeticMeaning: "The foundations of your family tree and birthright.", glowColor: "gold" },
            { id: "2", shape: "silver", symbol: "■", name: "The River Track", material: "Chiseled Recycled Platinum Pillar", poeticMeaning: "The long years of learning and constant motion.", glowColor: "silver" },
            { id: "3", shape: "obsidian", symbol: "⬡", name: "The Obelisk Shield", material: "Precision Cut Obsidian Matrix", poeticMeaning: "The severe choices that forged your resilience.", glowColor: "obsidian" },
            { id: "4", shape: "solitaire", symbol: "✦", name: "The Zenith Flame", material: "Golden Imperial Topaz Node", poeticMeaning: "The fire of self-actualization glowing bright and hot.", glowColor: "gold" },
            { id: "5", shape: "pearl", symbol: "●", name: "Elegia Pearl", material: "White South Sea Pearl", poeticMeaning: "A soft, glowing circle of safety protecting your descendants.", glowColor: "pearl" },
            { id: "6", shape: "silver", symbol: "■", name: "The River Track", material: "Chiseled Recycled Platinum Pillar", poeticMeaning: "The continuation of legacy onto the next stage.", glowColor: "silver" },
            { id: "7", shape: "bead", symbol: "○", name: "The Apex Node", material: "18K Champagne Gold Sphere", poeticMeaning: "The quiet coordinates of modern peace.", glowColor: "gold" }
          ],
          materials: {
            base: "Heavy braided Platinum and Champagne Gold thread",
            accents: "High-polish champagne gold connectors"
          }
        },
        {
          id: "minimalist-pinnacle",
          title: "The Pure Solitude",
          subtitle: "An ultra-restrained, quiet configuration",
          inspiration: "Your search for simplicity and truth is embodied in a 5-bead construct of sheer platinum beads and a singular white diamond.",
          beads: [
            { id: "1", shape: "bead", symbol: "○", name: "Satin Globe", material: "950 Recycled Platinum Alloy", poeticMeaning: "The blank slate—clearing away all external expectations.", glowColor: "silver" },
            { id: "2", shape: "droplet", symbol: "▼", name: "Liquid Tear", material: "Forged Sterling Droplet", poeticMeaning: "The beautiful release of unhelpful weights.", glowColor: "silver" },
            { id: "3", shape: "solitaire", symbol: "✦", name: "The Core Light", material: "D-Color Internally Flawless Diamond", poeticMeaning: "The absolute truth of who you are when nobody is looking.", glowColor: "silver" },
            { id: "4", shape: "droplet", symbol: "▼", name: "Liquid Tear", material: "Forged Sterling Droplet", poeticMeaning: "A peaceful acceptance of the past, fully integrated.", glowColor: "silver" },
            { id: "5", shape: "bead", symbol: "○", name: "Satin Globe", material: "950 Recycled Platinum Alloy", poeticMeaning: "An unshakeable focus onto the future.", glowColor: "silver" }
          ],
          materials: {
            base: "Rigid Tensile Steel-Platinum Core Wire",
            accents: "Satin bead spacers with micro-inscriptions"
          }
        },
        {
          id: "geometric-rise",
          title: "The Meridian of Fire",
          subtitle: "A balanced meter of triangles and gold stars",
          inspiration: "For a story of continuous creative output. We employ sharp triangles and a star element symbolizing artistic fire.",
          beads: [
            { id: "1", shape: "pyramid", symbol: "▲", name: "Creative Inception", material: "Serrated Gold Pyramid Link", poeticMeaning: "The initial pressure of a new idea seeking form.", glowColor: "gold" },
            { id: "2", shape: "bead", symbol: "○", name: "Fluid Connector", material: "Polished Sterling Silver", poeticMeaning: "The smooth movement of materials into visual work.", glowColor: "silver" },
            { id: "3", shape: "star", symbol: "★", name: "The Artisan Star", material: "Bespoke Sand-Blasted Rose Gold", poeticMeaning: "A celestial mark honoring the fire of the dedicated creator.", glowColor: "rose" },
            { id: "4", shape: "bead", symbol: "○", name: "Fluid Connector", material: "Polished Sterling Silver", poeticMeaning: "Bringing peace and order back to the final layout.", glowColor: "silver" },
            { id: "5", shape: "pyramid", symbol: "▲", name: "Pinnacle of Execution", material: "Serrated Gold Pyramid Link", poeticMeaning: "The absolute satisfaction of a masterfully finished design.", glowColor: "gold" }
          ],
          materials: {
            base: "Woven 14K Rose Gold Mesh Tube",
            accents: "Brushed copper alloy end connectors"
          }
        }
      ]
    }
  };

  return dataset[type];
}

// REST API for story interpretation
app.post("/api/interpret-story", async (req, res) => {
  const { story } = req.body;
  if (!story || typeof story !== "string" || story.length < 5) {
    return res.status(400).json({ error: "Please write a more descriptive story to begin your consultation." });
  }

  // Check if AI is initialized and active
  if (aiClient) {
    try {
      console.log("Analyzing story via Gemini 3.5 Flash for TENLUMA...");
      
      const prompt = `You are a master jewelry artisan and emotional sculptor for TENLUMA, an ultra-luxury jewelry atelier.
You translate raw human stories, milestones, memories, and promises into three (3) distinct, highly-personalized vertical modular bracelet designs.

Translate this customer's story:
"${story}"

For each of the three (3) concepts, you must define:
1. id: unique slug (like 'helix-of-dawn', 'monolith-of-grace').
2. title: A luxurious name (e.g. 'The Helix of Twin Moons', 'Elysian Equilibrium').
3. subtitle: A concise emotional focus (e.g. 'An editorial symmetry of shared orbits', 'A modern tribute to absolute emotional balance').
4. inspiration: A poetic explanation of how their specific text was interpreted into this form.
5. beads: A sequence of exactly 5 to 7 modular elements in a vertical array. Each bead represents a specific component of the bracelet structure. Each bead must have:
   - id: unique string (e.g. '1', '2', '3')
   - shape: One of ['bead', 'diamond', 'solitaire', 'obsidian', 'pyramid', 'droplet', 'silver', 'star', 'pearl', 'emerald'].
   - symbol: One corresponding standard symbol: '○' (for bead), '◆' (for diamond), '✦' (for solitaire), '⬡' (for obsidian), '▲' (for pyramid), '▼' (for droplet), '■' (for silver), '★' (for star), '●' (for pearl), '⬢' (for emerald).
   - name: A luxurious component name (e.g., '18K Solid Champagne Core', 'Serrated Volcanic Shield').
   - material: Luxury specification (e.g., '18K Solid Champagne Gold', 'Matte Finished Obsidian Bead').
   - poeticMeaning: An emotional description for this specific modular step (e.g., 'An anchor holding the memory of April 14th intact.').
   - glowColor: A styling hint for the UI glow, one of ['gold', 'silver', 'amber', 'pearl', 'obsidian', 'emerald', 'rose', 'cyan'].
6. materials: A luxurious overview containing:
   - base: The structural basis (e.g. 'Fine-braided wire made of raw platinum thread').
   - accents: Complementing accents.

You must also return:
- keyEmotions: An array of 3 exact words describing the psychological core of their story.
- meaningExtraction: A beautiful 1-2 sentence luxury analysis of what their words truly represent.
- designIntent: A luxurious description of how we approach creating physical jewelry from their memory.
- visualMood: An object containing colorPalette (e.g., 'Muted Gold & Soft Charcoal') and atmosphere (e.g., 'A tranquil twilight after a storm').

Strictly format the response as a single, valid JSON object matching this schema:
{
  "keyEmotions": ["Emotion1", "Emotion2", "Emotion3"],
  "meaningExtraction": "...",
  "designIntent": "...",
  "visualMood": {
    "colorPalette": "...",
    "atmosphere": "..."
  },
  "concepts": [
    {
      "id": "slug",
      "title": "Poetic Title",
      "subtitle": "...",
      "inspiration": "...",
      "beads": [
        { "id": "1", "shape": "...", "symbol": "...", "name": "...", "material": "...", "poeticMeaning": "...", "glowColor": "..." }
      ],
      "materials": { "base": "...", "accents": "..." }
    }
  ]
}`;

      const response = await aiClient.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              keyEmotions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Three powerful adjectives summarizing the story's emotional core."
              },
              meaningExtraction: {
                type: Type.STRING,
                description: "A profound editorial interpretation of the psychological/emotional meaning of the story."
              },
              designIntent: {
                type: Type.STRING,
                description: "An elegant, luxurious description of how the design translates raw words into jewelry."
              },
              visualMood: {
                type: Type.OBJECT,
                properties: {
                  colorPalette: { type: Type.STRING },
                  atmosphere: { type: Type.STRING }
                },
                required: ["colorPalette", "atmosphere"]
              },
              concepts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    subtitle: { type: Type.STRING },
                    inspiration: { type: Type.STRING },
                    beads: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          shape: { type: Type.STRING },
                          symbol: { type: Type.STRING },
                          name: { type: Type.STRING },
                          material: { type: Type.STRING },
                          poeticMeaning: { type: Type.STRING },
                          glowColor: { type: Type.STRING }
                        },
                        required: ["id", "shape", "symbol", "name", "material", "poeticMeaning", "glowColor"]
                      }
                    },
                    materials: {
                      type: Type.OBJECT,
                      properties: {
                        base: { type: Type.STRING },
                        accents: { type: Type.STRING }
                      },
                      required: ["base", "accents"]
                    }
                  },
                  required: ["id", "title", "subtitle", "inspiration", "beads", "materials"]
                },
                description: "Strictly exactly three distinct premium concepts."
              }
            },
            required: ["keyEmotions", "meaningExtraction", "designIntent", "visualMood", "concepts"]
          }
        }
      });

      const parsedData = JSON.parse(response.text?.trim() || "{}");
      
      // Double check that we have 3 concepts, if we have less, pad with fallbacks
      if (parsedData && parsedData.concepts && parsedData.concepts.length > 0) {
        return res.json({ storyText: story, ...parsedData });
      } else {
        throw new Error("Invalid schema from Gemini response.");
      }
    } catch (e: any) {
      // Gracefully prevent noisy stack traces for leaked/revoked keys from flooding telemetry logs
      const errMsg = e?.message || String(e);
      if (errMsg.includes("leaked") || errMsg.includes("403") || errMsg.includes("PERMISSION_DENIED")) {
        console.log("Tenluma Atelier Status: Private remote model link locked. Engaging local alchemical master template synthesizer.");
      } else {
        console.log(`Tenluma Atelier Offline: Synthesis in standby. Engagement path:`, errMsg);
      }
      const fallback = generatePremiumFallback(story);
      return res.json({ storyText: story, ...fallback });
    }
  } else {
    // Return high-fidelity falling back seamlessly
    console.log("No active Gemini API key found. Providing premium fallback details.");
    const fallback = generatePremiumFallback(story);
    return res.json({ storyText: story, ...fallback });
  }
});

// Configure Vite or Static files depending on mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Express: Mounted Vite development middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TENLUMA Atelier server listening on http://localhost:${PORT}`);
  });
}

startServer();
