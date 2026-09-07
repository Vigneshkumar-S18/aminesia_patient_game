import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); // Mock login redirects to dashboard
  };

  return (
    <div className="login-container">
      <div className="login-card card">
        <div className="login-header">
          <h2>MEMORYWEAVE <span className="badge">CARE</span></h2>
          <p className="text-muted mt-2">Welcome back 👋</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="anita@example.com" defaultValue="anita@example.com" className="form-input" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" defaultValue="password123" className="form-input" />
          </div>

          <button type="submit" className="btn btn-primary btn-full mt-4">Sign In</button>
          
          <div className="text-center mt-3">
            <a href="#" className="text-sm text-primary">Forgot password?</a>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <button type="button" className="btn btn-outline btn-full" onClick={handleLogin}>
            Continue with Google
          </button>
        </form>
      </div>

      <div className="demo-mode-banner text-center mt-4">
        <p className="text-sm text-muted">Hackathon Demo Mode - <button className="btn text-primary p-0" onClick={handleLogin}>Skip Login</button></p>
      </div>
    </div>
  );
}
