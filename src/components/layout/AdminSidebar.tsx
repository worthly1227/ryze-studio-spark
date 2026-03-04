import React from "react";
import {
  LayoutDashboard, UserCog, Kanban, Send, Upload,
  ShoppingBag, Store, Users, Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import ryzeLogo from "@/assets/ryze-logo.jpeg";

const coreItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Clients", url: "/admin/clients", icon: UserCog },
  { title: "All Projects", url: "/admin/projects", icon: Kanban },
  { title: "Client Messages", url: "/admin/messages", icon: Send },
  { title: "Deliver Files", url: "/admin/deliverables", icon: Upload },
];

const businessItems = [
  { title: "Marketplace", url: "/marketplace", icon: ShoppingBag },
  { title: "Reseller Hub", url: "/reseller-hub", icon: Store },
  { title: "Affiliate", url: "/affiliate", icon: Users },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const renderItems = (items: typeof coreItems) =>
    items.map((item) => {
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
    });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <div className="p-4 flex items-center gap-2.5 border-b border-sidebar-border cursor-pointer hover:bg-sidebar-accent transition-colors" onClick={() => navigate("/")}>
        <img src={ryzeLogo} alt="Ryze Studios" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg text-sidebar-foreground tracking-tight leading-tight">Ryze Studios</span>
            <span className="text-xs text-primary font-medium">Admin</span>
          </div>
        )}
      </div>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(coreItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-xs font-heading text-muted-foreground uppercase tracking-wider px-3">Business</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(businessItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(settingsItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
