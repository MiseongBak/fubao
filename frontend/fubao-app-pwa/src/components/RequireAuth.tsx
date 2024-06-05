import React, { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode; // ReactNode 타입으로 children을 정의합니다.
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && location.pathname !== '/introduction') {
      navigate('/introduction');
    }
  }, [navigate, location.pathname]); // location 대신 location.pathname을 의존성 배열에 추가

  return <>{children}</>; // children을 렌더링
};

export default RequireAuth;