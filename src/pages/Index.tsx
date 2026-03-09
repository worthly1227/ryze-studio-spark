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
  Phone, Lightbulb, Globe, LayoutGrid, Rocket, Camera, Wand2, Megaphone, PenTool, FileText,
  Menu
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import ryzeLogo from "@/assets/ryze-logo.jpeg";
import CheckoutModal from "@/components/CheckoutModal";
import EntryLevelPaymentModal from "@/components/EntryLevelPaymentModal";
import CalendlyModal from "@/components/CalendlyModal";
import { useToast } from "@/hooks/use-toast";

/* ─── PRICING TIERS DATA ─── */
const subscriptionTiers = [
  {
    name: "Entry Level Pass",
    price: 10,
    priceUnit: "per session",
    tagline: "For brands testing premium AI visuals.",
    icon: Zap,
    starter: true,
    competitorPrice: 39,
    savingsPercent: "74%",
    features: [
      { text: "5 AI Generation Credits", included: true },
      { text: "1 Final AI Image Download", included: true },
      { text: "Standard Processing", included: true },
      { text: "Email Support", included: true },
      
      { text: "Short Form Videos", included: false },
      { text: "UGC Videos", included: false },
      { text: "Managed Social Posting", included: false },
      { text: "Priority Processing", included: false },
      { text: "Strategy Sessions", included: false },
    ],
  },
  {
    name: "Visual Starter Kit",
    price: 110,
    tagline: "For brands building consistent product visuals.",
    icon: Sparkles,
    competitorPrice: 870,
    savingsPercent: "87%",
    features: [
      { text: "35 AI Generation Credits", included: true },
      { text: "20 Final AI Image Downloads", included: true },
      { text: "10 Ready-to-Use Design Templates", included: true },
      { text: "Standard Processing", included: true },
      { text: "Email Support", included: true },
      { text: "3 Short Form Videos", included: true },
      { text: "UGC Videos", included: false },
      { text: "Managed Social Posting", included: false },
      { text: "Priority Processing", included: false },
      { text: "Strategy Sessions", included: false },
    ],
  },
  {
    name: "Viral Growth",
    price: 240,
    tagline: "For brands pushing consistent content.",
    icon: Users,
    popular: true,
    competitorPrice: 2100,
    savingsPercent: "88%",
    features: [
      { text: "60 AI Generation Credits", included: true },
      { text: "40 Final AI Image Downloads", included: true },
      { text: "15 Design Templates", included: true },
      { text: "6 Short Form Videos", included: true },
      { text: "Standard Processing", included: true },
      { text: "Email Support", included: true },
      { text: "UGC Videos", included: false },
      { text: "Managed Social Posting", included: false },
      { text: "Priority Processing", included: false },
      { text: "Strategy Sessions", included: false },
    ],
  },
  {
    name: "Full Brand Manager",
    price: 299,
    tagline: "For structured brand execution.",
    icon: Shield,
    competitorPrice: 1800,
    savingsPercent: "83%",
    features: [
      { text: "80 AI Generation Credits", included: true },
      { text: "50 Final AI Image Downloads", included: true },
      { text: "20 Design Templates", included: true },
      { text: "9 Short Form Videos", included: true },
      { text: "Managed Social Posting", included: true },
      { text: "Live Chat Support", included: true },
      { text: "UGC Videos", included: false },
      { text: "Priority Processing", included: false },
      { text: "Strategy Sessions", included: false },
    ],
  },
  {
    name: "Done For You",
    price: 499,
    tagline: "For brands outsourcing creative execution.",
    icon: Calendar,
    competitorPrice: 5500,
    savingsPercent: "91%",
    features: [
      { text: "120 AI Generation Credits", included: true },
      { text: "75 Final AI Image Downloads", included: true },
      { text: "30 Design Templates", included: true },
      { text: "1 × 30-sec UGC Video", included: true },
      { text: "12 Short Form Videos", included: true },
      { text: "Managed Social Posting", included: true },
      { text: "Priority Processing", included: true },
      { text: "1 Strategy Session (Quarterly)", included: true },
      { text: "Fast-Track Production", included: false },
    ],
  },
  {
    name: "Master Production",
    price: 679,
    tagline: "For scaling product brands.",
    icon: Crown,
    premium: true,
    competitorPrice: 6800,
    savingsPercent: "90%",
    features: [
      { text: "180 AI Generation Credits", included: true },
      { text: "120 Final AI Image Downloads", included: true },
      { text: "40 Design Templates", included: true },
      { text: "2 × 30-sec UGC Videos", included: true },
      { text: "15 Short Form Videos", included: true },
      { text: "Managed Social Posting", included: true },
      { text: "Priority Queue", included: true },
      { text: "Quarterly Strategy Session", included: true },
      { text: "Fast-Track Production", included: true },
    ],
  },
];

