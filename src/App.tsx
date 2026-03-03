import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import Dashboard from "./pages/Dashboard";
import AIFactory from "./pages/AIFactory";
import Marketplace from "./pages/Marketplace";
import Templates from "./pages/Templates";
import ProductionRequests from "./pages/ProductionRequests";
import AssetArchive from "./pages/AssetArchive";
import BrandKit from "./pages/BrandKit";
import StatusTracker from "./pages/StatusTracker";
import ResellerHub from "./pages/ResellerHub";
import Affiliate from "./pages/Affiliate";
import InsightsBlog from "./pages/InsightsBlog";
import LegalHub from "./pages/LegalHub";
import SettingsPage from "./pages/SettingsPage";
import BookDemo from "./pages/BookDemo";
import Plans from "./pages/Plans";
import TemplateStore from "./pages/TemplateStore";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/template-store" element={<TemplateStore />} />
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-factory" element={<AIFactory />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/production-requests" element={<ProductionRequests />} />
              <Route path="/asset-archive" element={<AssetArchive />} />
              <Route path="/brand-kit" element={<BrandKit />} />
              <Route path="/status-tracker" element={<StatusTracker />} />
              <Route path="/reseller-hub" element={<ResellerHub />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/insights" element={<InsightsBlog />} />
              <Route path="/legal" element={<LegalHub />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
