import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Wand2, User, Paintbrush, Package, Layers, Shirt,
  Palette, AlignVerticalSpaceAround, Type, Image, Sunset,
  Camera, Users, Backpack, ShoppingBag, UtensilsCrossed,
  Sparkles, Sun, Eraser, Move, Brush, Instagram, Video,
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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedImage(file.name);
  };

  const handleFileSelect = () => {
    setUploadedImage(`product-image-${Date.now()}.jpg`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold">AI Factory</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">Transform your product visuals with AI-powered tools</p>
      </div>

      {/* Image Upload + Prompt Section */}
      <Card className="border-primary/20">
        <CardContent className="pt-5 sm:pt-6">
          <div className="space-y-4">
            {/* Image Upload - Always at top */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ImagePlus className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-base sm:text-lg">Product Image</h2>
              </div>
              {uploadedImage ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <Image className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-heading truncate flex-1">{uploadedImage}</span>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-xs text-muted-foreground hover:text-foreground font-heading"
                  >
                    Change
                  </button>
                </div>
              ) : (
                <motion.div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleFileDrop}
                  onClick={handleFileSelect}
                  className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center transition-all cursor-pointer ${
                    dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  }`}
                >
                  <ImagePlus className={`w-8 h-8 mx-auto mb-2 ${dragOver ? "text-primary" : "text-muted-foreground"}`} />
                  <p className="font-heading font-semibold text-sm">Upload your product image</p>
                  <p className="text-muted-foreground text-xs mt-1">Required for AI processing · JPG, PNG, WEBP</p>
                </motion.div>
              )}
            </div>

            {/* Prompt */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wand2 className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-semibold text-base sm:text-lg">Describe what you want</h2>
              </div>
              <Textarea
                placeholder="e.g. Place my product on a marble table in a luxury bathroom with soft lighting and gold accents..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[80px] sm:min-h-[100px] resize-none text-sm sm:text-base border-primary/20 focus:border-primary/50"
              />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3">
                <div className="flex gap-2 flex-wrap">
                  {["Luxury Studio", "Outdoor", "Minimalist", "Lifestyle"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/20 transition-colors text-xs"
                      onClick={() => setPrompt(prev => prev ? `${prev}, ${tag.toLowerCase()} setting` : `${tag} setting`)}
                    >
                      + {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  disabled={!prompt.trim() || !uploadedImage}
                  className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading w-full sm:w-auto"
                >
                  <Sparkles className="w-4 h-4 mr-2" /> Generate
                </Button>
              </div>
              {!uploadedImage && (
                <p className="text-xs text-destructive mt-2">⬆ Upload a product image first</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Image Tools */}
      <div>
        <h2 className="font-heading font-bold text-lg sm:text-xl mb-3 sm:mb-4">AI Images</h2>
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">Select a tool to get started</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
          {aiImageTools.map((tool) => (
            <motion.button
              key={tool.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedTool(tool.name)}
              className={`group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl border transition-all ${
                selectedTool === tool.name
                  ? "border-primary bg-primary/10 cyan-glow-sm"
                  : "border-border hover:border-primary/30 hover:bg-muted/50"
              }`}
            >
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl ${tool.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <tool.icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground/80" />
              </div>
              <span className="text-[10px] sm:text-xs font-heading font-medium text-center leading-tight">{tool.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Editing Tools */}
      <div>
        <h2 className="font-heading font-bold text-lg sm:text-xl mb-3 sm:mb-4">Editing Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {editingTools.map((tool) => (
            <motion.button
              key={tool.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTool(tool.name)}
              className={`group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border text-left transition-all ${
                selectedTool === tool.name
                  ? "border-primary bg-primary/10 cyan-glow-sm"
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <tool.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-heading font-semibold block">{tool.name}</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">{tool.description}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Batch Processing */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/15 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading font-bold text-xl sm:text-2xl mb-1">Batch Processing</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Edit up to 250 images at once. Save hours on repetitive edits.</p>
            </div>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-full px-8 w-full sm:w-auto">
              <Scissors className="w-4 h-4 mr-2" /> Start New Batch
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFactory;
