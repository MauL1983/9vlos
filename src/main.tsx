import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { PortfolioProvider } from "@/state/portfolio-store.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="9vl-theme">
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </ThemeProvider>
  </StrictMode>
)
