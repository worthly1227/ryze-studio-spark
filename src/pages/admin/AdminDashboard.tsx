import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users, DollarSign, FolderKanban, TrendingUp, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle, AlertCircle, BarChart3, Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";

const revenueData = [
  { month: "Sep", revenue: 12400 },
  { month: "Oct", revenue: 15800 },
  { month: "Nov", revenue: 14200 },
  { month: "Dec", revenue: 18900 },
  { month: "Jan", revenue: 21300 },
  { month: "Feb", revenue: 24200 },
  { month: "Mar", revenue: 27800 },
];

const projectsData = [
  { month: "Sep", completed: 18, active: 12 },
  { month: "Oct", completed: 24, active: 15 },
  { month: "Nov", completed: 20, active: 18 },
  { month: "Dec", completed: 28, active: 14 },
  { month: "Jan", completed: 32, active: 20 },
  { month: "Feb", completed: 35, active: 22 },
  { month: "Mar", completed: 40, active: 25 },
];

const planDistribution = [
  { name: "Viral Growth", value: 35, color: "hsl(180 100% 45%)" },
  { name: "Scale Plan", value: 28, color: "hsl(200 80% 50%)" },
  { name: "Starter Pack", value: 22, color: "hsl(240 60% 60%)" },
  { name: "Done For You", value: 15, color: "hsl(160 70% 45%)" },
];

const recentActivity = [
  { action: "New client signed up", detail: "Pure Skincare — Viral Growth", time: "5 min ago", type: "success" as const },
  { action: "Deliverable uploaded", detail: "Social Pack for Urban Kicks", time: "22 min ago", type: "info" as const },
  { action: "Payment received", detail: "$499 — Heritage Coffee", time: "1h ago", type: "success" as const },
  { action: "Revision requested", detail: "Ad Creative — Glow Beauty Co.", time: "2h ago", type: "warning" as const },
  { action: "Project completed", detail: "Product Shoot — FitPro Gear", time: "3h ago", type: "success" as const },
  { action: "Overdue reminder sent", detail: "Casa Candles — 3 days overdue", time: "4h ago", type: "error" as const },
];

const typeIcons = {
  success: CheckCircle,
  info: Activity,
  warning: AlertCircle,
  error: AlertCircle,
};
const typeColors = {
  success: "text-primary",
  info: "text-muted-foreground",
  warning: "text-amber-500",
  error: "text-destructive",
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    { label: "Total Revenue", value: "$24,200", change: "+18%", up: true, icon: DollarSign },
    { label: "Active Clients", value: "42", change: "+6", up: true, icon: Users },
    { label: "Active Projects", value: "67", change: "+12", up: true, icon: FolderKanban },
    { label: "Avg. Delivery", value: "2.4 days", change: "-0.3d", up: true, icon: Clock },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Overview of your business performance</p>
        </div>
        <Button onClick={() => navigate("/admin/clients")} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading w-full sm:w-auto">
          View All Clients
        </Button>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {metrics.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card>
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <m.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <span className={`text-[10px] sm:text-xs font-semibold flex items-center gap-0.5 ${m.up ? "text-primary" : "text-destructive"}`}>
                    {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {m.change}
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-heading font-bold">{m.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base sm:text-lg flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" /> Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(180 100% 45%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(180 100% 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(180 100% 45%)" fill="url(#revenueGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Projects chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base sm:text-lg flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Projects Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={projectsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="completed" fill="hsl(180 100% 45%)" radius={[4, 4, 0, 0]} name="Completed" />
                <Bar dataKey="active" fill="hsl(200 80% 50% / 0.5)" radius={[4, 4, 0, 0]} name="Active" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row: Plan distribution + Activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Plan breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base sm:text-lg">Client Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {planDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {planDistribution.map((p) => (
                <div key={p.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-muted-foreground truncate">{p.name}</span>
                  <span className="font-semibold ml-auto">{p.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity feed */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base sm:text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivity.map((a, i) => {
                const Icon = typeIcons[a.type];
                return (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${typeColors[a.type]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{a.action}</p>
                      <p className="text-xs text-muted-foreground truncate">{a.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">{a.time}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
