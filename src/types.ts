export interface ModularBead {
  id: string;
  shape: 'bead' | 'diamond' | 'solitaire' | 'obsidian' | 'pyramid' | 'droplet' | 'silver' | 'star' | 'pearl' | 'emerald';
  symbol: string; // e.g. "✦"
  name: string; // e.g. "Solitude Star"
  material: string; // e.g. "18K Champagne Gold"
  poeticMeaning: string; // e.g. "Representing the brilliant point of clarity in your journey"
  glowColor: string; // styles
}

export interface DesignConcept {
  id: string;
  title: string;
  subtitle: string;
  inspiration: string;
  beads: ModularBead[];
  materials: {
    base: string;
    accents: string;
  };
}

export interface StoryAnalysis {
  storyText: string;
  keyEmotions: string[];
  meaningExtraction: string;
  designIntent: string;
  visualMood: {
    colorPalette: string;
    atmosphere: string;
  };
  concepts: DesignConcept[];
}
