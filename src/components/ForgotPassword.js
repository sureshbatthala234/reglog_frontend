import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';
import '../styles/sunshine-classmorphism.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP, 3: Reset Password
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your registered email or mobile number.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await authApi.forgotPassword(identifier.trim());
      setSuccess(res.message || 'OTP sent successfully.');
      if (res.otp) {
        setSuccess(`OTP Generated: ${res.otp} (Check server console for provider delivery)`);
      }
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to request OTP. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('Please enter the OTP.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await authApi.verifyOtp(identifier.trim(), otp.trim());
      setSuccess('OTP verified successfully! Now create your new password.');
      setStep(3);
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, numeric and special characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.resetPassword({
        identifier: identifier.trim(),
        otp: otp.trim(),
        newPassword,
        confirmPassword,
      });

      setSuccess(res.message || 'Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to reset password.');
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
          <h2 className="card-title">Reset Password</h2>
          <p className="card-subtitle">
            {step === 1 && 'Enter your registered email or mobile'}
            {step === 2 && 'Enter the 6-digit OTP code'}
            {step === 3 && 'Choose a secure new password'}
          </p>
        </div>

        {error && <div className="alert-box alert-error">⚠️ {error}</div>}
        {success && <div className="alert-box alert-success">✓ {success}</div>}

        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <div className="form-group">
              <label className="form-label" htmlFor="resetIdentifier">Email or Mobile Number</label>
              <input
                type="text"
                id="resetIdentifier"
                className="classmorphic-input"
                placeholder="name@example.com or 10-digit mobile"
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
                required
              />
            </div>
            <button type="submit" className="sunshine-btn" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <div className="form-group">
              <label className="form-label" htmlFor="otp">Enter 6-Digit OTP</label>
              <input
                type="text"
                id="otp"
                maxLength="6"
                className="classmorphic-input"
                placeholder="e.g. 123456"
                value={otp}
                onChange={(e) => { setOtp(e.target.value); setError(''); }}
                required
              />
            </div>
            <button type="submit" className="sunshine-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <div className="card-footer-links">
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer' }}
                onClick={() => setStep(1)}
              >
                ← Back to identifier
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="form-label" htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="classmorphic-input"
                placeholder="Min 8 chars with A-Z, a-z, 0-9, symbol"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                className="classmorphic-input"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                required
              />
            </div>
            <button type="submit" className="sunshine-btn" disabled={loading}>
              {loading ? 'Updating Password...' : 'Reset Password'}
            </button>
          </form>
        )}

        <p className="footer-text">
          Remember your password? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