const addOns = [
  { name: "Extra AI Product Image", price: "$10 USD", unit: "per final download", desc: "Generate unlimited variations and only pay for the final image you choose.", icon: Camera, color: "from-sky-400 to-cyan-500" },
  { name: "30-Second UGC Video", price: "$99 USD", unit: "", desc: "Professionally produced social media-ready video featuring vetted creators.", icon: Play, color: "from-violet-400 to-purple-500" },
  { name: "Short Video (<20 sec)", price: "$11 USD", unit: "", desc: "Quick, attention-grabbing clips optimized for Reels, TikTok, and social posts.", icon: Rocket, color: "from-amber-400 to-orange-500" },
  { name: "Content Management & Delivery", price: "$120 USD", unit: "per month", desc: "We manage and post your content across your 3 primary social platforms on a consistent, expert schedule.", icon: Calendar, color: "from-indigo-400 to-blue-500" },
  { name: "Strategic Consultancy", price: "$224 USD", unit: "", desc: "A 45-minute one-on-one session to guide your brand strategy and growth planning.", icon: Megaphone, color: "from-emerald-400 to-teal-500" },
  { name: "Max Business Launch", price: "$2,500 USD", unit: "each", desc: "We deliver a fully operational US product brand, pre-stocked and ready for market, handing you the keys in 24 hours.", icon: Rocket, color: "from-rose-400 to-pink-500" },
];

const suggestedAddOns: Record<string, { name: string; price: number; description: string }> = {
  "Entry Level Pass": { name: "Extra AI Product Image", price: 10, description: "Generate unlimited variations — only pay for the final image you choose." },
  "Visual Starter Kit": { name: "Short Video (<20s)", price: 11, description: "Quick, scroll-stopping clips optimized for Reels, TikTok, and Stories." },
  "Viral Growth": { name: "30-Second UGC Video", price: 99, description: "Professionally produced social-ready video featuring vetted creators." },
  "Full Brand Manager": { name: "Strategic Consultancy", price: 224, description: "45-minute 1-on-1 session to guide your brand strategy and growth." },
  "Done For You": { name: "30-Second UGC Video", price: 99, description: "Professionally produced social-ready video featuring vetted creators." },
  "Master Production": { name: "Strategic Consultancy", price: 224, description: "45-minute 1-on-1 session to guide your brand strategy and growth." },
  "Max Business Launch": { name: "Strategic Consultancy", price: 224, description: "45-minute 1-on-1 session to guide your brand strategy and growth." },
};

const comparisonData = [
  { feature: "Pricing", agency: "Hefty retainers ($3k+)", ai: "Credit-based subscriptions", ryze: "Flat-rate from $10 USDD" },
  { feature: "Visual Quality", agency: "Prone to human error", ai: "AI distortion & artifacts", ryze: "Pixel-perfect quality" },
  { feature: "Production Method", agency: "Physical studios required", ai: "Basic background swaps", ryze: "Full AI creative pipeline" },
  { feature: "Speed", agency: "3–6 week lead times", ai: "Fast but low quality", ryze: "Same-week premium output" },
  { feature: "Brand Strategy", agency: "$5k+ retainer required", ai: "Zero guidance", ryze: "Bookable $225 sessions" },
  { feature: "Creative Range", agency: "Limited to one designer", ai: "Template-based only", ryze: "Unlimited styles & formats" },
];

const gridIndustries = ["Social Media Templates", "Pitch Deck Templates", "Portfolio Website Templates", "One Product Store Templates", "Ryze Web Design Templates", "Seasonal Campaign Templates"];
const gridEmojis: Record<string, string> = { "Social Media Templates": "📱", "Pitch Deck Templates": "📊", "Portfolio Website Templates": "🌐", "One Product Store Templates": "🛍️", "Ryze Web Design Templates": "🎨", "Seasonal Campaign Templates": "🎄" };

const beforeAfterClients = ["SpinSudz", "KokoKai Foods LLC", "Crystal Imagery", "True North Wellness", "No Place Like Home", "Darkhorse Solutions"];

const featureTabs = ["Services", "Onboarding", "Communication", "Collaboration", "Scheduling"];
const featureContent: Record<string, { title: string; desc: string; image: string }> = {
  Services: { title: "Pick Your Package", desc: "Explore our creative menu and assemble the exact mix of AI edits, UGC, and strategy your brand needs.", image: "/images/feature-services.png" },
  Onboarding: { title: "5-Minute Brand Intake", desc: "Share your brand guidelines, colors, and tone. Our system learns your identity and starts producing instantly.", image: "/images/feature-onboarding.png" },
  Communication: { title: "Direct Line to Your Team", desc: "Chat with your dedicated creative lead in real time. Feedback loops that actually move fast.", image: "/images/feature-communication.png" },
  Collaboration: { title: "One Dashboard, Zero Chaos", desc: "Approve assets, request tweaks, and track every deliverable from a single streamlined workspace.", image: "/images/feature-collaboration.png" },
  Scheduling: { title: "We Post, You Grow", desc: "Ryze handles content scheduling and publishing across all your channels so you never miss a beat.", image: "/images/feature-scheduling.png" },
};

