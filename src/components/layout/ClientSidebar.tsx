import React from "react";
import {
  LayoutDashboard, Upload, Factory, LayoutTemplate, Activity, Settings,
  Film, MessageSquare, Calendar, Download, Lock, HelpCircle,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { usePlan } from "@/contexts/PlanContext";
import { Badge } from "@/components/ui/badge";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

export function ClientSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { planFeatures } = usePlan();

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, visible: true },
    { title: "Upload Center", url: "/client/uploads", icon: Upload, visible: true },
    { title: "AI Factory", url: "/ai-factory", icon: Factory, visible: true },
    { title: "Templates", url: "/templates", icon: LayoutTemplate, visible: planFeatures?.hasTemplates ?? false, locked: !planFeatures?.hasTemplates },
    { title: "Videos", url: "/client/videos", icon: Film, visible: planFeatures?.hasShortFormVideo ?? false, locked: !planFeatures?.hasShortFormVideo },
    { title: "Social Posting", url: "/client/social", icon: MessageSquare, visible: planFeatures?.hasManagedPosting ?? false, locked: !planFeatures?.hasManagedPosting },
    { title: "Strategy Sessions", url: "/client/strategy", icon: Calendar, visible: planFeatures?.hasStrategySessions ?? false, locked: !planFeatures?.hasStrategySessions },
    { title: "Deliverables", url: "/client/deliverables", icon: Download, visible: true },
    { title: "Status Tracker", url: "/status-tracker", icon: Activity, visible: true },
    { title: "Contact Us", url: "/client/contact", icon: HelpCircle, visible: true },
    { title: "Settings", url: "/settings", icon: Settings, visible: true },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <div
        className="p-4 flex items-center gap-2.5 border-b border-sidebar-border cursor-pointer hover:bg-sidebar-accent transition-colors"
        onClick={() => navigate("/")}
      >
        <img src={ryzeLogo} alt="Ryze Studios" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
        {!collapsed && <span className="font-heading font-bold text-lg text-sidebar-foreground tracking-tight">Ryze Studios</span>}
      </div>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.filter((item) => item.visible).map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent ${isActive ? "!bg-primary/15 !text-primary font-semibold" : ""}`}
                        activeClassName=""
                      >
                        <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                        {!collapsed && (
                          <span className="text-sm font-heading flex-1">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
