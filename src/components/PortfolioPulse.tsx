import { Moon, Sun, CircleAlert as AlertCircle, Activity, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePortfolio } from "@/state/portfolio-store";

export function PortfolioPulse() {
  const { theme, setTheme } = useTheme();
  const { ventures } = usePortfolio();
  const atRisk = ventures.filter((v) => v.healthScore < 40 || v.survivalMonthsLeft <= 5).length;
  const onClock = ventures.filter((v) => v.track === "Incubation").length;

  const stats = [
    {
      icon: Layers,
      label: "slots live",
      value: `${ventures.length} / 9`,
      color: "text-cyan-glow",
    },
    {
      icon: AlertCircle,
      label: "at risk",
      value: `${atRisk} venture${atRisk !== 1 ? "s" : ""}`,
      color: atRisk > 0 ? "text-health-red" : "text-health-green",
    },
    {
      icon: Activity,
      label: "on survival clock",
      value: `${onClock} ventures`,
      color: "text-health-amber",
    },
  ];

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground -ml-1" />
        <div className="flex items-center gap-6 ml-2">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <s.icon className={`size-3.5 shrink-0 ${s.color}`} />
              <span className="font-display font-semibold text-sm text-foreground">
                {s.value}
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Avatar size="sm">
          <AvatarFallback className="bg-cyan-glow/10 text-cyan-glow text-xs font-display font-semibold">
            AF
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
