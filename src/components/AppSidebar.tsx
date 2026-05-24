import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CalendarCheck,
  Rocket,
  Lightbulb,
  Sparkles,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { id: "control-center", label: "Control Center", icon: LayoutDashboard },
  { id: "daily-work", label: "Daily Work", icon: CalendarCheck },
  { id: "ventures", label: "Ventures", icon: Rocket },
  { id: "ideation-vault", label: "Ideation Vault", icon: Lightbulb },
  { id: "ai-briefing", label: "AI Briefing", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
];

interface AppSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function AppSidebar({ activePage, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-cyan-glow text-background font-display font-bold text-xs">
            9
          </div>
          <div className="flex flex-col leading-none min-w-0">
            <span className="font-display font-semibold text-sm text-sidebar-foreground truncate tracking-tight">
              9VL OS
            </span>
            <span className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
              v1.0
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-3">
        <SidebarMenu>
          {navItems.map((item, i) => {
            const isActive = activePage === item.id;
            return (
              <SidebarMenuItem key={item.id}>
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.label}
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      "relative transition-all duration-200",
                      isActive && [
                        "bg-sidebar-accent text-sidebar-accent-foreground",
                        "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-0.5 before:rounded-r-full before:bg-cyan-glow",
                      ]
                    )}
                  >
                    <item.icon
                      className={cn(
                        "size-4 transition-colors",
                        isActive ? "text-cyan-glow" : "text-muted-foreground"
                      )}
                    />
                    <span className={cn(isActive && "font-medium")}>
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </motion.div>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        <div className="flex items-center gap-2.5 px-1">
          <Avatar size="sm">
            <AvatarFallback className="bg-cyan-glow/10 text-cyan-glow text-xs font-display font-semibold">
              AF
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-none min-w-0">
            <span className="text-xs font-medium text-sidebar-foreground truncate">
              Alex Founder
            </span>
            <span className="text-[10px] text-muted-foreground truncate">
              Managing Partner
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
