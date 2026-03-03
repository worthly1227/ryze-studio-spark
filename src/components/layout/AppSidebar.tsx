import React from "react";
import {
  LayoutDashboard, Factory, ShoppingBag, LayoutTemplate, ClipboardList,
  Archive, Palette, Activity, Store, Users, BookOpen, Scale, Settings,
  Upload, MessageSquare, FolderOpen, Download, UserCog, Send, Kanban,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "AI Factory", url: "/ai-factory", icon: Factory },
  { title: "Marketplace", url: "/marketplace", icon: ShoppingBag },
  { title: "Templates", url: "/templates", icon: LayoutTemplate },
  { title: "Production Requests", url: "/production-requests", icon: ClipboardList },
  { title: "Asset Archive", url: "/asset-archive", icon: Archive },
  { title: "Brand Kit", url: "/brand-kit", icon: Palette },
  { title: "Status Tracker", url: "/status-tracker", icon: Activity },
  { title: "Reseller Hub", url: "/reseller-hub", icon: Store },
  { title: "Affiliate", url: "/affiliate", icon: Users },
  { title: "Insights Blog", url: "/insights", icon: BookOpen },
  { title: "Legal Hub", url: "/legal", icon: Scale },
  { title: "Settings", url: "/settings", icon: Settings },
];

const clientItems = [
  { title: "Upload Content", url: "/client/uploads", icon: Upload },
  { title: "Messages", url: "/client/messages", icon: MessageSquare },
  { title: "My Projects", url: "/client/projects", icon: FolderOpen },
  { title: "Deliverables", url: "/client/deliverables", icon: Download },
];

const adminItems = [
  { title: "Clients", url: "/admin/clients", icon: UserCog },
  { title: "All Projects", url: "/admin/projects", icon: Kanban },
  { title: "Client Messages", url: "/admin/messages", icon: Send },
  { title: "Deliver Files", url: "/admin/deliverables", icon: Upload },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <div className="p-4 flex items-center gap-2.5 border-b border-sidebar-border">
        <img src={ryzeLogo} alt="Ryze Studios" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
        {!collapsed && <span className="font-heading font-bold text-lg text-sidebar-foreground tracking-tight">Ryze Studios</span>}
      </div>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {renderNavItems(navItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-xs font-heading text-muted-foreground uppercase tracking-wider px-3">Client Portal</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {renderNavItems(clientItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-xs font-heading text-muted-foreground uppercase tracking-wider px-3">Admin</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {renderNavItems(adminItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
