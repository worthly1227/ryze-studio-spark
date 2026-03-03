import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check, X, Play, Star, ArrowRight, Sparkles, ChevronRight, ChevronDown,
  Zap, Shield, Users, MessageSquare, Calendar, Crown,
  Heart, MessageCircle, Send, Bookmark, TrendingUp, BarChart3,
  ImageIcon, BookOpen, Palette, Plus, Volume2,
  CalendarDays, Lightbulb, Globe, LayoutGrid
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

/* ─── PRICING TIERS DATA ─── */
const subscriptionTiers = [
  {
    name: "Entry Level Pass",
    price: 10,
    tagline: "Best for early stage brands testing premium visuals.",
    icon: Zap,
    features: [
      { text: "1 AI Product Edit", included: true },
      { text: "Standard Processing", included: true },
      { text: "Email Support", included: true },
      { text: "UGC Video", included: false },
      { text: "Managed Social Posting", included: false },
      { text: "Strategy Calls", included: false },
      { text: "Priority Queue", included: false },
      { text: "Unlimited AI", included: false },
    ],
  },
  {
    name: "Visual Starter Kit",
    price: 110,
    tagline: "For consistent brand visuals.",
    icon: Sparkles,
    features: [
      { text: "10 AI Product Edits", included: true },
      { text: "Standard Processing", included: true },
      { text: "Email Support", included: true },
      { text: "UGC Video", included: false },
      { text: "Managed Social Posting", included: false },
      { text: "Strategy Calls", included: false },
      { text: "Priority Queue", included: false },
      { text: "Unlimited AI", included: false },
    ],
  },
  {
    name: "Viral Growth",
    price: 240,
    tagline: "Performance focused content.",
    icon: Users,
    popular: true,
    features: [
      { text: "1 UGC Video", included: true },
      { text: "5 AI Product Edits", included: true },
      { text: "Standard Processing", included: true },
      { text: "Email Support", included: true },
      { text: "Managed Social Posting", included: false },
      { text: "Strategy Calls", included: false },
      { text: "Priority Queue", included: false },
      { text: "Unlimited AI", included: false },
    ],
  },
  {
    name: "Full Brand Manager",
    price: 299,
    tagline: "Structured social execution.",
    icon: Shield,
    features: [
      { text: "Managed Social Posting", included: true },
      { text: "20 AI Edits", included: true },
      { text: "1 UGC Video", included: true },
      { text: "Standard Processing", included: true },
      { text: "Live Chat Support", included: true },
      { text: "Strategy Calls", included: false },
      { text: "Priority Queue", included: false },
      { text: "Unlimited AI", included: false },
    ],
  },
  {
    name: "Done For You",
    price: 499,
    tagline: "Full creative outsourcing.",
    icon: Calendar,
    features: [
      { text: "Full Content Batch", included: true },
      { text: "Strategic Direction", included: true },
      { text: "AI + UGC Mix", included: true },
      { text: "Managed Social Posting", included: true },
      { text: "Strategy Call Booking", included: true },
      { text: "Fast Track Processing", included: true },
      { text: "Unlimited AI", included: false },
      { text: "Priority Queue", included: false },
    ],
  },
  {
    name: "Master Production",
    price: 679,
    tagline: "High volume scaling.",
    icon: Crown,
    premium: true,
    features: [
      { text: "Unlimited AI Edits", included: true },
      { text: "Premium UGC Priority", included: true },
      { text: "Full Content Batch", included: true },
      { text: "Strategic Direction", included: true },
      { text: "Managed Social Posting", included: true },
      { text: "Priority Queue", included: true },
      { text: "Strategy Access", included: true },
      { text: "Priority Strategy Access", included: true },
      { text: "Instant Processing", included: true },
    ],
  },
];

const addOns = [
  { name: "Extra AI Product Image", price: "$10", unit: "per final download", desc: "Generate unlimited variations and only pay for the final image you choose.", icon: ImageIcon },
  { name: "30-Second UGC Video", price: "$99", unit: "", desc: "Professionally produced social media-ready video featuring vetted creators.", icon: Play },
  { name: "Short Video (<20 sec)", price: "$59", unit: "", desc: "Quick, attention-grabbing clips optimized for Reels, TikTok, and social posts.", icon: TrendingUp },
  { name: "Strategic Consultancy", price: "$225", unit: "", desc: "A 45-minute one-on-one session to guide your brand strategy and growth planning.", icon: Lightbulb },
  { name: "Website Templates", price: "$999", unit: "each", desc: "Pre-built, fully branded Ryze designs that integrate seamlessly with your content.", icon: Globe },
];

