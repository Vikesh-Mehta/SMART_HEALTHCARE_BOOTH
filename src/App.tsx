
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import HealthCheckup from "./pages/HealthCheckup";
import VirtualConsultation from "./pages/VirtualConsultation";
import MedicineAdvisor from "./pages/MedicineAdvisor";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/health-checkup" element={<ProtectedRoute><HealthCheckup /></ProtectedRoute>} />
            <Route path="/virtual-consultation" element={<ProtectedRoute><VirtualConsultation /></ProtectedRoute>} />
            <Route path="/virtual-consultation/:doctorId" element={<ProtectedRoute><VirtualConsultation /></ProtectedRoute>} />
            <Route path="/medicine-advisor" element={<ProtectedRoute><MedicineAdvisor /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
