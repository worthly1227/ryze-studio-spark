import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutTemplate, Eye, Type, Image } from "lucide-react";

const websiteThemes = [
  { name: "Noir Commerce", desc: "Dark luxury e-commerce template with high conversion layout", tag: "E-commerce" },
  { name: "Studio Clean", desc: "Minimalist portfolio theme for creative agencies", tag: "Portfolio" },
  { name: "Pulse Landing", desc: "High-energy landing page with animated sections", tag: "Landing" },
  { name: "Zen Product", desc: "Calm, product-focused single page with scroll storytelling", tag: "Product" },
];

const editorialLayouts = [
  { name: "Vogue Grid", desc: "High-fashion grid with bold typography overlays" },
  { name: "Campaign Hero", desc: "Full-bleed hero with editorial text placement" },
  { name: "Lookbook Flow", desc: "Scrolling lookbook with alternating image/text blocks" },
  { name: "Magazine Spread", desc: "Two-column editorial spread with pull quotes" },
];

const Templates: React.FC = () => (
  <div className="max-w-7xl mx-auto space-y-8">
    <div>
      <h1 className="text-3xl font-heading font-bold">Templates</h1>
      <p className="text-muted-foreground mt-1">Conversion-optimized themes and editorial layouts</p>
    </div>

    <section>
      <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
        <LayoutTemplate className="w-5 h-5 text-primary" /> Proprietary Website Themes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {websiteThemes.map((t, i) => (
          <Card key={i} className="group hover:border-primary/30 hover:cyan-glow-sm transition-all">
            <CardContent className="p-0">
              <div className="aspect-[16/9] bg-muted rounded-t-xl flex items-center justify-center">
                <Eye className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="p-5">
                <Badge variant="secondary" className="mb-2 font-heading">{t.tag}</Badge>
                <h3 className="font-heading font-semibold">{t.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{t.desc}</p>
                <Button variant="outline" className="font-heading border-primary/30 text-primary hover:bg-primary/10">
                  Preview Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-xl font-heading font-semibold mb-4 flex items-center gap-2">
        <Type className="w-5 h-5 text-primary" /> Editorial Image Layouts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editorialLayouts.map((l, i) => (
          <Card key={i} className="group hover:border-primary/30 hover:cyan-glow-sm transition-all">
            <CardContent className="p-5">
              <div className="aspect-[4/3] bg-muted rounded-xl mb-4 flex items-center justify-center border border-border">
                <Image className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="font-heading font-semibold">{l.name}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">{l.desc}</p>
              <p className="text-xs text-muted-foreground italic">Insert your own images and text to customize</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  </div>
);

export default Templates;
