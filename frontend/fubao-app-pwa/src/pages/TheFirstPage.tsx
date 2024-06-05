import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TheFirstPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/home');
      } else {
        navigate('/introduction');
      }
    }, [navigate]);
  
    return null;
};

export default TheFirstPage;
