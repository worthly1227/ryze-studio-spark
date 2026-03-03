import React from "react";
import { Bell, Moon, Sun, User, Package, MessageSquare, CheckCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

const mockNotifications = [
  { id: 1, icon: Package, title: "Your deliverables are ready", desc: "3 files uploaded to Brand Kit project", time: "2m ago", unread: true },
  { id: 2, icon: MessageSquare, title: "New message from Ryze team", desc: "We've updated your revision request", time: "1h ago", unread: true },
  { id: 3, icon: CheckCircle, title: "Project approved", desc: "Social Media Pack is now complete", time: "3h ago", unread: false },
];

const TopBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="p-3 border-b border-border">
              <h4 className="font-heading font-semibold text-sm">Notifications</h4>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border last:border-0 ${n.unread ? "bg-primary/5" : ""}`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <n.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                  {n.unread && <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />}
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="ghost" className="w-full text-xs font-heading text-primary hover:text-primary">
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground">
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/settings")}
          aria-label="Open settings"
          className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 text-primary hover:bg-primary/25"
        >
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

export default TopBar;
