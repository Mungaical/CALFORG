import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CalForge from './components/CalForge';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CalForge />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;