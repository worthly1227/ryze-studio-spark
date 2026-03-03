import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Palette, Type, FileText } from "lucide-react";

const BrandKit: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div>
      <h1 className="text-3xl font-heading font-bold">Brand Kit</h1>
      <p className="text-muted-foreground mt-1">Store your brand assets and guidelines</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Logos */}
      <Card>
        <CardHeader><CardTitle className="font-heading flex items-center gap-2"><Upload className="w-5 h-5 text-primary" /> Logos</CardTitle></CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Upload your logo files (SVG, PNG)</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {["Primary Logo", "Icon Mark", "Wordmark"].map((l, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader><CardTitle className="font-heading flex items-center gap-2"><Palette className="w-5 h-5 text-primary" /> Hex Codes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Primary", hex: "#00E6E6" },
            { name: "Secondary", hex: "#1A1A1A" },
            { name: "Accent", hex: "#FFFFFF" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-border" style={{ backgroundColor: c.hex }} />
              <div className="flex-1">
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.hex}</p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full font-heading mt-2">Add Color</Button>
        </CardContent>
      </Card>

      {/* Fonts */}
      <Card>
        <CardHeader><CardTitle className="font-heading flex items-center gap-2"><Type className="w-5 h-5 text-primary" /> Font Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Heading Font</label>
            <Input placeholder="e.g., Space Grotesk" defaultValue="Space Grotesk" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Body Font</label>
            <Input placeholder="e.g., Inter" defaultValue="Inter" />
          </div>
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card>
        <CardHeader><CardTitle className="font-heading flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Brand Guidelines</CardTitle></CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Upload brand guide PDF</p>
          </div>
          <div className="mt-4 flex gap-2">
            <Badge variant="secondary">No files uploaded</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default BrandKit;
