import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import Dashboard from "./pages/Dashboard";
import DataIngestion from "./pages/DataIngestion";
import Preprocessing from "./pages/Preprocessing";
import EDA from "./pages/EDA";
import FeatureEngineering from "./pages/FeatureEngineering";
import ModelTraining from "./pages/ModelTraining";
import Evaluation from "./pages/Evaluation";
import Explainability from "./pages/Explainability";
import ModelManagement from "./pages/ModelManagement";
import Deployment from "./pages/Deployment";
import Collaboration from "./pages/Collaboration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-surface">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <TopNavbar />
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/data-ingestion" element={<DataIngestion />} />
                  <Route path="/preprocessing" element={<Preprocessing />} />
                  <Route path="/eda" element={<EDA />} />
                  <Route path="/feature-engineering" element={<FeatureEngineering />} />
                  <Route path="/model-training" element={<ModelTraining />} />
                  <Route path="/evaluation" element={<Evaluation />} />
                  <Route path="/explainability" element={<Explainability />} />
                  <Route path="/model-management" element={<ModelManagement />} />
                  <Route path="/deployment" element={<Deployment />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
