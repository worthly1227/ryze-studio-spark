import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Film, Play, Clock, CheckCircle2, Plus } from "lucide-react";
import { usePlan } from "@/contexts/PlanContext";
import { motion } from "framer-motion";

const mockVideos = [
  { id: "1", title: "Product Showcase - Sneakers", type: "Short-Form", status: "completed", duration: "0:30", date: "Mar 3, 2026" },
  { id: "2", title: "Lifestyle Montage - Spring", type: "Short-Form", status: "in-progress", duration: "0:45", date: "Mar 1, 2026" },
  { id: "3", title: "UGC Unboxing - Candle Set", type: "UGC", status: "review", duration: "1:15", date: "Feb 28, 2026" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-primary/10 text-primary border-primary/20" },
  "in-progress": { label: "In Progress", className: "bg-accent text-accent-foreground" },
  review: { label: "In Review", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const MyVideos: React.FC = () => {
  const { planFeatures } = usePlan();

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-1 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">My Videos</h1>
          <p className="text-muted-foreground mt-1">
            {planFeatures?.videoCount || 0} short-form video(s)
            {planFeatures?.hasUGC ? ` + ${planFeatures.ugcCount} UGC video(s)` : ""} included
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> Request Video
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVideos
          .filter((v) => v.type === "UGC" ? planFeatures?.hasUGC : true)
          .map((video, i) => {
            const status = statusConfig[video.status];
            return (
              <motion.div key={video.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="group hover:border-primary/30 hover:cyan-glow-sm transition-all cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted flex items-center justify-center relative">
                      <Film className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className={`text-xs ${status.className}`}>{status.label}</Badge>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded px-1.5 py-0.5">
                        <span className="text-xs font-mono">{video.duration}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-heading font-medium text-sm truncate">{video.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-[10px]">{video.type}</Badge>
                        <span className="text-xs text-muted-foreground">{video.date}</span>
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

export default MyVideos;
