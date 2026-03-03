import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { User, Bell, CreditCard, Globe, MapPin, Phone, Gift, Pause, X } from "lucide-react";
import { toast } from "sonner";

const SettingsPage: React.FC = () => {
  const [cancelStep, setCancelStep] = useState<"none" | "pause" | "final">("none");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [notifMode, setNotifMode] = useState("email-portal");
  const [teamOrders, setTeamOrders] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(false);

  const handleCancelClick = () => {
    setCancelStep("pause");
    setShowCancelDialog(true);
  };

  const handlePause = () => {
    toast.success("Your plan has been paused. You can resume anytime.");
    setShowCancelDialog(false);
    setCancelStep("none");
  };

  const handleStillCancel = () => {
    setCancelStep("final");
  };

  const handleAcceptOffer = () => {
    toast.success("🎉 10 free AI photo credits added to your account! Your plan remains active.");
    setShowCancelDialog(false);
    setCancelStep("none");
  };

  const handleConfirmCancel = () => {
    toast("Your plan has been cancelled.");
    setShowCancelDialog(false);
    setCancelStep("none");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <User className="w-5 h-5 text-primary" /> Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-muted-foreground">First Name</Label>
              <Input defaultValue="Alex" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-muted-foreground">Last Name</Label>
              <Input defaultValue="Johnson" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">Email</Label>
            <Input type="email" defaultValue="alex@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">Password</Label>
            <Input type="password" defaultValue="••••••••" />
            <p className="text-xs text-muted-foreground">Leave blank to keep current password</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" /> Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-3">
            <RadioGroup value={notifMode} onValueChange={setNotifMode} className="space-y-3">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="email-portal" id="email-portal" className="mt-0.5" />
                <div>
                  <Label htmlFor="email-portal" className="font-medium cursor-pointer">Email and portal</Label>
                  <p className="text-sm text-muted-foreground">Get notified via email and in the portal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="portal-only" id="portal-only" className="mt-0.5" />
                <div>
                  <Label htmlFor="portal-only" className="font-medium cursor-pointer">Portal only</Label>
                  <p className="text-sm text-muted-foreground">If you disable email updates you'll need to log in to read our replies.</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="team-orders"
                checked={teamOrders}
                onCheckedChange={(v) => setTeamOrders(v === true)}
                className="mt-0.5"
              />
              <div>
                <Label htmlFor="team-orders" className="font-medium cursor-pointer">
                  Get updates about your team's orders
                </Label>
                <p className="text-sm text-muted-foreground">
                  If left unchecked you'll be following updates in your own orders only.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Enable push notifications in this browser</p>
              </div>
              <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing & Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> Billing & Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground">Billing Address</Label>
            <Input placeholder="123 Main St, City, State, ZIP" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-muted-foreground flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" /> Phone
              </Label>
              <Input type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-muted-foreground flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" /> Timezone
              </Label>
              <Select defaultValue="est">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern (EST)</SelectItem>
                  <SelectItem value="cst">Central (CST)</SelectItem>
                  <SelectItem value="mst">Mountain (MST)</SelectItem>
                  <SelectItem value="pst">Pacific (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Subscription / Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" /> Your Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/50 rounded-xl border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-semibold text-lg">Viral Growth Plan</p>
                <p className="text-sm text-muted-foreground">$240/mo · Next billing: March 15, 2026</p>
              </div>
              <span className="text-xs font-heading font-semibold bg-primary/15 text-primary px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="font-heading" onClick={() => toast.info("Redirecting to plans...")}>
              Change Plan
            </Button>
            <Button
              variant="outline"
              className="font-heading text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={handleCancelClick}
            >
              Cancel Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cancel / Grab-back Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
          {cancelStep === "pause" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading flex items-center gap-2">
                  <Pause className="w-5 h-5 text-primary" /> Before you go...
                </DialogTitle>
                <DialogDescription>
                  Need a break? You can <strong>pause your plan</strong> instead of cancelling. Your content and settings will be saved, and you can resume anytime.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
                <Button onClick={handlePause} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading w-full sm:w-auto">
                  <Pause className="w-4 h-4 mr-1.5" /> Pause My Plan
                </Button>
                <Button variant="ghost" onClick={handleStillCancel} className="font-heading text-muted-foreground w-full sm:w-auto">
                  I still want to cancel
                </Button>
              </DialogFooter>
            </>
          )}

          {cancelStep === "final" && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" /> Wait — here's a gift!
                </DialogTitle>
                <DialogDescription className="space-y-2">
                  <span className="block">We'd hate to see you leave. Stay on your current plan and get <strong className="text-primary">10 free AI photo credits</strong> on us — no strings attached.</span>
                </DialogDescription>
              </DialogHeader>
              <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 text-center my-2">
                <p className="font-heading font-bold text-2xl text-primary">🎁 10 Free AI Photos</p>
                <p className="text-sm text-muted-foreground mt-1">Added instantly to your account</p>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button onClick={handleAcceptOffer} className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading w-full sm:w-auto">
                  <Gift className="w-4 h-4 mr-1.5" /> Stay & Claim Credits
                </Button>
                <Button variant="ghost" onClick={handleConfirmCancel} className="font-heading text-destructive w-full sm:w-auto">
                  <X className="w-4 h-4 mr-1.5" /> Cancel Anyway
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPage;
