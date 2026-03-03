import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Factory, ClipboardList, TrendingUp, Eye, Image, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to Ryze Studios</p>
      </div>

      {/* Subscription Status */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-primary/20 cyan-glow-sm">
          <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">Active</Badge>
              <h3 className="font-heading font-bold text-lg sm:text-xl">Viral Growth Plan</h3>
              <p className="text-muted-foreground text-xs sm:text-sm">3 of 5 AI Edits used this cycle · Renews Mar 15</p>
              <Progress value={60} className="mt-3 h-2 w-full max-w-64" />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading w-full sm:w-auto">
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="group cursor-pointer hover:border-primary/30 hover:cyan-glow-sm transition-all" onClick={() => navigate("/ai-factory")}>
          <CardContent className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Factory className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold">AI Factory</h3>
              <p className="text-sm text-muted-foreground">Create stunning visuals with AI</p>
            </div>
          </CardContent>
        </Card>
        <Card className="group cursor-pointer hover:border-primary/30 hover:cyan-glow-sm transition-all" onClick={() => navigate("/production-requests")}>
          <CardContent className="p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-heading font-semibold">Production Requests</h3>
              <p className="text-sm text-muted-foreground">Submit new creative briefs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        {[
          { label: "Total Edits", value: "127", icon: Image, change: "+12%" },
          { label: "Views", value: "8.4K", icon: Eye, change: "+24%" },
          { label: "Engagement", value: "312%", icon: TrendingUp, change: "+8%" },
          { label: "Credits Left", value: "2", icon: Zap, change: "" },
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
  );
};

export default Dashboard;
