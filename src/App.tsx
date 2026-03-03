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
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import AIFactory from "./pages/AIFactory";
import Marketplace from "./pages/Marketplace";
import Templates from "./pages/Templates";
import StatusTracker from "./pages/StatusTracker";
import ResellerHub from "./pages/ResellerHub";
import Affiliate from "./pages/Affiliate";
import SettingsPage from "./pages/SettingsPage";
import BookDemo from "./pages/BookDemo";
import Plans from "./pages/Plans";
import TemplateStore from "./pages/TemplateStore";
import ClientUploads from "./pages/client/ClientUploads";
import ClientMessages from "./pages/client/ClientMessages";
import ClientProjects from "./pages/client/ClientProjects";
import ClientDeliverables from "./pages/client/ClientDeliverables";
import AdminClients from "./pages/admin/AdminClients";
import AdminDeliverables from "./pages/admin/AdminDeliverables";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminProjects from "./pages/admin/AdminProjects";

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

            {/* Client portal */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ai-factory" element={<AIFactory />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/status-tracker" element={<StatusTracker />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/client/uploads" element={<ClientUploads />} />
              <Route path="/client/messages" element={<ClientMessages />} />
              <Route path="/client/projects" element={<ClientProjects />} />
              <Route path="/client/deliverables" element={<ClientDeliverables />} />
            </Route>

            {/* Admin portal */}
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/clients" element={<AdminClients />} />
              <Route path="/admin/projects" element={<AdminProjects />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/deliverables" element={<AdminDeliverables />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/reseller-hub" element={<ResellerHub />} />
              <Route path="/affiliate" element={<Affiliate />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
