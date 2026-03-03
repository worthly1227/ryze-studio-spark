import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye, Clock, CheckCircle, Truck, Package, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  service: string;
  status: "received" | "in_progress" | "review" | "revision" | "delivered";
  progress: number;
  dueDate: string;
  assignee: string;
  lastUpdate: string;
}

const statusConfig = {
  received: { label: "Received", icon: Package, color: "bg-muted text-muted-foreground" },
  in_progress: { label: "In Progress", icon: Clock, color: "bg-accent text-accent-foreground" },
  review: { label: "Under Review", icon: Eye, color: "bg-primary/10 text-primary border-primary/20" },
  revision: { label: "Revision", icon: AlertCircle, color: "bg-destructive/10 text-destructive border-destructive/20" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-primary/10 text-primary border-primary/20" },
};

const projects: Project[] = [
  { id: "1", name: "Spring Campaign - Product Photography", service: "Product Photography", status: "in_progress", progress: 65, dueDate: "Mar 10, 2026", assignee: "Jordan C.", lastUpdate: "Shooting in progress – 12 of 20 shots complete" },
  { id: "2", name: "UGC Unboxing Video - Candle Set", service: "UGC Video", status: "review", progress: 90, dueDate: "Mar 5, 2026", assignee: "Alex E.", lastUpdate: "Final cut uploaded for your review" },
  { id: "3", name: "Brand Identity Refresh", service: "Brand Design", status: "revision", progress: 50, dueDate: "Mar 15, 2026", assignee: "Maya P.", lastUpdate: "Awaiting your feedback on color palette options" },
  { id: "4", name: "Social Media Content Pack", service: "Content Creation", status: "received", progress: 10, dueDate: "Mar 20, 2026", assignee: "Team Ryze", lastUpdate: "Brief received, kicking off this week" },
  { id: "5", name: "Website Hero Banner", service: "Graphic Design", status: "delivered", progress: 100, dueDate: "Feb 28, 2026", assignee: "Jordan C.", lastUpdate: "Delivered – 3 banner variants in your archive" },
];

const steps = ["Received", "In Progress", "Review", "Delivered"];

const getStepIndex = (status: string) => {
  const map: Record<string, number> = { received: 0, in_progress: 1, review: 2, revision: 2, delivered: 3 };
  return map[status] ?? 0;
};

const ClientProjects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">My Projects</h1>
        <p className="text-muted-foreground mt-1">Track the progress of all your active projects</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active", value: "3", color: "text-primary" },
          { label: "In Review", value: "1", color: "text-accent-foreground" },
          { label: "Revision", value: "1", color: "text-destructive" },
          { label: "Delivered", value: "1", color: "text-primary" },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-5 text-center">
              <p className={`text-3xl font-heading font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project List */}
      <div className="space-y-4">
        {projects.map((project, i) => {
          const stepIdx = getStepIndex(project.status);
          const status = statusConfig[project.status];
          const StatusIcon = status.icon;

          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="hover:border-primary/20 hover:cyan-glow-sm transition-all">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-heading font-bold text-lg">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.service} · Assigned to {project.assignee}</p>
                        </div>
                        <Badge className={`${status.color} text-xs`}>
                          <StatusIcon className="w-3 h-3 mr-1" /> {status.label}
                        </Badge>
                      </div>

                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-sm"><span className="font-semibold text-foreground">Latest update:</span> <span className="text-muted-foreground">{project.lastUpdate}</span></p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Progress value={project.progress} className="flex-1 h-2" />
                        <span className="text-sm font-heading font-semibold text-muted-foreground">{project.progress}%</span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="lg:w-72 flex-shrink-0">
                      <p className="text-xs text-muted-foreground mb-3 font-heading">Progress Timeline</p>
                      <div className="flex items-center gap-0">
                        {steps.map((step, si) => (
                          <React.Fragment key={step}>
                            <div className="flex flex-col items-center gap-1">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                si <= stepIdx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                              }`}>
                                {si < stepIdx ? "✓" : si + 1}
                              </div>
                              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{step}</span>
                            </div>
                            {si < steps.length - 1 && (
                              <div className={`flex-1 h-0.5 mb-4 ${si < stepIdx ? "bg-primary" : "bg-muted"}`} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Due: {project.dueDate}</p>
                    </div>
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

export default ClientProjects;
