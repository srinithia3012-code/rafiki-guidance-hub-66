
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ChatPage from "@/pages/Chat";
import Navbar from "@/components/Navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
