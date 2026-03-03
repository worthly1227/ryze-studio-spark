import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check, X, ArrowRight, Sparkles, Zap, Shield, Users, Calendar, Crown,
  Rocket, Camera, Play, Megaphone, MessageSquare, Mail, Headphones,
  Video, Hash, ChevronDown, ChevronUp, HelpCircle, Bot, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import ryzeLogo from "@/assets/ryze-logo.jpeg";
import CheckoutModal from "@/components/CheckoutModal";
import CalendlyModal from "@/components/CalendlyModal";

/* ─── PLAN DATA WITH SUPPORT TIERS ─── */
const plans = [
  {
    name: "Entry Level Pass",
    price: 10,
    period: "/mo",
    tagline: "Best for early stage brands testing premium visuals.",
    icon: Zap,
    gradient: "from-slate-400 to-slate-600",
    supportLabel: "Help Center Only",
    supportDesc: "No human chat. Use our How-To docs and AI assistant.",
    supportIcon: Bot,
    supportColor: "text-muted-foreground",
    competitorPrice: 39,
    savingsPercent: "74%",
    canContact: false,
    features: [
      { text: "1 AI Product Edit", included: true },
      { text: "Standard Processing", included: true },
      { text: "Help Center & AI Bot", included: true },
      { text: "UGC Video", included: false },
      { text: "Managed Social Posting", included: false },
      { text: "Strategy Calls", included: false },
    ],
  },
  {
    name: "Visual Starter Kit",
    price: 110,
    period: "/mo",
    tagline: "For consistent, scroll-stopping brand visuals.",
    icon: Sparkles,
    gradient: "from-sky-400 to-cyan-500",
    supportLabel: "Email Support",
    supportDesc: "48-hour reply time. Handled by your support freelancer.",
    supportIcon: Mail,
    supportColor: "text-sky-500",
    competitorPrice: 870,
    savingsPercent: "87%",
    canContact: false,
    features: [
      { text: "10 AI Product Edits", included: true },
      { text: "Standard Processing", included: true },
      { text: "Email Support (48hr)", included: true },
      { text: "Help Center & AI Bot", included: true },
      { text: "UGC Video", included: false },
      { text: "Strategy Calls", included: false },
    ],
  },
  {
    name: "Viral Growth",
    price: 240,
    period: "/mo",
    tagline: "Performance-focused content for scaling brands.",
    icon: Users,
    gradient: "from-emerald-400 to-teal-500",
    popular: true,
    supportLabel: "Priority Email",
    supportDesc: "24-hour reply time. Pushed to the front of the inbox.",
    supportIcon: Mail,
    supportColor: "text-emerald-500",
    competitorPrice: 2100,
    savingsPercent: "88%",
    canContact: false,
    features: [
      { text: "1 UGC Video", included: true },
      { text: "5 AI Product Edits", included: true },
      { text: "Standard Processing", included: true },
      { text: "Priority Email (24hr)", included: true },
      { text: "Help Center & AI Bot", included: true },
      { text: "Strategy Calls", included: false },
    ],
  },
  {
    name: "Full Brand Manager",
    price: 299,
    period: "/mo",
    tagline: "Structured social execution with real-time support.",
    icon: Shield,
    gradient: "from-violet-400 to-purple-500",
    supportLabel: "Live Chat",
    supportDesc: "Real-time text support during business hours via your VA.",
    supportIcon: MessageSquare,
    supportColor: "text-violet-500",
    competitorPrice: 1800,
    savingsPercent: "83%",
    canContact: true,
    features: [
      { text: "Managed Social Posting", included: true },
      { text: "20 AI Edits", included: true },
      { text: "1 UGC Video", included: true },
      { text: "Live Chat Support", included: true },
      { text: "Standard Processing", included: true },
      { text: "Strategy Calls", included: false },
    ],
  },
  {
    name: "Done For You",
    price: 499,
    period: "/mo",
    tagline: "Full creative outsourcing. We handle everything.",
    icon: Calendar,
    gradient: "from-amber-400 to-orange-500",
    supportLabel: "Monthly Strategy Call",
    supportDesc: "One 30-minute Zoom call per month to review your creative mix.",
    supportIcon: Video,
    supportColor: "text-amber-500",
    competitorPrice: 5500,
    savingsPercent: "91%",
    canContact: true,
    features: [
      { text: "Full Content Batch", included: true },
      { text: "Strategic Direction", included: true },
      { text: "AI + UGC Mix", included: true },
      { text: "Managed Social Posting", included: true },
      { text: "Monthly Strategy Call", included: true },
      { text: "Fast Track Processing", included: true },
    ],
  },
  {
    name: "Master Production",
    price: 679,
    period: "/mo",
    tagline: "High-volume scaling with priority everything.",
    icon: Crown,
    gradient: "from-rose-400 to-pink-600",
    premium: true,
    supportLabel: "Priority Strategy Access",
    supportDesc: "Direct Slack channel + bi-weekly 1-on-1 strategy sessions.",
    supportIcon: Hash,
    supportColor: "text-rose-500",
    competitorPrice: 6800,
    savingsPercent: "90%",
    canContact: true,
    features: [
      { text: "Unlimited AI Edits", included: true },
      { text: "Premium UGC Priority", included: true },
      { text: "Full Content Batch", included: true },
      { text: "Managed Social Posting", included: true },
      { text: "Bi-weekly Strategy Sessions", included: true },
      { text: "Direct Slack Channel", included: true },
    ],
  },
  {
    name: "Max Business Launch",
    price: 2500,
    period: "",
    tagline: "We build your US brand, stock it, and hand you the keys in 24 hours.",
    icon: Rocket,
    gradient: "from-primary to-primary-glow",
    premium: true,
    oneTime: true,
    supportLabel: "The Handover",
    supportDesc: "Email during build + one 60-minute 'Keys to the City' call.",
    supportIcon: Headphones,
    supportColor: "text-primary",
    canContact: true,
    features: [
      { text: "Full US Brand Build", included: true },
      { text: "Product Sourcing & Stocking", included: true },
      { text: "24-Hour Delivery", included: true },
      { text: "Email Support During Build", included: true },
      { text: "60-Min Handover Call", included: true },
      { text: "Launch-Ready Dashboard", included: true },
    ],
  },
];