const comparisonData = [
  { feature: "Cost Basis", agency: "High Retainers ($2k+)", ai: "Monthly Subscriptions for credits", ryze: "$10 Pay-Per-Product" },
  { feature: "Product Integrity", agency: "Manual (Human Error)", ai: "High Distortion (AI Hallucinations)", ryze: "100% Geometry Lock" },
  { feature: "Production", agency: "Studio/Physical Setup", ai: "Background Swaps Only", ryze: "AI Production Factory" },
  { feature: "Turnaround", agency: "2 to 4 Weeks", ai: "Minutes (Low Quality)", ryze: "High-Speed Luxury Output" },
  { feature: "Strategy", agency: "$5k+ Monthly Commit", ai: "None (DIY)", ryze: "On-Demand $225 Sessions" },
  { feature: "Design", agency: "Hired Designer Needed", ai: "Manual Templates", ryze: "Editorial Layouts Built-In" },
];

const gridIndustries = ["Beauty", "Skincare", "Real Estate", "Dental Clinic", "Food Products", "Yoga"];
const gridEmojis: Record<string, string> = { Beauty: "💅", Skincare: "🧴", "Real Estate": "🏠", "Dental Clinic": "🦷", "Food Products": "🍔", Yoga: "🧘" };

const beforeAfterClients = ["SpinSudz", "KokoKai Foods LLC", "Crystal Imagery", "True North Wellness", "No Place Like Home", "Darkhorse Solutions"];

const featureTabs = ["Services", "Onboarding", "Communication", "Collaboration", "Scheduling", "Analytics"];
const featureContent: Record<string, { title: string; desc: string }> = {
  Services: { title: "Choose & Customize", desc: "Browse our full service catalog and build your perfect creative package, tailored to your brand." },
  Onboarding: { title: "Quick Setup", desc: "Get started in minutes with our guided onboarding flow. We learn your brand voice and visual identity." },
  Communication: { title: "Real-time Chat", desc: "Message your dedicated team directly. Get updates, share feedback, and stay in the loop." },
  Collaboration: { title: "Easy Collaboration", desc: "Review, approve, and request revisions all in one place with our collaboration dashboard." },
  Scheduling: { title: "Schedule & Post", desc: "We handle scheduling and posting for you across your social channels, ensuring consistency." },
  Analytics: { title: "Track Performance", desc: "Monitor your content performance with detailed analytics and insights to optimize your strategy." },
};

const faqItems = [
  { q: "How much does it cost?", a: "Plans start at just $10/month for the Entry Level Pass. Choose the tier that fits your needs and scale up anytime." },
  { q: "Why are you so affordable?", a: "Our AI-powered production pipeline eliminates the overhead of traditional agencies while maintaining premium quality." },
  { q: "Where is the Ryze team located?", a: "We're a distributed global team with creative talent across North America, Europe, and Asia." },
  { q: "How do I get started?", a: "Simply choose a plan, complete onboarding (takes ~5 minutes), and your first content is in production." },
  { q: "What happens after I sign up?", a: "You'll be guided through brand onboarding, then your account manager begins producing content immediately." },
  { q: "How will I communicate with your team?", a: "Through our built-in chat system, scheduled calls (on qualifying tiers), and email support." },
];

/* ─── REUSABLE COMPONENTS ─── */

const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current || !dragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden cursor-col-resize select-none border border-border"
      onMouseDown={() => { dragging.current = true; }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => { dragging.current = true; }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-xl bg-secondary mb-4 flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
          <p className="text-muted-foreground font-heading font-semibold text-lg">Raw Product Photo</p>
          <p className="text-muted-foreground/60 text-sm mt-1">Plain background, basic lighting</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <div className="text-center">
          <div className="w-32 h-32 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mb-4 flex items-center justify-center cyan-glow">
            <span className="text-4xl">✨</span>
          </div>
          <p className="font-heading font-semibold text-lg text-foreground">Ryze AI Environment</p>
          <p className="text-muted-foreground text-sm mt-1">Studio-grade, brand-ready</p>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 w-1 bg-primary cyan-glow" style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center cyan-glow cursor-col-resize">
          <span className="text-primary-foreground text-xs font-bold">⟷</span>
        </div>
      </div>
      <div className="absolute top-4 left-4"><Badge variant="secondary" className="font-heading">Before</Badge></div>
      <div className="absolute top-4 right-4"><Badge className="bg-primary text-primary-foreground font-heading">After</Badge></div>
    </div>
  );
};

/* Service preview cards for scrolling hero */
const ServiceCard: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({ icon, label, children }) => (
  <div className="rounded-2xl border border-border bg-card shadow-sm flex-shrink-0 overflow-hidden">
    <div className="flex items-center gap-2 px-4 pt-4 pb-2">
      <div className="w-5 h-5 text-muted-foreground">{icon}</div>
      <span className="font-heading font-semibold text-sm">{label}</span>
    </div>
    <div className="px-4 pb-4">{children}</div>
  </div>
);

