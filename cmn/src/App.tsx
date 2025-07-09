import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudioPage from './pages/StudioPage';
import GalleryPage from './pages/GalleryPage';
import PricingPage from './pages/PricingPage';
import AuthPage from './pages/AuthPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
