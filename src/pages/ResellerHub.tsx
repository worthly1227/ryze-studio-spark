import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Palette, Store, AlertCircle } from "lucide-react";

const ResellerHub: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div>
      <h1 className="text-3xl font-heading font-bold">Reseller Hub</h1>
      <p className="text-muted-foreground mt-1">White-label settings for partners</p>
    </div>

    <Card className="border-primary/20">
      <CardContent className="p-6 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
        <p className="text-sm text-muted-foreground">Advanced reseller dashboard coming soon. Configure your white-label settings below.</p>
      </CardContent>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="font-heading flex items-center gap-2"><Upload className="w-5 h-5 text-primary" /> Your Logo</CardTitle></CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <Store className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Upload your brand logo</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="font-heading flex items-center gap-2"><Palette className="w-5 h-5 text-primary" /> Accent Color</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Custom accent hex</label>
            <Input placeholder="#00E6E6" defaultValue="#00E6E6" />
          </div>
          <div className="flex gap-2">
            {["#00E6E6", "#FF6B6B", "#A855F7", "#F59E0B"].map((c, i) => (
              <button key={i} className="w-10 h-10 rounded-lg border-2 border-border hover:border-foreground transition-colors" style={{ backgroundColor: c }} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader><CardTitle className="font-heading">Wholesale Billing</CardTitle></CardHeader>
      <CardContent>
        <div className="p-8 text-center bg-muted/50 rounded-xl">
          <Badge variant="secondary" className="mb-3">Coming Soon</Badge>
          <p className="text-muted-foreground text-sm">Wholesale billing and invoicing features are currently in development.</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ResellerHub;