const faqItems = [
  { q: "What does Ryze Studios cost?", a: "Our Entry Level Pass starts at $1 USD per sessiono for a single AI product edit. From there, scale into UGC, managed posting, and full creative outsourcing as your brand grows." },
  { q: "How can you charge so little?", a: "We built a proprietary AI production engine that replaces bloated agency overhead. You get luxury-grade output at a fraction of the traditional cost." },
  { q: "Where is your team based?", a: "Ryze operates globally with creative leads in the US, UK, and Southeast Asia, ensuring round-the-clock production capacity." },
  { q: "How fast can I get started?", a: "Pick a plan, complete our 5-minute brand intake, and your first assets enter production the same day." },
  { q: "What happens once I subscribe?", a: "Your dedicated creative lead reaches out within hours, walks you through the dashboard, and kicks off your first content batch." },
  { q: "How do I give feedback on deliverables?", a: "Everything lives in your Ryze dashboard. Review, approve, or request revisions with one click. Plus direct chat with your creative lead." },
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

/* Hero showcase cards for mobile carousel */
const heroShowcaseCards = [
  { icon: Camera, label: "AI Product Shot", badge: "AI Product Shot", gradient: "bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700" },
  { icon: Play, label: "Studio-grade product shots", badge: "", gradient: "bg-gradient-to-br from-amber-600 via-orange-700 to-stone-800" },
  { icon: Wand2, label: "Animated Logo", badge: "AI Product Shot", gradient: "bg-gradient-to-br from-cyan-500 via-teal-600 to-emerald-700" },
  { icon: ImageIcon, label: "Social Media Post", badge: "Brand-Matched", gradient: "bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-700" },
  { icon: Rocket, label: "Short Form Video", badge: "Trending", gradient: "bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700" },
  { icon: PenTool, label: "Brand Kit Design", badge: "", gradient: "bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700" },
];

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
  <div className="relative overflow-hidden h-[760px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]">
    <div
      className={`flex flex-col gap-3 ${reverse ? "animate-scroll-down" : "animate-scroll-up"}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {[...cards, ...cards, ...cards].map((card, i) => (
        <div key={i}>{card}</div>
      ))}
    </div>
  </div>
);

/* Factory Proof Section */
const contentTypes = ["Posts", "Videos", "UGC", "Social Ads", "Short Form Video", "Template Designs", "Web Designs"];
const subcategoriesByType: Record<string, string[]> = {
  "Posts": ["Featured", "Health, Skincare & Supplements", "Beverages & Packaged Goods", "Apothecary & Home", "Tech & Workspace", "Other"],
  "Videos": ["Orbit", "Focus", "Glide", "Pedestal", "Still", "Sweep"],
  "UGC": ["Man", "Woman", "Young", "Adult", "Dark Skin", "Light Skin"],
  "Social Ads": ["Static Image", "Short Form Video", "Carousel", "Stories", "Direct Response"],
  "Short Form Video": ["Featured", "AI Videos", "Stock Videos"],
  "Template Designs": ["Social Media Templates", "Sales Templates", "Seasonal Templates", "Email Templates"],
  "Web Designs": ["Landing Pages", "E-Commerce Sites", "Portfolio Sites", "Business Sites", "Blog / Content Sites"],
};

const proofItems = [
  { before: "📦", after: "✨", category: "Posts", industry: "Skincare & Beauty", gradient: "from-rose-400 to-pink-600" },
  { before: "📷", after: "🎨", category: "Posts", industry: "Food & Beverages", gradient: "from-amber-400 to-orange-500" },
  { before: "🏷️", after: "💎", category: "Posts", industry: "Fashion & Accessories", gradient: "from-emerald-400 to-teal-600" },
  { before: "🎥", after: "🎬", category: "Videos", industry: "Coffee & Tea", gradient: "from-sky-400 to-blue-600" },
  { before: "📸", after: "🌟", category: "UGC", industry: "Health & Supplements", gradient: "from-violet-400 to-purple-600" },
  { before: "📄", after: "🔥", category: "Static Ads", industry: "Pet Products", gradient: "from-cyan-400 to-teal-500" },
  { before: "🎞️", after: "⚡", category: "Video Ads", industry: "Home & Lifestyle", gradient: "from-indigo-400 to-blue-700" },
  { before: "✉️", after: "💌", category: "Emails", industry: "Handmade & Artisan", gradient: "from-rose-300 to-red-500" },
  { before: "📝", after: "📖", category: "Blogs", industry: "Fitness & Wellness", gradient: "from-lime-400 to-green-600" },
  { before: "📱", after: "🚀", category: "Stories", industry: "Skincare & Beauty", gradient: "from-fuchsia-400 to-pink-600" },
  { before: "🖼️", after: "🎯", category: "Posts", industry: "Featured", gradient: "from-yellow-400 to-amber-600" },
  { before: "🏠", after: "🏡", category: "Static Ads", industry: "Home & Lifestyle", gradient: "from-slate-400 to-gray-600" },
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
  const [activeSub, setActiveSub] = useState("Featured");
  const [showAll, setShowAll] = useState(false);

  const currentSubs = subcategoriesByType[activeType] || ["Featured"];

  const filtered = proofItems.filter((item) => {
    const typeMatch = item.category === activeType;
    const subMatch = activeSub === currentSubs[0] || item.industry === activeSub;
    return typeMatch && subMatch;
  });

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">Built for product brands like yours</h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">Real transformations from real product brands. Browse by content type or niche to see the caliber of work Ryze delivers every single week.</p>
        </motion.div>

        <div className="mb-6 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {contentTypes.map((type) => (
            <button
              key={type}
              onClick={() => { setActiveType(type); setActiveSub(subcategoriesByType[type]?.[0] || "Featured"); setShowAll(false); }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all border ${activeType === type ? "bg-primary text-primary-foreground border-primary shadow-sm" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-card"}`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mb-8 sm:mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
          <div className="w-max min-w-full flex sm:justify-center">
            <div className="inline-flex gap-2 whitespace-nowrap">
              {currentSubs.map((sub) => (
                <button
                  key={sub}
                  onClick={() => { setActiveSub(sub); setShowAll(false); }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${activeSub === sub ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"}`}
                >
                  {sub}
                </button>
              ))}
            </div>
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
  const { toast } = useToast();
  const [activeGridIndustry, setActiveGridIndustry] = useState("Skincare");
  const [activeClient, setActiveClient] = useState("SpinSudz");
  const [activeFeatureTab, setActiveFeatureTab] = useState("Services");
  const [isAddOnsPaused, setIsAddOnsPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutTier, setCheckoutTier] = useState<typeof subscriptionTiers[0] | null>(null);
  const [calendlyTier, setCalendlyTier] = useState<typeof subscriptionTiers[0] | null>(null);
  const [pendingAddOn, setPendingAddOn] = useState<{ name: string; price: number; description: string } | null>(null);
  const [entryLevelOpen, setEntryLevelOpen] = useState(false);

  const handleTierClick = (tier: typeof subscriptionTiers[0]) => {
    if (tier.name === "Entry Level Pass") {
      setEntryLevelOpen(true);
    } else if (tier.price >= 299) {
      setCalendlyTier(tier);
    } else {
      setCheckoutTier(tier);
    }
  };

  const handleAddOnClick = (addon: typeof addOns[0]) => {
    const numericPrice = parseInt(addon.price.replace(/[^0-9]/g, ""));
    setPendingAddOn({ name: addon.name, price: numericPrice, description: addon.desc });
    toast({
      title: "✅ " + addon.name + " added!",
      description: "Now select a plan above to continue to checkout.",
    });
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCalendlyBooked = () => {
    const tier = calendlyTier;
    setCalendlyTier(null);
    if (tier) {
      setCheckoutTier(tier);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
              <img src={ryzeLogo} alt="Ryze Studios" className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover flex-shrink-0" />
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight">Ryze Studios</span>
            </button>
            <div className="hidden md:flex items-center gap-5 text-sm font-medium text-muted-foreground">
              <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-foreground transition-colors">Services</button>
              <button onClick={() => document.getElementById("examples")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-foreground transition-colors">Examples</button>
              <button onClick={() => navigate("/plans")} className="hover:text-foreground transition-colors">Pricing</button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition-colors">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button variant="ghost" onClick={() => navigate("/login")} className="font-medium text-sm hidden sm:inline-flex">Log in</Button>
            <Button onClick={() => navigate("/book-demo")} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-4 sm:px-5 text-xs sm:text-sm hidden sm:inline-flex">
              Book a Demo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden p-2 rounded-lg hover:bg-muted transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="sm:hidden overflow-hidden border-t border-border bg-background">
              <div className="px-4 py-3 space-y-2">
                <button onClick={() => { setMobileMenuOpen(false); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }} className="block w-full text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Services</button>
                <button onClick={() => { setMobileMenuOpen(false); document.getElementById("examples")?.scrollIntoView({ behavior: "smooth" }); }} className="block w-full text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Examples</button>
                <button onClick={() => { setMobileMenuOpen(false); navigate("/plans"); }} className="block w-full text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Pricing</button>
                <hr className="border-border" />
                <button onClick={() => navigate("/login")} className="block w-full text-left py-2 text-sm font-medium">Log in</button>
                <Button onClick={() => navigate("/book-demo")} className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full text-sm">
                  Book a Demo <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="pt-4 sm:pt-8">
            <div className="mb-4 sm:mb-8 inline-flex items-center bg-muted text-foreground border border-border font-heading text-xs tracking-wider px-3 sm:px-4 py-1.5 rounded-full">
              ✦ <span className="font-bold ml-1">Tired of Overpriced Agencies? Meet Ryze</span> ✦
            </div>
            <h1 className="text-[1.75rem] sm:text-4xl md:text-[3.4rem] font-heading font-black tracking-tight leading-[1.08] mb-4 sm:mb-8">
              Your On Demand Creative Team Providing High-end Content Starting At <span className="text-primary">$10 USD</span>
            </h1>
            <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-10 max-w-lg leading-relaxed">
              We create distortion-free AI visuals, social content, UGC, and brand strategies so you can focus on pushing your business to the next level.
            </p>

            {/* Mobile showcase carousel */}
            <div className="lg:hidden mb-6 -mx-4 overflow-hidden">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                <div className="flex gap-3 px-4" style={{ animation: 'scroll-showcase 20s linear infinite', width: 'max-content' }}>
                  {[...heroShowcaseCards, ...heroShowcaseCards, ...heroShowcaseCards].map((card, i) => (
                    <div key={i} className="flex-shrink-0 w-40 sm:w-48">
                      <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-md">
                        <div className={`aspect-[4/3] ${card.gradient} flex items-center justify-center relative`}>
                          {card.badge && (
                            <span className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-[9px] font-heading font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                              {card.badge}
                            </span>
                          )}
                          <card.icon className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="px-3 py-2.5">
                          <p className="text-xs font-heading font-semibold truncate">{card.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile value props - compact icon grid */}
            <div className="grid grid-cols-4 gap-2 mb-6 lg:hidden">
              {[
                { icon: Rocket, label: "Days,", sub: "Not Weeks." },
                { icon: Wand2, label: "AI-Driven", sub: "Quality" },
                { icon: FileText, label: "Posts,", sub: "Reels, Ads" },
                { icon: Shield, label: "Brand-", sub: "Matched" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center bg-card border border-border rounded-2xl px-2 py-3">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-2 bg-background">
                    <item.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <p className="text-[11px] font-heading font-bold leading-tight">{item.label}</p>
                  <p className="text-[11px] font-heading font-bold leading-tight">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Desktop value props */}
            <div className="hidden lg:grid grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
              {[
                { icon: Camera, text: "Studio-grade product shots" },
                { icon: Wand2, text: "AI-powered, brand-matched" },
                { icon: Rocket, text: "Delivered in days, not weeks" },
                { icon: FileText, text: "Posts, reels, ads & more" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 bg-card border border-border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                  <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-xs sm:text-sm font-medium">{item.text}</p>
                </div>
              ))}
            </div>

            <Button size="lg" onClick={() => navigate("/book-demo")} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-pressed cyan-glow-sm font-heading text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 rounded-full mb-4 sm:mb-6">
              Book your Free Strategy Call <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">Trusted by <strong className="text-foreground">1,800+</strong> growing brands  |  No contracts, cancel anytime</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/70 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            <div className="transform -rotate-12 origin-center scale-125 -translate-x-6">
              <div className="grid grid-cols-2 gap-3">
                <ScrollingColumn cards={col1Cards} speed={30} />
                <ScrollingColumn cards={col2Cards} speed={35} reverse />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Factory Proof */}
      <FactoryProofSection />

      {/* ═══════ SUBSCRIPTION TIERS ═══════ */}
      <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-14">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              PLANS & PRICING
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">Find your perfect fit</h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">Whether you need one polished product shot or a full content engine, there's a Ryze plan built for you.</p>
          </motion.div>

          {/* Pending add-on banner */}
          <AnimatePresence>
            {pendingAddOn && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/30 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-heading font-semibold text-primary">
                      {pendingAddOn.name} added!
                    </span>
                    <span className="text-muted-foreground hidden sm:inline">Now select a plan below to continue to checkout.</span>
                  </div>
                  <button onClick={() => setPendingAddOn(null)} className="text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
            {subscriptionTiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className={`relative h-full flex flex-col transition-all duration-300 hover:shadow-lg ${tier.starter ? "border-pink-400 ring-2 ring-pink-400/20" : ""} ${tier.popular ? "border-primary ring-2 ring-primary/20" : ""} ${tier.premium ? "border-primary/50 bg-gradient-to-b from-card to-primary/5" : ""}`}>
                  {tier.starter && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-pink-500 text-white font-heading text-[10px]">Start Now</Badge></div>}
                  {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-primary text-primary-foreground font-heading text-[10px] whitespace-nowrap"><span className="sm:hidden">Popular Choice</span><span className="hidden sm:inline">Most Popular</span></Badge></div>}
                  {tier.premium && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="bg-foreground text-background font-heading text-[10px]">Premium</Badge></div>}
                  <CardHeader className="pb-3 pt-6">
                    <CardTitle className="font-heading text-sm">{tier.name}</CardTitle>
                    {tier.competitorPrice && (
                      <div className="mt-1">
                        <span className="text-[10px] text-muted-foreground">Competitor's price: <span className="line-through">${tier.competitorPrice}</span></span>
                      </div>
                    )}
                    <div className="mt-0.5">
                      <span className="text-3xl font-heading font-black">${tier.price}</span>
                      <span className="text-muted-foreground text-xs">{tier.priceUnit ? ` ${tier.priceUnit}` : "/mo"}</span>
                    </div>
                    {tier.competitorPrice && (
                      <Badge className="mt-1.5 bg-primary/10 text-primary border-0 text-[10px] font-heading">{tier.savingsPercent} cheaper</Badge>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{tier.tagline}</p>
                  </CardHeader>
                  <CardContent className="pt-0 flex flex-col flex-1">
                    <div className="space-y-2 mb-5 flex-1">
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
                    <Button onClick={() => handleTierClick(tier)} className={`w-full text-xs font-heading mt-auto ${tier.starter ? "bg-pink-500 text-white hover:bg-pink-600" : tier.popular || tier.premium ? "bg-primary text-primary-foreground hover:bg-primary-pressed" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`} size="sm">
                      {tier.price >= 299 ? "Book a Call" : tier.name === "Entry Level Pass" ? (<><span className="sm:hidden">Generate</span><span className="hidden sm:inline">Generate Image</span></>) : "Get Started"}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ADD-ONS ═══════ */}
      <section className="py-10 sm:py-16 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2 sm:mb-3">Add-Ons</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">Enhance any plan with individual services.</p>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="flex" onMouseEnter={() => setIsAddOnsPaused(true)} onMouseLeave={() => setIsAddOnsPaused(false)} style={{ animation: 'scroll-left 18s linear infinite', animationPlayState: isAddOnsPaused ? 'paused' : 'running', width: 'max-content' }}>
            {[...addOns, ...addOns, ...addOns].map((addon, i) => (
              <div key={i} className="flex-shrink-0 w-56 sm:w-72 mx-2 sm:mx-2.5">
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 shadow-md overflow-hidden group">
                  <div className={`h-1.5 bg-gradient-to-r ${addon.color}`} />
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${addon.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <addon.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-base mb-2">{addon.name}</h3>
                    <p className="text-muted-foreground text-xs mb-4 flex-1">{addon.desc}</p>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl font-heading font-black">{addon.price}</span>
                      {addon.unit && <span className="text-xs text-muted-foreground">{addon.unit}</span>}
                    </div>
                    <Button onClick={() => handleAddOnClick(addon)} variant="outline" className="w-full text-xs font-heading border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors" size="sm">
                      Add to Plan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════ COMPARISON TABLE ═══════ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              THE RYZE DIFFERENCE
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">Stack us up against anyone</h2>
            <p className="text-muted-foreground text-sm sm:text-lg">See exactly where agencies, AI tools, and Ryze Studios stand side by side.</p>
          </motion.div>

          {/* Mobile comparison cards */}
          <div className="sm:hidden space-y-4">
            {comparisonData.map((row, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <h4 className="font-heading font-semibold text-sm mb-3">{row.feature}</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
                    <div><span className="text-[10px] text-muted-foreground font-heading block">Agencies</span><span className="text-xs text-muted-foreground">{row.agency}</span></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                    <div><span className="text-[10px] text-muted-foreground font-heading block">AI Tools</span><span className="text-xs text-muted-foreground">{row.ai}</span></div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <div><span className="text-[10px] text-primary font-heading block">Ryze</span><span className="text-xs font-semibold text-primary">{row.ryze}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop comparison table */}
          <div className="hidden sm:block overflow-x-auto">
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
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">Ryze Studio's Design Vault</h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">Everything your brand needs in one place, including social templates, investor decks, portfolio websites, single product stores, and seasonal campaigns.</p>
          </motion.div>

          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-10">
            <div className="flex gap-2 sm:gap-3 sm:flex-wrap sm:justify-center whitespace-nowrap">
              {gridIndustries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveGridIndustry(ind)}
                  className={`px-3 sm:px-5 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium border transition-all flex-shrink-0 ${activeGridIndustry === ind ? "bg-card border-primary/40 shadow-md text-foreground ring-1 ring-primary/20" : "bg-card/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-card"}`}
                >
                  {gridEmojis[ind]} {ind}
                </button>
              ))}
            </div>
          </div>

          {/* 4-column IG grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
            {Array.from({ length: 12 }).map((_, i) => {
              const gradients = [
                "from-rose-300 to-pink-500", "from-amber-300 to-orange-500", "from-emerald-300 to-teal-500",
                "from-sky-300 to-blue-500", "from-violet-300 to-purple-500", "from-cyan-300 to-teal-400",
                "from-fuchsia-300 to-pink-500", "from-yellow-300 to-amber-500", "from-lime-300 to-green-500",
                "from-indigo-300 to-blue-600", "from-red-300 to-rose-500", "from-teal-300 to-cyan-500",
              ];
              return (
                <motion.div key={`${activeGridIndustry}-${i}`} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
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
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-heading px-8" onClick={() => navigate("/template-store")}>
              Browse Template Store <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════ BEFORE & AFTER ═══════ */}
      <section id="examples" className="py-12 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              🎨 TRANSFORMATIONS
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">The Ryze effect</h2>
            <p className="text-muted-foreground text-sm sm:text-lg">See how brands went from scattered feeds to scroll-stopping content.</p>
          </motion.div>

          {/* Client tabs */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-10">
            <div className="flex gap-2 justify-center whitespace-nowrap">
              {beforeAfterClients.map((client) => (
                <button
                  key={client}
                  onClick={() => setActiveClient(client)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${activeClient === client ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground border border-border"}`}
                >
                  {client}
                </button>
              ))}
            </div>
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
                {["Posting randomly without a real content plan", "Reels and posts not aligned or connected", "A messy grid that doesn't fully reflect the brand", "Spent a lot of time creating content that barely gets engagement", "Inconsistent visuals that confuse followers", "No clear strategy behind what is being posted"].map((t, i) => (
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
                {["A structured content plan for posts and Reels", "Everything aligned under one clear visual direction", "A clean, intentional grid that reflects the brand", "Content designed with purpose, not guesswork", "Consistent visuals that build recognition", "A strategy behind every piece of content"].map((t, i) => (
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
      <section id="services" className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30 scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3">See Ryze in action</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8">A quick walkthrough of how we turn your raw products into premium, brand-ready content.</p>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-foreground to-foreground/80 rounded-2xl p-6 sm:p-8 text-background">
              <Phone className="w-7 h-7 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-primary" />
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">Let's map out your strategy</h3>
              <p className="text-xs sm:text-sm text-background/70 mb-4 sm:mb-6">Hop on a 20-minute call with a Ryze creative lead and build a content plan tailored to your brand.</p>
              <Button onClick={() => navigate("/book-demo")} className="w-full bg-background text-foreground hover:bg-background/90 font-heading rounded-xl py-4 sm:py-5 text-sm">
                Schedule a Call <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-6 sm:p-8">
              <Rocket className="w-7 h-7 sm:w-8 sm:h-8 mb-3 sm:mb-4 text-primary" />
              <h3 className="font-heading font-bold text-lg sm:text-xl mb-2">Ready to go? Pick a plan</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">Choose your package and start receiving polished, on-brand content within days.</p>
              <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-xl py-4 sm:py-5 text-sm">
                Browse Plans <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ SEAMLESS EXPERIENCE ═══════ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-10">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              <LayoutGrid className="w-3 h-3 mr-1.5 text-primary" /> HOW IT WORKS
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">Built for zero friction</h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">From onboarding to analytics, every touchpoint is designed so you spend less time managing and more time growing.</p>
          </motion.div>

          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 sm:mb-10">
            <div className="flex gap-2 sm:justify-center whitespace-nowrap">
              {featureTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFeatureTab(tab)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-heading font-medium transition-all flex-shrink-0 ${activeFeatureTab === tab ? "bg-foreground text-background" : "border border-border text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div key={activeFeatureTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl sm:rounded-3xl bg-muted/50 border border-border p-6 sm:p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-3 sm:mb-4">{featureContent[activeFeatureTab].title}</h3>
                <p className="text-muted-foreground text-sm sm:text-lg">{featureContent[activeFeatureTab].desc}</p>
              </div>
              <div className="aspect-[4/3] rounded-2xl bg-card border border-border overflow-hidden">
                <img 
                  src={featureContent[activeFeatureTab].image} 
                  alt={`${activeFeatureTab} preview`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ THE BETTER WAY ═══════ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-14">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              ⚡ WHY BRANDS SWITCH
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">The smarter creative model</h2>
            <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">Agencies are slow and expensive. DIY AI tools lack quality. Ryze sits in the sweet spot, delivering <strong className="text-foreground">1,800+</strong> brands premium content without the overhead.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Cost savings chart */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-5 sm:p-8">
                <Badge className="mb-3 bg-primary/10 text-primary border-0 text-[10px] font-heading">📉 COST COMPARISON</Badge>
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 sm:mb-6">Cut creative costs by up to 95%</h3>
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
              <CardContent className="p-5 sm:p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">⏱️ TURNAROUND TIME</Badge>
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-4 sm:mb-6">From brief to deliverable, fast</h3>
                <div className="flex items-end gap-3 sm:gap-4 h-36 sm:h-48 mb-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Quality score */}
            <Card>
              <CardContent className="p-5 sm:p-8 text-center">
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
                <p className="font-heading font-semibold">Brand Satisfaction</p>
                <p className="text-xs text-muted-foreground mt-1">Across 1,800+ active brands</p>
              </CardContent>
            </Card>

            {/* Collaboration */}
            <Card>
              <CardContent className="p-5 sm:p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">💬 COLLABORATION</Badge>
                <h3 className="text-xl font-heading font-bold mb-4">Your creative team, one chat away</h3>
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
              <CardContent className="p-5 sm:p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">📈 OUTPUT GROWTH</Badge>
                <h3 className="text-xl font-heading font-bold mb-4">Watch your output scale</h3>
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
                <p className="text-xs text-primary font-heading font-semibold mt-2 text-center">+280% avg. output growth in 12 months</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Say goodbye */}
            <Card>
              <CardContent className="p-5 sm:p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">👋 THE OLD WAY</Badge>
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4">Leave behind</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {["Chasing unreliable freelancers", "Weeks-long turnaround", "Overpriced agency retainers", "Endless hiring cycles", "Inconsistent brand quality", "DIY tools that fall short"].map((item, i) => (
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
              <CardContent className="p-5 sm:p-8">
                <Badge className="mb-3 bg-muted text-muted-foreground border-0 text-[10px] font-heading">💳 SUBSCRIPTION BASED</Badge>
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4">Subscribe on your terms</h3>
                <div className="flex flex-wrap gap-2">
                  {["Cancel anytime", "Zero lock-in contracts", "Pause when you need", "Scale up or down freely", "Simple monthly billing"].map((item, i) => (
                    <Badge key={i} variant="secondary" className="text-xs font-heading">{item}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════ RESELLER CTA ═══════ */}
      <section className="px-4 sm:px-6 -mt-6 sm:-mt-10 mb-0 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 rounded-2xl border border-primary/20 bg-card p-5 sm:p-6 md:p-8">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-foreground">Want to offer Ryze-quality creative to your own clients?</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm font-heading font-medium">Join the Ryze partner network and white-label our services</p>
                </div>
              </div>
              <Button onClick={() => navigate("/login?role=partner")} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-heading font-semibold rounded-full px-6 py-4 sm:py-5 whitespace-nowrap text-sm relative">
                Apply for partner access <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="pt-10 sm:pt-14 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 bg-muted text-foreground border-border font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              ❓ QUESTIONS & ANSWERS
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold mb-3 sm:mb-4">Got questions? We've got answers</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Don't see yours here? Book a free call and we'll walk you through everything.</p>
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
                  <h3 className="font-heading font-bold text-lg mb-2">Ready to level up your brand?</h3>
                  <Button onClick={() => navigate("/book-demo")} className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading mt-2">
                    Schedule Demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
            <img src={ryzeLogo} alt="Ryze Studios" className="w-7 h-7 rounded-lg object-cover" />
            <span className="font-heading font-bold text-lg">Ryze Studios</span>
          </button>
          <p className="text-xs sm:text-sm text-muted-foreground">© 2026 Ryze Studios. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</button>
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</button>
            <button onClick={() => navigate("/legal")} className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</button>
          </div>
        </div>
      </footer>

      {/* ─── MODALS ─── */}
      <CheckoutModal
        open={!!checkoutTier}
        onOpenChange={(open) => { if (!open) { setCheckoutTier(null); setPendingAddOn(null); } }}
        planName={checkoutTier?.name || ""}
        price={checkoutTier?.price || 0}
        period={checkoutTier?.price ? "/mo" : ""}
        features={checkoutTier?.features.filter(f => f.included).map(f => f.text)}
        suggestedAddOn={checkoutTier ? suggestedAddOns[checkoutTier.name] : undefined}
        preSelectedAddOn={pendingAddOn || undefined}
        preSelectedAddOnQty={pendingAddOn ? 1 : 0}
      />
      <CalendlyModal
        open={!!calendlyTier}
        onOpenChange={(open) => !open && setCalendlyTier(null)}
        planName={calendlyTier?.name || ""}
        price={calendlyTier?.price || 0}
        period={calendlyTier?.price ? "/mo" : ""}
        onBooked={handleCalendlyBooked}
      />
      <EntryLevelPaymentModal
        open={entryLevelOpen}
        onOpenChange={setEntryLevelOpen}
      />
    </div>
  );
};

export default Index;
