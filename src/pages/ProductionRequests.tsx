import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, ChevronLeft, Package, Truck, CheckCircle, Search as SearchIcon } from "lucide-react";

const steps = ["Service Selection", "Creative Direction", "Talent Selection", "Logistics & Shipping"];
const trackingSteps = ["Product Received", "In Production", "Quality Review", "Final Delivery"];

const ProductionRequests: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Production Tracking</h1>
          <p className="text-muted-foreground mt-1">Your request is being processed</p>
        </div>
        <Card className="border-primary/20 cyan-glow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              {trackingSteps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i <= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {i <= 1 ? <CheckCircle className="w-5 h-5" /> : <span className="text-sm font-bold">{i + 1}</span>}
                    </div>
                    <span className={`text-xs font-heading text-center ${i <= 1 ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
                  </div>
                  {i < 3 && <div className={`flex-1 h-0.5 mt-[-20px] ${i < 1 ? "bg-primary" : "bg-border"}`} />}
                </React.Fragment>
              ))}
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20">Estimated delivery: 5 business days</Badge>
          </CardContent>
        </Card>
        <Button variant="outline" onClick={() => { setSubmitted(false); setCurrentStep(0); }} className="font-heading">
          Submit New Request
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Production Requests</h1>
        <p className="text-muted-foreground mt-1">Submit your creative brief in 4 steps</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-4">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div className={`flex items-center gap-2 ${i <= currentStep ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{i + 1}</div>
              <span className="text-sm font-heading hidden sm:block">{s}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-0.5 ${i < currentStep ? "bg-primary" : "bg-border"}`} />}
          </React.Fragment>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="font-heading">{steps[currentStep]}</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 0 && (
            <Select><SelectTrigger><SelectValue placeholder="Select a service..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-edit">AI Edit</SelectItem>
                <SelectItem value="ugc">UGC Video</SelectItem>
                <SelectItem value="photo">Product Photography</SelectItem>
                <SelectItem value="batch">Full Content Batch</SelectItem>
              </SelectContent>
            </Select>
          )}
          {currentStep === 1 && (
            <>
              <Input placeholder="Project name" />
              <Textarea placeholder="Describe your creative direction, mood, references..." rows={4} />
            </>
          )}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {["Auto-match", "Aria Chen", "Marcus Williams", "Sophia Reyes"].map((c, i) => (
                <Button key={i} variant={i === 0 ? "default" : "outline"} className={`font-heading ${i === 0 ? "bg-primary text-primary-foreground" : ""}`}>{c}</Button>
              ))}
            </div>
          )}
          {currentStep === 3 && (
            <>
              <Input placeholder="Shipping address" />
              <Input placeholder="Contact email" />
              <Input placeholder="Phone number (optional)" />
            </>
          )}

          <div className="flex justify-between pt-4">
            <Button variant="outline" disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)} className="font-heading">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            {currentStep < 3 ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={() => setSubmitted(true)} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
                <Package className="w-4 h-4 mr-2" /> Submit Request
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductionRequests;
