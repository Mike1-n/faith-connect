import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../../shared/src/features/Home/components/Home';
import Login from '../../shared/src/features/Auth/components/Login';
import Register from '../../shared/src/features/Auth/components/Register';
import Profile from '../../shared/src/features/Profile/components/Profile';
import Post from '../../shared/src/features/Post/components/Post';
import Group from '../../shared/src/features/Group/components/Group';
import Event from '../../shared/src/features/Event/components/Event';
import Mentorship from '../../shared/src/features/Mentorship/components/Mentorship';
import Discipleship from '../../shared/src/features/Discipleship/components/Discipleship';
import SpiritualGiftsAssessment from '../../shared/src/features/SpiritualGiftsAssessment/components/SpiritualGiftsAssessment';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
