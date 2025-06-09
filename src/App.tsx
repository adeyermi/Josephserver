import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import LandingPage from './pages/LandingPage';
import UserEntryPage from './pages/UserEntryPage';
import HomePage from './pages/HomePage';
import QuizWelcomePage from './pages/QuizWelcomePage';
import MemoryVerseQuiz from './pages/MemoryVerseQuiz';
import ExerciseQuiz from './pages/ExerciseQuiz';
import PastQuestionsQuiz from './pages/PastQuestionsQuiz';
import DocumentsWelcomePage from './pages/DocumentsWelcomePage';
import MemoryVerseDocument from './pages/MemoryVerseDocument';
import ExerciseDocument from './pages/ExerciseDocument';
import PastQuestionsDocument from './pages/PastQuestionsDocument';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-cream">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/entry" element={<UserEntryPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/quiz" element={<QuizWelcomePage />} />
            <Route path="/quiz/memory-verse" element={<MemoryVerseQuiz />} />
            <Route path="/quiz/exercise" element={<ExerciseQuiz />} />
            <Route path="/quiz/past-questions" element={<PastQuestionsQuiz />} />
            <Route path="/documents" element={<DocumentsWelcomePage />} />
            <Route path="/documents/memory-verse" element={<MemoryVerseDocument />} />
            <Route path="/documents/exercise" element={<ExerciseDocument />} />
            <Route path="/documents/past-questions" element={<PastQuestionsDocument />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;