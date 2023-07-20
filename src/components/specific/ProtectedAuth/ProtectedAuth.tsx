import React from 'react';
import { Navigate } from 'react-router-dom';
import { selectUserRole } from '../../../features/auth/authSlice';
import { useAppSelector } from '../../../store/hooks';

type Props = {
  children: React.ReactNode;
};

const ProtectedAuth = ({ children }: Props) => {
  const roleStore = useAppSelector(selectUserRole);
  console.log(roleStore);

  const userData: any = JSON.parse(localStorage.getItem('user') as string);
  if (userData.role !== 'ADMIN') {
    return <>{children}</>;
  }
  return <Navigate to={'/admin'} />;
};

export default ProtectedAuth;
