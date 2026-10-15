import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi, setAuthToken } from '../services/api';
import '../styles/sunshine-classmorphism.css';

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim() || !password) {
      setError('Please provide your email/mobile and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login({
        identifier: identifier.trim(),
        password: password,
      });

      if (response && response.token) {
        // Store JWT token
        setAuthToken(response.token);
        // Successful login navigates to /home
        navigate('/home');
      } else {
        setError('Invalid credentials.');
      }
    } catch (err) {
      // Generic invalid-credentials message that does not leak whether email/mobile or password was incorrect
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sunshine-body">
      <div className="sun-orb sun-orb-1"></div>
      <div className="sun-orb sun-orb-2"></div>
      <div className="sun-orb sun-orb-3"></div>

      <div className="classmorphism-card">
        <div className="card-header">
          <div className="sun-icon-badge">☀️</div>
          <h2 className="card-title">Welcome Back</h2>
          <p className="card-subtitle">Sunshine Classmorphism Authentication</p>
        </div>

        {error && <div className="alert-box alert-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Email or Mobile */}
          <div className="form-group">
            <label className="form-label" htmlFor="identifier">
              Email Address or Mobile Number
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="identifier"
                name="identifier"
                className="classmorphic-input"
                placeholder="name@example.com or 10-digit mobile"
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="classmorphic-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                required
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title="Toggle password visibility"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="card-footer-links">
            <div></div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Login Button */}
          <button type="submit" className="sunshine-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>

        <p className="footer-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
