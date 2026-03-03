import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const articles = [
  { title: "Why AI Product Photography Is the Future of E-commerce", category: "AI", readTime: "5 min", date: "Feb 28, 2026" },
  { title: "How to Build a Brand That Converts in 2026", category: "Strategy", readTime: "8 min", date: "Feb 22, 2026" },
  { title: "UGC vs Traditional Ads: What the Data Says", category: "Marketing", readTime: "6 min", date: "Feb 15, 2026" },
  { title: "The Psychology Behind Visual Trust Signals", category: "Design", readTime: "4 min", date: "Feb 10, 2026" },
  { title: "Scaling Your Content Production Without Burning Out", category: "Operations", readTime: "7 min", date: "Feb 5, 2026" },
  { title: "From Zero to Launch: Content Strategy for New Brands", category: "Strategy", readTime: "10 min", date: "Jan 28, 2026" },
];

const InsightsBlog: React.FC = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div>
      <h1 className="text-3xl font-heading font-bold">Insights Blog</h1>
      <p className="text-muted-foreground mt-1">Industry insights and creative strategies</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((a, i) => (
        <Card key={i} className="group hover:border-primary/30 hover:cyan-glow-sm transition-all cursor-pointer">
          <CardContent className="p-0">
            <div className="aspect-[16/10] bg-muted rounded-t-xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="font-heading text-xs">{a.category}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {a.readTime}</span>
              </div>
              <h3 className="font-heading font-semibold mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{a.date}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default InsightsBlog;
