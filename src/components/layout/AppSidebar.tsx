import React from "react";
import {
  LayoutDashboard, Factory, ShoppingBag, LayoutTemplate, ClipboardList,
  Archive, Palette, Activity, Store, Users, BookOpen, Scale, Settings,
  Sparkles,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

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

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center cyan-glow-sm flex-shrink-0">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && <span className="font-heading font-bold text-lg text-sidebar-foreground tracking-tight">Ryze Studios</span>}
      </div>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent ${isActive ? "!bg-primary/15 !text-primary font-semibold cyan-glow-sm" : ""}`}
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
