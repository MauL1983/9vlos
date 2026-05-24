import { motion } from "framer-motion";
import { Moon, Sun, Monitor, Bell, User, Palette } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const themes = [
  { value: "dark", label: "Dark", icon: Moon, desc: "Deep charcoal canvas" },
  { value: "light", label: "Light", icon: Sun, desc: "Warm off-white canvas" },
  { value: "system", label: "System", icon: Monitor, desc: "Follow OS preference" },
] as const;

export function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="p-6 max-w-[600px] mx-auto flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">9VL OS · v1.0</p>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Palette className="size-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-sm text-foreground">Appearance</h2>
        </div>
        <div className="p-5 flex flex-col gap-4">
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Theme</Label>
            <div className="grid grid-cols-3 gap-2">
              {themes.map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => setTheme(t.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-all",
                      isActive
                        ? "border-cyan-glow/40 bg-cyan-glow/8 text-foreground"
                        : "border-border hover:border-cyan-glow/20 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("size-5", isActive && "text-cyan-glow")} />
                    <span className="text-xs font-medium">{t.label}</span>
                    <span className="text-[10px] text-muted-foreground">{t.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <User className="size-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-sm text-foreground">Profile</h2>
        </div>
        <div className="p-5 flex flex-col gap-3">
          {[
            { label: "Name", value: "Alex Founder" },
            { label: "Role", value: "Managing Partner" },
            { label: "Portfolio", value: "9 Venture Labs" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-border bg-card overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <Bell className="size-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-sm text-foreground">Notifications</h2>
        </div>
        <div className="p-5 flex flex-col gap-4">
          {[
            { label: "Survival clock warnings", desc: "Alert when venture < 6 months left", defaultOn: true },
            { label: "Health score drops", desc: "Alert on >10 point drops", defaultOn: true },
            { label: "Weekly portfolio digest", desc: "Summary every Monday", defaultOn: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <Label className="text-sm font-medium text-foreground cursor-pointer">{item.label}</Label>
                <span className="text-[11px] text-muted-foreground">{item.desc}</span>
              </div>
              <Switch defaultChecked={item.defaultOn} />
            </div>
          ))}
        </div>
      </motion.div>

      <p className="text-[11px] text-center text-muted-foreground pb-2">
        9VL OS · Built for founders managing multiple ventures simultaneously
      </p>
    </div>
  );
}
