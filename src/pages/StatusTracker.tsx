import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Loader2 } from "lucide-react";

const jobs = [
  { name: "Spring Campaign Batch", status: "In Production", progress: 50 },
  { name: "Product Shots - Summer Line", status: "Quality Review", progress: 75 },
  { name: "UGC Video - Skincare Kit", status: "Product Received", progress: 25 },
  { name: "Hero Banner Redesign", status: "Final Delivery", progress: 100 },
];

const statusIcon = {
  "Product Received": <Clock className="w-4 h-4 text-muted-foreground" />,
  "In Production": <Loader2 className="w-4 h-4 text-primary animate-spin" />,
  "Quality Review": <Clock className="w-4 h-4 text-primary" />,
  "Final Delivery": <CheckCircle className="w-4 h-4 text-primary" />,
};

const StatusTracker: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div>
      <h1 className="text-3xl font-heading font-bold">Status Tracker</h1>
      <p className="text-muted-foreground mt-1">Real-time progress on all active jobs</p>
    </div>
    <div className="space-y-4">
      {jobs.map((j, i) => (
        <Card key={i} className={j.progress === 100 ? "border-primary/20" : ""}>
          <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {statusIcon[j.status as keyof typeof statusIcon]}
                <h3 className="font-heading font-semibold">{j.name}</h3>
              </div>
              <Badge variant="secondary" className="font-heading text-xs">{j.status}</Badge>
            </div>
            <div className="w-full sm:w-48">
              <Progress value={j.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1 text-right">{j.progress}%</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default StatusTracker;