const addOns = [
  { name: "Extra AI Product Image", price: "$10", unit: "per final download", desc: "Generate unlimited variations — only pay for the final image you choose.", icon: Camera, gradient: "from-sky-400 to-cyan-500" },
  { name: "30-Second UGC Video", price: "$99", unit: "", desc: "Professionally produced social-ready video featuring vetted creators.", icon: Play, gradient: "from-violet-400 to-purple-500" },
  { name: "Short Video (<20s)", price: "$59", unit: "", desc: "Quick, scroll-stopping clips optimized for Reels, TikTok, and Stories.", icon: Rocket, gradient: "from-amber-400 to-orange-500" },
  { name: "Strategic Consultancy", price: "$224", unit: "", desc: "45-minute 1-on-1 session to guide your brand strategy and growth.", icon: Megaphone, gradient: "from-emerald-400 to-teal-500" },
  { name: "Max Business Launch", price: "$2,500", unit: "", desc: "We build your US brand, stock it with products, and hand you the keys in 24 hours.", icon: Rocket, gradient: "from-rose-400 to-pink-500" },
];

const Plans: React.FC = () => {
  const navigate = useNavigate();
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [checkoutPlan, setCheckoutPlan] = useState<typeof plans[0] | null>(null);
  const [calendlyPlan, setCalendlyPlan] = useState<typeof plans[0] | null>(null);
  const [showCheckoutAfterBooking, setShowCheckoutAfterBooking] = useState(false);

  const handleGetStarted = (plan: typeof plans[0]) => {
    if (plan.canContact) {
      setCalendlyPlan(plan);
    } else {
      setCheckoutPlan(plan);
    }
  };

  const handleCalendlyBooked = () => {
    const plan = calendlyPlan;
    setCalendlyPlan(null);
    if (plan) {
      setCheckoutPlan(plan);
    }
  };

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
            <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading text-sm rounded-full px-6" onClick={() => navigate("/book-demo")}>
              Book a Demo
            </Button>
          </div>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 font-heading text-xs tracking-wider px-4 py-1.5 rounded-full">
              PLANS & PRICING
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-4 leading-tight">
              Scale your brand.{" "}
              <span className="text-primary cyan-glow-text">Pick your level.</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
              Every plan includes access to your Ryze dashboard and dedicated creative support. 
              Choose the tier that matches your ambition.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── PLANS GRID ─── */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {plans.slice(0, 6).map((plan, i) => {
              const isExpanded = expandedPlan === plan.name;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`relative overflow-hidden h-full transition-all duration-300 hover:shadow-xl group ${
                    plan.popular ? "ring-2 ring-primary cyan-glow-sm" : 
                    plan.premium ? "ring-2 ring-rose-400/50" : 
                    "hover:ring-1 hover:ring-primary/30"
                  }`}>
                    {/* Top gradient bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${plan.gradient}`} />
                    
                    {plan.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground font-heading text-[10px] px-2.5 py-0.5">
                          MOST POPULAR
                        </Badge>
                      </div>
                    )}
                    {plan.premium && !plan.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-heading text-[10px] px-2.5 py-0.5 border-0">
                          PREMIUM
                        </Badge>
                      </div>
                    )}

                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Plan icon & name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <plan.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg leading-tight">{plan.name}</h3>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-heading font-black">${plan.price.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm">{plan.period}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-muted-foreground line-through">
                            Competitors: ${plan.competitorPrice.toLocaleString()}
                          </span>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0 font-heading">
                            SAVE {plan.savingsPercent}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{plan.tagline}</p>

                      {/* Support tier card */}
                      <div className="rounded-xl bg-muted/50 border border-border p-3.5 mb-5">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <plan.supportIcon className={`w-4 h-4 ${plan.supportColor}`} />
                          <span className={`font-heading font-semibold text-sm ${plan.supportColor}`}>
                            {plan.supportLabel}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed pl-6.5">
                          {plan.supportDesc}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-2.5 mb-6 flex-1">
                        {plan.features.slice(0, isExpanded ? undefined : 4).map((f, fi) => (
                          <div key={fi} className="flex items-center gap-2.5">
                            {f.included ? (
                              <div className="w-4.5 h-4.5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-primary" />
                              </div>
                            ) : (
                              <div className="w-4.5 h-4.5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <X className="w-3 h-3 text-muted-foreground/40" />
                              </div>
                            )}
                            <span className={`text-sm ${f.included ? "text-foreground" : "text-muted-foreground/50"}`}>
                              {f.text}
                            </span>
                          </div>
                        ))}
                        {plan.features.length > 4 && (
                          <button
                            onClick={() => setExpandedPlan(isExpanded ? null : plan.name)}
                            className="flex items-center gap-1 text-xs text-primary font-heading font-medium hover:underline mt-1"
                          >
                            {isExpanded ? "Show less" : `+${plan.features.length - 4} more`}
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        )}
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={() => handleGetStarted(plan)}
                        className={`w-full font-heading rounded-xl h-11 ${
                          plan.popular
                            ? "bg-primary text-primary-foreground hover:bg-primary-pressed"
                            : plan.premium
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 border-0"
                            : "bg-foreground text-background hover:bg-foreground/90"
                        }`}
                      >
                        {plan.canContact ? "Book a Call" : "Get Started"}
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Max Business Launch - Full width premium card */}
          {(() => {
            const plan = plans[6];
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Card className="relative overflow-hidden ring-2 ring-primary cyan-glow">
                  <div className="h-2 bg-gradient-to-r from-primary via-primary-glow to-primary" />
                  <CardContent className="p-8 md:p-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Left - Info */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center cyan-glow">
                            <Rocket className="w-7 h-7 text-primary-foreground" />
                          </div>
                          <div>
                            <Badge className="bg-primary/10 text-primary border-primary/20 font-heading text-[10px] mb-1">
                              ONE-TIME INVESTMENT
                            </Badge>
                            <h3 className="font-heading font-bold text-2xl">{plan.name}</h3>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-base mb-6 leading-relaxed max-w-md">
                          {plan.tagline}
                        </p>
                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-5xl font-heading font-black">${plan.price.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm">one-time</span>
                        </div>

                        {/* Support tier */}
                        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-6">
                          <div className="flex items-center gap-2.5 mb-1.5">
                            <plan.supportIcon className={`w-5 h-5 ${plan.supportColor}`} />
                            <span className="font-heading font-bold text-base text-primary">{plan.supportLabel}</span>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed pl-7.5">{plan.supportDesc}</p>
                        </div>

                        <Button
                          onClick={() => handleGetStarted(plan)}
                          className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-xl h-12 px-8 text-base"
                        >
                          Launch Your Brand <Rocket className="w-5 h-5 ml-2" />
                        </Button>
                      </div>

                      {/* Right - Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {plan.features.map((f, fi) => (
                          <div key={fi} className="flex items-start gap-3 bg-muted/30 rounded-xl p-3.5 border border-border/50">
                            <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-sm font-medium">{f.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })()}
        </div>
      </section>



      {/* ─── SUPPORT COMPARISON ─── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3">
              Support That Scales With You
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              Every tier unlocks a higher level of creative partnership.
            </p>
          </motion.div>

          <div className="space-y-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 p-4 rounded-xl border transition-all hover:shadow-md ${
                  plan.canContact ? "border-primary/20 bg-primary/5" : "border-border bg-card"
                }`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                    <plan.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-sm">{plan.name}</span>
                      <span className="text-xs text-muted-foreground">— ${plan.price.toLocaleString()}{plan.period}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <plan.supportIcon className={`w-4 h-4 ${plan.supportColor}`} />
                    <span className={`font-heading font-semibold text-sm ${plan.supportColor}`}>{plan.supportLabel}</span>
                  </div>
                  {plan.canContact && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-heading flex-shrink-0">
                      DIRECT CONTACT
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-xs mb-4">
              All live chat sessions and strategy calls are booked through Calendly for your convenience.
            </p>
            <Button
              onClick={() => navigate("/book-demo")}
              className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-8"
            >
              Not sure? Book a free demo <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-4 sm:px-6 border-t border-border bg-muted/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2 cursor-pointer">
            <img src={ryzeLogo} alt="Ryze Studios" className="w-6 h-6 rounded-md object-cover" />
            <span className="font-heading font-bold text-sm">Ryze Studios</span>
          </button>
          <p className="text-xs text-muted-foreground">© 2025 Ryze Studios. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Plans;
