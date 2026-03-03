import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, DollarSign, Link, TrendingUp, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Affiliate: React.FC = () => (
  <div className="max-w-5xl mx-auto space-y-6">
    <div>
      <h1 className="text-3xl font-heading font-bold">Affiliate Program</h1>
      <p className="text-muted-foreground mt-1">Track referrals and earn commissions</p>
    </div>

    {/* Referral Link */}
    <Card className="border-primary/20 cyan-glow-sm">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-2 font-heading">Your referral link</p>
        <div className="flex gap-2">
          <Input readOnly value="https://ryze.studio/ref/USER123" className="font-mono text-sm" />
          <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
            <Copy className="w-4 h-4 mr-2" /> Copy
          </Button>
        </div>
      </CardContent>
    </Card>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Total Referrals", value: "47", icon: Users },
        { label: "Active Users", value: "31", icon: TrendingUp },
        { label: "Pending Payout", value: "$284", icon: DollarSign },
        { label: "Total Earned", value: "$1,420", icon: DollarSign },
      ].map((s, i) => (
        <Card key={i}>
          <CardContent className="p-5">
            <s.icon className="w-5 h-5 text-muted-foreground mb-2" />
            <p className="text-2xl font-heading font-bold">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Payout Tracking */}
    <Card>
      <CardHeader><CardTitle className="font-heading">Payout History</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { date: "Feb 2026", amount: "$320", status: "Paid" },
            { date: "Jan 2026", amount: "$280", status: "Paid" },
            { date: "Dec 2025", amount: "$184", status: "Paid" },
          ].map((p, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <span className="text-sm">{p.date}</span>
              <span className="font-heading font-semibold">{p.amount}</span>
              <Badge className="bg-primary/10 text-primary border-primary/20">{p.status}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Affiliate;