const InstaPostMock: React.FC<{ gradient: string; overlayText: string }> = ({ gradient, overlayText }) => (
  <div className="rounded-xl overflow-hidden border border-border">
    <div className="flex items-center gap-2 px-3 py-2 bg-card">
      <div className="w-6 h-6 rounded-full bg-muted border border-border" />
      <span className="text-xs font-medium">Business</span>
      <span className="text-xs text-muted-foreground ml-auto">···</span>
    </div>
    <div className={`aspect-square ${gradient} flex items-center justify-center relative`}>
      <p className="text-white font-heading font-bold text-sm text-center px-4 drop-shadow-lg">{overlayText}</p>
    </div>
    <div className="p-2.5 flex items-center gap-2.5 bg-card">
      <Heart className="w-4 h-4 text-destructive fill-destructive" />
      <MessageCircle className="w-4 h-4 text-muted-foreground" />
      <Send className="w-4 h-4 text-muted-foreground" />
      <Bookmark className="w-4 h-4 text-muted-foreground ml-auto" />
    </div>
  </div>
);

const col1Cards = [
  <ServiceCard key="ugc" icon={<Play className="w-5 h-5" />} label="UGC Videos">
    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
        <Play className="w-5 h-5 text-foreground ml-0.5" />
      </div>
    </div>
  </ServiceCard>,
  <ServiceCard key="social" icon={<Heart className="w-5 h-5" />} label="Social Media Posts">
    <InstaPostMock gradient="bg-gradient-to-br from-teal-400 to-cyan-600" overlayText="RISE ABOVE THE REST" />
  </ServiceCard>,
  <ServiceCard key="stories" icon={<Bookmark className="w-5 h-5" />} label="Instagram Stories">
    <div className="grid grid-cols-2 gap-2">
      <div className="aspect-[9/16] rounded-xl bg-gradient-to-b from-emerald-400 to-teal-600 flex items-end p-2">
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-background/50 border border-primary" /><span className="text-[9px] text-white font-medium">3s ago</span></div>
      </div>
      <div className="aspect-[9/16] rounded-xl bg-gradient-to-b from-cyan-500 to-blue-600 flex items-end p-2">
        <div className="flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-background/50 border border-primary" /><span className="text-[9px] text-white font-medium">3s ago</span></div>
      </div>
    </div>
  </ServiceCard>,
  <ServiceCard key="ads" icon={<TrendingUp className="w-5 h-5" />} label="AI Ad Creatives">
    <InstaPostMock gradient="bg-gradient-to-br from-violet-500 to-purple-700" overlayText="GAME, YOUR STORY" />
  </ServiceCard>,
  <ServiceCard key="photo2" icon={<ImageIcon className="w-5 h-5" />} label="Product Photography">
    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
      <span className="text-4xl">📸</span>
    </div>
  </ServiceCard>,
];

