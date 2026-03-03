import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Search, Phone, Video, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

interface Conversation {
  id: string;
  name: string;
  role: string;
  initials: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  sender: "client" | "team";
  name: string;
  text: string;
  time: string;
}

const conversations: Conversation[] = [
  { id: "1", name: "Jordan – Creative Director", role: "Creative Lead", initials: "JC", lastMessage: "The new product shots look amazing! I'll send the edits by EOD.", time: "2m ago", unread: 2, online: true },
  { id: "2", name: "Maya – Project Manager", role: "PM", initials: "MP", lastMessage: "Your spring campaign brief has been approved.", time: "1h ago", unread: 0, online: true },
  { id: "3", name: "Alex – Video Editor", role: "Post-Production", initials: "AE", lastMessage: "The UGC reel is ready for your review.", time: "3h ago", unread: 1, online: false },
  { id: "4", name: "Team Ryze", role: "General", initials: "TR", lastMessage: "Welcome to Ryze Studios! We're excited to work with you.", time: "1d ago", unread: 0, online: true },
];

const mockMessages: Message[] = [
  { id: "1", sender: "team", name: "Jordan", text: "Hey! I just finished the first round of product shots for the sneaker line. Take a look and let me know your thoughts!", time: "10:30 AM" },
  { id: "2", sender: "client", name: "You", text: "These look incredible! Love the lighting on the hero shot. Can we try a slightly warmer tone on the lifestyle shots?", time: "10:45 AM" },
  { id: "3", sender: "team", name: "Jordan", text: "Absolutely, great eye! I'll adjust the color grade. Should have the updated versions ready by 3 PM today.", time: "10:52 AM" },
  { id: "4", sender: "client", name: "You", text: "Perfect. Also, can we add 2 more angles for the product grid? The marketing team wants more variety.", time: "11:05 AM" },
  { id: "5", sender: "team", name: "Jordan", text: "The new product shots look amazing! I'll send the edits by EOD. I've also prepped some bonus flat lay compositions — you'll love them 🔥", time: "11:20 AM" },
];

const ClientMessages: React.FC = () => {
  const [activeConvo, setActiveConvo] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [searchConvo, setSearchConvo] = useState("");

  const filteredConvos = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchConvo.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <div className="flex h-full gap-4">
        {/* Conversation List */}
        <Card className="w-80 flex-shrink-0 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-heading font-bold text-lg mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." value={searchConvo} onChange={(e) => setSearchConvo(e.target.value)} className="pl-10 h-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvos.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setActiveConvo(convo)}
                className={`w-full text-left p-4 border-b border-border hover:bg-muted/50 transition-colors ${
                  activeConvo.id === convo.id ? "bg-primary/5 border-l-2 border-l-primary" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading">{convo.initials}</AvatarFallback>
                    </Avatar>
                    {convo.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-heading font-semibold text-sm truncate">{convo.name}</p>
                      <span className="text-xs text-muted-foreground">{convo.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{convo.lastMessage}</p>
                  </div>
                  {convo.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">{convo.unread}</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading">{activeConvo.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-heading font-semibold">{activeConvo.name}</p>
                <p className="text-xs text-muted-foreground">{activeConvo.role} · {activeConvo.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Phone className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><Video className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"><MoreVertical className="w-4 h-4" /></Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%] ${msg.sender === "client" ? "order-1" : ""}`}>
                  <div className={`rounded-2xl px-4 py-3 ${
                    msg.sender === "client"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted rounded-bl-md"
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className={`text-xs text-muted-foreground mt-1 ${msg.sender === "client" ? "text-right" : ""}`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground flex-shrink-0">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => e.key === "Enter" && setMessage("")}
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary-pressed flex-shrink-0" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClientMessages;
