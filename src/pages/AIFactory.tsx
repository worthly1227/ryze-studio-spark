import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Wand2, User, Paintbrush, Package, Layers, Shirt, Ghost,
  Palette, AlignVerticalSpaceAround, Type, Image, Sunset,
  Camera, Building2, Users, Backpack, ShoppingBag, UtensilsCrossed,
  Mountain, Briefcase, PawPrint, Heart, Gift, Quote, FileImage,
  Cake, Sparkles, Sun, Eraser, Move, Brush, Instagram, Video,
  ImagePlus, Scissors
} from "lucide-react";
import { motion } from "framer-motion";

const aiImageTools = [
  { name: "Virtual Model", icon: User, color: "bg-blue-100 dark:bg-blue-900/30" },
  { name: "Edit with AI", icon: Paintbrush, color: "bg-pink-100 dark:bg-pink-900/30" },
  { name: "Product Beautifier", icon: Sparkles, color: "bg-amber-100 dark:bg-amber-900/30" },
  { name: "Product Staging", icon: Package, color: "bg-green-100 dark:bg-green-900/30" },
  { name: "Flat Lay", icon: Layers, color: "bg-gray-100 dark:bg-gray-800/50" },
  { name: "Ghost Mannequin", icon: Shirt, color: "bg-cyan-100 dark:bg-cyan-900/30" },
  { name: "Recolor", icon: Palette, color: "bg-yellow-100 dark:bg-yellow-900/30" },
  { name: "Ironing", icon: AlignVerticalSpaceAround, color: "bg-teal-100 dark:bg-teal-900/30" },
  { name: "Logo", icon: Type, color: "bg-slate-100 dark:bg-slate-800/50" },
  { name: "Text", icon: Type, color: "bg-red-100 dark:bg-red-900/30" },
  { name: "Instagram Story", icon: Instagram, color: "bg-pink-100 dark:bg-pink-900/30" },
  { name: "Background", icon: Sunset, color: "bg-sky-100 dark:bg-sky-900/30" },
  { name: "3D Illustration", icon: ImagePlus, color: "bg-purple-100 dark:bg-purple-900/30" },
  { name: "Product Photography", icon: Camera, color: "bg-stone-100 dark:bg-stone-800/50" },
  { name: "Lifestyle Photography", icon: Backpack, color: "bg-orange-100 dark:bg-orange-900/30" },
  { name: "Product Packaging", icon: ShoppingBag, color: "bg-emerald-100 dark:bg-emerald-900/30" },
  { name: "Food Photography", icon: UtensilsCrossed, color: "bg-red-100 dark:bg-red-900/30" },
  { name: "People Photography", icon: Users, color: "bg-blue-100 dark:bg-blue-900/30" },
  { name: "Gift Card", icon: Gift, color: "bg-rose-100 dark:bg-rose-900/30" },
  { name: "Poster", icon: FileImage, color: "bg-indigo-100 dark:bg-indigo-900/30" },
];

const editingTools = [
  { name: "AI Backgrounds", icon: Sun, description: "Swap & generate backgrounds" },
  { name: "AI Images", icon: Image, description: "Generate any image from text" },
  { name: "AI Shadows", icon: Layers, description: "Add realistic shadows" },
  { name: "Background Remover", icon: Eraser, description: "Remove backgrounds instantly" },
  { name: "Resize", icon: Move, description: "Resize for any platform" },
  { name: "Retouch", icon: Brush, description: "Fix imperfections" },
  { name: "AI Instagram Story", icon: Instagram, description: "Create story visuals" },
  { name: "Video Generator", icon: Video, description: "Generate product videos" },
];

const AIFactory: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold">AI Factory</h1>
        <p className="text-muted-foreground mt-1">Transform your product visuals with AI-powered tools</p>
      </div>

      {/* Prompt Input Section */}
      <Card className="border-primary/20">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Wand2 className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-semibold text-lg">Describe what you want</h2>
            </div>
            <Textarea
              placeholder="e.g. Place my product on a marble table in a luxury bathroom with soft lighting and gold accents..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px] resize-none text-base border-primary/20 focus:border-primary/50"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {["Luxury Studio", "Outdoor", "Minimalist", "Lifestyle"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setPrompt(prev => prev ? `${prev}, ${tag.toLowerCase()} setting` : `${tag} setting`)}
                  >
                    + {tag}
                  </Badge>
                ))}
              </div>
              <Button
                disabled={!prompt.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Image Tools */}
      <div>
        <h2 className="font-heading font-bold text-xl mb-4">AI Images</h2>
        <p className="text-muted-foreground text-sm mb-4">Select a tool to get started</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {aiImageTools.map((tool) => (
            <motion.button
              key={tool.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedTool(tool.name)}
              className={`group flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                selectedTool === tool.name
                  ? "border-primary bg-primary/10 cyan-glow-sm"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl ${tool.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <tool.icon className="w-6 h-6 text-foreground/80" />
              </div>
              <span className="text-xs font-heading font-medium text-center leading-tight">{tool.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Editing Tools */}
      <div>
        <h2 className="font-heading font-bold text-xl mb-4">Editing Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {editingTools.map((tool) => (
            <motion.button
              key={tool.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTool(tool.name)}
              className={`group flex items-center gap-4 p-5 rounded-2xl border text-left transition-all ${
                selectedTool === tool.name
                  ? "border-primary bg-primary/10 cyan-glow-sm"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <tool.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-heading font-semibold block">{tool.name}</span>
                <span className="text-xs text-muted-foreground">{tool.description}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Batch Processing */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/15 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading font-bold text-2xl mb-1">Batch Processing</h2>
              <p className="text-muted-foreground">Edit up to 250 images at once. Save hours on repetitive edits.</p>
            </div>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-8">
              <Scissors className="w-4 h-4 mr-2" /> Start New Batch
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFactory;
