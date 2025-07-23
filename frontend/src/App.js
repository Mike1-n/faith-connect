import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Group from './pages/Group';
import Event from './pages/Event';
import Mentorship from './pages/Mentorship';
import Discipleship from './pages/Discipleship';
import SpiritualGiftsAssessment from './pages/SpiritualGiftsAssessment';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/group/:id" element={<Group />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/discipleship" element={<Discipleship />} />
            <Route path="/spiritual-gifts-assessment" element={<SpiritualGiftsAssessment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;