import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Search, ChevronRight, Clock, CheckCircle, Eye, AlertCircle, Package, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface AdminProject {
  id: string;
  name: string;
  clientName: string;
  clientInitials: string;
  service: string;
  status: "received" | "in_progress" | "review" | "revision" | "delivered";
  progress: number;
  assignee: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

const statusConfig = {
  received: { label: "Received", color: "bg-muted text-muted-foreground" },
  in_progress: { label: "In Progress", color: "bg-accent text-accent-foreground" },
  review: { label: "Under Review", color: "bg-primary/10 text-primary border-primary/20" },
  revision: { label: "Revision", color: "bg-destructive/10 text-destructive border-destructive/20" },
  delivered: { label: "Delivered", color: "bg-primary/10 text-primary border-primary/20" },
};

const priorityConfig = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-accent text-accent-foreground",
  high: "bg-destructive/10 text-destructive border-destructive/20",
};

const projects: AdminProject[] = [
  { id: "1", name: "Spring Campaign Shoot", clientName: "Sarah Mitchell", clientInitials: "SM", service: "Product Photography", status: "in_progress", progress: 65, assignee: "Jordan C.", dueDate: "Mar 10", priority: "high" },
  { id: "2", name: "UGC Unboxing Video", clientName: "Elena Rodriguez", clientInitials: "ER", service: "UGC Video", status: "review", progress: 90, assignee: "Alex E.", dueDate: "Mar 5", priority: "medium" },
  { id: "3", name: "Brand Refresh", clientName: "Marcus Chen", clientInitials: "MC", service: "Brand Design", status: "revision", progress: 50, assignee: "Maya P.", dueDate: "Mar 15", priority: "medium" },
  { id: "4", name: "Social Content Pack", clientName: "David Park", clientInitials: "DP", service: "Content Creation", status: "received", progress: 10, assignee: "Team", dueDate: "Mar 20", priority: "low" },
  { id: "5", name: "Product Demo Reel", clientName: "David Park", clientInitials: "DP", service: "Video Production", status: "in_progress", progress: 40, assignee: "Alex E.", dueDate: "Mar 18", priority: "high" },
  { id: "6", name: "Website Banners", clientName: "Lisa Wang", clientInitials: "LW", service: "Graphic Design", status: "delivered", progress: 100, assignee: "Jordan C.", dueDate: "Feb 28", priority: "low" },
];

const AdminProjects: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = projects.filter((p) =>
    (statusFilter === "all" || p.status === statusFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.clientName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">All Projects</h1>
        <p className="text-muted-foreground mt-1">Manage and update project statuses across all clients</p>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {(["received", "in_progress", "review", "revision", "delivered"] as const).map((s) => {
          const cfg = statusConfig[s];
          const count = projects.filter(p => p.status === s).length;
          return (
            <Card key={s} className={`cursor-pointer transition-all ${statusFilter === s ? "border-primary cyan-glow-sm" : "hover:border-primary/20"}`}
              onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-heading font-bold">{count}</p>
                <Badge className={`${cfg.color} text-xs mt-1`}>{cfg.label}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search projects or clients..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Projects */}
      <div className="space-y-3">
        {filtered.map((project, i) => {
          const status = statusConfig[project.status];
          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="hover:border-primary/20 transition-all cursor-pointer">
                <CardContent className="p-5 flex items-center gap-4">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading">{project.clientInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold truncate">{project.name}</h3>
                      <Badge className={`${priorityConfig[project.priority]} text-[10px]`}>{project.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.clientName} · {project.service} · {project.assignee}</p>
                  </div>
                  <div className="w-32 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="flex-1 h-1.5" />
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Due {project.dueDate}</p>
                  </div>
                  <Badge className={`${status.color} text-xs flex-shrink-0`}>{status.label}</Badge>
                  <Select defaultValue={project.status}>
                    <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="received">Received</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                      <SelectItem value="revision">Revision</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProjects;
