import React from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      await axiosInstance.post('/api/token/logout/', {
        refresh: refreshToken
      });

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error(err.response?.data?.detail || err.message || 'Logout failed');
      // Force logout even if API call fails
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer'
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;