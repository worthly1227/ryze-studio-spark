import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Calendar, Clock, CheckCircle2, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const mockMessages = [
  { id: "1", from: "team", text: "Hi! We've scheduled your first batch of posts. Check the calendar below for details.", time: "10:30 AM" },
  { id: "2", from: "user", text: "Looks great! Can we change the caption on the Tuesday post?", time: "10:45 AM" },
  { id: "3", from: "team", text: "Absolutely! I'll update it now and send you a preview.", time: "10:47 AM" },
];

const mockSchedule = [
  { id: "1", platform: "Instagram", content: "Spring Collection Drop 🌸", date: "Mar 10", time: "9:00 AM", status: "scheduled" },
  { id: "2", platform: "Twitter", content: "Behind the scenes of our photoshoot", date: "Mar 11", time: "2:00 PM", status: "draft" },
  { id: "3", platform: "Instagram", content: "Customer spotlight: @happycustomer", date: "Mar 12", time: "11:00 AM", status: "scheduled" },
  { id: "4", platform: "Twitter", content: "New product alert! 🚀", date: "Mar 14", time: "10:00 AM", status: "scheduled" },
];

const SocialPosting: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-1 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold">Social Posting</h1>
        <p className="text-muted-foreground mt-1">Manage your social content with our team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chat */}
        <Card className="lg:col-span-2 flex flex-col" style={{ minHeight: 480 }}>
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Team Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-auto p-4 space-y-3">
              {mockMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    msg.from === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.from === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSend} className="bg-primary text-primary-foreground hover:bg-primary-pressed flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Posting Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockSchedule.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    {post.platform === "Instagram" ? (
                      <Instagram className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Twitter className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-medium text-sm truncate">{post.content}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {post.date} at {post.time}
                    </p>
                  </div>
                  <Badge className={`text-xs ${
                    post.status === "scheduled"
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {post.status === "scheduled" ? "Scheduled" : "Draft"}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialPosting;
