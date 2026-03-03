import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Shield, RefreshCw } from "lucide-react";

const LegalHub: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Legal Hub</h1>
        <p className="text-muted-foreground mt-1">Terms, privacy, and policies</p>
      </div>
      <Tabs defaultValue="terms">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="terms" className="font-heading"><Scale className="w-4 h-4 mr-2" /> Terms</TabsTrigger>
          <TabsTrigger value="privacy" className="font-heading"><Shield className="w-4 h-4 mr-2" /> Privacy</TabsTrigger>
          <TabsTrigger value="refund" className="font-heading"><RefreshCw className="w-4 h-4 mr-2" /> Refund</TabsTrigger>
        </TabsList>
        <TabsContent value="terms">
          <Card>
            <CardHeader><CardTitle className="font-heading">Terms of Service</CardTitle></CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p><strong>Last updated:</strong> March 1, 2026</p>
              <p>Welcome to Ryze Studios. By accessing or using our platform, you agree to be bound by these Terms of Service. Ryze Studios provides AI-powered creative content services including but not limited to product photography enhancement, UGC video production, and brand asset management.</p>
              <p><strong>1. Service Description.</strong> Ryze Studios offers tiered subscription plans providing access to AI editing tools, creative talent marketplace, and production services. All content delivered remains the intellectual property of the client upon full payment.</p>
              <p><strong>2. Account Responsibilities.</strong> Users are responsible for maintaining the security of their account credentials and for all activities that occur under their account.</p>
              <p><strong>3. Payment Terms.</strong> Subscription fees are billed monthly in advance. All prices are in USD. Overdue accounts may have their access suspended.</p>
              <p><strong>4. Content Guidelines.</strong> Users agree not to upload content that is illegal, infringing, or harmful. Ryze Studios reserves the right to refuse processing of content that violates these guidelines.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="privacy">
          <Card>
            <CardHeader><CardTitle className="font-heading">Privacy Policy</CardTitle></CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p><strong>Last updated:</strong> March 1, 2026</p>
              <p>Ryze Studios is committed to protecting your privacy. This policy describes how we collect, use, and safeguard your personal information.</p>
              <p><strong>Data Collection.</strong> We collect information you provide directly (name, email, payment details) and usage data (interactions, preferences, analytics) to improve our services.</p>
              <p><strong>Data Usage.</strong> Your data is used to deliver our services, process payments, communicate updates, and improve platform performance. We do not sell personal data to third parties.</p>
              <p><strong>Data Security.</strong> We employ industry-standard encryption and security practices to protect your data. All payment processing is handled through PCI-compliant providers.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="refund">
          <Card>
            <CardHeader><CardTitle className="font-heading">Refund Policy</CardTitle></CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p><strong>Last updated:</strong> March 1, 2026</p>
              <p>We want you to be satisfied with every delivery. If you're not happy with the quality of work delivered, we offer the following remedies:</p>
              <p><strong>AI Edits.</strong> Unlimited revisions within 7 days of delivery. If still unsatisfied, a full credit will be applied to your account.</p>
              <p><strong>UGC & Production.</strong> One round of revisions included. Additional revisions available at reduced rates. Refund requests must be submitted within 14 days of delivery.</p>
              <p><strong>Subscriptions.</strong> Cancel anytime. No refunds for partial billing periods. Annual plans may be eligible for prorated refunds within the first 30 days.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalHub;
