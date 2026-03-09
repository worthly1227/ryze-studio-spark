import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, CheckCircle2, ArrowRight } from "lucide-react";
import { usePlan } from "@/contexts/PlanContext";
import { motion } from "framer-motion";

const mockSessions = [
  { id: "1", title: "Q1 Strategy Review", date: "Mar 15, 2026", time: "2:00 PM EST", status: "upcoming", duration: "45 min" },
  { id: "2", title: "Content Calendar Planning", date: "Jan 10, 2026", time: "3:00 PM EST", status: "completed", duration: "30 min", notes: "Discussed spring campaign direction and content pillars." },
];

const StrategySessions: React.FC = () => {
  const { planFeatures } = usePlan();

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-1 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold">Strategy Sessions</h1>
          <p className="text-muted-foreground mt-1">
            {planFeatures?.strategyFrequency ? `${planFeatures.strategyFrequency.charAt(0).toUpperCase() + planFeatures.strategyFrequency.slice(1)} sessions` : "Sessions"} with our creative team
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-2 w-full sm:w-auto">
          <Calendar className="w-4 h-4" /> Book Session
        </Button>
      </div>

      {/* Booking Widget Placeholder */}
      <Card className="border-primary/20 cyan-glow-sm">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-lg mb-1">Book Your Next Session</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
            Schedule a {planFeatures?.strategyFrequency || ""} strategy call with our creative directors to align on goals and review performance.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed font-heading gap-2">
            Open Calendar <ArrowRight className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Past & Upcoming Sessions */}
      <div className="space-y-3">
        <h3 className="font-heading font-semibold text-lg">Sessions</h3>
        {mockSessions.map((session, i) => (
          <motion.div key={session.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className={`hover:border-primary/20 transition-all ${session.status === "upcoming" ? "border-primary/20" : ""}`}>
              <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  session.status === "upcoming" ? "bg-primary/10" : "bg-muted"
                }`}>
                  {session.status === "upcoming" ? (
                    <Calendar className="w-5 h-5 text-primary" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-heading font-semibold text-sm">{session.title}</p>
                    <Badge className={`text-[10px] ${
                      session.status === "upcoming"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {session.status === "upcoming" ? "Upcoming" : "Completed"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {session.date} · {session.time} · {session.duration}
                  </p>
                  {session.notes && <p className="text-xs text-muted-foreground mt-1.5">{session.notes}</p>}
                </div>
                {session.status === "upcoming" && (
                  <Button variant="outline" size="sm" className="font-heading text-xs w-full sm:w-auto">
                    Join Call
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StrategySessions;
