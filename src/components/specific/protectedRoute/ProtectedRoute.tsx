import React from 'react';
import { Navigate } from 'react-router-dom';
import { selectUserRole, selectUserToken } from '../../../features/auth/authSlice';
import { useAppSelector } from '../../../store/hooks';
import { localStorageConstants } from '../../../utils/constants';
import { Modal } from 'antd';
import { type } from 'os';

type Props = {
  children: React.ReactNode;
};
const ProtectedRoute = ({ children }: Props) => {
  const roleStore = useAppSelector(selectUserRole);
  console.log(roleStore);

  const userData: any = JSON.parse(localStorage.getItem('user') as string);
  if (userData?.role !== 'ADMIN') {
    return <Navigate to='/auth' />;
  } else if (userData?.role === 'USER') {
    return <Navigate to='/' />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
