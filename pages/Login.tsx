import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { UserRole } from '../types';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      login(UserRole.ADMIN);
    } else if (username === 'manager') {
      login(UserRole.MANAGER);
    } else {
      setError('Invalid credentials (try admin/admin)');
    }
  };

  return (
    <div className="min-h-screen bg-fortu-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-fortu-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md bg-fortu-card/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl p-8 z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-fortu-500 to-neon-purple rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-fortu-500/30">
             <span className="text-3xl font-bold text-white">F</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Fortu Digital</h2>
          <p className="text-slate-400 mt-2">Sign in to CSI Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fortu-500 focus:border-transparent transition-all"
              placeholder="Enter ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fortu-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-fortu-600 to-fortu-500 hover:from-fortu-500 hover:to-fortu-400 text-white font-bold rounded-xl shadow-lg shadow-fortu-500/25 transition-all transform hover:scale-[1.02]"
          >
            Access Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Version 2.4.1 (Android Build)
            <br />
            &copy; 2025 Fortu Digital Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;