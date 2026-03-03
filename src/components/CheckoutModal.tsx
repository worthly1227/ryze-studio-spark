import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

interface AddOn {
  name: string;
  price: number;
  description: string;
}

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  price: number;
  period: string;
  features?: string[];
  suggestedAddOn?: AddOn;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  onOpenChange,
  planName,
  price,
  period,
  features = [],
  suggestedAddOn,
}) => {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [addOnSelected, setAddOnSelected] = useState(false);

  const totalPrice = addOnSelected && suggestedAddOn ? price + suggestedAddOn.price : price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Placeholder — will be replaced with real Stripe integration
    setTimeout(() => {
      setProcessing(false);
      onOpenChange(false);
    }, 2000);
  };

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[520px] p-0 gap-0 overflow-hidden rounded-2xl border-border max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Checkout — {planName}</DialogTitle>

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
          <button onClick={() => onOpenChange(false)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <img src={ryzeLogo} alt="Ryze Studios" className="w-6 h-6 rounded-md object-cover" />
          <span className="font-heading font-bold text-sm">Ryze Studios</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5">
          {/* Left — Order Summary */}
          <div className="sm:col-span-2 bg-muted/20 p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-border">
            <p className="text-xs text-muted-foreground font-heading mb-1">PAY RYZE STUDIOS</p>
            <p className="text-2xl sm:text-3xl font-heading font-black mb-1">
              ${totalPrice.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground">{period ? period : ""}</span>
            </p>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-heading font-semibold text-sm">{planName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {period ? "Monthly subscription" : "One-time payment"}
                  </p>
                </div>
                <span className="font-heading font-bold text-sm">${price.toLocaleString()}</span>
              </div>
            </div>

            <Separator className="my-4" />

            {!showPromo ? (
              <button
                onClick={() => setShowPromo(true)}
                className="text-xs text-primary font-heading font-medium hover:underline"
              >
                Add promotion code
              </button>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="h-8 text-xs"
                />
                <Button variant="outline" size="sm" className="h-8 text-xs font-heading">
                  Apply
                </Button>
              </div>
            )}

            <Separator className="my-4" />

            <div className="flex justify-between">
              <span className="font-heading font-semibold text-sm">Total due</span>
              <span className="font-heading font-black text-lg">${totalPrice.toLocaleString()}</span>
            </div>

            {features.length > 0 && (
              <>
                <Separator className="my-4" />
                <p className="text-[10px] text-muted-foreground font-heading mb-2">WHAT&apos;S INCLUDED</p>
                <div className="space-y-1.5">
                  {features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right — Payment Form */}
          <div className="sm:col-span-3 p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-xs font-heading mb-1.5 block">Email</Label>
                <Input
                  type="email"
                  placeholder="you@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10"
                />
              </div>

              <div>
                <Label className="text-xs font-heading mb-1.5 block">Card details</Label>
                <div className="rounded-lg border border-border overflow-hidden divide-y divide-border">
                  <div className="relative">
                    <Input
                      placeholder="1234 1234 1234 1234"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCard(e.target.value))}
                      required
                      className="h-10 border-0 rounded-none pr-20"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
                      <div className="w-7 h-5 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold">VISA</span>
                      </div>
                      <div className="w-7 h-5 rounded bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                        <div className="flex -space-x-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-600/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex divide-x divide-border">
                    <Input
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      required
                      className="h-10 border-0 rounded-none flex-1"
                    />
                    <Input
                      placeholder="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      required
                      className="h-10 border-0 rounded-none w-24"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-heading mb-1.5 block">Name on card</Label>
                <Input
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-10"
                />
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-heading text-sm rounded-xl"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Processing…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5" />
                    Pay ${price.toLocaleString()}
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[10px]">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Powered by Stripe</span>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                A refund is available within the first 24 hours or before our designers have started creating your assets.
                Contact help@ryzestudios.com for cancellations.
              </p>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
