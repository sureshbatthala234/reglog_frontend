import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';
import '../styles/sunshine-classmorphism.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    const { fullName, email, mobileNumber, password, confirmPassword } = formData;

    if (!fullName.trim() || !email.trim() || !mobileNumber.trim() || !password || !confirmPassword) {
      return 'All fields are required.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address.';
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber.trim())) {
      return 'Mobile number must be exactly 10 digits.';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }

    // Password: at least 8 chars, uppercase, lowercase, number, special char
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long and include uppercase, lowercase, numeric and special characters.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.register({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess(response.message || 'Registration successful! Redirecting to login...');
      
      // Auto navigate to /login after 1.5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
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
          <h2 className="card-title">Create Account</h2>
          <p className="card-subtitle">Sunshine Classmorphism Experience</p>
        </div>

        {error && <div className="alert-box alert-error">⚠️ {error}</div>}
        {success && <div className="alert-box alert-success">✓ {success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="classmorphic-input"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                className="classmorphic-input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="mobileNumber">Mobile Number (10 Digits)</label>
            <div className="input-wrapper">
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                maxLength="10"
                className="classmorphic-input"
                placeholder="9876543210"
                value={formData.mobileNumber}
                onChange={handleChange}
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
                placeholder="At least 8 chars (A-Z, a-z, 0-9, @#$)"
                value={formData.password}
                onChange={handleChange}
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

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="classmorphic-input"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title="Toggle confirm password visibility"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="sunshine-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
