
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'sonner';
import { useEffect, useState, Suspense, lazy } from "react";
import { supabase } from "@/integrations/supabase/client";
import "./App.css";

// Eager load homepage and navbar for immediate rendering
import Index from "@/pages/Index";
import Navbar from "@/components/Navbar";

// Lazy load other pages for better performance
const NotFound = lazy(() => import("@/pages/NotFound"));
const ChatV2Page = lazy(() => import("@/pages/ChatV2"));
const CareerPage = lazy(() => import("@/pages/Career"));
const WellbeingPage = lazy(() => import("@/pages/Wellbeing"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Assessments = lazy(() => import("@/pages/Assessments"));
const AssessmentTaking = lazy(() => import("@/pages/AssessmentTaking"));
const AssessmentResults = lazy(() => import("@/pages/AssessmentResults"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rafiki-600"></div>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get basename for router
  const isProduction = import.meta.env.MODE === 'production';
  const isGitHubActions = import.meta.env.VITE_GITHUB_ACTIONS === 'true';
  
  // For debugging
  console.log("Environment mode:", import.meta.env.MODE);
  console.log("Is GitHub Actions:", import.meta.env.VITE_GITHUB_ACTIONS);
  console.log("Base URL from env:", import.meta.env.BASE_URL);
  
  // Make basename conditional to match vite.config.ts
  const basename = isProduction && isGitHubActions ? "/rafiki-guidance-hub-66" : "";
  
  useEffect(() => {
    // For debugging
    console.log("App mounted, basename:", basename);
    
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (!error && data.session) {
          setUser(data.session.user);
        }
      } catch (err) {
        console.error("Error checking user session:", err);
      } finally {
        setLoading(false);
      }
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
  }, [basename]);

  // Prefetch main pages for faster navigation after initial load
  useEffect(() => {
    // Prefetch common routes after initial render
    const prefetchRoutes = async () => {
      if (!loading) {
        const isPrefetchSupported = 'prefetch' in HTMLLinkElement.prototype;
        
        if (isPrefetchSupported) {
          if (user) {
            import("@/pages/Dashboard");
            import("@/pages/ChatV2");
          } else {
            import("@/pages/Index");
          }
        }
      }
    };
    
    prefetchRoutes();
  }, [loading, user]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Router basename={basename}>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
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
