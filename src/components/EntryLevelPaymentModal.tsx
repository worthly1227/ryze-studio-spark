import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Lock, ShieldCheck, CreditCard, ArrowLeft, ArrowRight, Sparkles, Image, Wand2, PartyPopper
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

interface EntryLevelPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EntryLevelPaymentModal: React.FC<EntryLevelPaymentModalProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"checkout" | "success">("checkout");

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
    }, 2000);
  };

  const handleStartSession = () => {
    onOpenChange(false);
    navigate("/entry-level-session", { state: { sessionActive: true } });
  };

  // Reset on close
  const handleOpenChange = (val: boolean) => {
    if (!val) {
      setStep("checkout");
      setEmail("");
      setCardNumber("");
      setExpiry("");
      setCvc("");
      setName("");
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[95vw] max-w-[480px] p-0 gap-0 overflow-hidden rounded-2xl border-border max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Entry Level Pass — Payment</DialogTitle>

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
          {step === "checkout" && (
            <button onClick={() => handleOpenChange(false)} className="text-muted-foreground hover:text-foreground transition-colors">
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
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-10 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6"
              >
                <PartyPopper className="w-8 h-8 text-primary" />
              </motion.div>

              <h2 className="font-heading font-black text-2xl mb-2">Payment Confirmed!</h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                Your session is ready. You have <span className="font-semibold text-foreground">5 generation credits</span> to create your perfect AI image.
              </p>

              <div className="w-full rounded-xl border border-border bg-muted/20 p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-heading font-semibold">Entry Level Pass</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Credits</span>
                  <span className="font-heading font-semibold">5 AI Generations</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Final Download</span>
                  <span className="font-heading font-semibold">1 Image</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="font-heading font-semibold">Total paid</span>
                  <span className="font-heading font-black text-lg">$10</span>
                </div>
              </div>

              <div className="w-full flex gap-2 text-left bg-primary/5 rounded-xl p-4 mb-6">
                <Wand2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><span className="font-semibold text-foreground">How it works:</span></p>
                  <p>1. Generate up to 5 AI product images</p>
                  <p>2. Preview all results in your gallery</p>
                  <p>3. Select your favorite as the final download</p>
                </div>
              </div>

              <Button
                onClick={handleStartSession}
                className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-heading text-sm rounded-xl"
              >
                <span className="flex items-center gap-2">
                  Start Generating <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6 space-y-5"
            >
              {/* Summary */}
              <div className="rounded-xl border border-border bg-muted/20 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm">Entry Level Pass</p>
                    <p className="text-xs text-muted-foreground">5 AI Generations · 1 Final Download</p>
                  </div>
                  <span className="ml-auto font-heading font-black text-xl">$10</span>
                </div>
                <div className="flex gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Image className="w-3 h-3" /> 5 Credits</span>
                  <span className="flex items-center gap-1"><Wand2 className="w-3 h-3" /> AI Powered</span>
                </div>
              </div>

              {/* Payment form */}
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
                      Pay $10 USD
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
                    <span className="text-[10px]">Secure Payment</span>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default EntryLevelPaymentModal;
