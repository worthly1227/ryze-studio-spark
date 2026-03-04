import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, CreditCard, Lock, ShieldCheck, ArrowLeft, Plus, Minus, PartyPopper, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  preSelectedAddOn?: AddOn;
  preSelectedAddOnQty?: number;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  onOpenChange,
  planName,
  price,
  period,
  features = [],
  suggestedAddOn,
  preSelectedAddOn,
  preSelectedAddOnQty = 0,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showPromo, setShowPromo] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [addOnQty, setAddOnQty] = useState(preSelectedAddOnQty > 0 ? preSelectedAddOnQty : 0);
  const [step, setStep] = useState<"checkout" | "success">("checkout");

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setAddOnQty(preSelectedAddOnQty > 0 ? preSelectedAddOnQty : 0);
      setStep("checkout");
    }
  }, [open, preSelectedAddOnQty]);

  // The active add-on is either the pre-selected one or the suggested one
  const activeAddOn = preSelectedAddOn || suggestedAddOn;
  const addOnTotal = activeAddOn ? activeAddOn.price * addOnQty : 0;
  const totalPrice = price + addOnTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
    }, 2000);
  };

  const handleGetStarted = () => {
    onOpenChange(false);
    navigate("/onboarding");
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
          {step === "checkout" && (
            <button onClick={() => onOpenChange(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <img src={ryzeLogo} alt="Ryze Studios" className="w-6 h-6 rounded-md object-cover" />
          <span className="font-heading font-bold text-sm">Ryze Studios</span>
        </div>

        <AnimatePresence mode="wait">
          {step === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-8 sm:p-12 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
              >
                <PartyPopper className="w-8 h-8 text-primary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="font-heading font-black text-2xl sm:text-3xl mb-2"
              >
                You're all set!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-muted-foreground text-sm mb-6 max-w-xs"
              >
                Your <span className="font-semibold text-foreground">{planName}</span> plan is confirmed. A receipt has been sent to your email.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="w-full rounded-xl border border-border bg-muted/20 p-4 mb-6 space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-heading font-semibold">{planName}</span>
                </div>
                {addOnQty > 0 && activeAddOn && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Add-on</span>
                    <span className="font-heading font-semibold">{activeAddOn.name} ×{addOnQty}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="font-heading font-semibold">Total paid</span>
                  <span className="font-heading font-black text-lg">${totalPrice.toLocaleString()}</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="w-full space-y-3"
              >
                <Button
                  onClick={handleGetStarted}
                  className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-heading text-sm rounded-xl"
                >
                  <span className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
                <p className="text-[10px] text-muted-foreground">
                  Complete your brand profile so we can start creating for you.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-5"
            >
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
                  {addOnQty > 0 && activeAddOn && (
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-heading font-semibold text-sm">{activeAddOn.name} ×{addOnQty}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Add-on service</p>
                      </div>
                      <span className="font-heading font-bold text-sm">${(activeAddOn.price * addOnQty).toLocaleString()}</span>
                    </div>
                  )}
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

                {activeAddOn && (
                  <>
                    <Separator className="my-4" />
                    <p className="text-[10px] text-muted-foreground font-heading mb-2">
                      {preSelectedAddOn ? "SELECTED ADD-ON" : "RECOMMENDED ADD-ON"}
                    </p>
                    <div className={`w-full rounded-lg border p-3 transition-all ${
                      addOnQty > 0
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border"
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-heading font-semibold text-xs">{activeAddOn.name}</span>
                        <span className="font-heading font-bold text-xs">${activeAddOn.price}/ea</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">{activeAddOn.description}</p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAddOnQty(Math.max(0, addOnQty - 1))}
                          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-heading font-bold text-sm w-6 text-center">{addOnQty}</span>
                        <button
                          type="button"
                          onClick={() => setAddOnQty(addOnQty + 1)}
                          className="w-7 h-7 rounded-lg border border-primary bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-primary" />
                        </button>
                      </div>
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
                        Pay ${totalPrice.toLocaleString()}
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
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
