import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Phone, Video, ArrowRight, Lock, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "@/contexts/PlanContext";
import { motion } from "framer-motion";

interface ContactMethod {
  title: string;
  description: string;
  icon: React.ElementType;
  action: string;
  available: boolean;
  minPlan: string;
}

const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan, planFeatures } = usePlan();

  const hasDirectContact = ["Full Brand Manager", "Done For You", "Master Production"].includes(currentPlan ?? "");
  const hasStrategyCall = planFeatures?.hasStrategySessions ?? false;
  const hasDedicatedManager = currentPlan === "Master Production";

  const contactMethods: ContactMethod[] = [
    {
      title: "Email Support",
      description: "Send us an email and we'll respond within 24–48 hours.",
      icon: Mail,
      action: "mailto:help@ryzestudios.com",
      available: true,
      minPlan: "All Plans",
    },
    {
      title: "Live Chat",
      description: "Chat with our team in real-time during business hours.",
      icon: MessageSquare,
      action: "#",
      available: hasDirectContact,
      minPlan: "Full Brand Manager+",
    },
    {
      title: "Strategy Calls",
      description: `Book ${planFeatures?.strategyFrequency ?? ""} strategy sessions with our creative team.`,
      icon: Video,
      action: "/client/strategy",
      available: hasStrategyCall,
      minPlan: "Done For You+",
    },
    {
      title: "Dedicated Account Manager",
      description: "Direct phone & priority access to your personal account manager.",
      icon: Phone,
      action: "#",
      available: hasDedicatedManager,
      minPlan: "Master Production",
    },
  ];

  const upgradeSuggestions = [
    { from: ["Entry Level Pass", "Visual Starter Kit", "Viral Growth"], to: "Full Brand Manager", benefit: "Unlock Live Chat & priority support", price: "$299/mo" },
    { from: ["Entry Level Pass", "Visual Starter Kit", "Viral Growth", "Full Brand Manager"], to: "Done For You", benefit: "Get quarterly Strategy Calls", price: "$499/mo" },
    { from: ["Entry Level Pass", "Visual Starter Kit", "Viral Growth", "Full Brand Manager", "Done For You"], to: "Master Production", benefit: "Dedicated Account Manager + all channels", price: "$679/mo" },
  ].filter((s) => s.from.includes(currentPlan ?? ""));

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-1 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold">Contact Us</h1>
        <p className="text-muted-foreground mt-1">
          Reach out through the support channels included in your plan.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contactMethods.map((method, i) => (
          <motion.div key={method.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className={`h-full transition-all ${method.available ? "hover:border-primary/30 hover:cyan-glow-sm" : "opacity-60"}`}>
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${method.available ? "bg-primary/10" : "bg-muted"}`}>
                    <method.icon className={`w-5 h-5 ${method.available ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-sm">{method.title}</h3>
                      {!method.available && <Lock className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
                  </div>
                </div>
                <div className="mt-auto pt-3">
                  {method.available ? (
                    <Button
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading"
                      onClick={() => {
                        if (method.action.startsWith("mailto:")) {
                          window.open(method.action);
                        } else if (method.action.startsWith("/")) {
                          navigate(method.action);
                        }
                      }}
                    >
                      {method.title === "Email Support" ? "Send Email" : method.title === "Strategy Calls" ? "Book a Call" : "Open Chat"}
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  ) : (
                    <Badge variant="outline" className="text-[10px] w-full justify-center py-1.5">
                      Available from {method.minPlan}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Upgrade Suggestions */}
      {upgradeSuggestions.length > 0 && (
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Crown className="w-4 h-4 text-primary" /> Want more ways to reach us?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upgradeSuggestions.map((s) => (
              <div
                key={s.to}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/30 transition-all cursor-pointer"
                onClick={() => navigate("/plans")}
              >
                <div>
                  <p className="font-heading font-semibold text-sm">{s.to}</p>
                  <p className="text-xs text-muted-foreground">{s.benefit}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-heading font-bold text-sm text-primary">{s.price}</p>
                  <p className="text-[10px] text-muted-foreground">Upgrade</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContactUs;
