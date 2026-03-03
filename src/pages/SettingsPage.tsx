import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, CreditCard, Globe, Shield } from "lucide-react";

const SettingsPage: React.FC = () => (
  <div className="max-w-3xl mx-auto space-y-6">
    <div>
      <h1 className="text-3xl font-heading font-bold">Settings</h1>
      <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
    </div>

    <Card>
      <CardHeader><CardTitle className="font-heading flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Profile</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-sm text-muted-foreground">First Name</label><Input defaultValue="Alex" /></div>
          <div><label className="text-sm text-muted-foreground">Last Name</label><Input defaultValue="Johnson" /></div>
        </div>
        <div><label className="text-sm text-muted-foreground">Email</label><Input defaultValue="alex@example.com" /></div>
        <div><label className="text-sm text-muted-foreground">Company</label><Input defaultValue="Ryze Studios" /></div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">Save Changes</Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle className="font-heading flex items-center gap-2"><Bell className="w-5 h-5 text-primary" /> Notifications</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {["Email notifications", "Production updates", "Marketing emails"].map((n, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm">{n}</span>
            <Switch defaultChecked={i < 2} />
          </div>
        ))}
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle className="font-heading flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Billing</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-xl">
          <p className="font-heading font-semibold">Viral Growth Plan — $240/mo</p>
          <p className="text-sm text-muted-foreground">Next billing date: March 15, 2026</p>
        </div>
        <Button variant="outline" className="font-heading">Manage Subscription</Button>
      </CardContent>
    </Card>

    <Card>
      <CardHeader><CardTitle className="font-heading flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /> Preferences</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Language</label>
          <Select defaultValue="en">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Timezone</label>
          <Select defaultValue="utc">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="est">Eastern (EST)</SelectItem>
              <SelectItem value="pst">Pacific (PST)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SettingsPage;
