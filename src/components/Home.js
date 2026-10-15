import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, getAuthToken, removeAuthToken } from '../services/api';
import '../styles/sunshine-classmorphism.css';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Verify Authentication with Backend
    const token = getAuthToken();
    if (!token) {
      navigate('/login');
      return;
    }

    // Backend authentication check for protected resource
    authApi.getMe()
      .catch(() => {
        // Unauthenticated or revoked token redirects to /login
        removeAuthToken();
        navigate('/login');
      });

    // 2. Invisible Logout Handler
    // (Prompt Requirement: Implement logout without adding a visible logout button to the blank Home page)
    const handleLogout = async () => {
      try {
        await authApi.logout();
      } catch (e) {
        // Ensure local cleanup even if network fails
      } finally {
        removeAuthToken();
        navigate('/login');
      }
    };

    // Keyboard shortcut (Escape, Alt+L, or 'q' for quick logout)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || (event.altKey && event.key.toLowerCase() === 'l') || event.key.toLowerCase() === 'q') {
        handleLogout();
      }
    };

    // Double-click anywhere on the blank screen to log out
    const handleDoubleClick = () => {
      handleLogout();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dblclick', handleDoubleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [navigate]);

  // Pure white background (#FFFFFF) with absolutely NO visible elements or text
  return (
    <div
      className="home-blank-white"
      style={{
        backgroundColor: '#FFFFFF',
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Intentionally rendered blank as required by specification */}
    </div>
  );
}