const col2Cards = [
  <ServiceCard key="growth" icon={<TrendingUp className="w-5 h-5" />} label="Growth Analytics">
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Followers</span>
          <BarChart3 className="w-3.5 h-3.5 text-primary" />
        </div>
        <p className="text-xl font-heading font-black">8.4K <span className="text-xs text-primary font-medium">+128%</span></p>
        <div className="h-12 mt-1.5 flex items-end gap-0.5">
          {[30,45,35,55,50,70,65,80,90,85,95,100].map((h,i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${h}%` }}>
              <div className="w-full bg-primary rounded-t" style={{ height: `${h * 0.6}%` }} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Reach</span>
          <BarChart3 className="w-3.5 h-3.5 text-primary" />
        </div>
        <p className="text-xl font-heading font-black">129K <span className="text-xs text-primary font-medium">+348%</span></p>
      </div>
    </div>
  </ServiceCard>,
  <ServiceCard key="email" icon={<MessageSquare className="w-5 h-5" />} label="Email Design">
    <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center">
      <div className="bg-background/90 rounded-lg p-3 text-center">
        <p className="font-heading font-bold text-xs">NEW STYLES</p>
        <p className="font-heading font-bold text-xs">JUST DROPPED</p>
        <p className="text-[9px] text-primary mt-1">SHOP NOW →</p>
      </div>
    </div>
  </ServiceCard>,
  <ServiceCard key="seo" icon={<BookOpen className="w-5 h-5" />} label="SEO Content">
    <div className="space-y-2">
      {[
        { img: "bg-gradient-to-br from-amber-200 to-amber-400", title: "The Role of Healthy..." },
        { img: "bg-gradient-to-br from-green-200 to-green-400", title: "How Local Ingredients..." },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-border p-2">
          <div className={`w-10 h-10 rounded-lg ${item.img} flex-shrink-0`} />
          <span className="text-xs font-medium truncate">{item.title}</span>
        </div>
      ))}
    </div>
  </ServiceCard>,
  <ServiceCard key="carousel" icon={<ImageIcon className="w-5 h-5" />} label="Carousel Posts">
    <InstaPostMock gradient="bg-gradient-to-br from-yellow-400 to-amber-500" overlayText="BUILD YOUR EMPIRE" />
  </ServiceCard>,
  <ServiceCard key="brand" icon={<Palette className="w-5 h-5" />} label="Brand Assets">
    <div className="grid grid-cols-3 gap-1.5">
      {["bg-primary", "bg-foreground", "bg-muted", "bg-destructive", "bg-secondary", "bg-accent"].map((c, i) => (
        <div key={i} className={`aspect-square rounded-lg ${c} border border-border`} />
      ))}
    </div>
  </ServiceCard>,
];

const ScrollingColumn: React.FC<{ cards: React.ReactNode[]; speed?: number; reverse?: boolean }> = ({ cards, speed = 30, reverse = false }) => (
  <div className="relative overflow-hidden h-[600px]">
    <div
      className={`flex flex-col gap-3 ${reverse ? "animate-scroll-down" : "animate-scroll-up"}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {[...cards, ...cards].map((card, i) => (
        <div key={i}>{card}</div>
      ))}
    </div>
  </div>
);

/* Factory Proof Section */
const contentTypes = ["Posts", "Videos", "UGC", "Static Ads", "Video Ads", "Emails", "Blogs", "Stories"];
const industries = ["Featured", "Beauty Services", "Food & Beverages", "Health & Wellness", "Home Services", "Products", "Professional Services", "Real Estate", "SaaS & Tech", "Travel & Tourism", "Other"];

const proofItems = [
  { before: "📦", after: "✨", category: "Posts", industry: "Beauty Services", gradient: "from-rose-400 to-pink-600" },
  { before: "📷", after: "🎨", category: "Posts", industry: "Food & Beverages", gradient: "from-amber-400 to-orange-500" },
  { before: "🏷️", after: "💎", category: "Posts", industry: "Products", gradient: "from-emerald-400 to-teal-600" },
  { before: "🎥", after: "🎬", category: "Videos", industry: "Travel & Tourism", gradient: "from-sky-400 to-blue-600" },
  { before: "📸", after: "🌟", category: "UGC", industry: "Health & Wellness", gradient: "from-violet-400 to-purple-600" },
  { before: "📄", after: "🔥", category: "Static Ads", industry: "SaaS & Tech", gradient: "from-cyan-400 to-teal-500" },
  { before: "🎞️", after: "⚡", category: "Video Ads", industry: "Real Estate", gradient: "from-indigo-400 to-blue-700" },
  { before: "✉️", after: "💌", category: "Emails", industry: "Professional Services", gradient: "from-rose-300 to-red-500" },
  { before: "📝", after: "📖", category: "Blogs", industry: "Home Services", gradient: "from-lime-400 to-green-600" },
  { before: "📱", after: "🚀", category: "Stories", industry: "Beauty Services", gradient: "from-fuchsia-400 to-pink-600" },
  { before: "🖼️", after: "🎯", category: "Posts", industry: "Featured", gradient: "from-yellow-400 to-amber-600" },
  { before: "🏠", after: "🏡", category: "Static Ads", industry: "Real Estate", gradient: "from-slate-400 to-gray-600" },
];

const MiniSlider: React.FC<{ item: typeof proofItems[0] }> = ({ item }) => {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const handleMove = (clientX: number) => {
    if (!ref.current || !drag.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  };

  useEffect(() => {
    const up = () => { drag.current = false; };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); };
  }, []);

  return (
    <div
      ref={ref}
      className="aspect-square rounded-xl overflow-hidden cursor-col-resize select-none relative"
      onMouseDown={() => { drag.current = true; }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onTouchStart={() => { drag.current = true; }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      <div className="absolute inset-0 bg-muted flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl">{item.before}</span>
          <p className="text-xs text-muted-foreground mt-2 font-heading font-semibold">Before</p>
        </div>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="text-center">
          <span className="text-5xl">{item.after}</span>
          <p className="text-xs text-white/90 mt-2 font-heading font-semibold">After</p>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/80" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center cursor-col-resize">
          <span className="text-foreground text-[10px] font-bold">⟷</span>
        </div>
      </div>
    </div>
  );
};

const ProofCard: React.FC<{ item: typeof proofItems[0] }> = ({ item }) => (
  <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 px-3 py-2.5">
      <img src={ryzeLogo} alt="Ryze" className="w-7 h-7 rounded-full object-cover" />
      <span className="text-sm font-semibold font-heading">Ryze Studios</span>
      <span className="text-muted-foreground ml-auto text-sm">···</span>
    </div>
    <MiniSlider item={item} />
    <div className="px-3 py-2.5 flex items-center gap-3">
      <Heart className="w-5 h-5 text-destructive fill-destructive" />
      <MessageCircle className="w-5 h-5 text-muted-foreground" />
      <Send className="w-5 h-5 text-muted-foreground" />
      <Bookmark className="w-5 h-5 text-muted-foreground ml-auto" />
    </div>
  </div>
);

const FactoryProofSection: React.FC = () => {
  const [activeType, setActiveType] = useState("Posts");
  const [activeIndustry, setActiveIndustry] = useState("Featured");
  const [showAll, setShowAll] = useState(false);

  const filtered = proofItems.filter((item) => {
    const typeMatch = item.category === activeType;
    const industryMatch = activeIndustry === "Featured" || item.industry === activeIndustry;
    return typeMatch && industryMatch;
  });

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Examples of our work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get your design & marketing content done without the hassle. Pay a fixed, monthly, and predictable rate, with no contracts or surprises.</p>
        </motion.div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-card border border-border rounded-full p-1 gap-0.5 flex-wrap justify-center">
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => { setActiveType(type); setShowAll(false); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeType === type ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex gap-2 flex-wrap justify-center">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => { setActiveIndustry(ind); setShowAll(false); }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${activeIndustry === ind ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((item, i) => (
              <motion.div key={`${item.category}-${item.industry}-${i}`} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <ProofCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No examples yet for this combination. Check back soon!</p>
          </div>
        )}

        {filtered.length > 6 && !showAll && (
          <div className="flex justify-center mt-10">
            <Button onClick={() => setShowAll(true)} className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-heading px-8">
              Load more
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

/* ─── FAQ ITEM ─── */
const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-heading font-semibold text-base">{q}</span>
        <Plus className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-45" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── MAIN PAGE ─── */
const Index: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [activeGridIndustry, setActiveGridIndustry] = useState("Beauty");
  const [activeClient, setActiveClient] = useState("SpinSudz");
  const [activeFeatureTab, setActiveFeatureTab] = useState("Services");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <img src={ryzeLogo} alt="Ryze Studios" className="w-9 h-9 rounded-lg object-cover" />
              <span className="font-heading font-bold text-xl tracking-tight">Ryze Studios</span>
            </div>
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <button className="hover:text-foreground transition-colors">Services</button>
              <button className="hover:text-foreground transition-colors">Examples</button>
              <button className="hover:text-foreground transition-colors">Pricing</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="font-medium text-sm">Log in</Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="font-medium text-sm hidden sm:inline-flex">Get Started</Button>
            <Button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-5">
              Book a Demo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pt-6">
            <Badge className="mb-6 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3 mr-1.5 text-primary" /> TOP 1% OF GLOBAL CREATIVE TALENT
            </Badge>
            <h1 className="text-4xl md:text-[3.4rem] font-heading font-black tracking-tight leading-[1.1] mb-6">
              Expert AI creative<br />management from<br />only <span className="text-primary">$10/mo</span>
            </h1>
            <div className="space-y-3 mb-8">
              {[
                { bold: "Premium", text: "content with your branding" },
                { bold: "80% cheaper", text: "than alternatives" },
                { bold: "Studio-grade AI", text: "– win the 3‑second judgment" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <p className="text-base"><strong>{item.bold}</strong> {item.text}</p>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary-pressed cyan-glow-sm font-heading text-base px-8 py-6 rounded-full mb-5">
              Schedule a free demo call <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground">Trusted by <strong className="text-foreground">2,400+</strong> brands  |  Cancel anytime</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block relative">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            <div className="grid grid-cols-2 gap-3">
              <ScrollingColumn cards={col1Cards} speed={30} />
              <ScrollingColumn cards={col2Cards} speed={35} reverse />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Factory Proof */}
      <FactoryProofSection />

      {/* ═══════ SUBSCRIPTION TIERS ═══════ */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              SUBSCRIPTION PLANS
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Choose Your Tier</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Scale from solo creator to full production house. No contracts, cancel anytime.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {subscriptionTiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className={`relative h-full transition-all duration-300 hover:shadow-lg ${tier.popular ? "border-primary ring-2 ring-primary/20" : ""} ${tier.premium ? "border-primary/50 bg-gradient-to-b from-card to-primary/5" : ""}`}>
                  {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-primary text-primary-foreground font-heading text-[10px]">Most Popular</Badge></div>}
                  {tier.premium && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-foreground text-background font-heading text-[10px]">Premium</Badge></div>}
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="font-heading text-sm">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-3xl font-heading font-black">${tier.price}</span>
                      <span className="text-muted-foreground text-xs">/mo</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{tier.tagline}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-5">
                      {tier.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2">
                          {f.included ? (
                            <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
                          )}
                          <span className={`text-xs ${f.included ? "text-foreground" : "text-muted-foreground/50"}`}>{f.text}</span>
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full text-xs font-heading ${tier.popular || tier.premium ? "bg-primary text-primary-foreground hover:bg-primary-pressed" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`} size="sm">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ADD-ONS ═══════ */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Add-Ons</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Enhance any plan with individual services.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {addOns.map((addon, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                      <addon.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-sm mb-1">{addon.name}</h3>
                    <p className="text-muted-foreground text-xs mb-3">{addon.desc}</p>
                    <div className="mt-auto">
                      <span className="text-2xl font-heading font-black">{addon.price}</span>
                      {addon.unit && <span className="text-xs text-muted-foreground ml-1">{addon.unit}</span>}
                    </div>
                    <Button variant="outline" className="w-full mt-3 text-xs font-heading" size="sm">
                      Add to Plan <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════ COMPARISON TABLE ═══════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              WHY RYZE
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Why We're Better</h2>
            <p className="text-muted-foreground text-lg">See how Ryze Studios compares to the alternatives.</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 font-heading font-semibold text-sm text-muted-foreground border-b border-border">Feature</th>
                  <th className="p-4 font-heading font-semibold text-sm text-muted-foreground border-b border-border text-center">Traditional Agencies</th>
                  <th className="p-4 font-heading font-semibold text-sm text-muted-foreground border-b border-border text-center">AI SaaS Tools</th>
                  <th className="p-4 font-heading font-semibold text-sm border-b border-primary bg-primary/5 text-primary text-center rounded-t-xl">Ryze Studios</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-4 font-heading font-semibold text-sm">{row.feature}</td>
                    <td className="p-4 text-sm text-muted-foreground text-center">{row.agency}</td>
                    <td className="p-4 text-sm text-muted-foreground text-center">{row.ai}</td>
                    <td className="p-4 text-sm font-semibold text-primary text-center bg-primary/5">{row.ryze}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════ SOCIAL MEDIA GRID GALLERY ═══════ */}
      <section className="py-20 px-6 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Social Media Grid Gallery</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Explore our branded masterpieces, where every post fits into a larger, cohesive picture.</p>
          </motion.div>

          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {gridIndustries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveGridIndustry(ind)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${activeGridIndustry === ind ? "bg-card border-border shadow-sm text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {gridEmojis[ind]} {ind}
              </button>
            ))}
          </div>

          {/* 6-column IG grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
            {Array.from({ length: 12 }).map((_, i) => {
              const gradients = [
                "from-rose-300 to-pink-500", "from-amber-300 to-orange-500", "from-emerald-300 to-teal-500",
                "from-sky-300 to-blue-500", "from-violet-300 to-purple-500", "from-cyan-300 to-teal-400",
                "from-fuchsia-300 to-pink-500", "from-yellow-300 to-amber-500", "from-lime-300 to-green-500",
                "from-indigo-300 to-blue-600", "from-red-300 to-rose-500", "from-teal-300 to-cyan-500",
              ];
              const isCenter = i >= 1 && i <= 4 || i >= 7 && i <= 10;
              return (
                <motion.div key={`${activeGridIndustry}-${i}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  {isCenter ? (
                    <div className="rounded-xl overflow-hidden border border-border bg-card">
                      <div className="flex items-center gap-1.5 px-2 py-1.5">
                        <img src={ryzeLogo} alt="Ryze" className="w-4 h-4 rounded-full object-cover" />
                        <span className="text-[10px] font-semibold font-heading">Ryze Studios</span>
                        <span className="text-muted-foreground ml-auto text-[10px]">···</span>
                      </div>
                      <div className={`aspect-square bg-gradient-to-br ${gradients[i]} flex items-center justify-center`}>
                        <span className="text-white text-3xl drop-shadow-lg">{gridEmojis[activeGridIndustry]}</span>
                      </div>
                      <div className="p-1.5 flex items-center gap-1.5">
                        <Heart className="w-3 h-3 text-destructive fill-destructive" />
                        <MessageCircle className="w-3 h-3 text-muted-foreground" />
                        <Send className="w-3 h-3 text-muted-foreground" />
                        <Bookmark className="w-3 h-3 text-muted-foreground ml-auto" />
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-xl border-2 border-dashed border-border/50 bg-muted/30" />
                  )}
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-heading px-8">
              Browse Template Store <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ BEFORE & AFTER ═══════ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              🎨 CLIENT WORK
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Before & After</h2>
            <p className="text-muted-foreground text-lg">Explore our social media makeovers and brand transformations.</p>
          </motion.div>

          {/* Client tabs */}
          <div className="flex gap-2 justify-center mb-10 flex-wrap">
            {beforeAfterClients.map((client) => (
              <button
                key={client}
                onClick={() => setActiveClient(client)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeClient === client ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground border border-border"}`}
              >
                {client}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Before */}
            <div>
              <h3 className="font-heading font-bold text-2xl mb-4">Before</h3>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg bg-muted border border-border flex items-center justify-center">
                    <span className="text-2xl opacity-50">📷</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {["Inconsistent visual identity across posts", "Basic stock-like content without personality", "Limited content variety and formats", "Missed engagement opportunities"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <X className="w-4 h-4 text-destructive flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-primary">After</h3>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, i) => {
                  const grads = ["from-rose-400 to-pink-500", "from-teal-400 to-cyan-500", "from-amber-400 to-orange-500", "from-violet-400 to-purple-500", "from-sky-400 to-blue-500", "from-emerald-400 to-teal-500", "from-fuchsia-400 to-pink-500", "from-indigo-400 to-blue-500", "from-yellow-400 to-amber-500"];
                  return (
                    <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${grads[i]} flex items-center justify-center`}>
                      <span className="text-2xl text-white drop-shadow">✨</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 space-y-2">
                {["Strong brand consistency across all posts", "Custom designed content that stands out", "Diverse content mix to keep feeds fresh", "Strategic content that drives engagement"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ DEMO VIDEO ═══════ */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-3">Ryze Studios Demo Video</h2>
            <p className="text-muted-foreground mb-8">Watch our 4-min demo video, then sign up or book a call to learn more.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-video rounded-2xl overflow-hidden bg-muted border border-border mb-10 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 to-foreground/60 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center cyan-glow group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-heading text-sm bg-black/40 px-3 py-1 rounded-full">4:15</span>
            </div>
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 rounded-full bg-foreground/80 flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-background" />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <CalendarDays className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold mb-1">Schedule a call</h3>
                <p className="text-sm text-muted-foreground mb-4">Book a 20-min call with someone from our team and get any of your questions answered.</p>
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90 font-heading">Book a Call</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="font-heading font-bold mb-1">Get started now</h3>
                <p className="text-sm text-muted-foreground mb-4">Select any of our services and start using Ryze Studios right away.</p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">Start Using Ryze Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════ SEAMLESS EXPERIENCE ═══════ */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              <LayoutGrid className="w-3 h-3 mr-1.5 text-primary" /> FEATURES
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Seamless experience</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Ryze Studios is a flexible subscription-based service enabled by technology to deliver compelling creative at scale.</p>
          </motion.div>

          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {featureTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFeatureTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-heading font-medium transition-all ${activeFeatureTab === tab ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div key={activeFeatureTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-muted/50 border border-border p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">{featureContent[activeFeatureTab].title}</h3>
                <p className="text-muted-foreground text-lg">{featureContent[activeFeatureTab].desc}</p>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-card border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <LayoutGrid className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground font-heading">{activeFeatureTab} Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ THE BETTER WAY ═══════ */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              ⚡ CREATIVE SUCCESS
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">The better way</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Think about all the pains of dealing with an agency or freelancers. Now, forget them. Working with <strong className="text-foreground">2,400+</strong> businesses, we've perfected the recipe for getting creative done.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Cost savings chart */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8">
                <Badge className="mb-3 bg-primary/10 text-primary border-0 text-[10px] font-heading">📉 COST COMPARISON</Badge>
                <h3 className="text-2xl font-heading font-bold mb-6">Save up to 95% vs agencies</h3>
                <div className="space-y-4">
                  {[
                    { label: "Traditional Agency", value: 100, amount: "$2,000+/mo", color: "bg-destructive/60" },
                    { label: "Freelancers", value: 60, amount: "$1,200/mo", color: "bg-amber-400" },
                    { label: "AI SaaS Tools", value: 25, amount: "$500/mo", color: "bg-muted-foreground/40" },
                    { label: "Ryze Studios", value: 5, amount: "From $10/mo", color: "bg-primary" },
                  ].map((bar, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-heading font-medium">{bar.label}</span>
                        <span className="text-xs font-heading font-bold">{bar.amount}</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`h-full rounded-full ${bar.color}`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Turnaround time chart */}
            <Card>
              <CardContent className="p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">⏱️ TURNAROUND TIME</Badge>
                <h3 className="text-2xl font-heading font-bold mb-6">Lightning-fast delivery</h3>
                <div className="flex items-end gap-4 h-48 mb-4">
                  {[
                    { label: "Agency", days: 21, height: "100%", color: "bg-destructive/40" },
                    { label: "Freelancer", days: 14, height: "67%", color: "bg-amber-400/60" },
                    { label: "AI SaaS", days: 1, height: "5%", color: "bg-muted-foreground/30", note: "Low quality" },
                    { label: "Ryze", days: 1, height: "5%", color: "bg-primary", note: "Premium" },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                      <span className="text-xs font-heading font-bold mb-1">{bar.days}d</span>
                      <motion.div initial={{ height: 0 }} whileInView={{ height: bar.height }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} className={`w-full rounded-t-lg ${bar.color}`} style={{ minHeight: 12 }} />
                      <span className="text-[10px] text-muted-foreground mt-2 font-heading text-center">{bar.label}</span>
                      {bar.note && <span className="text-[9px] text-primary font-medium">{bar.note}</span>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Quality score */}
            <Card>
              <CardContent className="p-8 text-center">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">🎯 QUALITY SCORE</Badge>
                <div className="relative w-32 h-32 mx-auto my-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                    <motion.circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeLinecap="round" strokeDasharray={264} initial={{ strokeDashoffset: 264 }} whileInView={{ strokeDashoffset: 264 * 0.02 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-heading font-black">98%</span>
                  </div>
                </div>
                <p className="font-heading font-semibold">Client Satisfaction</p>
                <p className="text-xs text-muted-foreground mt-1">Based on 2,400+ projects</p>
              </CardContent>
            </Card>

            {/* Collaboration */}
            <Card>
              <CardContent className="p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">💬 COLLABORATION</Badge>
                <h3 className="text-xl font-heading font-bold mb-4">Tech built for easy collaboration</h3>
                <div className="space-y-3">
                  <div className="bg-muted rounded-xl p-3">
                    <p className="text-xs font-semibold mb-1">Chat</p>
                    <div className="space-y-2">
                      <div className="bg-card rounded-lg p-2 text-xs"><strong>Martin Lawrence</strong> · If you need any help, I'm your Account Manager</div>
                      <div className="bg-primary/10 rounded-lg p-2 text-xs"><strong>Anna Carlton</strong> · Thanks Martin. I'll reach out soon about billing.</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content output growth */}
            <Card>
              <CardContent className="p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">📈 OUTPUT GROWTH</Badge>
                <h3 className="text-xl font-heading font-bold mb-4">Content output over time</h3>
                <div className="flex items-end gap-1.5 h-32 mt-4">
                  {[15, 25, 30, 45, 55, 50, 70, 80, 75, 90, 95, 100].map((h, i) => (
                    <motion.div key={i} className="flex-1 bg-primary/20 rounded-t relative" initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                      <div className="absolute inset-0 bg-primary rounded-t" style={{ height: `${60 + i * 3}%` }} />
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-muted-foreground font-heading">Month 1</span>
                  <span className="text-[10px] text-muted-foreground font-heading">Month 12</span>
                </div>
                <p className="text-xs text-primary font-heading font-semibold mt-2 text-center">+340% avg. content increase</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Say goodbye */}
            <Card>
              <CardContent className="p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">👋 THE OLD WAY</Badge>
                <h3 className="text-2xl font-heading font-bold mb-4">Say goodbye to</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Searching for freelancers", "Slow turnaround times", "Expensive agencies", "Dozens of interviews", "Getting 100 applications", "Still having no one to hire"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${i === 5 ? "bg-destructive/10" : "bg-muted"}`}>
                        <X className={`w-3 h-3 ${i === 5 ? "text-destructive" : "text-muted-foreground"}`} />
                      </div>
                      <span className="text-muted-foreground text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscription model */}
            <Card>
              <CardContent className="p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">💳 SUBSCRIPTION BASED</Badge>
                <h3 className="text-2xl font-heading font-bold mb-4">Flexible subscription model</h3>
                <div className="flex flex-wrap gap-2">
                  {["Cancel anytime", "No contracts", "Pause anytime", "Upgrade/Downgrade", "One-time monthly payment"].map((item, i) => (
                    <Badge key={i} variant="secondary" className="text-xs font-heading">{item}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════ RESELLER CTA ═══════ */}
      <section className="px-6 -mt-10 mb-0 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-primary/20 bg-card p-6 md:p-8">
              <div className="flex items-center gap-4 relative">
                <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base text-foreground cyan-glow-text">Looking to resell our services to your clients?</h3>
                  <p className="text-muted-foreground text-sm font-body">Apply to join the Ryze Studios reseller program</p>
                </div>
              </div>
              <Button onClick={() => navigate("/reseller")} className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-medium rounded-full px-6 py-5 whitespace-nowrap text-sm relative">
                Apply to become a reseller <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="pt-14 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              ❓ QUESTIONS & ANSWERS
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Frequently asked questions</h2>
            <p className="text-muted-foreground">If you have any questions that aren't listed below, feel free to schedule a demo to speak with someone from our team.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-10">
            <div>
              {faqItems.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
            <div className="hidden md:block">
              <Card className="sticky top-24 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-primary" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2">Get started with a free strategy call!</h3>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading mt-2">
                    Schedule Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <img src={ryzeLogo} alt="Ryze Studios" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-heading font-bold text-lg">Ryze Studios</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Ryze Studios. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</button>
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</button>
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
