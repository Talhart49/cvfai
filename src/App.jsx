import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ResumeGenerator from './pages/ResumeGenerator.jsx';
import CoverLetterGenerator from './pages/CoverLetterGenerator.jsx';
import NotFound from './pages/NotFound.jsx';
import Header from './components/Header.jsx';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-gray-50">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate/resume" element={<ResumeGenerator />} />
        <Route path="/generate/cover-letter" element={<CoverLetterGenerator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
