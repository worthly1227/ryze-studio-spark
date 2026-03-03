import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Paperclip, MessageSquare, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface ClientThread {
  id: string;
  clientName: string;
  company: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  priority: "normal" | "urgent";
  assignee: string;
}

const threads: ClientThread[] = [
  { id: "1", clientName: "Sarah Mitchell", company: "Glow Beauty Co.", initials: "SM", lastMessage: "Can we try a warmer tone on the lifestyle shots?", time: "2m ago", unread: 3, priority: "normal", assignee: "Jordan" },
  { id: "2", clientName: "Elena Rodriguez", company: "Casa Candles", initials: "ER", lastMessage: "When will the unboxing video be ready?", time: "15m ago", unread: 1, priority: "urgent", assignee: "Alex" },
  { id: "3", clientName: "David Park", company: "FitPro Gear", initials: "DP", lastMessage: "The social reels look great! One small change on reel #3.", time: "1h ago", unread: 2, priority: "normal", assignee: "Maya" },
  { id: "4", clientName: "Marcus Chen", company: "Urban Kicks", initials: "MC", lastMessage: "Brand guidelines received, thanks!", time: "3h ago", unread: 0, priority: "normal", assignee: "Jordan" },
  { id: "5", clientName: "James Okafor", company: "Heritage Coffee", initials: "JO", lastMessage: "Hi, excited to get started on the product shoot!", time: "5h ago", unread: 1, priority: "normal", assignee: "Team" },
];

const mockMessages = [
  { id: "1", sender: "client", name: "Sarah", text: "Hey Jordan! The first batch of photos looks incredible. Love the lighting!", time: "10:30 AM" },
  { id: "2", sender: "team", name: "Jordan", text: "Thank you Sarah! We spent extra time on the shadows. Ready to move to the next set?", time: "10:35 AM" },
  { id: "3", sender: "client", name: "Sarah", text: "Yes! Can we try a warmer tone on the lifestyle shots? Something more cozy and inviting.", time: "10:42 AM" },
];

const AdminMessages: React.FC = () => {
  const [activeThread, setActiveThread] = useState(threads[0]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter((t) =>
    t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = threads.reduce((sum, t) => sum + t.unread, 0);

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <div className="flex h-full gap-4">
        {/* Thread List */}
        <Card className="w-80 flex-shrink-0 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading font-bold text-lg">Client Messages</h2>
              <Badge className="bg-primary text-primary-foreground">{totalUnread}</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search clients..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => setActiveThread(thread)}
                className={`w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-colors ${
                  activeThread.id === thread.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                }`}
              >
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading">{thread.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-heading font-semibold text-sm truncate">{thread.clientName}</p>
                      <span className="text-xs text-muted-foreground">{thread.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{thread.company}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{thread.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">→ {thread.assignee}</span>
                      {thread.priority === "urgent" && <Badge variant="destructive" className="text-[10px] h-4 px-1">Urgent</Badge>}
                    </div>
                  </div>
                  {thread.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">{thread.unread}</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading">{activeThread.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-heading font-semibold">{activeThread.clientName}</p>
                <p className="text-xs text-muted-foreground">{activeThread.company} · Assigned to {activeThread.assignee}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg, i) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`flex ${msg.sender === "team" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[70%]">
                  <p className={`text-xs font-heading font-semibold mb-1 ${msg.sender === "team" ? "text-right" : ""}`}>{msg.name}</p>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.sender === "team" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted rounded-bl-md"
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className={`text-xs text-muted-foreground mt-1 ${msg.sender === "team" ? "text-right" : ""}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground flex-shrink-0"><Paperclip className="w-5 h-5" /></Button>
              <Input placeholder="Reply to client..." value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1" />
              <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed flex-shrink-0" size="icon"><Send className="w-4 h-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminMessages;
