import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Layout from './components/Layout';
import { UserRole } from './types';

// Simple auth context simulation
export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  userRole: UserRole.GUEST,
  login: () => {},
  logout: () => {},
});

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.GUEST);

  // Check for existing session (mock)
  useEffect(() => {
    const storedAuth = localStorage.getItem('fortu_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUserRole(UserRole.ADMIN); // Default to admin for demo
    }
  }, []);

  const login = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('fortu_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(UserRole.GUEST);
    localStorage.removeItem('fortu_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          
          <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;