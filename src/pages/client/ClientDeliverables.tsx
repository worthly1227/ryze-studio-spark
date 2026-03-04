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
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">Deliverables</h1>
          <p className="text-muted-foreground text-sm mt-1">Download your completed work</p>
        </div>
        <Button variant="outline" className="font-heading gap-2 w-full sm:w-auto">
          <Download className="w-4 h-4" /> Download All
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-5 text-center">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
            <p className="text-xl sm:text-2xl font-heading font-bold">{deliverables.length}</p>
            <p className="text-[10px] sm:text-sm text-muted-foreground">Total Deliveries</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-5 text-center">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
            <p className="text-xl sm:text-2xl font-heading font-bold">{deliverables.filter(d => d.downloaded).length}</p>
            <p className="text-[10px] sm:text-sm text-muted-foreground">Downloaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-5 text-center">
            <Download className="w-5 h-5 sm:w-6 sm:h-6 text-destructive mx-auto mb-1 sm:mb-2" />
            <p className="text-xl sm:text-2xl font-heading font-bold">{deliverables.filter(d => !d.downloaded).length}</p>
            <p className="text-[10px] sm:text-sm text-muted-foreground">Pending</p>
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
                <CardContent className="p-3 sm:p-5 flex items-start sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-semibold text-sm sm:text-base truncate">{item.name}</h3>
                      {!item.downloaded && <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] sm:text-xs">New</Badge>}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.project}</p>
                    <div className="flex gap-2 sm:gap-4 mt-1 flex-wrap">
                      <span className="text-[10px] sm:text-xs text-muted-foreground">{item.fileCount} file{item.fileCount > 1 ? "s" : ""}</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground">{item.totalSize}</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">Delivered {item.deliveredDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-8 w-8 sm:h-9 sm:w-9">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-4">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Download</span>
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
