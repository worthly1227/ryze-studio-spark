import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Search, Send, Image, Film, FileText, Package, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface DeliverableTask {
  id: string;
  projectName: string;
  clientName: string;
  status: "pending" | "uploading" | "ready" | "sent";
  type: "image" | "video" | "document";
  dueDate: string;
  fileCount: number;
}

const tasks: DeliverableTask[] = [
  { id: "1", projectName: "Spring Campaign - Product Shots", clientName: "Sarah Mitchell", status: "ready", type: "image", dueDate: "Mar 5, 2026", fileCount: 20 },
  { id: "2", projectName: "UGC Unboxing - Candle Set", clientName: "Elena Rodriguez", status: "pending", type: "video", dueDate: "Mar 8, 2026", fileCount: 0 },
  { id: "3", projectName: "Brand Guidelines v2", clientName: "Marcus Chen", status: "sent", type: "document", dueDate: "Mar 1, 2026", fileCount: 1 },
  { id: "4", projectName: "Social Reel Pack", clientName: "David Park", status: "uploading", type: "video", dueDate: "Mar 10, 2026", fileCount: 4 },
  { id: "5", projectName: "Product Grid - Full Line", clientName: "Sarah Mitchell", status: "pending", type: "image", dueDate: "Mar 12, 2026", fileCount: 0 },
  { id: "6", projectName: "Website Banners", clientName: "Lisa Wang", status: "sent", type: "image", dueDate: "Feb 28, 2026", fileCount: 3 },
];

const statusConfig = {
  pending: { label: "Pending Upload", color: "bg-muted text-muted-foreground", icon: Clock },
  uploading: { label: "Uploading", color: "bg-accent text-accent-foreground", icon: Upload },
  ready: { label: "Ready to Send", color: "bg-primary/10 text-primary border-primary/20", icon: Package },
  sent: { label: "Sent", color: "bg-primary/10 text-primary border-primary/20", icon: CheckCircle },
};

const typeIcon = { image: Image, video: Film, document: FileText };

const AdminDeliverables: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = tasks.filter((t) =>
    (statusFilter === "all" || t.status === statusFilter) &&
    (t.projectName.toLowerCase().includes(search.toLowerCase()) || t.clientName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Deliverable Manager</h1>
          <p className="text-muted-foreground mt-1">Upload and send completed work to clients</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-2">
          <Upload className="w-4 h-4" /> Upload Files
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Pending", value: tasks.filter(t => t.status === "pending").length },
          { label: "Uploading", value: tasks.filter(t => t.status === "uploading").length },
          { label: "Ready to Send", value: tasks.filter(t => t.status === "ready").length },
          { label: "Sent", value: tasks.filter(t => t.status === "sent").length },
        ].map((s, i) => (
          <Card key={i}>
            <CardContent className="p-5 text-center">
              <p className="text-2xl font-heading font-bold">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by project or client..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="uploading">Uploading</SelectItem>
            <SelectItem value="ready">Ready to Send</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {filtered.map((task, i) => {
          const status = statusConfig[task.status];
          const TypeIcon = typeIcon[task.type];
          const StatusIcon = status.icon;
          return (
            <motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="hover:border-primary/20 transition-all">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <TypeIcon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold truncate">{task.projectName}</h3>
                    <p className="text-sm text-muted-foreground">{task.clientName} · Due {task.dueDate}</p>
                    <div className="flex gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">{task.fileCount} files</span>
                    </div>
                  </div>
                  <Badge className={`${status.color} text-xs gap-1`}>
                    <StatusIcon className="w-3 h-3" /> {status.label}
                  </Badge>
                  <div className="flex gap-2 flex-shrink-0">
                    {task.status === "pending" && (
                      <Button variant="outline" className="font-heading gap-2 text-sm"><Upload className="w-4 h-4" /> Upload</Button>
                    )}
                    {task.status === "ready" && (
                      <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-2 text-sm"><Send className="w-4 h-4" /> Send to Client</Button>
                    )}
                    {task.status === "sent" && (
                      <Button variant="ghost" className="text-muted-foreground text-sm">View Receipt</Button>
                    )}
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

export default AdminDeliverables;
