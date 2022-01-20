import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from '@/pages/home';
import About from '@/pages/about';
import Message from '@/pages/message';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/message" element={<Message />} />
        <Route path="/message/abc" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
