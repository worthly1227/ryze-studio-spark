import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Play, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const creators = [
  { name: "Aria Chen", specialty: "Product Photography", rating: 4.9, jobs: 234, bio: "Specializing in luxury product photography and e-commerce visuals." },
  { name: "Marcus Williams", specialty: "UGC Video", rating: 4.8, jobs: 189, bio: "High-converting UGC content for DTC brands and startups." },
  { name: "Jade Okafor", specialty: "Fashion Editorial", rating: 5.0, jobs: 312, bio: "Editorial fashion photography with a modern, bold aesthetic." },
  { name: "Leo Park", specialty: "Motion Graphics", rating: 4.7, jobs: 156, bio: "Dynamic motion graphics and animated brand content." },
  { name: "Sophia Reyes", specialty: "Social Media", rating: 4.9, jobs: 278, bio: "Scroll-stopping social content that drives engagement." },
  { name: "David Kim", specialty: "Brand Strategy", rating: 4.8, jobs: 145, bio: "Full-stack brand strategist with creative direction expertise." },
];

const Marketplace: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = creators.filter(
    (c) =>
      (category === "all" || c.specialty.toLowerCase().includes(category)) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) || c.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Marketplace</h1>
        <p className="text-muted-foreground mt-1">Browse and book verified creative talent</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="photo">Photography</SelectItem>
            <SelectItem value="video">Video / UGC</SelectItem>
            <SelectItem value="motion">Motion Graphics</SelectItem>
            <SelectItem value="social">Social Media</SelectItem>
            <SelectItem value="strategy">Brand Strategy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((creator, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group hover:border-primary/30 hover:cyan-glow-sm transition-all duration-300 h-full">
              <CardContent className="p-0">
                {/* Video Preview */}
                <div className="aspect-video bg-muted rounded-t-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <Play className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors z-10" />
                  <Badge className="absolute top-3 right-3 bg-primary/20 text-primary border-primary/30 font-heading z-10">
                    {creator.specialty}
                  </Badge>
                </div>

                <div className="p-5">
                  {/* Profile */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-heading font-bold text-primary text-sm">
                      {creator.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold">{creator.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span className="text-xs font-medium">{creator.rating}</span>
                        <span className="text-xs text-muted-foreground">· {creator.jobs} jobs</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{creator.bio}</p>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
                    Book Creator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
