import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Image, Film, FileText, X, CheckCircle, Clock, Search, Plus, Grid3X3, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadedFile {
  id: string;
  name: string;
  type: "image" | "video" | "document";
  status: "uploading" | "processing" | "approved" | "review";
  thumbnail: string;
  date: string;
  size: string;
}

const mockUploads: UploadedFile[] = [
  { id: "1", name: "Product Hero - Sneakers", type: "image", status: "approved", thumbnail: "🖼️", date: "Mar 1, 2026", size: "4.2 MB" },
  { id: "2", name: "UGC Unboxing Video", type: "video", status: "review", thumbnail: "🎬", date: "Feb 28, 2026", size: "128 MB" },
  { id: "3", name: "Brand Guidelines v2", type: "document", status: "approved", thumbnail: "📄", date: "Feb 25, 2026", size: "2.1 MB" },
  { id: "4", name: "Lifestyle Flat Lay", type: "image", status: "approved", thumbnail: "🖼️", date: "Feb 22, 2026", size: "6.8 MB" },
  { id: "5", name: "Product Demo Reel", type: "video", status: "processing", thumbnail: "🎬", date: "Feb 20, 2026", size: "256 MB" },
  { id: "6", name: "Spring Campaign Brief", type: "document", status: "review", thumbnail: "📄", date: "Feb 18, 2026", size: "1.4 MB" },
  { id: "7", name: "Candle Set Photography", type: "image", status: "approved", thumbnail: "🖼️", date: "Feb 15, 2026", size: "8.1 MB" },
  { id: "8", name: "Skincare Line Photos", type: "image", status: "uploading", thumbnail: "🖼️", date: "Feb 12, 2026", size: "5.3 MB" },
];

const typeIcon = { image: Image, video: Film, document: FileText };
const statusConfig = {
  uploading: { label: "Uploading", color: "bg-muted text-muted-foreground" },
  processing: { label: "Processing", color: "bg-accent text-accent-foreground" },
  approved: { label: "Approved", color: "bg-primary/10 text-primary border-primary/20" },
  review: { label: "In Review", color: "bg-destructive/10 text-destructive border-destructive/20" },
};

const ClientUploads: React.FC = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [dragOver, setDragOver] = useState(false);

  const filtered = mockUploads.filter(
    (f) =>
      (typeFilter === "all" || f.type === typeFilter) &&
      (statusFilter === "all" || f.status === statusFilter) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Upload Center</h1>
          <p className="text-muted-foreground mt-1">Upload and manage your content files</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-2">
          <Plus className="w-4 h-4" /> New Upload
        </Button>
      </div>

      {/* Drop Zone */}
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${
          dragOver ? "border-primary bg-primary/5 cyan-glow-sm" : "border-border hover:border-primary/30"
        }`}
      >
        <Upload className={`w-10 h-10 mx-auto mb-3 ${dragOver ? "text-primary" : "text-muted-foreground"}`} />
        <p className="font-heading font-semibold text-lg">Drag & drop your files here</p>
        <p className="text-muted-foreground text-sm mt-1">or click to browse · Images, Videos, Documents up to 500MB</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search uploads..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="uploading">Uploading</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1 border border-border rounded-lg p-1">
          <button onClick={() => setView("grid")} className={`p-1.5 rounded ${view === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button onClick={() => setView("list")} className={`p-1.5 rounded ${view === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* File Grid */}
      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((file, i) => {
              const Icon = typeIcon[file.type];
              const status = statusConfig[file.status];
              return (
                <motion.div key={file.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="group hover:border-primary/30 hover:cyan-glow-sm transition-all cursor-pointer overflow-hidden">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted rounded-t-xl flex items-center justify-center relative">
                        <Icon className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="absolute top-2 right-2">
                          <Badge className={`text-xs ${status.color}`}>{status.label}</Badge>
                        </div>
                        {file.status === "uploading" && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: "65%" }} />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="font-heading font-medium text-sm truncate">{file.name}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                          <span className="text-xs text-muted-foreground">{file.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {filtered.map((file) => {
                    const Icon = typeIcon[file.type];
                    const status = statusConfig[file.status];
                    return (
                      <div key={file.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-heading font-medium text-sm truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                        <Badge className={`text-xs ${status.color}`}>{status.label}</Badge>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{file.date}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientUploads;
