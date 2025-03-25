
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'sonner';
import { useEffect, useState } from "react";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ChatPage from "@/pages/Chat";
import CareerPage from "@/pages/Career";
import WellbeingPage from "@/pages/Wellbeing";
import AuthCallback from "@/pages/AuthCallback";
import Dashboard from "@/pages/Dashboard";
import Assessments from "@/pages/Assessments";
import AssessmentTaking from "@/pages/AssessmentTaking";
import AssessmentResults from "@/pages/AssessmentResults";
import Navbar from "@/components/Navbar";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./App.css";

function App() {
  const { user, isLoading } = useAuthStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rafiki-600"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Toaster position="top-center" />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* If logged in, redirect to dashboard from homepage */}
              <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/wellbeing" element={<WellbeingPage />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/assessments/:assessmentId" element={<AssessmentTaking />} />
              <Route path="/assessment-results" element={<AssessmentResults />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
