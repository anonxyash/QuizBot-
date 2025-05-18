import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import ChatPage from './pages/ChatPage';
import QuizGenerator from './pages/MCQGenerator';
import Quiz from './pages/Quiz';
import GeneratePaper from './pages/GeneratePaper';
import PaperResult from './pages/PaperResult';
import SplashScreen from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Handle splash screen
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/generate-quiz" element={<QuizGenerator />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/paper" element={<GeneratePaper />} />
            <Route path="/paper-result" element={<PaperResult />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}