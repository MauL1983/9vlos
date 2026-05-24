import { motion } from "framer-motion";
import { CircleCheck as CheckCircle2, Circle, CalendarDays, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tasks = [
  { id: 1, venture: "Vitality", label: "Interview 5 churned users", done: false, urgent: true, time: "Today" },
  { id: 2, venture: "Kiperfy", label: "Review Series A deck draft with CFO", done: false, urgent: false, time: "Today" },
  { id: 3, venture: "LaCentral", label: "On-time delivery root cause analysis", done: false, urgent: true, time: "Today" },
  { id: 4, venture: "LeadRx10", label: "Follow up with 3 pending pilot leads", done: true, urgent: false, time: "Done" },
  { id: 5, venture: "BlackPenguin", label: "Review SOC2 module beta feedback", done: false, urgent: false, time: "Tomorrow" },
  { id: 6, venture: "AhorroEnergy", label: "Prep for Monterrey enterprise demo", done: false, urgent: false, time: "This week" },
  { id: 7, venture: "i9Framework", label: "Review plugin marketplace spec", done: true, urgent: false, time: "Done" },
  { id: 8, venture: "Miurale", label: "Define Pro tier feature set", done: false, urgent: false, time: "This week" },
  { id: 9, venture: "EduPod", label: "Reach out to 2 potential school partners", done: false, urgent: false, time: "This week" },
];

export function DailyWork() {
  const todayTasks = tasks.filter((t) => t.time === "Today");
  const doneTasks = tasks.filter((t) => t.done);
  const remaining = tasks.filter((t) => !t.done);

  return (
    <div className="p-6 max-w-[800px] mx-auto flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">Daily Work</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {remaining.length} tasks remaining · {doneTasks.length} completed
        </p>
      </motion.div>

      {/* Today's urgent */}
      {todayTasks.filter((t) => t.urgent && !t.done).length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="size-4 text-health-red" />
            <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-health-red">
              Urgent — Today
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {todayTasks.filter((t) => t.urgent && !t.done).map((task, i) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-center gap-3 rounded-xl border border-health-red/25 bg-health-red/4 px-4 py-3"
              >
                <Circle className="size-4 shrink-0 text-health-red" />
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">{task.label}</span>
                  <span className="text-[11px] text-muted-foreground">{task.venture}</span>
                </div>
                <Badge variant="outline" className="text-[10px] border-health-red/25 text-health-red">
                  {task.time}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Other tasks */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="size-4 text-muted-foreground" />
          <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
            All Tasks
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {tasks.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.04 }}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 transition-all",
                task.done
                  ? "border-border bg-muted/30 opacity-50"
                  : "border-border bg-card hover:border-cyan-glow/20"
              )}
            >
              {task.done ? (
                <CheckCircle2 className="size-4 shrink-0 text-health-green" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground" />
              )}
              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <span className={cn("text-sm font-medium", task.done ? "line-through text-muted-foreground" : "text-foreground")}>
                  {task.label}
                </span>
                <span className="text-[11px] text-muted-foreground">{task.venture}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {task.urgent && !task.done && (
                  <div className="size-1.5 rounded-full bg-health-red" />
                )}
                <span className="text-[11px] text-muted-foreground">{task.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
