import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Image, Film, Wand2, Eye, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const environments = [
  { name: "Luxury Studio", preview: "🏛️" },
  { name: "Outdoor Natural", preview: "🌿" },
  { name: "Minimalist White", preview: "⬜" },
  { name: "Urban Street", preview: "🏙️" },
  { name: "Warm Lifestyle", preview: "🕯️" },
  { name: "Neon Night", preview: "🌃" },
];

const AIFactory: React.FC = () => {
  const [selectedEnv, setSelectedEnv] = useState(0);
  const [processing, setProcessing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">AI Factory</h1>
        <p className="text-muted-foreground mt-1">Transform your product visuals with AI-powered environments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload */}
        <Card>
          <CardHeader><CardTitle className="font-heading">Upload</CardTitle></CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-primary/30 rounded-xl p-12 text-center hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer">
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="font-heading font-semibold mb-1">Drop files here or click to upload</p>
              <p className="text-sm text-muted-foreground">Supports JPG, PNG, MP4 — Max 50MB</p>
              <div className="flex gap-2 justify-center mt-4">
                <Badge variant="secondary"><Image className="w-3 h-3 mr-1" /> Images</Badge>
                <Badge variant="secondary"><Film className="w-3 h-3 mr-1" /> Videos</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader><CardTitle className="font-heading">Preview</CardTitle></CardHeader>
          <CardContent>
            <div className="aspect-video rounded-xl bg-muted flex items-center justify-center border border-border">
              {processing ? (
                <div className="text-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Processing your image...</p>
                  <Progress value={65} className="mt-3 h-2 w-48 mx-auto" />
                </div>
              ) : (
                <div className="text-center">
                  <Eye className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Upload an image to preview</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environment Selection */}
      <Card>
        <CardHeader><CardTitle className="font-heading">Select Environment</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {environments.map((env, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedEnv(i)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  selectedEnv === i
                    ? "border-primary bg-primary/10 cyan-glow-sm"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <span className="text-3xl block mb-2">{env.preview}</span>
                <span className="text-xs font-heading font-medium">{env.name}</span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Processing */}
      <Card>
        <CardHeader><CardTitle className="font-heading">Processing Status</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            {["Upload", "AI Processing", "Enhancement", "Complete"].map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>{i + 1}</div>
                  <span className={`text-sm font-heading ${i <= 1 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step}</span>
                </div>
                {i < 3 && <div className={`flex-1 h-0.5 ${i < 1 ? "bg-primary" : "bg-border"}`} />}
              </React.Fragment>
            ))}
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setProcessing(!processing)} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
              <Wand2 className="w-4 h-4 mr-2" /> Generate
            </Button>
            <Button variant="outline" className="font-heading">Reset</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFactory;
