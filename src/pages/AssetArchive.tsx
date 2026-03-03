import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Image, Film, FileText } from "lucide-react";

const assets = [
  { name: "Product Hero - Sneakers", type: "Image", date: "Mar 1, 2026" },
  { name: "UGC Unboxing - Candle Set", type: "Video", date: "Feb 27, 2026" },
  { name: "Brand Banner v3", type: "Image", date: "Feb 24, 2026" },
  { name: "Campaign Copy - Spring", type: "Document", date: "Feb 20, 2026" },
  { name: "Lifestyle Flat Lay", type: "Image", date: "Feb 18, 2026" },
  { name: "Social Reel - Product Demo", type: "Video", date: "Feb 15, 2026" },
  { name: "Product Grid - Full Line", type: "Image", date: "Feb 12, 2026" },
  { name: "Testimonial Cut - Sarah K", type: "Video", date: "Feb 10, 2026" },
];

const typeIcon = { Image: Image, Video: Film, Document: FileText };

const AssetArchive: React.FC = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = assets.filter(
    (a) =>
      (typeFilter === "all" || a.type.toLowerCase() === typeFilter) &&
      a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Asset Archive</h1>
        <p className="text-muted-foreground mt-1">All your delivered content in one place</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search assets..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((a, i) => {
          const Icon = typeIcon[a.type as keyof typeof typeIcon] || FileText;
          return (
            <Card key={i} className="group hover:border-primary/30 hover:cyan-glow-sm transition-all cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-square bg-muted rounded-t-xl flex items-center justify-center">
                  <Icon className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="p-4">
                  <p className="font-heading font-medium text-sm truncate">{a.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="text-xs">{a.type}</Badge>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AssetArchive;
