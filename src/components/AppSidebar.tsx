import { useState } from "react";
import { 
  Upload, 
  Settings, 
  BarChart3, 
  Wrench, 
  Brain, 
  Target, 
  Eye, 
  FolderOpen, 
  Rocket, 
  Users,
  Home,
  Database
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Data Ingestion", url: "/data-ingestion", icon: Upload },
  { title: "Preprocessing", url: "/preprocessing", icon: Settings },
  { title: "EDA", url: "/eda", icon: BarChart3 },
  { title: "Feature Engineering", url: "/feature-engineering", icon: Wrench },
  { title: "Model Training", url: "/model-training", icon: Brain },
  { title: "Evaluation", url: "/evaluation", icon: Target },
  { title: "Explainability", url: "/explainability", icon: Eye },
  { title: "Model Management", url: "/model-management", icon: FolderOpen },
  { title: "Deployment", url: "/deployment", icon: Rocket },
  { title: "Collaboration", url: "/collaboration", icon: Users },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavClasses = (path: string) => 
    isActive(path) 
      ? "bg-gradient-primary text-primary-foreground font-medium shadow-glow" 
      : "hover:bg-secondary/50 transition-smooth";

  return (
    <Sidebar className="border-r border-border bg-card/50 backdrop-blur">
      <SidebarContent>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-ai rounded-lg flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg bg-gradient-ai bg-clip-text text-transparent">
                  AutoML Pro
                </h2>
                <p className="text-xs text-muted-foreground">ML Platform</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            WORKFLOW
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-smooth ${getNavClasses(item.url)}`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}