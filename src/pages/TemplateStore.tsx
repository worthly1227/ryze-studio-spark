import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, Eye, Smartphone, BarChart3, Globe, ShoppingBag,
  Palette, PartyPopper, Star, Sparkles, Lock, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

/* ─── CATEGORIES ─── */
const categories = [
  { id: "social", label: "Social Media", emoji: "📱", icon: Smartphone },
  { id: "pitch", label: "Pitch Decks", emoji: "📊", icon: BarChart3 },
  { id: "portfolio", label: "Portfolio Websites", emoji: "🌐", icon: Globe },
  { id: "store", label: "One Product Stores", emoji: "🛍️", icon: ShoppingBag },
  { id: "webdesign", label: "Web Design", emoji: "🎨", icon: Palette },
  { id: "seasonal", label: "Seasonal Campaigns", emoji: "🎄", icon: PartyPopper },
] as const;

type CategoryId = typeof categories[number]["id"];

/* ─── TEMPLATE DATA ─── */
const templates: Record<CategoryId, Array<{
  name: string;
  desc: string;
  tags: string[];
  gradient: string;
  popular?: boolean;
  premium?: boolean;
}>> = {
  social: [
    { name: "Carousel Pro", desc: "Swipeable multi-slide carousel template optimized for Instagram engagement.", tags: ["Instagram", "Carousel"], gradient: "from-rose-400 to-pink-500", popular: true },
    { name: "Story Highlights Kit", desc: "Cohesive story highlight covers with matching post templates.", tags: ["Instagram", "Stories"], gradient: "from-violet-400 to-purple-500" },
    { name: "TikTok Hooks Pack", desc: "Scroll-stopping opening frames designed to boost watch time.", tags: ["TikTok", "Video"], gradient: "from-cyan-400 to-blue-500" },
    { name: "Twitter/X Thread", desc: "Clean thread layout with branded header and CTA cards.", tags: ["Twitter", "Text"], gradient: "from-sky-400 to-blue-400" },
    { name: "LinkedIn Authority", desc: "Professional post templates that build credibility and engagement.", tags: ["LinkedIn", "B2B"], gradient: "from-blue-500 to-indigo-600", premium: true },
    { name: "Reels Thumbnail Pack", desc: "Eye-catching thumbnail designs that drive clicks on Reels.", tags: ["Instagram", "Reels"], gradient: "from-amber-400 to-orange-500" },
  ],
  pitch: [
    { name: "Investor Ready", desc: "Clean 12-slide deck with data visualization and traction slides.", tags: ["Startup", "Fundraise"], gradient: "from-emerald-400 to-teal-500", popular: true },
    { name: "Brand Partnership", desc: "Pitch your brand to potential collaborators and sponsors.", tags: ["Collab", "Sponsor"], gradient: "from-violet-400 to-purple-500" },
    { name: "Product Launch Deck", desc: "Build hype with a cinematic product reveal presentation.", tags: ["Launch", "Product"], gradient: "from-amber-400 to-orange-500" },
    { name: "Sales Deck Pro", desc: "Conversion-focused slides with objection-handling framework.", tags: ["Sales", "B2B"], gradient: "from-rose-400 to-pink-500", premium: true },
    { name: "Quarterly Report", desc: "Executive summary deck with KPI dashboards and charts.", tags: ["Report", "Data"], gradient: "from-sky-400 to-blue-500" },
    { name: "Agency Capabilities", desc: "Showcase your services, case studies, and team credentials.", tags: ["Agency", "Services"], gradient: "from-cyan-400 to-teal-400" },
  ],
  portfolio: [
    { name: "Minimal Folio", desc: "Clean grid-based portfolio with smooth hover transitions.", tags: ["Minimal", "Grid"], gradient: "from-slate-400 to-gray-600", popular: true },
    { name: "Creative Showcase", desc: "Bold, full-bleed imagery with staggered layout.", tags: ["Creative", "Bold"], gradient: "from-fuchsia-400 to-pink-500" },
    { name: "Dev Portfolio", desc: "Dark-themed developer portfolio with project cards and GitHub integration.", tags: ["Developer", "Tech"], gradient: "from-emerald-400 to-green-500" },
    { name: "Photography Pro", desc: "Gallery-first layout with lightbox and EXIF data display.", tags: ["Photo", "Gallery"], gradient: "from-amber-300 to-yellow-500", premium: true },
    { name: "Freelancer Hub", desc: "All-in-one portfolio with services, testimonials, and booking.", tags: ["Freelance", "Services"], gradient: "from-violet-400 to-indigo-500" },
    { name: "Agency Landing", desc: "Conversion-optimized agency site with case study sections.", tags: ["Agency", "Landing"], gradient: "from-cyan-400 to-blue-500" },
  ],
  store: [
    { name: "Drop Hero", desc: "High-conversion single product page with urgency elements.", tags: ["Dropship", "Conversion"], gradient: "from-emerald-400 to-teal-500", popular: true },
    { name: "Luxury Single", desc: "Premium feel with editorial product photography layout.", tags: ["Luxury", "Premium"], gradient: "from-amber-300 to-yellow-600" },
    { name: "Flash Sale", desc: "Countdown-driven landing page with scarcity triggers.", tags: ["Sale", "Urgency"], gradient: "from-red-400 to-rose-500" },
    { name: "Subscription Box", desc: "Recurring product page with unboxing showcase.", tags: ["Subscription", "Recurring"], gradient: "from-violet-400 to-purple-500", premium: true },
    { name: "Eco Product", desc: "Sustainability-focused product page with impact metrics.", tags: ["Eco", "Green"], gradient: "from-lime-400 to-green-500" },
    { name: "Tech Gadget", desc: "Spec-focused layout with 360° product viewer placeholder.", tags: ["Tech", "Specs"], gradient: "from-sky-400 to-blue-600" },
  ],
  webdesign: [
    { name: "SaaS Landing", desc: "Feature sections, pricing table, and social proof blocks.", tags: ["SaaS", "Landing"], gradient: "from-violet-400 to-purple-500", popular: true },
    { name: "Restaurant Menu", desc: "Digital menu with food photography grid and ordering CTA.", tags: ["Food", "Local"], gradient: "from-orange-400 to-red-500" },
    { name: "Real Estate", desc: "Property listings with map integration and virtual tour layout.", tags: ["Property", "Listings"], gradient: "from-emerald-400 to-teal-500" },
    { name: "Event Landing", desc: "Speaker cards, agenda timeline, and ticket purchase flow.", tags: ["Event", "Conference"], gradient: "from-pink-400 to-rose-500", premium: true },
    { name: "Blog Magazine", desc: "Content-rich layout with featured posts and category filters.", tags: ["Blog", "Content"], gradient: "from-cyan-400 to-blue-500" },
    { name: "Fitness Studio", desc: "Class schedule, trainer bios, and membership pricing.", tags: ["Fitness", "Health"], gradient: "from-amber-400 to-orange-500" },
  ],
  seasonal: [
    { name: "Black Friday Blitz", desc: "High-urgency campaign page with countdown and deal grid.", tags: ["BFCM", "Sales"], gradient: "from-slate-600 to-gray-900", popular: true },
    { name: "Holiday Gift Guide", desc: "Curated product grid with gift categories and price ranges.", tags: ["Holiday", "Gifts"], gradient: "from-red-400 to-green-500" },
    { name: "Summer Collection", desc: "Bright, vibrant campaign page with lifestyle imagery.", tags: ["Summer", "Lifestyle"], gradient: "from-yellow-300 to-orange-400" },
    { name: "Valentine's Special", desc: "Romantic-themed landing with couples/gift bundle focus.", tags: ["Valentine", "Love"], gradient: "from-pink-400 to-rose-500" },
    { name: "Back to School", desc: "Student-focused campaign with bundle deals and checklist.", tags: ["School", "Youth"], gradient: "from-blue-400 to-indigo-500", premium: true },
    { name: "New Year Launch", desc: "Fresh-start themed campaign for Q1 product launches.", tags: ["New Year", "Launch"], gradient: "from-violet-400 to-purple-600" },
  ],
};

