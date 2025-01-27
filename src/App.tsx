import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HFs from './pages/HFs';
import Staff from './pages/Staff';
import Items from './pages/Items';
import Profiles from './pages/Profiles';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/hfs" element={<Layout><HFs /></Layout>} />
          <Route path="/staff" element={<Layout><Staff /></Layout>} />
          <Route path="/items" element={<Layout><Items /></Layout>} />
          <Route path="/profiles" element={<Layout><Profiles /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
