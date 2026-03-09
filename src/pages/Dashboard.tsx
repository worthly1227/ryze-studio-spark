import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Factory, TrendingUp, Eye, Image, Zap, Upload, LayoutTemplate,
  Film, MessageSquare, Calendar, CheckCircle2, Circle, ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePlan } from "@/contexts/PlanContext";
import ClientWalkthrough from "@/components/ClientWalkthrough";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan, planFeatures, setupProgress, isSetupComplete } = usePlan();
  const [showWalkthrough, setShowWalkthrough] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("ryze-walkthrough-seen");
    if (!seen) setShowWalkthrough(true);
  }, []);

  const completeWalkthrough = () => {
    setShowWalkthrough(false);
    localStorage.setItem("ryze-walkthrough-seen", "true");
  };

  const planLabel = currentPlan || "No Plan";

  const checklistItems = [
    { label: "Upload your images", done: setupProgress.imageUpload, url: "/client/uploads", icon: Upload },
    ...(planFeatures?.hasTemplates ? [{ label: "Select templates", done: setupProgress.templateSelection, url: "/templates", icon: LayoutTemplate }] : []),
    ...(planFeatures?.hasShortFormVideo ? [{ label: "Set video preferences", done: setupProgress.videoOptions, url: "/client/videos", icon: Film }] : []),
    ...(planFeatures?.hasManagedPosting ? [{ label: "Review advanced services", done: setupProgress.advancedServices, url: "/client/social", icon: MessageSquare }] : []),
  ];

  const completedCount = checklistItems.filter((c) => c.done).length;

  // Quick access cards based on plan
  const quickCards = [
    { title: "AI Factory", desc: "Create stunning visuals with AI", icon: Factory, url: "/ai-factory", visible: true },
    { title: "Upload Center", desc: "Upload your product images", icon: Upload, url: "/client/uploads", visible: true },
    ...(planFeatures?.hasTemplates ? [{ title: "Templates", desc: `${planFeatures.templateCount} templates available`, icon: LayoutTemplate, url: "/templates", visible: true }] : []),
    ...(planFeatures?.hasShortFormVideo ? [{ title: "My Videos", desc: `${planFeatures.videoCount} videos included`, icon: Film, url: "/client/videos", visible: true }] : []),
    ...(planFeatures?.hasManagedPosting ? [{ title: "Social Posting", desc: "Manage your social content", icon: MessageSquare, url: "/client/social", visible: true }] : []),
    ...(planFeatures?.hasStrategySessions ? [{ title: "Strategy Sessions", desc: "Book your next call", icon: Calendar, url: "/client/strategy", visible: true }] : []),
  ];

  return (
    <>
      {showWalkthrough && <ClientWalkthrough onComplete={completeWalkthrough} />}
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to Ryze Studios</p>
        </div>

        {/* Plan Status */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-primary/20 cyan-glow-sm">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="w-full sm:w-auto">
                <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">Active</Badge>
                <h3 className="font-heading font-bold text-lg sm:text-xl">{planLabel}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">Renews Mar 15, 2026</p>
                {planFeatures && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {planFeatures.hasTemplates && <Badge variant="outline" className="text-[10px]">{planFeatures.templateCount} Templates</Badge>}
                    {planFeatures.hasShortFormVideo && <Badge variant="outline" className="text-[10px]">{planFeatures.videoCount} Videos</Badge>}
                    {planFeatures.hasUGC && <Badge variant="outline" className="text-[10px]">{planFeatures.ugcCount} UGC</Badge>}
                  </div>
                )}
              </div>
              <Button onClick={() => navigate("/plans")} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading w-full sm:w-auto">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Setup Checklist */}
        {!isSetupComplete && checklistItems.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-base">Get Started</CardTitle>
                  <span className="text-xs text-muted-foreground">{completedCount}/{checklistItems.length} complete</span>
                </div>
                <Progress value={(completedCount / checklistItems.length) * 100} className="h-1.5 mt-2" />
              </CardHeader>
              <CardContent className="space-y-1">
                {checklistItems.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(item.url)}
                    className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    {item.done ? (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <span className={`text-sm font-heading ${item.done ? "text-muted-foreground line-through" : ""}`}>
                      {item.label}
                    </span>
                    {!item.done && <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Access */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickCards.map((card, i) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
              <Card className="group cursor-pointer hover:border-primary/30 hover:cyan-glow-sm transition-all h-full" onClick={() => navigate(card.url)}>
                <CardContent className="p-4 sm:p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm">{card.title}</h3>
                    <p className="text-xs text-muted-foreground">{card.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {[
            { label: "Generation Credits", value: planFeatures?.generationCredits?.toString() ?? "0", icon: Zap, change: "" },
            { label: "Final Downloads", value: planFeatures?.finalDownloads?.toString() ?? "0", icon: Image, change: "" },
            { label: "Views", value: "8.4K", icon: Eye, change: "+24%" },
            { label: "Engagement", value: "312%", icon: TrendingUp, change: "+8%" },
          ].map((m, i) => (
            <Card key={i}>
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <m.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  {m.change && <span className="text-[10px] sm:text-xs text-primary font-semibold">{m.change}</span>}
                </div>
                <p className="text-xl sm:text-2xl font-heading font-bold">{m.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "AI Edit completed", item: "Product Shot - White Sneakers", time: "2 hours ago" },
                { action: "Production request submitted", item: "Spring Campaign Batch", time: "1 day ago" },
                { action: "Asset downloaded", item: "Hero Banner v3.png", time: "2 days ago" },
                { action: "UGC video delivered", item: "Unboxing - Premium Candle Set", time: "3 days ago" },
              ].map((a, i) => (
                <div key={i} className="flex items-start sm:items-center justify-between gap-2 py-3 border-b border-border last:border-0">
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{a.action}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{a.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
