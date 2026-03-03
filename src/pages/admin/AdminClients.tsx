import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Users, Eye, MessageSquare, MoreVertical, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Client {
  id: string;
  name: string;
  company: string;
  initials: string;
  plan: string;
  activeProjects: number;
  totalDelivered: number;
  status: "active" | "paused" | "overdue";
  lastActive: string;
  revenue: string;
}

const clients: Client[] = [
  { id: "1", name: "Sarah Mitchell", company: "Glow Beauty Co.", initials: "SM", plan: "Viral Growth", activeProjects: 3, totalDelivered: 24, status: "active", lastActive: "2 min ago", revenue: "$4,200" },
  { id: "2", name: "Marcus Chen", company: "Urban Kicks", initials: "MC", plan: "Scale Plan", activeProjects: 2, totalDelivered: 18, status: "active", lastActive: "1h ago", revenue: "$8,500" },
  { id: "3", name: "Elena Rodriguez", company: "Casa Candles", initials: "ER", plan: "Starter Pack", activeProjects: 1, totalDelivered: 6, status: "overdue", lastActive: "3d ago", revenue: "$1,800" },
  { id: "4", name: "David Park", company: "FitPro Gear", initials: "DP", plan: "Viral Growth", activeProjects: 4, totalDelivered: 31, status: "active", lastActive: "30 min ago", revenue: "$5,600" },
  { id: "5", name: "Lisa Wang", company: "Pure Skincare", initials: "LW", plan: "Scale Plan", activeProjects: 0, totalDelivered: 12, status: "paused", lastActive: "2w ago", revenue: "$3,200" },
  { id: "6", name: "James Okafor", company: "Heritage Coffee", initials: "JO", plan: "Starter Pack", activeProjects: 1, totalDelivered: 4, status: "active", lastActive: "5h ago", revenue: "$900" },
];

const statusConfig = {
  active: { label: "Active", color: "bg-primary/10 text-primary border-primary/20" },
  paused: { label: "Paused", color: "bg-muted text-muted-foreground" },
  overdue: { label: "Overdue", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

const AdminClients: React.FC = () => {
  const [search, setSearch] = useState("");
  const filtered = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Client Management</h1>
        <p className="text-muted-foreground mt-1">View and manage all active client accounts</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Clients", value: clients.length.toString(), icon: Users },
          { label: "Active", value: clients.filter(c => c.status === "active").length.toString(), icon: CheckCircle },
          { label: "Overdue", value: clients.filter(c => c.status === "overdue").length.toString(), icon: AlertCircle },
          { label: "Total Revenue", value: "$24,200", icon: Clock },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <s.icon className="w-5 h-5 text-muted-foreground mb-2" />
              <p className="text-2xl font-heading font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search clients..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Client List */}
      <div className="space-y-3">
        {filtered.map((client, i) => {
          const status = statusConfig[client.status];
          return (
            <motion.div key={client.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="hover:border-primary/20 hover:cyan-glow-sm transition-all">
                <CardContent className="p-5 flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-heading font-bold">{client.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold">{client.name}</h3>
                      <Badge className={`${status.color} text-xs`}>{status.label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{client.company} · {client.plan}</p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">{client.activeProjects} active projects</span>
                      <span className="text-xs text-muted-foreground">{client.totalDelivered} delivered</span>
                      <span className="text-xs text-muted-foreground">Last active: {client.lastActive}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-heading font-bold text-lg">{client.revenue}</p>
                    <p className="text-xs text-muted-foreground">total revenue</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon"><Eye className="w-4 h-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon"><MessageSquare className="w-4 h-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4 text-muted-foreground" /></Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminClients;
