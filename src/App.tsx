import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PortfolioPulse } from "@/components/PortfolioPulse";
import { ControlCenter } from "@/pages/ControlCenter";
import { DailyWork } from "@/pages/DailyWork";
import { Ventures } from "@/pages/Ventures";
import { VentureDetail } from "@/pages/VentureDetail";
import { IdeationVault } from "@/pages/IdeationVault";
import { AIBriefing } from "@/pages/AIBriefing";
import { Settings } from "@/pages/Settings";

type Page =
  | "control-center"
  | "daily-work"
  | "ventures"
  | "venture-detail"
  | "ideation-vault"
  | "ai-briefing"
  | "settings";

export function App() {
  const [activePage, setActivePage] = useState<Page>("control-center");
  const [selectedVentureId, setSelectedVentureId] = useState<string | null>(null);

  function handleVentureSelect(id: string) {
    setSelectedVentureId(id);
    setActivePage("venture-detail");
  }

  function handleNav(page: string) {
    setActivePage(page as Page);
    if (page !== "venture-detail") {
      setSelectedVentureId(null);
    }
  }

  const sidebarPage =
    activePage === "venture-detail" ? "ventures" : activePage;

  function renderPage() {
    switch (activePage) {
      case "control-center":
        return <ControlCenter onVentureSelect={handleVentureSelect} />;
      case "daily-work":
        return <DailyWork />;
      case "ventures":
        return <Ventures onVentureSelect={handleVentureSelect} />;
      case "venture-detail":
        return selectedVentureId ? (
          <VentureDetail
            ventureId={selectedVentureId}
            onBack={() => setActivePage("control-center")}
          />
        ) : null;
      case "ideation-vault":
        return <IdeationVault />;
      case "ai-briefing":
        return <AIBriefing />;
      case "settings":
        return <Settings />;
      default:
        return <ControlCenter onVentureSelect={handleVentureSelect} />;
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar activePage={sidebarPage} onNavigate={handleNav} />
      <SidebarInset className="min-h-svh flex flex-col">
        <PortfolioPulse />
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage + (selectedVentureId ?? "")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="h-full"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
