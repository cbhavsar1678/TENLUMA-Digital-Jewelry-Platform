import { useState, useEffect } from "react";
import { PRESET_STORIES, UX_STRATEGY } from "./data";
import { StoryAnalysis, DesignConcept, ModularBead } from "./types";
import { 
  Sparkles, 
  ArrowRight, 
  Maximize2, 
  Compass, 
  Map, 
  BookOpen, 
  Sliders, 
  Cpu, 
  FileCode, 
  Check, 
  ChevronRight, 
  FolderGit2, 
  RotateCcw, 
  Lock, 
  Info,
  Layers,
  Phone,
  Bookmark,
  Activity,
  Heart,
  User,
  Mail,
  ChevronDown,
  ExternalLink,
  Scissors
} from "lucide-react";

export default function App() {
  // Application State
  const [activeScreen, setActiveScreen] = useState<"home" | "loading" | "concepts" | "detail">("home");
  const [storyText, setStoryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [analysis, setAnalysis] = useState<StoryAnalysis | null>(null);
  
  // Customization State
  const [selectedConcept, setSelectedConcept] = useState<DesignConcept | null>(null);
  const [selectedBead, setSelectedBead] = useState<ModularBead | null>(null);
  const [customSize, setCustomSize] = useState("18cm");
  const [customBraid, setCustomBraid] = useState("Braided 18K Champagne Gold Thread");
  const [customEngraving, setCustomEngraving] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [consultationBooked, setConsultationBooked] = useState(false);
  
  // Strategy Panel State
  const [showSpecDrawer, setShowSpecDrawer] = useState(false);
  const [activeSpecTab, setActiveSpecTab] = useState<string>("strategy");
  const [notification, setNotification] = useState<string | null>(null);

  // Loading Steps Narrative
  const LOADING_MESSAGES = [
    "Receiving raw memory transmission...",
    "Extracting emotional core coordinates...",
    "Scanning literary metrics & syntactic weight...",
    "Crystallizing metallic response elements...",
    "Forging premium modular bracelet alignment...",
    "Polishing tailored 3D jewelry triptych..."
  ];

  // Auto-clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeScreen === "loading") {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= LOADING_MESSAGES.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [activeScreen]);

  // Handle Story Transmutation Trigger
  const handleTransmute = async (textToTransmute: string) => {
    if (!textToTransmute || textToTransmute.trim().length < 5) {
      setNotification("Please offer a slightly more descriptive story to align the jewelry alchemy correctly.");
      return;
    }

    setStoryText(textToTransmute);
    setActiveScreen("loading");
    setIsLoading(true);

    try {
      const response = await fetch("/api/interpret-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story: textToTransmute }),
      });
      
      const data = await response.json();
      
      // Delay slightly for high-end cinematic suspense
      setTimeout(() => {
        setAnalysis(data);
        if (data.concepts && data.concepts.length > 0) {
          setSelectedConcept(data.concepts[0]);
          setSelectedBead(data.concepts[0].beads[Math.floor(data.concepts[0].beads.length / 2)]);
        }
        setActiveScreen("concepts");
        setIsLoading(false);
      }, 4200);

    } catch (e) {
      console.error("Transmutation API error", e);
      setIsLoading(false);
      setActiveScreen("home");
    }
  };

  // Preset quick fill
  const handleSelectPreset = (text: string) => {
    setStoryText(text);
  };

  // Select concept
  const selectVariant = (concept: DesignConcept) => {
    setSelectedConcept(concept);
    setSelectedBead(concept.beads[Math.floor(concept.beads.length / 2)]);
  };

  // Render customizable vector SVG for each gemstone / gold metal bead
  const renderBeadGlyph = (bead: ModularBead, isActive: boolean = false) => {
    const activeRingColors: Record<string, string> = {
      gold: "border-[#C8A26A] shadow-[0_0_15px_rgba(200,162,106,0.5)]",
      silver: "border-[#F4F4F2] shadow-[0_0_15px_rgba(244,244,242,0.4)]",
      amber: "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]",
      pearl: "border-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.4)]",
      obsidian: "border-[#171717] shadow-[0_0_15px_rgba(23,23,23,0.8)]",
      emerald: "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
      rose: "border-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)]",
      cyan: "border-cyan-200 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
    };

    const gradientId = `grad-${bead.id}`;

    switch (bead.shape) {
      case "bead": // ○
        return (
          <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`}>
            <svg className="w-9 h-9" viewBox="0 0 32 32">
              <defs>
                <radialGradient id={gradientId} cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8"/>
                  <stop offset="50%" stopColor="#C8A26A"/>
                  <stop offset="100%" stopColor="#3A2E1A"/>
                </radialGradient>
              </defs>
              <circle cx="16" cy="16" r="11" fill={`url(#${gradientId})` || "#C8A26A"} />
              <circle cx="16" cy="16" r="11" stroke="#FFFFFF" strokeOpacity="0.1" fill="none" strokeWidth="0.5" />
            </svg>
          </div>
        );

      case "diamond": // ◆
        return (
          <div className={`w-14 h-14 border flex items-center justify-center rotate-45 transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`}>
            <div className="rotate-[-45deg] flex items-center justify-center">
              <svg className="w-7 h-7" viewBox="0 0 32 32">
                <path d="M16 2 L28 16 L16 30 L4 16 Z" fill="#F4F4F2" fillOpacity="0.85" stroke="#FFFFFF" strokeWidth="0.5" />
                <line x1="16" y1="2" x2="16" y2="30" stroke="#000000" strokeOpacity="0.15" strokeWidth="0.5" />
                <line x1="4" y1="16" x2="28" y2="16" stroke="#000000" strokeOpacity="0.15" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        );

      case "solitaire": // ✦
        return (
          <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`}>
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#C8A26A]/20 rounded-full blur-xs"></div>
              <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5Z" fill="#FFF" fillOpacity="0.95" />
                <circle cx="12" cy="12" r="1.5" fill="#C8A26A" />
              </svg>
            </div>
          </div>
        );

      case "obsidian": // ⬡
        return (
          <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`} style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}>
            <svg className="w-10 h-10" viewBox="0 0 32 32">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#333333" />
                  <stop offset="50%" stopColor="#111111" />
                  <stop offset="100%" stopColor="#050505" />
                </linearGradient>
              </defs>
              <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" fill={`url(#${gradientId})`} />
              <polygon points="16,6 26,11 26,21 16,26 6,21 6,11" fill="none" stroke="#555" strokeWidth="0.5" strokeOpacity="0.4" />
            </svg>
          </div>
        );

      case "pyramid": // ▲
        return (
          <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`} style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}>
            <svg className="w-10 h-10 translate-y-1" viewBox="0 0 32 32">
              <polygon points="16,4 30,28 2,28" fill="#C8A26A" fillOpacity="0.8" />
              <line x1="16" y1="4" x2="16" y2="28" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="0.75" />
              <line x1="16" y1="4" x2="2" y2="28" stroke="#000" strokeOpacity="0.2" strokeWidth="0.5" />
              <line x1="16" y1="4" x2="30" y2="28" stroke="#000" strokeOpacity="0.2" strokeWidth="0.5" />
            </svg>
          </div>
        );

      case "droplet": // ▼
        return (
          <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`}>
            <svg className="w-9 h-9" viewBox="0 0 32 32">
              <defs>
                <radialGradient id={gradientId} cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
                  <stop offset="60%" stopColor="#DFDFD9"/>
                  <stop offset="100%" stopColor="#80807c"/>
                </radialGradient>
              </defs>
              <path d="M16 4 C16 4 25 14 25 21 C25 26 21 30 16 30 C11 30 7 26 7 21 C7 14 16 4 16 4 Z" fill={`url(#${gradientId})`} />
            </svg>
          </div>
        );

      case "silver": // ■
        return (
          <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`}>
            <svg className="w-9 h-9" viewBox="0 0 32 32">
              <rect x="5" y="5" width="22" height="22" fill="#EAEAEA" rx="2" />
              <rect x="8" y="8" width="16" height="16" fill="none" stroke="#999" strokeWidth="0.5" />
              <circle cx="16" cy="16" r="3" fill="#C8A26A" fillOpacity="0.7" />
            </svg>
          </div>
        );

      case "star": // ★
        return (
          <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`}>
            <svg className="w-8 h-8" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.858 1.4-8.168L.132 9.21l8.2-1.192z" fill="#D4AF37" />
            </svg>
          </div>
        );

      case "pearl": // ●
        return (
          <div className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`}>
            <svg className="w-10 h-10" viewBox="0 0 32 32">
              <defs>
                <radialGradient id={gradientId} cx="35%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#FFF" />
                  <stop offset="50%" stopColor="#F9F5EF" />
                  <stop offset="85%" stopColor="#E2D6C5" />
                  <stop offset="100%" stopColor="#C4B39C" />
                </radialGradient>
              </defs>
              <circle cx="16" cy="16" r="11" fill={`url(#${gradientId})`} />
              <circle cx="16" cy="16" r="11" stroke="#FFF" strokeWidth="0.5" strokeOpacity="0.25" fill="none" />
            </svg>
          </div>
        );

      case "emerald": // ⬢
        return (
          <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${isActive ? activeRingColors[bead.glowColor] : "border-[#E8E3DB]/15 bg-[#171717]/80 hover:border-[#C8A26A]/40"}`} style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}>
            <svg className="w-10 h-10" viewBox="0 0 32 32">
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="60%" stopColor="#047857" />
                  <stop offset="100%" stopColor="#064E3B" />
                </linearGradient>
              </defs>
              <polygon points="8,2 24,2 32,16 24,30 8,30 0,16" fill={`url(#${gradientId})`} />
              <polygon points="11,5 21,5 26,16 21,27 11,27 6,16" fill="none" stroke="#FFF" strokeWidth="0.5" strokeOpacity="0.2" />
            </svg>
          </div>
        );

      default:
        return (
          <div className="w-10 h-10 rounded-full bg-[#C8A26A] flex items-center justify-center">
            <span className="text-[#0B0B0B] font-bold text-xs">{bead.symbol}</span>
          </div>
        );
    }
  };

  // Static preview vertical structure for homepage idle hero (mimics Geometric Balance preview HTML)
  const renderInteractiveStaticVerticalBracelet = () => {
    return (
      <div className="flex flex-col items-center gap-6 z-10 animate-float relative">
        <div className="w-12 h-12 border border-[#F4F4F2]/40 rounded-full flex items-center justify-center bg-[#0B0B0B] shadow-[0_0_25px_rgba(200,162,106,0.15)]">
          <div className="w-4 h-4 bg-[#F4F4F2] rounded-full opacity-90"></div>
        </div>
        <div className="w-10 h-10 border border-[#C8A26A]/60 flex items-center justify-center rotate-45 bg-[#0B0B0B]">
          <div className="w-3 h-3 bg-[#C8A26A] opacity-80"></div>
        </div>
        <div className="w-14 h-14 border border-[#F4F4F2]/30 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border border-[#F4F4F2]/20 rounded-full flex items-center justify-center">
             <div className="w-4 h-[1px] bg-[#F4F4F2] rotate-45 opacity-50"></div>
          </div>
        </div>
        <div className="w-12 h-20 border border-[#C8A26A]/30 rounded-full flex items-center justify-center bg-[#171717]">
          <div className="w-6 h-6 border-2 border-[#C8A26A] rounded-sm rotate-12"></div>
        </div>
        <div className="w-10 h-10 border border-[#F4F4F2]/40 rounded-full flex items-center justify-center bg-[#0B0B0B]">
          <div className="w-4 h-4 border border-[#F4F4F2] opacity-60"></div>
        </div>
        <div className="w-16 h-16 relative flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-[#F4F4F2]/20"></div>
          <div className="w-6 h-6 bg-[#C8A26A] rotate-45 opacity-40 blur-sm"></div>
          <div className="w-4 h-4 bg-[#F4F4F2] rotate-45"></div>
        </div>
        <div className="w-10 h-10 border border-[#C8A26A]/40 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-[#C8A26A] rounded-full"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#E8E3DB] flex flex-col font-sans-luxury selection:bg-[#C8A26A]/30 selection:text-[#E8E3DB] relative overflow-x-hidden">
      
      {/* EXQUISITE ATELIER NOTIFICATION MESSAGE */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] bg-[#171717]/95 border border-[#C8A26A] p-4 shadow-[0_4px_30px_rgba(200,162,106,0.3)] flex items-start gap-3 rounded-md transition-all">
          <Info className="w-5 h-5 text-[#C8A26A] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-mono-luxury text-[#C8A26A] font-bold">Atelier Message</p>
            <p className="text-xs text-white mt-1 leading-relaxed">{notification}</p>
          </div>
          <button 
            onClick={() => setNotification(null)} 
            className="text-white/40 hover:text-white text-xs px-2 py-0.5 font-bold hover:bg-[#C8A26A]/10 border border-transparent rounded transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
      
      {/* BACKGROUND REFLECTIVE AMBIENT LAYER */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#C8A26A]/5 to-[#0B0B0B] blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] left-[-15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F4F4F2]/3 to-[#0B0B0B] blur-[100px] pointer-events-none z-0"></div>

      {/* LUXURY NAVIGATION */}
      <nav id="tenluma-nav" className="sticky top-0 z-40 flex justify-between items-center px-6 md:px-12 py-6 border-b border-[#E8E3DB]/10 bg-[#0B0B0B]/90 backdrop-blur-md">
        <div className="flex gap-4 md:gap-8 text-[11px] uppercase tracking-[0.3em] text-[#E8E3DB]/60">
          <button onClick={() => { setActiveScreen("home"); }} className="hover:text-[#C8A26A] transition-colors cursor-pointer">The Maison</button>
          <button onClick={() => { setShowSpecDrawer(true); setActiveSpecTab("strategy"); }} className="hover:text-[#C8A26A] transition-colors cursor-pointer hidden sm:inline-block">Strategy Deck</button>
        </div>
        <div 
          onClick={() => { setActiveScreen("home"); }} 
          className="text-2xl md:text-3xl tracking-[0.4em] font-light text-[#C8A26A] cursor-pointer hover:opacity-90 font-serif-luxury"
          title="TENLUMA: Where Your Words Become Jewelry"
        >
          TENLUMA
        </div>
        <div className="flex gap-4 md:gap-8 text-[11px] uppercase tracking-[0.3em] items-center">
          <button onClick={() => { setShowSpecDrawer(true); }} className="hover:text-[#C8A26A] text-[#C8A26A] transition-colors flex items-center gap-1.5 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Design System</span>
          </button>
          <div className="w-[1px] h-4 bg-[#E8E3DB]/20 hidden sm:block"></div>
          <button 
            onClick={() => {
              // Scroll to bottom consultation area or direct trigger
              if (analysis) {
                setActiveScreen("detail");
              } else {
                handleTransmute(PRESET_STORIES[0].text);
              }
            }}
            className="text-[#C8A26A] border border-[#C8A26A]/40 px-3 md:px-5 py-2 hover:bg-[#C8A26A]/10 transition-all text-[9px] md:text-[11px] cursor-pointer"
          >
            Private Atelier
          </button>
        </div>
      </nav>

      {/* STRATEGY BOOK / SPECIFICATIONS DRAWER (BEHANCE / INVESTOR GRADE DECK) */}
      {showSpecDrawer && (
        <div className="fixed inset-0 bg-[#0B0B0B]/95 z-50 overflow-y-auto flex justify-center p-4 md:p-10 backdrop-blur-lg">
          <div className="w-full max-w-6xl bg-[#171717] border border-[#C8A26A]/25 rounded-lg flex flex-col shadow-[0_0_50px_rgba(200,162,106,0.15)] my-auto max-h-[90vh]">
            
            {/* Header */}
            <div className="flex justify-between items-center px-6 md:px-8 py-5 border-b border-[#E8E3DB]/10">
              <div>
                <p className="text-[#C8A26A] text-[10px] tracking-[0.4em] uppercase font-mono-luxury">Figma Design Portal &amp; Brand Blueprint</p>
                <h3 className="text-2xl font-light italic font-serif-luxury mt-1 text-[#E8E3DB]">Luxury Consultation Architecture Specifications</h3>
              </div>
              <button 
                onClick={() => setShowSpecDrawer(false)} 
                className="text-[#E8E3DB]/50 hover:text-white px-3 py-1.5 border border-[#E8E3DB]/10 hover:border-[#C8A26A]/50 transition-all text-xs uppercase tracking-[0.2em] bg-black/40 rounded-sm"
              >
                Close Portal
              </button>
            </div>

            {/* Inner Tabs navigation */}
            <div className="flex overflow-x-auto border-b border-[#E8E3DB]/10 bg-[#0B0B0B]/65 p-2 gap-1 md:gap-2">
              {[
                { id: "strategy", label: "01. Brand Strategy", icon: Compass },
                { id: "ia", label: "02. Arch & Hierarchy", icon: Map },
                { id: "userflow", label: "03. User Journey Map", icon: Activity },
                { id: "wireframes", label: "04 & 05. Wireframing", icon: Sliders },
                { id: "palette", label: "06 & 07. Design System", icon: Layers },
                { id: "figma", label: "08. Figma Components", icon: Bookmark },
                { id: "handoff", label: "09 & 10. Developer Handoff", icon: FileCode }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSpecTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-[11px] tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${activeSpecTab === tab.id ? "bg-[#C8A26A]/15 text-[#C8A26A] border-b-2 border-[#C8A26A] font-semibold" : "text-[#E8E3DB]/50 hover:text-[#E8E3DB] hover:bg-black/20"}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content Segment */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 text-sm leading-relaxed text-[#E8E3DB]/80">
              
              {/* TAB 1: STRATEGY */}
              {activeSpecTab === "strategy" && (
                <div className="space-y-6">
                  <div className="border-l-2 border-[#C8A26A] pl-4 mb-4">
                    <span className="text-[#C8A26A] text-[11px] font-mono-luxury uppercase tracking-[0.2em]">Core Brand Essence</span>
                    <h4 className="text-xl font-light font-serif-luxury text-white italic">{UX_STRATEGY.brandContext.title}</h4>
                    <p className="text-xs text-[#C8A26A] mt-0.5 tracking-[0.1em] uppercase font-sans-luxury">"{UX_STRATEGY.brandContext.tagline}"</p>
                  </div>
                  <p className="italic text-base font-light text-[#E8E3DB]/90 leading-relaxed max-w-4xl">
                    {UX_STRATEGY.brandContext.positioning}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-black/30 p-5 border border-[#E8E3DB]/5 rounded-md">
                      <h5 className="text-[#C8A26A] text-xs uppercase tracking-[0.2em] font-bold mb-3">Customer Empathy Profile (The Storygiver)</h5>
                      <div className="space-y-4">
                        {UX_STRATEGY.empathyMapping.map((map, i) => (
                          <div key={i} className="border-b border-[#E8E3DB]/5 pb-3 last:border-0 last:pb-0">
                            <p className="font-semibold text-xs text-white uppercase tracking-wider mb-1">{map.phase}</p>
                            <p className="text-xs text-[#E8E3DB]/70 mb-1"><strong className="text-[#C8A26A]">Core Query:</strong> "{map.thinking}"</p>
                            <p className="text-xs text-[#E8E3DB]/70"><strong className="text-[#C8A26A]">Psychological State:</strong> {map.feeling}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/30 p-5 border border-[#E8E3DB]/5 rounded-md">
                      <h5 className="text-[#C8A26A] text-xs uppercase tracking-[0.2em] font-bold mb-3">Luxury Design Signatures</h5>
                      <ul className="space-y-2.5 text-xs text-[#E8E3DB]/70">
                        <li><strong className="text-white">Editorial Restraint:</strong> White spacing mimics the luxury grid layout of high-end Aman resorts. No noisy 'add to cart' or discount tags.</li>
                        <li><strong className="text-white">Vertical Signature:</strong> The vertical modular alignment acts as a physical monument to time, representing the slow chronological flow of life.</li>
                        <li><strong className="text-white">The Atomic Transmutation:</strong> AI serves strictly as any master craftsman's interpreter—not a tech gimmick, but a tool of high empathy.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: IA */}
              {activeSpecTab === "ia" && (
                <div className="space-y-6">
                  <h4 className="text-lg font-light font-serif-luxury text-white">Interactive Site Map &amp; Information Architecture</h4>
                  <p className="text-xs text-[#E8E3DB]/60">TENLUMA enforces a linear, ultra-curated informational sequence matching premium boutique consultation practices.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    {UX_STRATEGY.informationArchitecture.siteHierarchy.map((index, i) => (
                      <div key={i} className="bg-black/30 p-5 border border-[#C8A26A]/20 rounded-md relative">
                        <div className="absolute top-3 right-3 text-[10px] font-mono-luxury text-[#C8A26A]/40 font-bold">STAGE {i+1}</div>
                        <h5 className="font-serif-luxury text-white italic text-base mb-2 select-none">{index.page}</h5>
                        <p className="text-xs text-[#E8E3DB]/70 leading-relaxed font-sans-luxury">{index.details}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#0B0B0B] p-4 border border-[#E8E3DB]/10 rounded-sm mt-6 text-xs font-mono-luxury text-[#C8A26A]/80">
                    <span className="text-[10px] text-white/50 block mb-1">DATA FLOW ENGINE PATHWAYS:</span>
                    {UX_STRATEGY.informationArchitecture.consultationFlow}
                  </div>
                </div>
              )}

              {/* TAB 3: USERFLOW */}
              {activeSpecTab === "userflow" && (
                <div className="space-y-6">
                  <h4 className="text-lg font-light font-serif-luxury text-white">Full Transmutation User Flow Schema</h4>
                  <p className="text-xs text-[#E8E3DB]/60">Detailed blueprint illustrating the emotional state transition as client stories transmute from code bytes into high fine-jewelry elements:</p>

                  <div className="relative border-l border-[#C8A26A]/30 ml-3 space-y-8 my-6">
                    {UX_STRATEGY.userFlow.steps.map((flow, idx) => (
                      <div key={idx} className="relative pl-8">
                        {/* Dot */}
                        <div className="absolute left-[-6px] top-1 w-3 h-3 rounded-full bg-[#0B0B0B] border-2 border-[#C8A26A] flex items-center justify-center">
                          <div className="w-1 h-1 bg-[#C8A26A] rounded-full"></div>
                        </div>
                        <h5 className="font-mono-luxury text-[#C8A26A] text-xs uppercase tracking-wider">{flow.name}</h5>
                        <p className="text-xs text-white/80 mt-1 font-sans-luxury">{flow.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: WIREFRAMES */}
              {activeSpecTab === "wireframes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-base uppercase tracking-wider font-semibold text-white">Desktop Grid Blueprint (12-Col)</h4>
                    <p className="text-xs text-[#E8E3DB]/70">{UX_STRATEGY.wireframeLayouts.desktop.grid}</p>
                    <div className="bg-black/50 p-4 rounded border border-[#E8E3DB]/10 font-mono-luxury text-[11px] leading-relaxed text-[#E8E3DB]/50">
                      {UX_STRATEGY.wireframeLayouts.desktop.sections}
                    </div>

                    <div className="border border-[#C8A26A]/30 p-4 bg-black/20 rounded-md">
                      <span className="text-[11px] font-bold text-[#C8A26A] uppercase block mb-1">Visual Focal Target</span>
                      <p className="text-xs text-[#E8E3DB]/70">The right half of the main screen serves as an unbroken vertical canvas holding the modular structure. Hovering across distinct nodes animates contextual memory tags dynamically.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-base uppercase tracking-wider font-semibold text-white">Mobile Grid Blueprint (Single-Col Fluid)</h4>
                    <p className="text-xs text-[#E8E3DB]/70">{UX_STRATEGY.wireframeLayouts.mobile.grid}</p>
                    <div className="bg-black/50 p-4 rounded border border-[#E8E3DB]/10 font-mono-luxury text-[11px] leading-relaxed text-[#E8E3DB]/50">
                      {UX_STRATEGY.wireframeLayouts.mobile.sections}
                    </div>

                    <div className="border border-[#C8A26A]/30 p-4 bg-black/20 rounded-md">
                      <span className="text-[11px] font-bold text-[#C8A26A] uppercase block mb-1">Interaction Architecture</span>
                      <p className="text-xs text-[#E8E3DB]/70">A custom bottom-sheet overlay replaces standard modals, supporting continuous thumb-friendly navigation and immediate tactile material swapping.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: DESIGN SYSTEM */}
              {activeSpecTab === "palette" && (
                <div className="space-y-6">
                  <h4 className="text-lg font-light font-serif-luxury text-white">The TENLUMA Design Tokens</h4>
                  
                  {/* Colors */}
                  <div>
                    <h5 className="text-xs uppercase tracking-widest text-[#C8A26A] mb-3 font-semibold">I. Color Direction Spec</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {UX_STRATEGY.designSystem.palette.map((color, i) => (
                        <div key={i} className="bg-black/30 p-3 border border-white/5 rounded">
                          <div className="h-10 rounded mb-2 border border-white/10" style={{ backgroundColor: color.value }}></div>
                          <p className="text-xs font-bold text-white uppercase">{color.name}</p>
                          <p className="text-[10px] font-mono-luxury text-[#C8A26A]">{color.value}</p>
                          <p className="text-[10px] text-[#E8E3DB]/50 mt-1 lines-clamp-3 leading-snug">{color.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typography */}
                  <div className="pt-4 border-t border-[#E8E3DB]/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-[#C8A26A] mb-2 font-semibold">II. Display Typography (Maison Headings)</h5>
                      <div className="bg-black/20 p-4 border border-white/5 rounded-md">
                        <p className="font-serif-luxury text-2xl italic tracking-wider text-white">Cormorant Garamond</p>
                        <p className="text-xs font-mono-luxury text-[#C8A26A] mt-1">{UX_STRATEGY.designSystem.typography.headline.styles}</p>
                        <div className="mt-3 text-white/40 font-serif-luxury text-sm italic leading-none">
                          Where Your Words Become Jewelry. The Golden Compass of a Quiet Spirit.
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-[#C8A26A] mb-2 font-semibold">III. Body &amp; Metrics Text (Technical Readout)</h5>
                      <div className="bg-black/20 p-4 border border-white/5 rounded-md">
                        <p className="font-sans text-lg tracking-wide text-white">Inter / Neue Haas Grotesk</p>
                        <p className="text-xs font-mono-luxury text-[#C8A26A] mt-1">{UX_STRATEGY.designSystem.typography.body.styles}</p>
                        <div className="mt-3 text-white/40 font-sans text-xs leading-none">
                          Champagne Gold Base Chain. Recycled Platinum bezel spacers. VVS1 gemstones.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: FIGMA CONFIG */}
              {activeSpecTab === "figma" && (
                <div className="space-y-6">
                  <h4 className="text-lg font-light font-serif-luxury text-white">Figma-Ready Component Library &amp; Variant Tokens</h4>
                  <p className="text-xs text-[#E8E3DB]/60">Organized according to strict atomic design disciplines, facilitating swift designers-to-engineers transitions:</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {UX_STRATEGY.figmaArchitecture.structure.map((item, i) => (
                      <div key={i} className="bg-black/30 p-5 border border-[#C8A26A]/20 rounded relative">
                        <h5 className="text-white font-mono-luxury text-xs font-bold uppercase mb-2">{item.name}</h5>
                        <p className="text-xs text-white/75 font-sans-luxury">{item.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: HANDOFF */}
              {activeSpecTab === "handoff" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-light font-serif-luxury text-white mb-2">Motion &amp; Cinematic Transition Principles</h4>
                      <p className="text-xs text-[#E8E3DB]/60 mb-4">Animations serve to slow down user actions, preparing their psychological space for a sacred consulting experience.</p>
                      <div className="space-y-3">
                        {UX_STRATEGY.motionGuidelines.principles.map((pr, i) => (
                          <div key={i} className="p-4 bg-black/20 border border-white/5 rounded">
                            <p className="text-xs font-bold text-white uppercase tracking-wide">{pr.name}</p>
                            <p className="text-xs text-[#E8E3DB]/60 mt-0.5">{pr.spec}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-light font-serif-luxury text-white mb-2">Developer Handoff Specifications</h4>
                      <p className="text-xs text-[#E8E3DB]/60 mb-4">Technical benchmarks required to implement the TENLUMA system flawlessly on Retina screens.</p>
                      <div className="space-y-3">
                        {UX_STRATEGY.developerHandoff.specifications.map((dev, i) => (
                          <div key={i} className="p-4 bg-black/20 border border-white/5 rounded">
                            <p className="text-xs font-bold text-[#C8A26A] uppercase tracking-wide">{dev.name}</p>
                            <p className="text-xs text-[#E8E3DB]/60 mt-0.5 font-mono-luxury">{dev.spec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* SCREEN 01 & SCREEN 02: THE ATELIER WORKSPACE (LANDING & ENTRY AREA) */}
      {activeScreen === "home" && (
        <main className="flex-1 flex flex-col lg:flex-row items-center px-6 md:px-12 py-10 lg:py-2 z-10 max-w-7xl mx-auto w-full gap-12 lg:gap-6">
          
          {/* Left Block: Narrative input Arena */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8 justify-center">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A26A] animate-pulse"></span>
                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-mono-luxury text-[#C8A26A]">The Digital Consultation Suite</p>
              </div>
              <h1 className="text-4xl xs:text-5xl md:text-7xl leading-[1.05] font-light italic font-serif-luxury max-w-xl text-white">
                Where Your Words <br className="hidden sm:inline" />Become Jewelry
              </h1>
              <p className="text-lg md:text-xl font-sans-luxury font-extralight text-[#E8E3DB]/70 max-w-md mt-4 leading-relaxed">
                Write your story. See your bracelet. <br className="hidden sm:inline" />Made as genuine high jewelry.
              </p>
            </div>

            {/* Micro-narrative Prompts Segment */}
            <div className="space-y-2 mt-2 bg-[#171717]/40 p-4 border border-[#E8E3DB]/5 rounded-sm">
              <span className="text-[10px] text-[#C8A26A] uppercase tracking-[0.2em] font-medium block mb-2">Atelier Inspiration Presets:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_STORIES.map((storyPreset, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectPreset(storyPreset.text)}
                    className="text-left text-xs p-3 hover:bg-[#C8A26A]/10 bg-black/40 border border-[#E8E3DB]/10 hover:border-[#C8A26A]/50 transition-all rounded p-2.5"
                  >
                    <div className="font-semibold text-white mb-0.5">{storyPreset.title}</div>
                    <div className="text-slate-400 text-[10px] line-clamp-2">{storyPreset.short}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Segment */}
            <div className="relative space-y-4">
              <textarea 
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                className="w-full bg-transparent border-b border-[#E8E3DB]/30 py-4 focus:outline-none focus:border-[#C8A26A] resize-none font-light text-base md:text-lg italic placeholder:text-[#E8E3DB]/20 h-40 transition-colors"
                placeholder="Tell us the story of a lifetime milestone, vow, loss, or triumph that you never want to let fade..."
              ></textarea>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button 
                  onClick={() => handleTransmute(storyText)}
                  className="flex items-center gap-4 group cursor-pointer text-left w-fit"
                >
                  <div className="w-12 h-12 rounded-full border border-[#C8A26A] flex items-center justify-center group-hover:bg-[#C8A26A] transition-all bg-[#0B0B0B]">
                    <Sparkles className="w-4 h-4 text-[#C8A26A] group-hover:text-[#0B0B0B] transition-colors" />
                  </div>
                  <div>
                    <span className="hover:text-[#C8A26A] uppercase tracking-[0.4em] text-[12px] font-sans-luxury block font-semibold text-white">Start Your Story</span>
                    <span className="text-[10px] text-zinc-500 font-mono-luxury font-light">Initiate Transmutation</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => setShowSpecDrawer(true)} 
                  className="uppercase tracking-[0.4em] text-[10px] font-sans-luxury text-[#E8E3DB]/50 border-b border-[#E8E3DB]/20 hover:border-[#C8A26A] hover:text-[#C8A26A] pt-1 text-left w-fit transition-colors"
                >
                  How It Works &amp; Architecture Spec
                </button>
              </div>
            </div>

          </div>

          {/* Right Block: Pure vertical structural jewel element */}
          <div className="w-full lg:w-1/2 h-[500px] lg:h-[650px] relative flex justify-center items-center">
            {/* Ambient gold path */}
            <div className="absolute w-[1.5px] h-[75%] bg-gradient-to-b from-transparent via-[#C8A26A]/30 to-transparent z-0"></div>
            
            {/* Standard illustrative floating modular piece */}
            {renderInteractiveStaticVerticalBracelet()}

            {/* Vertical Chapter Indicator Tags - High Aesthetic Editorial */}
            <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2">
              <div className="flex flex-col gap-12 text-right">
                <div className="flex flex-col items-end gap-1 select-none">
                  <span className="text-[10px] text-[#C8A26A] tracking-[0.2em] uppercase font-mono-luxury">Chapter I</span>
                  <span className="text-[11px] font-light tracking-[0.1em] uppercase text-zinc-400 italic">Promise</span>
                </div>
                <div className="flex flex-col items-end gap-1 select-none">
                  <span className="text-[10px] text-[#C8A26A] tracking-[0.2em] uppercase font-mono-luxury">Chapter II</span>
                  <span className="text-[11px] font-light tracking-[0.1em] uppercase text-zinc-400 italic">Horizon</span>
                </div>
                <div className="flex flex-col items-end gap-1 select-none">
                  <span className="text-[10px] text-[#C8A26A] tracking-[0.2em] uppercase font-mono-luxury">Chapter III</span>
                  <span className="text-[11px] font-light tracking-[0.1em] uppercase text-zinc-400 italic">Eternal</span>
                </div>
              </div>
            </div>

            {/* Absolute positioning of the premium consultative badge */}
            <div className="absolute left-2 md:left-8 bottom-4 flex items-center gap-3 bg-black/60 border border-[#E8E3DB]/10 px-4 py-3 rounded-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#C8A26A] font-bold">Atelier Core Active</p>
                <p className="text-[10px] text-zinc-400">Gemini-Engine Connected</p>
              </div>
            </div>
          </div>

        </main>
      )}

      {/* SCREEN 03: LUXURY AI STORY INTERPRETATION & TRANSLATION ENGINE */}
      {activeScreen === "loading" && (
        <main className="flex-1 flex flex-col justify-center items-center px-6 py-20 z-15 text-center max-w-xl mx-auto w-full">
          <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
            {/* Concentric rotating gold rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C8A26A]/30 animate-spin" style={{ animationDuration: "12s" }}></div>
            <div className="absolute inset-2 rounded-full border border-double border-[#F4F4F2]/20 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }}></div>
            <div className="w-10 h-10 border border-[#C8A26A]/50 flex items-center justify-center rotate-45 bg-[#0B0B0B] shadow-[0_0_20px_rgba(200,162,106,0.3)]">
              <Sparkles className="w-5 h-5 text-[#C8A26A] animate-pulse" />
            </div>
          </div>

          <p className="text-[11px] tracking-[0.5em] uppercase text-[#C8A26A] font-mono-luxury">Emotional Transmutation sequence</p>
          <h2 className="text-3xl font-light font-serif-luxury text-white italic mt-3 mb-6 transition-all">
            {LOADING_MESSAGES[loadingStep]}
          </h2>
          
          <div className="w-full bg-[#171717] h-[2px] rounded-full overflow-hidden relative">
            <div 
              className="bg-[#C8A26A] h-full transition-all duration-700 ease-out shadow-[0_0_8px_#C8A26A]"
              style={{ width: `${((loadingStep + 1) / LOADING_MESSAGES.length) * 100}%` }}
            ></div>
          </div>

          <p className="text-xs text-zinc-500 font-sans-luxury italic mt-4 max-w-sm">
            "Your memory resides momentarily as binary fragments, undergoing distillation into noble metals and crystalline geometries."
          </p>
        </main>
      )}

      {/* SCREEN 03 (POST ANALYSIS RESULTS) & SCREEN 04 (BRACELET DESIGN CONCEPTS TRIPTYCH) */}
      {activeScreen === "concepts" && analysis && (
        <main className="flex-1 px-4 md:px-12 py-10 z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
          
          {/* Section: Emotional Distillation Block */}
          <section className="bg-[#171717]/60 border border-[#C8A26A]/20 p-6 md:p-8 rounded-sm relative">
            <div className="absolute right-4 top-4 font-mono-luxury text-[10px] text-[#C8A26A]/40 uppercase tracking-[0.1em] border border-[#C8A26A]/10 px-2.5 py-1">
              Atelier Archive Log: #{Math.floor(Math.random() * 90000) + 10000}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left text */}
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#C8A26A] font-mono-luxury block">Emotional Interpretation</span>
                <h2 className="text-3xl font-light font-serif-luxury italic text-white">"Your memory exists beautifully under our lens"</h2>
                
                <p className="text-sm font-light text-zinc-300 italic max-w-3xl leading-relaxed">
                  "{analysis.meaningExtraction}"
                </p>

                <div className="flex flex-wrap gap-4 items-center pt-2">
                  <span className="text-[11px] tracking-wider uppercase text-zinc-400 font-mono-luxury">Extracted Emotions:</span>
                  {analysis.keyEmotions.map((emo, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-black/60 border border-[#C8A26A]/30 text-[#C8A26A] rounded-full text-xs font-serif-luxury italic tracking-wide"
                    >
                      ✦ {emo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right panel */}
              <div className="lg:col-span-4 bg-black/40 p-4 border border-zinc-800 rounded-sm space-y-2 text-xs">
                <div>
                  <span className="text-[#C8A26A] font-semibold block uppercase tracking-wider text-[10px]">Atelier Atmosphere Match:</span>
                  <p className="text-zinc-300 italic">{analysis.visualMood.atmosphere}</p>
                </div>
                <div className="pt-2 border-t border-zinc-800/60">
                  <span className="text-[#C8A26A] font-semibold block uppercase tracking-wider text-[10px]">Tonal Palette:</span>
                  <p className="text-zinc-300 font-semibold">{analysis.visualMood.colorPalette}</p>
                </div>
                <div className="pt-2 border-t border-zinc-800/60">
                  <span className="text-[#C8A26A] font-semibold block uppercase tracking-wider text-[10px]">Artisan Strategy:</span>
                  <p className="text-zinc-400 leading-snug">{analysis.designIntent}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Bracelet Concepts Deck (THE TRIPTYCH CARDS) */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 pb-2 border-b border-zinc-800">
              <div>
                <p className="text-[#C8A26A] text-[10px] tracking-[0.4em] uppercase font-mono-luxury">Transmuted Concept Triptych</p>
                <h3 className="text-2xl font-light font-serif-luxury italic text-white mt-1">Select A Design Direction To Fully Personalize</h3>
              </div>
              <div className="text-xs text-zinc-400 font-light italic">
                No Mass Retail Grids • Built as modular luxury consultations
              </div>
            </div>

            {/* THREE COLUMN DESIGN DECK */}
            <div id="triptych-deck" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysis.concepts.map((concept) => {
                const isSelected = selectedConcept?.id === concept.id;
                return (
                  <div
                    key={concept.id}
                    onClick={() => selectVariant(concept)}
                    className={`bg-[#171717] border rounded-md transition-all duration-500 cursor-pointer p-5 flex flex-col justify-between relative select-none hover:-translate-y-1 ${isSelected ? "border-[#C8A26A] shadow-[0_0_30px_rgba(200,162,106,0.15)]" : "border-[#E8E3DB]/10 hover:border-zinc-700 bg-zinc-900/60"}`}
                  >
                    {/* Active highlight tag */}
                    {isSelected && (
                      <span className="absolute top-4 right-4 bg-[#C8A26A] text-[#0B0B0B] text-[9px] font-mono-luxury font-bold px-2 py-0.5 uppercase tracking-widest rounded-sm">
                        Selected Masterpiece
                      </span>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] tracking-[0.2em] font-mono-luxury uppercase text-[#C8A26A]">Concept Formula</span>
                        <h4 className="text-xl font-serif-luxury italic font-light text-white mt-0.5">{concept.title}</h4>
                        <p className="text-xs text-zinc-400 font-light italic mt-1 line-clamp-2">{concept.subtitle}</p>
                      </div>

                      {/* INLINE VERTICAL BRACELET VIEW */}
                      <div className="py-6 flex justify-center relative bg-black/40 rounded-sm border border-black/30 overflow-hidden">
                        {/* Center gold track line */}
                        <div className="absolute w-[1px] h-[85%] bg-gradient-to-b from-transparent via-[#C8A26A]/30 to-transparent left-1/2 -translate-x-1/2"></div>
                        
                        <div className="flex flex-col items-center gap-3.5 relative z-10 py-2">
                          {concept.beads.map((bead) => (
                            <div 
                              key={bead.id} 
                              className="group/node relative"
                              title={`${bead.name}: ${bead.material}`}
                            >
                              {renderBeadGlyph(bead, false)}
                              {/* Hover Tooltip inside concept card */}
                              <div className="absolute left-1/2 -translate-x-1/2 top-[-10px] bg-black bg-opacity-95 text-[#E8E3DB] text-[9px] px-2 py-1 border border-[#C8A26A]/40 rounded pointer-events-none opacity-0 group-hover/node:opacity-100 transition-opacity whitespace-nowrap z-30">
                                {bead.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <p className="text-zinc-400 line-clamp-3 leading-relaxed">
                          <strong className="text-white font-sans-luxury">The Muse:</strong> {concept.inspiration}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/85 mt-4 flex items-center justify-between text-xs font-mono-luxury text-[#C8A26A]">
                      <span>{concept.beads.length} Modular Beads</span>
                      <div className="flex items-center gap-1">
                        <span>Details &amp; Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Transition to next major step */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  if (selectedConcept) {
                    setActiveScreen("detail");
                  }
                }}
                className="bg-[#C8A26A] text-[#0B0B0B] hover:bg-[#E8E3DB] hover:text-[#0B0B0B] transition-colors border border-transparent font-medium tracking-[0.3em] uppercase text-xs px-8 py-4 cursor-pointer shadow-[0_0_20px_rgba(200,162,106,0.2)] flex items-center gap-2 rounded-sm"
              >
                Assemble Selected Concept Detail
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </main>
      )}

      {/* SCREEN 05: SELECTED DESIGN DETAIL - MASTER CRAFTSMANSHIP READOUT & BOOKING */}
      {activeScreen === "detail" && selectedConcept && (
        <main className="flex-1 px-4 md:px-12 py-8 z-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
          
          <button 
            onClick={() => setActiveScreen("concepts")}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-[#C8A26A] transition-colors uppercase tracking-[0.2em] w-fit cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Back to Triptych Deck
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* COLUMN 1: MONOTYPICAL ROTATING RENDER WORKSPACE */}
            <div className="lg:col-span-5 flex flex-col items-center bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-md relative select-none">
              
              <div className="absolute top-4 left-4">
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono-luxury text-zinc-500">Visualization Block</span>
                <h4 className="text-lg font-serif-luxury italic text-white mt-0.5">{selectedConcept.title}</h4>
              </div>

              {/* Glowing vertical cord */}
              <div className="absolute w-[2px] h-[80%] bg-gradient-to-b from-transparent via-[#C8A26A]/40 to-transparent left-1/2 -translate-x-1/2 top-14"></div>
              
              <div className="py-20 flex flex-col items-center gap-6 relative z-10">
                {selectedConcept.beads.map((bead) => (
                  <button 
                    key={bead.id}
                    onClick={() => setSelectedBead(bead)}
                    className="group relative transition-all duration-300 hover:scale-110 active:scale-95"
                    title="Click node to inspect emotional lineage"
                  >
                    {/* Glowing highlight loop if it is selected in detail inspect card */}
                    {selectedBead?.id === bead.id && (
                      <span className="absolute inset-[-6px] rounded-full border border-[#C8A26A]/40 animate-ping"></span>
                    )}
                    {renderBeadGlyph(bead, selectedBead?.id === bead.id)}
                  </button>
                ))}
              </div>

              {/* Interaction instructions */}
              <p className="text-[10px] text-zinc-500 tracking-[0.1em] text-center font-mono-luxury flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-sm border border-white/5">
                <Info className="w-3.5 h-3.5 text-[#C8A26A]" /> Click any bead component node to view emotional lineage
              </p>

            </div>

            {/* COLUMN 2: CUSTOM CRAFTSMAN OBJECTIVES OR SPECIFICS */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Active Bead Detail Card (THE NARRATIVE EXTRACTION OVERVIEW) */}
              {selectedBead && (
                <div className="bg-[#171717] border border-[#C8A26A]/35 p-6 rounded-sm relative">
                  <div className="absolute top-4 right-4 bg-[#C8A26A]/10 text-[#C8A26A] text-[9px] font-mono-luxury px-2.5 py-1 uppercase tracking-widest border border-[#C8A26A]/20">
                    Bead Formula Node
                  </div>

                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono-luxury text-zinc-500">Atomic Component Spotlight</span>
                  
                  <div className="flex items-center gap-4 mt-3 mb-2">
                    {renderBeadGlyph(selectedBead, true)}
                    <div>
                      <h4 className="text-xl font-serif-luxury italic text-white">{selectedBead.name}</h4>
                      <p className="text-xs text-[#C8A26A]">{selectedBead.material}</p>
                    </div>
                  </div>

                  <div className="bg-black/30 p-4 border border-zinc-800 rounded mt-3">
                    <p className="text-xs text-zinc-400 tracking-wider uppercase font-semibold">Alchemical Meaning &amp; Vow Connection:</p>
                    <p className="text-sm font-light text-slate-200 mt-1 italic">
                      "{selectedBead.poeticMeaning || "A structural segment representing absolute purity and commitment in your custom storyline timeline."}"
                    </p>
                  </div>
                </div>
              )}

              {/* Bracelet Custom Specs Form */}
              <div className="bg-zinc-900/60 p-6 rounded-md border border-zinc-800/85 space-y-4">
                <h4 className="text-xs uppercase tracking-[0.3em] font-sans-luxury text-white border-b border-zinc-800 pb-2">Atelier Fine Material Configuration</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Option 1: Base Thread Material */}
                  <div className="space-y-1.5 text-xs text-left">
                    <label className="text-[#C8A26A] tracking-wider uppercase text-[10px] font-semibold">Bracelet Core Foundation Chain</label>
                    <select 
                      value={customBraid}
                      onChange={(e) => setCustomBraid(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-zinc-800 focus:border-[#C8A26A] p-2 rounded text-zinc-300 focus:outline-none"
                    >
                      <option value="Braided 18K Champagne Gold Thread">Braided 18K Champagne Gold Cord ($1,450)</option>
                      <option value="Rigid High-Polish 950 Platinum Rod">Rigid High-Polish 950 Platinum Strand ($2,200)</option>
                      <option value="Woven Surgical Fine Titanium Wire">Woven Surgical Fine Titanium Grid ($1,100)</option>
                    </select>
                  </div>

                  {/* Option 2: Sizing Scale */}
                  <div className="space-y-1.5 text-xs text-left">
                    <label className="text-[#C8A26A] tracking-wider uppercase text-[10px] font-semibold">Bracelet Physical Diameter (Sizing)</label>
                    <select 
                      value={customSize}
                      onChange={(e) => setCustomSize(e.target.value)}
                      className="w-full bg-[#0B0B0B] border border-zinc-800 focus:border-[#C8A26A] p-2 rounded text-zinc-300 focus:outline-none"
                    >
                      <option value="16cm">16cm (Atelier Petite Standard)</option>
                      <option value="17cm">17cm (Atelier Medium Standard)</option>
                      <option value="18cm">18cm (Atelier Classic Unisex)</option>
                      <option value="19cm">19cm (Atelier Large Unisex)</option>
                      <option value="20cm">20cm (Atelier Extra Large Monumental)</option>
                    </select>
                  </div>
                </div>

                {/* Option 3: Engraving Request */}
                <div className="space-y-1.5 text-xs">
                  <label className="text-[#C8A26A] tracking-wider uppercase text-[10px] font-semibold flex items-center gap-1">
                    <Scissors className="w-3.5 h-3.5" /> Inner Atelier Micro-Engraving (Max 18 characters)
                  </label>
                  <input 
                    type="text" 
                    maxLength={18}
                    value={customEngraving}
                    onChange={(e) => setCustomEngraving(e.target.value)}
                    placeholder="e.g., April 19, 1994, Positano orbits..."
                    className="w-full bg-[#0B0B0B] border border-zinc-800 focus:outline-none focus:border-[#C8A26A] p-2 rounded italic text-zinc-300"
                  />
                  <span className="text-[10px] text-zinc-500 block text-right font-mono-luxury">{customEngraving.length}/18 characters utilized</span>
                </div>

                <div className="bg-[#0B0B0B] p-4 border border-zinc-800 rounded text-xs text-zinc-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Base Selected Core Construct:</span>
                    <span className="text-[#E8E3DB]">Standard Luxury Atelier Edition</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Structural Metal Frame:</span>
                    <span className="text-white font-mono-luxury">Recycled Swiss Quality</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Gemstones Carat Yield:</span>
                    <span className="text-[#C8A26A] font-mono-luxury">1.84ct VVS / Elite Color</span>
                  </div>
                </div>
              </div>

              {/* Private Consultation Booking Form */}
              <div className="bg-black border border-amber-600/20 p-6 rounded-md relative overflow-hidden">
                <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-[#C8A26A]/5 rounded-full pointer-events-none filter blur-2xl"></div>
                
                <h4 className="text-xl font-serif-luxury italic text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#C8A26A]" /> Schedule Private Atelier Consultation
                </h4>
                <p className="text-xs text-zinc-400 font-light mt-1 mb-4 leading-relaxed">
                  We don't support simple supermarket checkout bins. Your custom modular construct is prepared for hand-finishing under our Paris &amp; Geneva master jewelers. Request a quotation along with a hand-drawn rendering of your story piece.
                </p>

                {consultationBooked ? (
                  <div className="bg-[#C8A26A]/10 border border-[#C8A26A] p-5 rounded text-center space-y-2 animate-fade-in text-white">
                    <Check className="w-8 h-8 text-[#C8A26A] mx-auto" />
                    <h5 className="font-serif-luxury italic text-lg font-bold">Atelier Appointment Registered</h5>
                    <p className="text-xs text-zinc-300 max-w-md mx-auto">
                      Greetings {clientName || "Valued Client"}. Your consultation voucher for the <strong>{selectedConcept.title}</strong> has been secure-hashed to: <span className="font-mono-luxury text-[#C8A26A]">TL-APPT-{Math.floor(Math.random()*90000)+10000}</span>.
                    </p>
                    <p className="text-xs text-zinc-400">Our Private Concierge will reach out to schedule your video call within 12 standard business hours.</p>
                    <button 
                      onClick={() => setConsultationBooked(false)}
                      className="mt-2 text-xs uppercase tracking-widest text-[#C8A26A] underline"
                    >
                      Configure another voucher
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if(!clientName || !clientEmail) {
                        setNotification("Please offer both client name and secure communication email to schedule your consultation.");
                        return;
                      }
                      setConsultationBooked(true);
                    }}
                    className="space-y-3 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-zinc-500 uppercase tracking-widest text-[9px] block font-semibold">Client Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                          <input 
                            type="text" 
                            required
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder="e.g., Charlotte de Beausoleil" 
                            className="w-full bg-[#171717] border border-zinc-800 p-2 pl-9 focus:outline-none focus:border-[#C8A26A] rounded text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-zinc-500 uppercase tracking-widest text-[9px] block font-semibold">Secure Communication Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                          <input 
                            type="email" 
                            required
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="e.g., charlotte@reverie.fr" 
                            className="w-full bg-[#171717] border border-zinc-800 p-2 pl-9 focus:outline-none focus:border-[#C8A26A] rounded text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#C8A26A] text-[#0B0B0B] hover:bg-[#E8E3DB] hover:text-[#0B0B0B] font-bold uppercase tracking-[0.2em] py-3.5 rounded transition-all cursor-pointer shadow-[0_4px_12px_rgba(200,162,106,0.2)] flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4" /> Finalize Atelier Request &amp; Obtain Quote
                    </button>
                    
                    <span className="text-[9px] text-zinc-500 block text-center font-mono-luxury">
                      🔐 Encrypted Safe Connection • Standard Atelier Rules Enforced
                    </span>
                  </form>
                )}

              </div>

            </div>

          </div>

        </main>
      )}

      {/* LUXURY EDITORIAL FOOTER */}
      <footer className="mt-auto border-t border-[#E8E3DB]/10 px-6 md:px-12 py-8 bg-[#0B0B0B] z-10 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-sans-luxury uppercase tracking-[0.4em] text-[#E8E3DB]/40">
          <div className="flex gap-6 md:gap-12 flex-wrap justify-center">
            <span>Paris Atelier • Place Vendôme</span>
            <span>Geneva Studio • Rue du Rhône</span>
            <span>Kyoto Lodge • Gion Higashiyama</span>
          </div>
          <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
            <button onClick={() => { setShowSpecDrawer(true); }} className="hover:text-[#C8A26A] cursor-pointer">Bespoke Blueprint &amp; Specs</button>
            <span className="hidden xs:inline">•</span>
            <a href="#" className="hover:text-[#C8A26A]">Heritage</a>
            <span className="hidden xs:inline">•</span>
            <a href="#" className="hover:text-[#C8A26A]">Privacy Vault</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
