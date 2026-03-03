import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Calendar, Clock, Globe, ChevronLeft, ChevronRight, Check, Sparkles,
} from "lucide-react";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

interface CalendlyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  price: number;
  period: string;
  onBooked?: () => void;
}

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];

const CalendlyModal: React.FC<CalendlyModalProps> = ({
  open,
  onOpenChange,
  planName,
  price,
  period,
  onBooked,
}) => {
  const [step, setStep] = useState<"calendar" | "details" | "confirmed">("calendar");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  // Simple calendar — current month
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const monthName = new Date(viewYear, viewMonth).toLocaleString("default", { month: "long", year: "numeric" });
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const today = now.getDate();
  const isCurrentMonth = viewMonth === now.getMonth() && viewYear === now.getFullYear();

  const handleDateClick = (day: number) => {
    if (isCurrentMonth && day < today) return;
    setSelectedDate(day);
    setSelectedTime(null);
  };

  const handleConfirmDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirmed");
  };

  const handleFinish = () => {
    onBooked?.();
  };

  const resetAndClose = (val: boolean) => {
    if (!val) {
      setStep("calendar");
      setSelectedDate(null);
      setSelectedTime(null);
      setName("");
      setEmail("");
      setPhone("");
      setReason("");
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="w-[95vw] max-w-[680px] p-0 gap-0 overflow-hidden rounded-2xl border-border max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Book a Call — {planName}</DialogTitle>

        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/30">
          {step !== "calendar" && step !== "confirmed" ? (
            <button onClick={() => setStep("calendar")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => resetAndClose(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <img src={ryzeLogo} alt="Ryze Studios" className="w-6 h-6 rounded-md object-cover" />
          <span className="font-heading font-bold text-sm">Ryze Studios</span>
          <Badge className="ml-auto bg-primary/10 text-primary border-primary/20 text-[10px] font-heading">
            {planName}
          </Badge>
        </div>

        {step === "confirmed" ? (
          /* ─── CONFIRMED VIEW ─── */
          <div className="p-5 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-2">You're booked!</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Your strategy call is confirmed for{" "}
              <strong className="text-foreground">
                {new Date(viewYear, viewMonth, selectedDate || 1).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              </strong>{" "}
              at <strong className="text-foreground">{selectedTime}</strong>.
            </p>

            <div className="rounded-xl border border-border bg-muted/30 p-4 mb-6 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-heading font-semibold text-sm">Call Details</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground pl-6">
                <p>📅 {new Date(viewYear, viewMonth, selectedDate || 1).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
                <p>🕐 {selectedTime} · 20 min</p>
                <p>🌐 Eastern Time — US & Canada</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-6">
              A confirmation email has been sent. Please show up at the agreed time.
            </p>

            <Button
              onClick={handleFinish}
              className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading rounded-xl h-11 px-8"
            >
              Continue to Payment <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : step === "details" ? (
          /* ─── ENTER DETAILS STEP ─── */
          <div className="grid grid-cols-1 sm:grid-cols-5">
            {/* Left - call info */}
            <div className="sm:col-span-2 bg-muted/20 p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-border">
              <div className="flex items-center gap-3 mb-4">
                <img src={ryzeLogo} alt="" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className="font-heading font-bold text-sm">Ryze Studios</p>
                  <p className="text-xs text-muted-foreground">Strategy Call</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>20 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {selectedTime},{" "}
                    {new Date(viewYear, viewMonth, selectedDate || 1).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Eastern Time — US & Canada</span>
                </div>
              </div>
              <Separator className="my-4" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Schedule a 20-min Strategy Call. Please use the same email you used when signing up.
              </p>
              <p className="text-[10px] text-amber-500 mt-3 font-medium">
                ⚠ IMPORTANT: Please show up at the agreed time as our availability is limited.
              </p>
            </div>

            {/* Right - form */}
            <div className="sm:col-span-3 p-4 sm:p-6">
              <h3 className="font-heading font-bold text-base mb-4">Enter Details</h3>
              <form onSubmit={handleConfirmDetails} className="space-y-3.5">
                <div>
                  <Label className="text-xs font-heading mb-1 block">Name *</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="h-9" />
                </div>
                <div>
                  <Label className="text-xs font-heading mb-1 block">Email *</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@brand.com" className="h-9" />
                </div>
                <div>
                  <Label className="text-xs font-heading mb-1 block">Phone Number *</Label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+1" className="h-9" />
                </div>
                <div>
                  <Label className="text-xs font-heading mb-1 block">Why are you scheduling this call? How can we best help you?</Label>
                  <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Tell us about your brand…" className="min-h-[70px] resize-none text-sm" />
                </div>
                <Button type="submit" className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 font-heading text-sm rounded-xl mt-2">
                  Confirm Booking
                </Button>
              </form>
            </div>
          </div>
        ) : (
          /* ─── CALENDAR STEP ─── */
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-base">Pick a time that works</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
                    else setViewMonth(viewMonth - 1);
                  }}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-heading font-semibold text-sm min-w-[140px] text-center">{monthName}</span>
                <button
                  onClick={() => {
                    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
                    else setViewMonth(viewMonth + 1);
                  }}
                  className="p-1 rounded hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-center text-[10px] font-heading text-muted-foreground py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 mb-5">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isPast = isCurrentMonth && day < today;
                const isWeekend = new Date(viewYear, viewMonth, day).getDay() === 0 || new Date(viewYear, viewMonth, day).getDay() === 6;
                const isSelected = selectedDate === day;
                const disabled = isPast || isWeekend;
                return (
                  <button
                    key={day}
                    onClick={() => !disabled && handleDateClick(day)}
                    disabled={disabled}
                    className={`h-9 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : disabled
                        ? "text-muted-foreground/30 cursor-not-allowed"
                        : "hover:bg-muted text-foreground"
                    } ${isCurrentMonth && day === today && !isSelected ? "ring-1 ring-primary/40" : ""}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Time slots */}
            {selectedDate && (
              <>
                <Separator className="mb-4" />
                <p className="text-xs font-heading text-muted-foreground mb-3">
                  Available times for{" "}
                  {new Date(viewYear, viewMonth, selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-5">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`h-9 rounded-lg text-xs font-heading font-medium border transition-all ${
                        selectedTime === t
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:border-primary/40 hover:bg-muted"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}

            <Button
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep("details")}
              className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-heading rounded-xl"
            >
              Continue
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyModal;
