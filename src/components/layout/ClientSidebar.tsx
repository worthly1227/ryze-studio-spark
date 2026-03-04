import React from "react";
import {
  LayoutDashboard, Upload, MessageSquare, FolderOpen, Download,
  Factory, LayoutTemplate, Activity, Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Upload Content", url: "/client/uploads", icon: Upload },
  { title: "Messages", url: "/client/messages", icon: MessageSquare },
  { title: "My Projects", url: "/client/projects", icon: FolderOpen },
  { title: "Deliverables", url: "/client/deliverables", icon: Download },
  { title: "AI Factory", url: "/ai-factory", icon: Factory },
  { title: "Templates", url: "/templates", icon: LayoutTemplate },
  { title: "Status Tracker", url: "/status-tracker", icon: Activity },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function ClientSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

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
              {items.map((item) => {
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
                        {!collapsed && <span className="text-sm font-heading">{item.title}</span>}
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