const TemplateStore: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("social");
  const currentTemplates = templates[activeCategory];
  const activeCat = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="min-h-screen bg-background">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2.5 cursor-pointer">
            <img src={ryzeLogo} alt="Ryze Studios" className="w-8 h-8 rounded-lg object-cover" />
            <span className="font-heading font-bold text-lg tracking-tight">Ryze Studios</span>
          </button>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="font-heading text-sm" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading text-sm rounded-full px-6"
              onClick={() => navigate("/plans")}
            >
              View Plans
            </Button>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="pt-16 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button
              variant="ghost"
              className="mb-6 text-muted-foreground hover:text-foreground font-heading text-sm"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
            </Button>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              DESIGN VAULT
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-4 leading-tight">
              Templates that{" "}
              <span className="text-primary cyan-glow-text">convert.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Browse our curated library of conversion-optimized templates across social media, websites, pitch decks, and more. Every template is designed to elevate your brand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY TABS ─── */}
      <section className="px-4 sm:px-6 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex gap-2 sm:gap-3 sm:flex-wrap sm:justify-center whitespace-nowrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-heading font-medium border transition-all flex-shrink-0 ${
                    activeCategory === cat.id
                      ? "bg-card border-primary/40 shadow-md text-foreground ring-1 ring-primary/20"
                      : "bg-card/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/20 hover:bg-card"
                  }`}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEMPLATE GRID ─── */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-heading font-bold flex items-center gap-2">
                {activeCat.emoji} {activeCat.label}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {currentTemplates.length} templates available
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {currentTemplates.map((template, i) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    {/* Preview area */}
                    <div className={`relative aspect-[16/10] bg-gradient-to-br ${template.gradient} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="text-center text-white z-10">
                        <span className="text-4xl mb-2 block drop-shadow-lg">{activeCat.emoji}</span>
                        <span className="text-sm font-heading font-semibold drop-shadow-md">{template.name}</span>
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <Button className="bg-background/90 text-foreground hover:bg-background font-heading rounded-full px-6 shadow-lg">
                          <Eye className="w-4 h-4 mr-2" /> Preview
                        </Button>
                      </div>
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                        {template.popular && (
                          <Badge className="bg-background/90 text-foreground border-0 font-heading text-[10px] backdrop-blur-sm">
                            <Star className="w-3 h-3 mr-1 text-amber-500 fill-amber-500" /> Popular
                          </Badge>
                        )}
                        {template.premium && (
                          <Badge className="bg-primary/90 text-primary-foreground border-0 font-heading text-[10px] backdrop-blur-sm">
                            <Lock className="w-3 h-3 mr-1" /> Premium
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="font-heading font-bold text-base mb-1.5">{template.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{template.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {template.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="font-heading text-[10px] px-2 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 font-heading text-xs border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                          size="sm"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
                        </Button>
                        <Button
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary-pressed font-heading text-xs"
                          size="sm"
                          onClick={() => navigate("/plans")}
                        >
                          Get Template <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border-primary/20">
              <div className="h-1.5 bg-gradient-to-r from-primary via-primary-glow to-primary" />
              <CardContent className="p-8 sm:p-12 text-center">
                <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3">
                  Ready to elevate your brand?
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mb-6">
                  All templates are included with your Ryze plan. Pick a plan that fits your needs and get instant access to the full Design Vault.
                </p>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-8 h-12 text-base"
                  onClick={() => navigate("/plans")}
                >
                  View Plans & Pricing <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img src={ryzeLogo} alt="Ryze Studios" className="w-6 h-6 rounded-lg object-cover" />
            <span className="font-heading font-semibold text-sm">Ryze Studios</span>
          </div>
          <p className="text-muted-foreground text-xs">© 2025 Ryze Studios. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TemplateStore;
