import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Image, Film, FileText, Search, Eye, CheckCircle, Package } from "lucide-react";
import { motion } from "framer-motion";

interface Deliverable {
  id: string;
  name: string;
  project: string;
  type: "image" | "video" | "document";
  deliveredDate: string;
  fileCount: number;
  totalSize: string;
  downloaded: boolean;
}

const deliverables: Deliverable[] = [
  { id: "1", name: "Website Hero Banner Pack", project: "Website Hero Banner", type: "image", deliveredDate: "Feb 28, 2026", fileCount: 3, totalSize: "18.4 MB", downloaded: true },
  { id: "2", name: "Product Photography - Full Line", project: "Spring Campaign", type: "image", deliveredDate: "Feb 24, 2026", fileCount: 20, totalSize: "142 MB", downloaded: false },
  { id: "3", name: "UGC Testimonial Video", project: "UGC Campaign", type: "video", deliveredDate: "Feb 20, 2026", fileCount: 1, totalSize: "256 MB", downloaded: true },
  { id: "4", name: "Brand Guidelines Document", project: "Brand Identity Refresh", type: "document", deliveredDate: "Feb 15, 2026", fileCount: 1, totalSize: "8.2 MB", downloaded: true },
  { id: "5", name: "Social Media Content Pack", project: "Social Media Campaign", type: "image", deliveredDate: "Feb 10, 2026", fileCount: 12, totalSize: "56 MB", downloaded: false },
  { id: "6", name: "Product Demo Reel", project: "Video Production", type: "video", deliveredDate: "Feb 5, 2026", fileCount: 2, totalSize: "480 MB", downloaded: false },
];

const typeIcon = { image: Image, video: Film, document: FileText };

const ClientDeliverables: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = deliverables.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Deliverables</h1>
          <p className="text-muted-foreground mt-1">Download your completed work from Ryze Studios</p>
        </div>
        <Button variant="outline" className="font-heading gap-2">
          <Download className="w-4 h-4" /> Download All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 text-center">
            <Package className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold">{deliverables.length}</p>
            <p className="text-sm text-muted-foreground">Total Deliveries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold">{deliverables.filter(d => d.downloaded).length}</p>
            <p className="text-sm text-muted-foreground">Downloaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 text-center">
            <Download className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold">{deliverables.filter(d => !d.downloaded).length}</p>
            <p className="text-sm text-muted-foreground">Pending Download</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search deliverables..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      {/* Deliverables List */}
      <div className="space-y-3">
        {filtered.map((item, i) => {
          const Icon = typeIcon[item.type];
          return (
            <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="hover:border-primary/20 hover:cyan-glow-sm transition-all">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold truncate">{item.name}</h3>
                      {!item.downloaded && <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.project}</p>
                    <div className="flex gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">{item.fileCount} file{item.fileCount > 1 ? "s" : ""}</span>
                      <span className="text-xs text-muted-foreground">{item.totalSize}</span>
                      <span className="text-xs text-muted-foreground">Delivered {item.deliveredDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-2">
                      <Download className="w-4 h-4" /> Download
                    </Button>
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

export default ClientDeliverables;
