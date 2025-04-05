
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'sonner';
import { useEffect, useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import "./App.css";

// Lazy load pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ChatV2Page = lazy(() => import("@/pages/ChatV2"));
const CareerPage = lazy(() => import("@/pages/Career"));
const WellbeingPage = lazy(() => import("@/pages/Wellbeing"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Assessments = lazy(() => import("@/pages/Assessments"));
const AssessmentTaking = lazy(() => import("@/pages/AssessmentTaking"));
const AssessmentResults = lazy(() => import("@/pages/AssessmentResults"));

// Loading component for Suspense
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rafiki-600"></div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Determine the basename for router based on environment
  const getBasename = () => {
    return import.meta.env.MODE === 'production' && window.location.hostname.includes('github.io')
      ? '/rafiki-guidance-hub-66'
      : '/';
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (!error && data.session) {
        setUser(data.session.user);
      }
      
      setLoading(false);
    };

    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setUser(session.user);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router basename={getBasename()}>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<ChatV2Page />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/wellbeing" element={<WellbeingPage />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/assessments/:assessmentId" element={<AssessmentTaking />} />
              <Route path="/assessment-results" element={<AssessmentResults />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
